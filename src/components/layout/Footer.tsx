// src/components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
    return (
      <footer className="bg-surface py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary-500 mb-4">PumpBay</h3>
              <p className="text-gray-400">
                Your premier destination for Solana token analytics and tracking
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/trending" className="text-gray-400 hover:text-primary-400">
                    Trending Tokens
                  </Link>
                </li>
                <li>
                  <Link href="/wallets" className="text-gray-400 hover:text-primary-400">
                    Whale Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/tokens/submit" className="text-gray-400 hover:text-primary-400">
                    Submit Token
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://twitter.com/pumpbay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="https://t.me/pumpbay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PumpBay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}