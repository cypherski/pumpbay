// src/hooks/useMarketData.ts
import { useState, useEffect } from 'react'
import { MarketToken } from '@/types/token'

export function useMarketData() {
  const [tokens, setTokens] = useState<MarketToken[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/trending/market/tokens')
        const data = await response.json()
        setTokens(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 30000)

    return () => clearInterval(interval)
  }, [])

  return { tokens, isLoading, error }
}