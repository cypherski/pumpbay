// src/lib/api/birdeye.ts
interface TokenData {
    price: number
    priceChange24h: number
    volume24h: number
    marketCap: number
  }
  
  interface WalletData {
    balance: number
    tokens: Array<{
      symbol: string
      balance: number
      value: number
    }>
  }
  
  const BIRDEYE_API_URL = 'https://public-api.birdeye.so/v1'
  const API_KEY = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY
  
  async function birdEyeRequest(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${BIRDEYE_API_URL}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
  
    const response = await fetch(url.toString(), {
      headers: {
        'X-API-KEY': API_KEY!,
        'Accept': 'application/json',
      },
    })
  
    if (!response.ok) {
      throw new Error(`BirdEye API error: ${response.statusText}`)
    }
  
    return response.json()
  }
  
  export async function getBirdEyeTokenData(address: string): Promise<TokenData> {
    const data = await birdEyeRequest(`/token/${address}`)
    return {
      price: data.price,
      priceChange24h: data.priceChange24h,
      volume24h: data.volume24h,
      marketCap: data.marketCap,
    }
  }
  
  export async function getBirdEyeWalletData(address: string): Promise<WalletData> {
    const data = await birdEyeRequest(`/wallet/${address}`)
    return {
      balance: data.balance,
      tokens: data.tokens.map((token: any) => ({
        symbol: token.symbol,
        balance: token.balance,
        value: token.value,
      })),
    }
  }