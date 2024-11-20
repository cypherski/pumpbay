// src/lib/utils/swr.ts
import { SWRConfig } from 'swr'

export const swrConfig = {
  refreshInterval: 30000, // 30 seconds
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  fetcher: async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.message = await res.json()
      throw error
    }
    return res.json()
  }
}