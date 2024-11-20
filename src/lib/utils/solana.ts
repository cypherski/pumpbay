// src/lib/utils/solana.ts
import { Connection, PublicKey } from '@solana/web3.js'

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)

export async function verifyToken(address: string) {
  try {
    const pubkey = new PublicKey(address)
    const accountInfo = await connection.getAccountInfo(pubkey)

    if (!accountInfo) {
      return {
        isValid: false,
        error: 'Token account not found'
      }
    }

    // Add additional verification logic here

    return {
      isValid: true,
      accountInfo
    }
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid token address'
    }
  }
}