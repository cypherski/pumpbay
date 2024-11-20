// src/app/admin/tokens/page.tsx
import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'

export default function AdminTokensPage() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Token Management</h1>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-surface rounded-lg px-4 py-2"
          >
            <option value="all">All Tokens</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <Button>Export Data</Button>
        </div>
      </div>

      {/* Token management interface */}
    </div>
  )
}