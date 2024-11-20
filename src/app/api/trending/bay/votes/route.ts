// src/app/api/trending/bay/votes/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function POST(req: Request) {
  try {
    const { tokenId, type } = await req.json()

    const vote = await prisma.vote.create({
      data: {
        tokenId,
        type,
        timestamp: new Date()
      }
    })

    return NextResponse.json(vote)
  } catch (error) {
    console.error('Failed to submit vote:', error)
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    )
  }
}