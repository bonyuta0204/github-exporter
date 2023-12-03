import { exportPullRequests } from './exporter/csv'
import { getClient } from './github/client'

import { getPullRequestStats } from './github/pulls'
import { nonNullable } from './utils'

export async function run() {
  const client = getClient()

  const pulls = await getPullRequestStats(
    client,
    'bonyuta0204',
    'github-exporter'
  )

  if (!pulls) return

  exportPullRequests(
    'dist/output.csv',
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
    })
  )
}
