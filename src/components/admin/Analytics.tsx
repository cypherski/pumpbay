// src/components/admin/Analytics.tsx
import { Card } from '@/components/shared/Card'
import { LineChart, BarChart } from '@/components/shared/Charts'
import { useState } from 'react'

export function Analytics() {
  const [timeframe, setTimeframe] = useState('24h')
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-gray-800 border-gray-700 rounded-md text-white"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Token Submissions">
          <LineChart data={[]} /> {/* Add actual data */}
        </Card>
        <Card title="Voting Activity">
          <BarChart data={[]} /> {/* Add actual data */}
        </Card>
      </div>

      <Card title="Recent Activity">
        {/* Add activity feed */}
      </Card>
    </div>
  )
}