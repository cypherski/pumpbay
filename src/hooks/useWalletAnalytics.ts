// src/hooks/useTrending.ts
import { useState, useEffect } from 'react'
import { Token } from '@/types/token'

export function useTrending(type: 'bay' | 'market') {
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`/api/trending/${type}/tokens`)
        const data = await response.json()
        setTokens(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokens()
    const interval = setInterval(fetchTokens, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [type])

  return { tokens, isLoading, error }
}

// src/hooks/useMarketData.ts
import { useState, useEffect } from 'react'
import { MarketToken } from '@/types/token'

export function useMarketData() {
  const [tokens, setTokens] = useState<MarketToken[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/trending/market/tokens')
        const data = await response.json()
        setTokens(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 30000)

    return () => clearInterval(interval)
  }, [])

  return { tokens, isLoading, error }
}

// src/hooks/useWalletAnalytics.ts
import { useState, useEffect } from 'react'
import { Wallet, Transaction } from '@/types/wallet'

export function useWalletAnalytics() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletsRes, txRes] = await Promise.all([
          fetch('/api/wallets/track'),
          fetch('/api/wallets/transactions')
        ])
        
        const [walletsData, txData] = await Promise.all([
          walletsRes.json(),
          txRes.json()
        ])

        setWallets(walletsData)
        setTransactions(txData)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return { wallets, transactions, isLoading, error }
}

// src/hooks/useNotifications.ts
import { useState, useEffect } from 'react'
import { toast } from '@/components/shared/Notifications'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!)
    
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data)
      toast(notification.message, notification.type)
      setNotifications(prev => [...prev, notification])
    }

    return () => {
      ws.close()
    }
  }, [])

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return { notifications, clearNotification }
}