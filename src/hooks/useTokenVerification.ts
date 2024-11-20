// src/hooks/useTokenVerification.ts
import { useState, useEffect } from 'react'

export function useTokenVerification() {
  const [pendingTokens, setPendingTokens] = useState<TokenDetails[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPendingTokens()
  }, [])

  const fetchPendingTokens = async () => {
    try {
      const response = await fetch('/api/admin/tokens/pending')
      const data = await response.json()
      setPendingTokens(data)
    } catch (error) {
      console.error('Failed to fetch pending tokens:', error)
    }
  }

  const verifyToken = async (tokenId: string) => {
    setIsLoading(true)
    try {
      await fetch(`/api/admin/tokens/${tokenId}/verify`, {
        method: 'POST'
      })
      await fetchPendingTokens()
    } catch (error) {
      console.error('Failed to verify token:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const rejectToken = async (tokenId: string) => {
    setIsLoading(true)
    try {
      await fetch(`/api/admin/tokens/${tokenId}/reject`, {
        method: 'POST'
      })
      await fetchPendingTokens()
    } catch (error) {
      console.error('Failed to reject token:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    pendingTokens,
    verifyToken,
    rejectToken,
    isLoading
  }
}