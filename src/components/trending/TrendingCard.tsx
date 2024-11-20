// src/components/trending/TrendingCard.tsx
import Image from 'next/image'
import { formatNumber, formatPercentage } from '@/lib/utils/formatting'

interface TrendingCardProps {
  token: {
    symbol: string
    name: string
    logo: string
    price: number
    priceChange24h: number
    volume24h: number
    marketCap: number
    votes: {
      bullish: number
      bearish: number
    }
  }
}

export function TrendingCard({ token }: TrendingCardProps) {
  return (
    <div className="bg-surface rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src={token.logo}
          alt={token.symbol}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg">{token.symbol}</h3>
          <p className="text-gray-400 text-sm">{token.name}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-sm">Price</p>
          <p className="font-semibold">${formatNumber(token.price)}</p>
          <span className={`text-sm ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(token.priceChange24h)}
          </span>
        </div>
        <div>
          <p className="text-gray-400 text-sm">24h Volume</p>
          <p className="font-semibold">${formatNumber(token.volume24h)}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
            🔥 {token.votes.bullish}
          </button>
          <button className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm">
            💩 {token.votes.bearish}
          </button>
        </div>
        <div className="text-sm text-gray-400">
          MCap: ${formatNumber(token.marketCap)}
        </div>
      </div>
    </div>
  )
}