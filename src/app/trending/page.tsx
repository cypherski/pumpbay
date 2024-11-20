// src/app/trending/page.tsx
import { TrendingTabs } from '@/components/trending/TrendingTabs'
import { useTrending } from '@/hooks/useTrending'

export default function TrendingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trending Tokens</h1>
        <div className="flex space-x-4">
          <select className="bg-surface rounded-lg px-4 py-2">
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7d</option>
            <option value="30d">Last 30d</option>
          </select>
        </div>
      </div>

      <TrendingTabs />
    </div>
  )
}