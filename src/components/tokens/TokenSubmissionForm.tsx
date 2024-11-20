// src/components/tokens/TokenSubmissionForm.tsx
import { useState } from 'react'
import { Button } from '@/components/shared/Button'
import { useTokenSubmission } from '@/hooks/useTokenSubmission'

interface TokenSubmissionFormData {
  address: string
  name: string
  symbol: string
  website?: string
  twitter?: string
  telegram?: string
  description?: string
  logo?: File
}

export function TokenSubmissionForm() {
  const [formData, setFormData] = useState<TokenSubmissionFormData>({
    address: '',
    name: '',
    symbol: '',
  })
  const { submitToken, isLoading, error } = useTokenSubmission()
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submitToken({
        ...formData,
        logo: selectedLogo,
      })
      // Reset form or show success message
    } catch (error) {
      console.error('Token submission failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Token Address
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Symbol
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Website
          </label>
          <input
            type="url"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Twitter
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            value={formData.twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Telegram
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            value={formData.telegram}
            onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Logo
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary-500 file:text-white
              hover:file:bg-primary-600"
            onChange={(e) => setSelectedLogo(e.target.files?.[0] || null)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
        >
          Submit Token
        </Button>
      </div>
    </form>
  )
}