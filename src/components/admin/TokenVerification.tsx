// src/components/admin/TokenVerification.tsx
import { useState } from 'react'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { useTokenVerification } from '@/hooks/useTokenVerification'

interface TokenDetails {
  id: string
  address: string
  symbol: string
  name: string
  submittedAt: Date
  status: 'PENDING' | 'ACTIVE' | 'REJECTED'
  submitterInfo?: {
    wallet: string
    previousSubmissions?: number
  }
}

export function TokenVerification() {
  const { pendingTokens, verifyToken, rejectToken, isLoading } = useTokenVerification()
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Token Verification</h2>
        <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm">
          {pendingTokens.length} Pending
        </span>
      </div>

      <div className="grid gap-4">
        {pendingTokens.map((token) => (
          <Card key={token.id} className="hover:border-primary-500/50 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{token.symbol}</h3>
                <p className="text-sm text-gray-400">{token.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Submitted {new Date(token.submittedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedToken(token.id)}
                >
                  View Details
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isLoading && selectedToken === token.id}
                  onClick={() => verifyToken(token.id)}
                >
                  Verify
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-500/10"
                  isLoading={isLoading && selectedToken === token.id}
                  onClick={() => rejectToken(token.id)}
                >
                  Reject
                </Button>
              </div>
            </div>

            {selectedToken === token.id && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Contract Address</p>
                    <p className="font-mono text-sm">{token.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Submitter</p>
                    <p className="font-mono text-sm">{token.submitterInfo?.wallet}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}