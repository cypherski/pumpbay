// src/components/admin/WalletForm.tsx
import { useState } from 'react'
import { useWallets } from '@/hooks/useWallets'
import { Button } from '@/components/shared/Button'

interface WalletFormProps {
  onSubmit: () => void
  onCancel: () => void
  initialData?: {
    address: string
    label: string
    groupId?: string
  }
}

export function WalletForm({ onSubmit, onCancel, initialData }: WalletFormProps) {
  const [formData, setFormData] = useState({
    address: initialData?.address || '',
    label: initialData?.label || '',
    groupId: initialData?.groupId || ''
  })
  const { addWallet, isLoading } = useWallets()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addWallet(formData)
      onSubmit()
    } catch (error) {
      console.error('Failed to add wallet:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Wallet Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Label
        </label>
        <input
          type="text"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
        >
          Save Wallet
        </Button>
      </div>
    </form>
  )
}