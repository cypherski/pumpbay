// src/components/wallets/WalletCard.tsx
import { formatAddress } from '@/lib/utils/formatting'
import { Card } from '@/components/shared/Card'

interface WalletCardProps {
  wallet: {
    address: string
    label: string
    balance: number
    transactions24h: number
    profits24h: number
    topTokens: Array<{
      symbol: string
      balance: number
    }>
  }
}

export function WalletCard({ wallet }: WalletCardProps) {
  return (
    <Card className="hover:border-primary-500/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{wallet.label}</h3>
          <p className="text-gray-400 text-sm">{formatAddress(wallet.address)}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${
          wallet.profits24h >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
        }`}>
          {wallet.profits24h >= 0 ? '+' : ''}{wallet.profits24h.toFixed(2)}%
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-sm">Balance</p>
          <p className="font-semibold">${wallet.balance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">24h Transactions</p>
          <p className="font-semibold">{wallet.transactions24h}</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm text-gray-400 mb-2">Top Tokens</h4>
        <div className="space-y-2">
          {wallet.topTokens.map((token) => (
            <div key={token.symbol} className="flex justify-between items-center">
              <span className="text-sm">{token.symbol}</span>
              <span className="text-sm text-gray-400">${token.balance.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}