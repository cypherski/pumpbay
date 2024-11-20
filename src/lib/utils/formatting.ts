// src/lib/utils/formatting.ts
export function formatAddress(address: string, chars = 4): string {
    if (!address) return ''
    return `${address.slice(0, chars)}...${address.slice(-chars)}`
  }
  
  export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
    const defaultOptions: Intl.NumberFormatOptions = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options
    }
  
    if (num >= 1e9) {
      return `${(num / 1e9).toLocaleString('en-US', { ...defaultOptions })}B`
    }
    if (num >= 1e6) {
      return `${(num / 1e6).toLocaleString('en-US', { ...defaultOptions })}M`
    }
    if (num >= 1e3) {
      return `${(num / 1e3).toLocaleString('en-US', { ...defaultOptions })}K`
    }
    return num.toLocaleString('en-US', defaultOptions)
  }
  
  export function formatPercentage(num: number): string {
    const formatted = num.toFixed(2)
    return `${num > 0 ? '+' : ''}${formatted}%`
  }
  
  export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }