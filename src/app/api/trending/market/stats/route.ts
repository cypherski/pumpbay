// src/app/api/trending/market/stats/route.ts
import { NextResponse } from 'next/server'
import { getBirdEyeMarketStats } from '@/lib/api/birdeye'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const timeframe = searchParams.get('timeframe') as '24h' | '7d' | '30d'

  try {
    const stats = await getBirdEyeMarketStats(timeframe)
    
    return NextResponse.json({
      totalVolume: stats.totalVolume,
      totalMarketCap: stats.totalMarketCap,
      topGainers: stats.topGainers,
      topLosers: stats.topLosers,
      mostActive: stats.mostActive
    })
  } catch (error) {
    console.error('Failed to fetch market stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market stats' },
      { status: 500 }
    )
  }
}