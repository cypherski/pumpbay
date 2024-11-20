// src/types/wallet.ts
export interface Wallet {
    id: string
    address: string
    label?: string
    balance: number
    transactions24h: number
    profits24h: number
    topTokens: Array<{
      symbol: string
      balance: number
    }>
  }
  
  export interface Transaction {
    id: string
    hash: string
    type: 'BUY' | 'SELL'
    tokenId: string
    walletId: string
    amount: number
    price: number
    timestamp: Date
  }