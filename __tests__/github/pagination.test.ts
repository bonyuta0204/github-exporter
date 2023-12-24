import { beforeEach } from 'node:test'
import { buildPagingFunc, CursorRequest } from '../../src/github/pagination'

describe('buildPagingFunc', () => {
  const createMockCursorRequest = (
    itemCount: number
  ): CursorRequest<{ id: number }> => {
    const items = Array.from({ length: itemCount }, (_, index) => ({
      id: index
    }))
    return jest.fn(async (limit: number, cursor?: string) => {
      const start = cursor ? parseInt(cursor, 10) : 0
      const end = start + limit
      const paginatedItems = items.slice(start, end)
      return {
        items: paginatedItems,
        cursor: end < items.length ? String(end) : undefined,
        hasNext: end < items.length,
        totalCount: items.length
      }
    })
  }

  const mockProgressFunc = jest.fn()

  beforeEach(() => {
    mockProgressFunc.mockClear()
  })

  it('should fetch all items in multiple calls', async () => {
    const mockCursorRequest = createMockCursorRequest(200)
    const pagingFunc = buildPagingFunc(mockCursorRequest)

    const result = await pagingFunc([], true)

    expect(result.items.length).toBe(200)
    expect(mockCursorRequest).toHaveBeenCalledTimes(2)
    expect(result.hasNextPage).toBe(false)
  })

  it('should stop fetching when remaining count is 0', async () => {
    const mockCursorRequest = createMockCursorRequest(200)
    const pagingFunc = buildPagingFunc(mockCursorRequest)

    const result = await pagingFunc([], true, undefined, 0)

    expect(result.items).toEqual([])
    expect(mockCursorRequest).not.toHaveBeenCalled()
  })

  it('should stop fetching when limit is 150', async () => {
    const mockCursorRequest = createMockCursorRequest(200)
    const pagingFunc = buildPagingFunc(mockCursorRequest)

    const result = await pagingFunc([], true, undefined, 150, mockProgressFunc)

    expect(result.items.length).toEqual(150)
    expect(result.hasNextPage).toBe(true)
    expect(mockProgressFunc).toHaveBeenNthCalledWith(1, {
      currentCount: 100,
      totalCount: 150
    })
    expect(mockProgressFunc).toHaveBeenNthCalledWith(2, {
      currentCount: 150,
      totalCount: 150
    })
  })

  it('should stop fetching when limit is larger than data count', async () => {
    const mockCursorRequest = createMockCursorRequest(150)
    const pagingFunc = buildPagingFunc(mockCursorRequest)

    const result = await pagingFunc([], true, undefined, 200)

    expect(result.items.length).toEqual(150)
    expect(result.hasNextPage).toBe(false)
  })
})
