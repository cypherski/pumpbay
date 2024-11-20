import { useState, useEffect } from 'react'
import { useWebSocket } from './useWebSocket'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: 'text' | 'notification'
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { socket, isConnected } = useWebSocket()

  useEffect(() => {
    if (!socket) return

    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    return () => {
      socket.off('message')
    }
  }, [socket])

  const sendMessage = async (content: string) => {
    if (!socket || !isConnected) return

    setIsLoading(true)
    try {
      await socket.emit('message', { content })
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to send message:', error)
      setIsLoading(false)
      throw error
    }
  }

  return {
    messages,
    isLoading,
    sendMessage,
    isConnected
  }
}