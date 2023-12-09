import { logger } from '../logger'

type PagingFunction<TItem> = (
  items: TItem[],
  hasNextPage: boolean,
  cursor?: string,
  remainingCount?: number,
  cb?: ProgressCallBack
) => Promise<{
  items: TItem[]
  cursor?: string
  remainingCount?: number
  hasNextPage: boolean
}>

export type ProgressCallBack = (param: {
  totalCount?: number
  currentCount: number
}) => void

export type CursorRequest<TItem> = (
  limit: number,
  cursor?: string
) => Promise<{
  items: TItem[]
  cursor?: string
  hasNext: boolean
  totalCount?: number
}>

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
  > = async (items, hasNextPage, cursor, remainingCount, cb) => {
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

    const newItems = [...items, ...response.items]

    if (cb) {
      let totalCount: number | undefined = undefined
      if (typeof remainingCount === 'number') {
        /** limitCount is number of items user wants to fetch */
        const limitCount = remainingCount + items.length

        /** response.totalCount is actual number of all items */
        if (typeof response.totalCount === 'number') {
          /** we want to smaller one becase actual number of items is the smaller one */
          totalCount = Math.min(limitCount, response.totalCount)
        } else {
          totalCount = limitCount
        }
      } else if (typeof response.totalCount === 'number') {
        totalCount = response.totalCount
      }

      cb({ totalCount: totalCount, currentCount: newItems.length })
    }

    return pagingFetch(
      [...items, ...response.items],
      response.hasNext,
      response.cursor,
      remainingCount && remainingCount - response.items.length,
      cb
    )
  }

  return pagingFetch
}

export const logProgress: ProgressCallBack = ({ totalCount, currentCount }) => {
  if (totalCount) {
    logger.log(`Progress: ${currentCount}/${totalCount}\n`)
  } else {
    console.log(currentCount)
    logger.log(`Progress: ${currentCount}\n`)
  }
}
