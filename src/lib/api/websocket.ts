// src/lib/api/websocket.ts
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function initializeWebSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, {
      transports: ['websocket'],
      autoConnect: true,
    })

    socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })

    socket.on('error', (error) => {
      console.error('WebSocket error:', error)
    })
  }

  return socket
}