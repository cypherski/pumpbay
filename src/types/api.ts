// src/types/api.ts
import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export type ApiResponse<T> = {
  data?: T
  error?: string
  status: number
}