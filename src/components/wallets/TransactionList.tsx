// src/components/wallets/TransactionList.tsx
import { formatDistance } from 'date-fns'
import { formatAddress } from '@/lib/utils/formatting'

interface Transaction {
  hash: string
  type: 'buy' | 'sell'
  token: string
  amount: number
  price: number
  timestamp: Date
}

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.hash}
          className="bg-surface rounded-lg p-4 hover:bg-surface/80 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                tx.type === 'buy' 
                  ? 'bg-green-500/20 text-green-500' 
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {tx.type.toUpperCase()}
              </span>
              <span className="text-gray-400">{tx.token}</span>
            </div>
            <a
              href={`https://solscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-500 hover:text-primary-400"
            >
              {formatAddress(tx.hash)}
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Amount</p>
              <p>{tx.amount.toLocaleString()} ${tx.token}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Price</p>
              <p>${tx.price.toFixed(4)}</p>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-400">
            {formatDistance(tx.timestamp, new Date(), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  )
}