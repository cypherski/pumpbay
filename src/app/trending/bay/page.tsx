// src/app/trending/bay/page.tsx
import { TrendingCard } from '@/components/trending/TrendingCard'
import { useTrending } from '@/hooks/useTrending'

export default function BayTrendingPage() {
  const { tokens, isLoading } = useTrending('bay')

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token) => (
          <TrendingCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  )
}