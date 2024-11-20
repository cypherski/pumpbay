// src/tests/api/trending.test.ts
import { createMocks } from 'node-mocks-http'
import { GET } from '@/app/api/trending/bay/tokens/route'

describe('Trending API', () => {
  it('returns trending tokens', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await GET(req)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(Array.isArray(data)).toBe(true)
  })
})