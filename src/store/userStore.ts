// src/store/userStore.ts
import { create } from 'zustand'
import { User } from '@/types/user'

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: Error | null
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  logout: () => set({ user: null, isAuthenticated: false })
}))