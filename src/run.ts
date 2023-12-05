import { exportPullRequests } from './exporter/csv'
import { getClient } from './github/client'

import { getPullRequestStats } from './github/pulls'
import { nonNullable } from './utils'

export type RunOptions = {
  owner: string
  repo: string
  /** destination of CSV. when it is empty, write to STDOUT */
  path?: string
  limit?: number
}

export async function run(options: RunOptions) {
  const client = getClient()

  const pulls = await getPullRequestStats(
    client,
    options.owner,
    options.repo,
    options.limit
  )

  if (!pulls) return

  exportPullRequests(
    pulls.filter(nonNullable).map((pull) => {
      return {
        id: pull.id,
        authorName: pull.author?.login,
        number: pull.number,
        closed: pull.closed,
        title: pull.title,
        changedFiles: pull.changedFiles,
        merged: pull.merged,
        mergedAt: pull.mergedAt,
        state: pull.state,
        additions: pull.additions,
        deletions: pull.deletions
      }
    }),
    options.path
  )
}
