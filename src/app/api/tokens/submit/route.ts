// src/app/api/tokens/submit/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { verifyToken } from '@/lib/utils/solana'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Verify token contract
    const verification = await verifyToken(data.address)
    if (!verification.isValid) {
      return NextResponse.json(
        { error: verification.error },
        { status: 400 }
      )
    }

    // Create token
    const token = await prisma.token.create({
      data: {
        address: data.address,
        symbol: data.symbol,
        name: data.name,
        logo: data.logo,
        website: data.website,
        twitter: data.twitter,
        telegram: data.telegram,
        description: data.description,
        status: 'PENDING'
      }
    })

    return NextResponse.json(token)
  } catch (error) {
    console.error('Failed to submit token:', error)
    return NextResponse.json(
      { error: 'Failed to submit token' },
      { status: 500 }
    )
  }
}