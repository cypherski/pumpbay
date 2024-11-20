// src/components/layout/Header.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <header className="bg-surface/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-500 hover:text-primary-400 transition-colors">
            🚀 PumpBay
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/trending"
              className={`${pathname.startsWith('/trending') ? 'text-primary-500' : 'text-gray-300'} hover:text-primary-400 transition-colors`}
            >
              🔥 Trending
            </Link>
            <Link 
              href="/wallets"
              className={`${pathname.startsWith('/wallets') ? 'text-primary-500' : 'text-gray-300'} hover:text-primary-400 transition-colors`}
            >
              👁️ Wallets
            </Link>
            <Link 
              href="/tokens"
              className={`${pathname.startsWith('/tokens') ? 'text-primary-500' : 'text-gray-300'} hover:text-primary-400 transition-colors`}
            >
              🆕 Tokens
            </Link>
          </nav>
          
          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://twitter.com/pumpbay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary-400 transition-colors"
            >
              🐦 Twitter
            </a>
            <a 
              href="https://t.me/pumpbay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary-400 transition-colors"
            >
              📱 Telegram
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/trending"
                className={`${pathname.startsWith('/trending') ? 'text-primary-500' : 'text-gray-300'} hover:text-primary-400`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔥 Trending
              </Link>
              <Link 
                href="/wallets"
                className={`${pathname.startsWith('/wallets') ? 'text-primary-500' : 'text-gray-300'} hover:text-primary-400`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👁️ Wallets
              </Link>
              <Link 
                href="/tokens"
                className={`${pathname.startsWith('/tokens') ? 'text-primary-500' : 'text-gray-300'} hover:text-primary-400`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🆕 Tokens
              </Link>
              <div className="flex space-x-4 pt-4 border-t border-gray-700">
                <a 
                  href="https://twitter.com/pumpbay" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400"
                >
                  🐦 Twitter
                </a>
                <a 
                  href="https://t.me/pumpbay" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400"
                >
                  📱 Telegram
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}