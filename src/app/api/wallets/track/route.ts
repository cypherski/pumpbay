// src/app/api/wallets/track/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { getBirdEyeWalletData } from '@/lib/api/birdeye'

export async function GET() {
  try {
    const trackedWallets = await prisma.wallet.findMany({
      where: {
        isTracked: true
      }
    })

    const walletsWithData = await Promise.all(
      trackedWallets.map(async (wallet) => {
        const birdEyeData = await getBirdEyeWalletData(wallet.address)
        return {
          ...wallet,
          ...birdEyeData
        }
      })
    )

    return NextResponse.json(walletsWithData)
  } catch (error) {
    console.error('Failed to fetch tracked wallets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tracked wallets' },
      { status: 500 }
    )
  }
}