// src/app/api/trending/bay/tokens/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function GET() {
  try {
    const tokens = await prisma.token.findMany({
      where: {
        status: 'ACTIVE'
      },
      include: {
        votes: true
      },
      orderBy: {
        votes: {
          _count: 'desc'
        }
      },
      take: 100
    })

    return NextResponse.json(tokens)
  } catch (error) {
    console.error('Failed to fetch trending tokens:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending tokens' },
      { status: 500 }
    )
  }
}