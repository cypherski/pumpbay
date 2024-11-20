// src/lib/utils/cache.ts
type CacheItem<T> = {
    value: T
    timestamp: number
  }
  
  class Cache<T> {
    private cache: Map<string, CacheItem<T>> = new Map()
    private ttl: number
  
    constructor(ttlInSeconds: number) {
      this.ttl = ttlInSeconds * 1000
    }
  
    set(key: string, value: T): void {
      this.cache.set(key, {
        value,
        timestamp: Date.now()
      })
    }
  
    get(key: string): T | null {
      const item = this.cache.get(key)
      if (!item) return null
  
      if (Date.now() - item.timestamp > this.ttl) {
        this.cache.delete(key)
        return null
      }
  
      return item.value
    }
  
    clear(): void {
      this.cache.clear()
    }
  }
  
  export const tokenCache = new Cache<any>(300) // 5 minutes TTL
  export const walletCache = new Cache<any>(60) // 1 minute TTL