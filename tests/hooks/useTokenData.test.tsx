// src/tests/hooks/useTokenData.test.tsx
import { renderHook, act } from '@testing-library/react-hooks'
import { useTokenData } from '@/hooks/useTokenData'

describe('useTokenData', () => {
  it('fetches and updates token data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => 
      useTokenData('test-token-address')
    )

    expect(result.current.isLoading).toBe(true)
    
    await waitForNextUpdate()
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeTruthy()
  })
})