// src/components/admin/AnalyticsDashboard.tsx
import { useState, useEffect } from 'react'
import { Card } from '@/components/shared/Card'
import { LineChart, BarChart, PieChart } from '@/components/shared/Charts'
import { Button } from '@/components/shared/Button'

interface AnalyticsData {
  tokenSubmissions: Array<{ timestamp: string; value: number }>
  votingActivity: Array<{ label: string; value: number }>
  tokenDistribution: Array<{ name: string; value: number }>
  recentActivity: Array<{
    id: string
    type: string
    description: string
    timestamp: Date
  }>
}

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/admin/analytics?timeframe=${timeframe}`)
        const analyticsData = await response.json()
        setData(analyticsData)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeframe])

  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          {(['24h', '7d', '30d'] as const).map((t) => (
            <Button
              key={t}
              variant={timeframe === t ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeframe(t)}
            >
              {t === '24h' ? 'Last 24h' : t === '7d' ? 'Last 7d' : 'Last 30d'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Token Submissions">
          <LineChart data={data.tokenSubmissions} />
        </Card>
        
        <Card title="Voting Activity">
          <BarChart data={data.votingActivity} />
        </Card>
        
        <Card title="Token Distribution">
          <PieChart data={data.tokenDistribution} />
        </Card>
        
        <Card title="Recent Activity">
          <div className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div>
                  <span className="text-sm text-gray-400">{activity.type}</span>
                  <p className="text-white">{activity.description}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}