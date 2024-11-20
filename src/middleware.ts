// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Routes that require authentication
const protectedRoutes = [
  '/admin',
  '/tokens/submit',
]

// Routes that are only accessible by admins
const adminRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Check if route requires authentication
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/api/auth/signin', request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    // Check admin routes
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 403 })
      }
    }
  }

  return NextResponse.next()
}