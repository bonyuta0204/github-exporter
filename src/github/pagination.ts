type PagingFunction<TItem> = (
  items: TItem[],
  hasNextPage: boolean,
  cursor?: string,
  remainingCount?: number
) => Promise<{
  items: TItem[]
  cursor?: string
  remainingCount?: number
  hasNextPage: boolean
}>

type CursorRequest<TItem> = (
  limit: number,
  cursor?: string
) => Promise<{ items: TItem[]; cursor?: string; hasNext: boolean }>

type BuildPagingFunc = <TItem>(
  fn: CursorRequest<TItem>
) => PagingFunction<TItem>

const DEFAULT_LIMIT = 100

/**
 * An implementation of BuildPagingFunc.
 * This function takes a CursorRequest function and returns a PagingFunction.
 * The PagingFunction recursively fetches data until all pages are retrieved or a certain condition is met.
 * @param fn - A CursorRequest function to fetch data page by page.
 * @returns A PagingFunction that accumulates items from each page and handles pagination logic.
 */
export const buildPagingFunc: BuildPagingFunc = (fn) => {
  const pagingFetch: PagingFunction<
    Awaited<ReturnType<typeof fn>>['items'][number]
  > = async (items, hasNextPage, cursor, remainingCount) => {
    if (!hasNextPage || (remainingCount !== undefined && remainingCount <= 0)) {
      return Promise.resolve({
        items,
        cursor,
        remainingCount,
        hasNextPage
      })
    }

    const limit =
      remainingCount == undefined || remainingCount > DEFAULT_LIMIT
        ? DEFAULT_LIMIT
        : remainingCount

    const response = await fn(limit, cursor)

    return pagingFetch(
      [...items, ...response.items],
      response.hasNext,
      response.cursor,
      remainingCount && remainingCount - response.items.length
    )
  }

  return pagingFetch
}
