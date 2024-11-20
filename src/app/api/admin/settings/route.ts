// src/app/api/admin/settings/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { verifyAdmin } from '@/lib/utils/auth'

export async function GET(req: Request) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const settings = await prisma.settings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const updates = await req.json()
    const settings = await prisma.settings.update({
      where: { id: 1 },
      data: updates
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}