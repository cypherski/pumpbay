// src/hooks/useTokenSubmission.ts
import { useState } from 'react'
import { uploadToIPFS } from '@/lib/utils/ipfs'

export function useTokenSubmission() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitToken = async (data: any) => {
    setIsLoading(true)
    setError(null)

    try {
      let logoUrl = null
      if (data.logo) {
        logoUrl = await uploadToIPFS(data.logo)
      }

      const response = await fetch('/api/tokens/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          logo: logoUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit token')
      }

      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    submitToken,
    isLoading,
    error,
  }
}