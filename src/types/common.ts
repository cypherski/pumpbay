// src/types/common.ts
export type TimeFrame = '24h' | '7d' | '30d'

export interface PaginationParams {
  page: number
  limit: number
}

export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}