// src/app/trending/market/page.tsx
import { LineChart } from '@/components/shared/Charts'
import { useMarketData } from '@/hooks/useMarketData'

export default function MarketTrendingPage() {
  const { tokens, isLoading } = useMarketData()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tokens.map((token) => (
          <div key={token.id} className="bg-surface p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{token.symbol}</h3>
                <p className="text-gray-400">{token.name}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">${token.price.toFixed(4)}</div>
                <div className={`text-sm ${
                  token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </div>
              </div>
            </div>
            <LineChart data={token.priceHistory} height={200} />
          </div>
        ))}
      </div>
    </div>
  )
}