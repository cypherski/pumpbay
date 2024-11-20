// src/tests/utils/formatting.test.ts
import { 
    formatAddress, 
    formatNumber, 
    formatPercentage 
  } from '@/lib/utils/formatting'
  
  describe('Formatting Utils', () => {
    describe('formatAddress', () => {
      it('formats address correctly', () => {
        const address = '0x1234567890abcdef1234567890abcdef12345678'
        expect(formatAddress(address)).toBe('0x12...5678')
      })
    })
  
    describe('formatNumber', () => {
      it('formats large numbers with abbreviations', () => {
        expect(formatNumber(1234567)).toBe('1.23M')
        expect(formatNumber(1234567890)).toBe('1.23B')
      })
    })
  
    describe('formatPercentage', () => {
      it('formats percentages with correct signs', () => {
        expect(formatPercentage(5.67)).toBe('+5.67%')
        expect(formatPercentage(-5.67)).toBe('-5.67%')
      })
    })
  })