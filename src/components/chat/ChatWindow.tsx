// src/components/chat/ChatWindow.tsx
import { useEffect, useRef } from 'react'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { useChat } from '@/hooks/useChat'

export function ChatWindow() {
  const { messages, isLoading } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-[600px] bg-surface rounded-lg">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Live Token Discussion</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <div ref={bottomRef} />
      </div>
      
      <div className="border-t border-gray-700 p-4">
        <ChatInput />
      </div>
    </div>
  )
}