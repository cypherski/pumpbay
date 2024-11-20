// src/tests/components/TrendingCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TrendingCard } from '@/components/trending/TrendingCard'

const mockToken = {
  id: '1',
  symbol: 'TEST',
  name: 'Test Token',
  logo: '/test-logo.png',
  price: 1.23,
  priceChange24h: 5.67,
  volume24h: 1000000,
  marketCap: 10000000,
  votes: {
    bullish: 100,
    bearish: 50
  }
}

describe('TrendingCard', () => {
  it('renders token information correctly', () => {
    render(<TrendingCard token={mockToken} />)
    
    expect(screen.getByText(mockToken.symbol)).toBeInTheDocument()
    expect(screen.getByText(mockToken.name)).toBeInTheDocument()
    expect(screen.getByText('$1.23')).toBeInTheDocument()
    expect(screen.getByText('+5.67%')).toBeInTheDocument()
  })

  it('displays correct vote counts', () => {
    render(<TrendingCard token={mockToken} />)
    
    expect(screen.getByText('🔥 100')).toBeInTheDocument()
    expect(screen.getByText('💩 50')).toBeInTheDocument()
  })

  it('handles voting interactions', () => {
    render(<TrendingCard token={mockToken} />)
    
    const bullishButton = screen.getByText('🔥 100')
    const bearishButton = screen.getByText('💩 50')
    
    fireEvent.click(bullishButton)
    fireEvent.click(bearishButton)
    
    // Verify vote count updates
    expect(screen.getByText('🔥 101')).toBeInTheDocument()
    expect(screen.getByText('💩 51')).toBeInTheDocument()
  })
})