// src/components/shared/ErrorFallback.tsx
interface ErrorFallbackProps {
    error?: Error
  }
  
  export function ErrorFallback({ error }: ErrorFallbackProps) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-4">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }