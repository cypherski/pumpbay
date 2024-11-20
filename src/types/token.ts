// src/types/token.ts
export interface Token {
    id: string
    address: string
    symbol: string
    name: string
    logo?: string
    website?: string
    twitter?: string
    telegram?: string
    description?: string
    status: TokenStatus
    createdAt: Date
    updatedAt: Date
  }
  
  export interface MarketToken extends Token {
    price: number
    priceChange24h: number
    volume24h: number
    marketCap: number
    priceHistory: PricePoint[]
  }
  
  export interface PricePoint {
    timestamp: number
    price: number
  }
  
  export type TokenStatus = 'PENDING' | 'ACTIVE' | 'REJECTED'