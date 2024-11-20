// src/app/api/wallets/transactions/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const walletAddress = searchParams.get('address')
  const limit = parseInt(searchParams.get('limit') || '50')

  if (!walletAddress) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    )
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        wallet: {
          address: walletAddress
        }
      },
      include: {
        token: true
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: limit
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Failed to fetch transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}