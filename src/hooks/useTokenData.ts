// src/hooks/useTokenData.ts
import { useState, useEffect } from 'react'
import { getBirdEyeTokenData } from '@/lib/api/birdeye'

export function useTokenData(address: string) {
  const [data, setData] = useState<TokenData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const tokenData = await getBirdEyeTokenData(address)
        setData(tokenData)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [address])

  return { data, isLoading, error }
}