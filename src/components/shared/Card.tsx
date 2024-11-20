// src/components/shared/Card.tsx
interface CardProps {
    title?: string
    children: React.ReactNode
    className?: string
  }
  
  export function Card({ title, children, className = '' }: CardProps) {
    return (
      <div className={`bg-surface rounded-lg shadow-lg overflow-hidden ${className}`}>
        {title && (
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    )
  }