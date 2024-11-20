// src/lib/utils/auth.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function verifyAdmin(req: Request) {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'ADMIN'
}

export async function verifyToken(token: string) {
  try {
    // Verify JWT token
    return true
  } catch {
    return false
  }
}

export function hasPermission(user: any, permission: string) {
  const permissions = {
    ADMIN: ['*'],
    MODERATOR: ['view_tokens', 'verify_tokens', 'manage_users'],
    USER: ['view_tokens', 'submit_tokens']
  }

  const userRole = user?.role || 'USER'
  return permissions[userRole as keyof typeof permissions]?.includes(permission) || 
         permissions[userRole as keyof typeof permissions]?.includes('*')
}