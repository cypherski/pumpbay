// src/tests/hooks/useTrending.test.ts
import { renderHook, act } from '@testing-library/react-hooks'
import { useTrending } from '@/hooks/useTrending'

describe('useTrending', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn()
  })

  it('fetches trending tokens successfully', async () => {
    const mockData = [
      { id: '1', symbol: 'TEST1' },
      { id: '2', symbol: 'TEST2' }
    ]

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    const { result, waitForNextUpdate } = renderHook(() => useTrending('bay'))

    expect(result.current.isLoading).toBe(true)
    
    await waitForNextUpdate()
    
    expect(result.current.tokens).toEqual(mockData)
    expect(result.current.isLoading).toBe(false)
  })

  it('handles fetch errors', async () => {
    const error = new Error('Failed to fetch')
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(error)

    const { result, waitForNextUpdate } = renderHook(() => useTrending('bay'))
    
    await waitForNextUpdate()
    
    expect(result.current.error).toBeTruthy()
    expect(result.current.isLoading).toBe(false)
  })
})