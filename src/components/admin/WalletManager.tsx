// src/components/admin/WalletManager.tsx
import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { WalletForm } from './WalletForm'
import { useWallets } from '@/hooks/useWallets'

export function WalletManager() {
  const [isAddingWallet, setIsAddingWallet] = useState(false)
  const { wallets, isLoading, deleteWallet } = useWallets()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wallet Management</h2>
        <Button onClick={() => setIsAddingWallet(true)}>
          Add Wallet
        </Button>
      </div>

      {isAddingWallet && (
        <WalletForm
          onSubmit={() => setIsAddingWallet(false)}
          onCancel={() => setIsAddingWallet(false)}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wallets.map((wallet) => (
          <Card key={wallet.id}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{wallet.label || 'Unnamed Wallet'}</h3>
                <p className="text-sm text-gray-400">{wallet.address}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteWallet(wallet.id)}
              >
                Delete
              </Button>
            </div>
            <div className="text-sm text-gray-400">
              Group: {wallet.group?.name || 'None'}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}