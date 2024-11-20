// src/components/trending/VotingSystem.tsx
import { useState } from 'react'
import { useVoting } from '@/hooks/useVoting'

interface VotingSystemProps {
  tokenId: string
  initialVotes: {
    bullish: number
    bearish: number
  }
}

export function VotingSystem({ tokenId, initialVotes }: VotingSystemProps) {
  const { vote, isLoading } = useVoting()
  const [votes, setVotes] = useState(initialVotes)

  const handleVote = async (type: 'bullish' | 'bearish') => {
    if (isLoading) return
    
    try {
      await vote(tokenId, type)
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }))
    } catch (error) {
      console.error('Voting failed:', error)
    }
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleVote('bullish')}
        disabled={isLoading}
        className="px-4 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors"
      >
        🔥 {votes.bullish}
      </button>
      <button
        onClick={() => handleVote('bearish')}
        disabled={isLoading}
        className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
      >
        💩 {votes.bearish}
      </button>
    </div>
  )
}