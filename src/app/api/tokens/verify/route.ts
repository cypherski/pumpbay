// src/app/api/tokens/verify/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { verifyAdmin } from '@/lib/utils/auth'

export async function POST(req: Request) {
  try {
    // Verify admin permissions
    const isAdmin = await verifyAdmin(req)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { tokenId, action } = await req.json()

    const token = await prisma.token.update({
      where: { id: tokenId },
      data: {
        status: action === 'approve' ? 'ACTIVE' : 'REJECTED',
        verifiedAt: new Date()
      }
    })

    return NextResponse.json(token)
  } catch (error) {
    console.error('Failed to verify token:', error)
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    )
  }
}