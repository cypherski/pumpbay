// src/hooks/useWebSocket.ts
import { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { initializeWebSocket } from '@/lib/api/websocket'

export function useWebSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const ws = initializeWebSocket()
    setSocket(ws)

    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    ws.on('connect', handleConnect)
    ws.on('disconnect', handleDisconnect)

    return () => {
      ws.off('connect', handleConnect)
      ws.off('disconnect', handleDisconnect)
    }
  }, [])

  return { socket, isConnected }
}