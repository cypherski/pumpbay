// src/components/chat/ChatInput.tsx
import { useState } from 'react'
import { useChat } from '@/hooks/useChat'
import { Button } from '@/components/shared/Button'
import { EmojiPicker } from './EmojiPicker'

export function ChatInput() {
  const [message, setMessage] = useState('')
  const { sendMessage, isLoading } = useChat()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return
    
    try {
      await sendMessage(message)
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-400 hover:text-gray-300"
        >
          😊
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          isLoading={isLoading}
        >
          Send
        </Button>
      </div>
      
      {showEmojiPicker && (
        <div className="absolute bottom-full mb-2">
          <EmojiPicker
            onSelect={(emoji) => {
              setMessage((prev) => prev + emoji)
              setShowEmojiPicker(false)
            }}
          />
        </div>
      )}