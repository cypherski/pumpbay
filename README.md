# PumpBay

Real-time Solana token analytics and tracking platform.

## Features

- 🔥 Real-time token tracking
- 👁️ Whale wallet monitoring
- 📊 Market analytics
- 💬 Live community discussions
- 🚀 Token submission and verification

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Socket.IO
- Solana Web3.js

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Solana RPC endpoint
- BirdEye API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pumpbay.git
cd pumpbay
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Initialize database
```bash
npx prisma migrate dev
```

5. Start development server
```bash
npm run dev
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.