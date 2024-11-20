// src/app/wallets/page.tsx
import { WalletCard } from '@/components/wallets/WalletCard'
import { TransactionList } from '@/components/wallets/TransactionList'
import { useWalletAnalytics } from '@/hooks/useWalletAnalytics'

export default function WalletsPage() {
  const { wallets, transactions, isLoading } = useWalletAnalytics()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Whale Wallet Tracking</h1>
        <div className="flex space-x-4">
          <select className="bg-surface rounded-lg px-4 py-2">
            <option value="all">All Wallets</option>
            <option value="whales">Whales Only</option>
            <option value="active">Most Active</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid gap-4">
            {wallets.map((wallet) => (
              <WalletCard key={wallet.address} wallet={wallet} />
            ))}
          </div>
        </div>

        <div>
          <div className="bg-surface rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}