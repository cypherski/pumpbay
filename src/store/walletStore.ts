// src/store/walletStore.ts
import { create } from 'zustand'
import { Wallet, Transaction } from '@/types/wallet'

interface WalletStore {
  wallets: Wallet[]
  transactions: Transaction[]
  selectedWallet: string | null
  isLoading: boolean
  error: Error | null
  setWallets: (wallets: Wallet[]) => void
  setTransactions: (transactions: Transaction[]) => void
  setSelectedWallet: (address: string | null) => void
  addTransaction: (transaction: Transaction) => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallets: [],
  transactions: [],
  selectedWallet: null,
  isLoading: false,
  error: null,
  setWallets: (wallets) => set({ wallets }),
  setTransactions: (transactions) => set({ transactions }),
  setSelectedWallet: (address) => set({ selectedWallet: address }),
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  }))
}))