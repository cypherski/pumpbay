// src/app/api/wallets/analytics/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { getBirdEyeWalletData } from '@/lib/api/birdeye'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')
  const timeframe = searchParams.get('timeframe') as '24h' | '7d' | '30d'

  if (!address) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    )
  }

  try {
    const [walletData, transactions] = await Promise.all([
      getBirdEyeWalletData(address),
      prisma.transaction.findMany({
        where: {
          wallet: { address },
          timestamp: {
            gte: new Date(Date.now() - getTimeframeMs(timeframe))
          }
        },
        include: {
          token: true
        },
        orderBy: {
          timestamp: 'desc'
        }
      })
    ])

    const analytics = calculateWalletAnalytics(transactions)

    return NextResponse.json({
      wallet: walletData,
      analytics,
      transactions
    })
  } catch (error) {
    console.error('Failed to fetch wallet analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wallet analytics' },
      { status: 500 }
    )
  }
}