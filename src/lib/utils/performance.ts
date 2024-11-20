// src/lib/utils/performance.ts
export function measurePerformance(name: string, fn: () => any) {
    const start = performance.now()
    const result = fn()
    const duration = performance.now() - start
    
    // Log performance metrics
    console.log(`Performance: ${name} took ${duration}ms`)
    
    return result
  }
  
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null
  
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        timeout = null
        func(...args)
      }
  
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(later, wait)
    }
  }
  
  export function memoize<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
    const cache = new Map()
  
    return (...args: any[]) => {
      const key = JSON.stringify(args)
      if (cache.has(key)) {
        return cache.get(key)
      }
  
      const result = fn(...args)
      cache.set(key, result)
      return result
    }
  }