// src/components/tokens/TokenMetrics.tsx
import { Card } from '@/components/shared/Card'
import { LineChart, BarChart } from '@/components/shared/Charts'
import { useTokenMetrics } from '@/hooks/useTokenMetrics'

interface TokenMetricsProps {
  tokenAddress: string
}

export function TokenMetrics({ tokenAddress }: TokenMetricsProps) {
  const { metrics, isLoading } = useTokenMetrics(tokenAddress)

  if (isLoading || !metrics) {
    return <div>Loading metrics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <h3 className="text-sm text-gray-400">Price Change (24h)</h3>
            <p className={`text-2xl font-bold ${
              metrics.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {metrics.priceChange24h > 0 ? '+' : ''}
              {metrics.priceChange24h.toFixed(2)}%
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <h3 className="text-sm text-gray-400">Volume (24h)</h3>
            <p className="text-2xl font-bold">
              ${metrics.volume24h.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <h3 className="text-sm text-gray-400">Market Cap</h3>
            <p className="text-2xl font-bold">
              ${metrics.marketCap.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      <Card title="Price History">
        <LineChart data={metrics.priceHistory} height={300} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Volume Distribution">
          <BarChart data={metrics.volumeDistribution} height={250} />
        </Card>

        <Card title="Holder Distribution">
          <BarChart data={metrics.holderDistribution} height={250} />
        </Card>
      </div>

      <Card title="Recent Transactions">
        <div className="space-y-2">
          {metrics.recentTransactions.map((tx) => (
            <div
              key={tx.hash}
              className="flex justify-between items-center p-3 bg-gray-800 rounded-lg"
            >
              <div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  tx.type === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {tx.type.toUpperCase()}
                </span>
                <span className="ml-2 text-sm">
                  {tx.amount.toLocaleString()} tokens
                </span>
              </div>
              <span className="text-sm text-gray-400">
                ${tx.price.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}