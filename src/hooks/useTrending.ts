// src/hooks/useTrending.ts
import { useState, useEffect } from 'react'
import { Token } from '@/types/token'

export function useTrending(type: 'bay' | 'market') {
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`/api/trending/${type}/tokens`)
        const data = await response.json()
        setTokens(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokens()
    const interval = setInterval(fetchTokens, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [type])

  return { tokens, isLoading, error }
}