// src/app/api/admin/users/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { verifyAdmin } from '@/lib/utils/auth'

export async function GET(req: Request) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true,
        isActive: true
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userData = await req.json()
    const user = await prisma.user.create({
      data: userData
    })
    return NextResponse.json(user)
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}