// src/app/api/admin/analytics/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { getTimeframeStart } from '@/lib/utils/date'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const timeframe = searchParams.get('timeframe') as '24h' | '7d' | '30d'
  const startDate = getTimeframeStart(timeframe)

  try {
    const [tokenSubmissions, votingActivity, tokenDistribution, recentActivity] = await Promise.all([
      // Fetch token submissions over time
      prisma.token.groupBy({
        by: ['createdAt'],
        _count: true,
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }),

      // Fetch voting activity
      prisma.vote.groupBy({
        by: ['type'],
        _count: true,
        where: {
          timestamp: {
            gte: startDate
          }
        }
      }),

      // Fetch token distribution
      prisma.token.groupBy({
        by: ['status'],
        _count: true
      }),

      // Fetch recent activity
      prisma.token.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          symbol: true,
          status: true,
          createdAt: true
        }
      })
    ])

    return NextResponse.json({
      tokenSubmissions: tokenSubmissions.map(ts => ({
        timestamp: ts.createdAt.toISOString(),
        value: ts._count
      })),
      votingActivity: votingActivity.map(va => ({
        label: va.type,
        value: va._count
      })),
      tokenDistribution: tokenDistribution.map(td => ({
        name: td.status,
        value: td._count
      })),
      recentActivity: recentActivity.map(ra => ({
        id: ra.id,
        type: 'Token Submission',
        description: `New token submitted: ${ra.symbol}`,
        timestamp: ra.createdAt
      }))
    })
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}