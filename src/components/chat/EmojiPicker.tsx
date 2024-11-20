// src/components/chat/EmojiPicker.tsx
interface EmojiPickerProps {
    onSelect: (emoji: string) => void
  }
  
  export function EmojiPicker({ onSelect }: EmojiPickerProps) {
    const commonEmojis = ['😊', '👍', '🔥', '💎', '🚀', '💰', '📈', '📉', '🎉', '😢', '🤔', '💡']
    
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1">
        {commonEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    )
  }