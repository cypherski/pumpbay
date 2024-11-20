// src/pages/api/websocket.ts
import { Server } from 'socket.io'
import { NextApiRequest } from 'next'
import { NextApiResponseWithSocket } from '@/types/api'

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('Client connected')

      socket.on('join-token-room', (tokenId: string) => {
        socket.join(`token-${tokenId}`)
      })

      socket.on('leave-token-room', (tokenId: string) => {
        socket.leave(`token-${tokenId}`)
      })

      socket.on('message', async (data) => {
        // Handle chat messages
        io.emit('message', {
          id: Date.now().toString(),
          content: data.content,
          sender: 'User', // Replace with actual user info
          timestamp: new Date(),
          type: 'text'
        })
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }

  res.end()
}

export default ioHandler