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