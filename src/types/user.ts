// src/types/user.ts
export interface User {
    id: string
    email: string
    role: UserRole
    createdAt: Date
    lastLogin: Date
    isActive: boolean
    settings: UserSettings
  }
  
  export type UserRole = 'ADMIN' | 'MODERATOR' | 'USER'
  
  export interface UserSettings {
    notifications: {
      email: boolean
      telegram: boolean
      discord: boolean
    }
    theme: 'light' | 'dark'
    timezone: string
  }