// src/app/api/trending/market/tokens/route.ts
import { NextResponse } from 'next/server'
import { getBirdEyeTokenData } from '@/lib/api/birdeye'
import { prisma } from '@/lib/database/prisma'

export async function GET() {
  try {
    const tokens = await prisma.token.findMany({
      where: {
        status: 'ACTIVE'
      },
      take: 100
    })

    const tokenData = await Promise.all(
      tokens.map(async (token) => {
        const marketData = await getBirdEyeTokenData(token.address)
        return {
          ...token,
          ...marketData
        }
      })
    )

    return NextResponse.json(tokenData)
  } catch (error) {
    console.error('Failed to fetch market tokens:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market tokens' },
      { status: 500 }
    )
  }
}