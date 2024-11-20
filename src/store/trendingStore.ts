// src/store/trendingStore.ts
import { create } from 'zustand'
import { Token } from '@/types/token'

interface TrendingStore {
  tokens: Token[]
  isLoading: boolean
  error: Error | null
  setTokens: (tokens: Token[]) => void
  addToken: (token: Token) => void
  updateToken: (tokenId: string, updates: Partial<Token>) => void
  removeToken: (tokenId: string) => void
}

export const useTrendingStore = create<TrendingStore>((set) => ({
  tokens: [],
  isLoading: false,
  error: null,
  setTokens: (tokens) => set({ tokens }),
  addToken: (token) => set((state) => ({ tokens: [...state.tokens, token] })),
  updateToken: (tokenId, updates) => set((state) => ({
    tokens: state.tokens.map((t) => 
      t.id === tokenId ? { ...t, ...updates } : t
    )
  })),
  removeToken: (tokenId) => set((state) => ({
    tokens: state.tokens.filter((t) => t.id !== tokenId)
  }))
}))