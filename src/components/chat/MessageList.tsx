// src/components/chat/MessageList.tsx
interface Message {
    id: string
    sender: string
    content: string
    timestamp: Date
    type: 'text' | 'notification'
  }
  
  interface MessageListProps {
    messages: Message[]
  }
  
  export function MessageList({ messages }: MessageListProps) {
    return (
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.type === 'notification'
                ? 'bg-primary-500/10 text-primary-500 p-2 rounded text-sm text-center'
                : 'bg-gray-800 p-3 rounded-lg'
            }`}
          >
            {message.type === 'text' && (
              <div className="flex items-start space-x-2">
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-1">{message.sender}</p>
                  <p className="text-white break-words">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 shrink-0">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            )}
            {message.type === 'notification' && message.content}
          </div>
        ))}
      </div>
    )
  }