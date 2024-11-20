// src/lib/utils/validation.ts
export function isValidSolanaAddress(address: string): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
  }
  
  export function isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  export function validateTokenSubmission(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
  
    if (!isValidSolanaAddress(data.address)) {
      errors.push('Invalid Solana address')
    }
  
    if (!data.name || data.name.length < 2) {
      errors.push('Name must be at least 2 characters')
    }
  
    if (!data.symbol || data.symbol.length < 2) {
      errors.push('Symbol must be at least 2 characters')
    }
  
    if (data.website && !isValidUrl(data.website)) {
      errors.push('Invalid website URL')
    }
  
    return {
      isValid: errors.length === 0,
      errors
    }
  }