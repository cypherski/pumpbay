// src/app/page.tsx
export default function HomePage() {
    return (
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                PumpBay
              </h1>
              <p className="mt-4 text-xl text-gray-400">
                Track trending tokens, monitor whale wallets, and discover new opportunities in the Solana ecosystem
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <a
                  href="/trending"
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-medium transition-colors"
                >
                  Explore Trending
                </a>
                <a
                  href="/wallets"
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Track Wallets
                </a>
              </div>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-surface rounded-lg">
                <div className="text-3xl mb-4">🔥</div>
                <h3 className="text-xl font-semibold mb-2">Trending Tokens</h3>
                <p className="text-gray-400">
                  Discover the hottest tokens in real-time with community-driven insights
                </p>
              </div>
              <div className="p-6 bg-surface rounded-lg">
                <div className="text-3xl mb-4">👁️</div>
                <h3 className="text-xl font-semibold mb-2">Whale Tracking</h3>
                <p className="text-gray-400">
                  Monitor large wallet movements and trading patterns
                </p>
              </div>
              <div className="p-6 bg-surface rounded-lg">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-gray-400">
                  Get detailed analytics and market insights for informed decisions
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Live Stats Section */}
        <section className="py-12 bg-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Live Platform Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-500">24,567</div>
                <div className="text-gray-400 mt-2">Tracked Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-500">1,234</div>
                <div className="text-gray-400 mt-2">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-500">45.2K</div>
                <div className="text-gray-400 mt-2">Daily Votes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-500">789</div>
                <div className="text-gray-400 mt-2">Tracked Wallets</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }