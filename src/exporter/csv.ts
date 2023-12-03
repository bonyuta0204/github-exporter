import { createObjectCsvWriter } from 'csv-writer'
import { nonNullable } from '../utils'

export type PullRequestInfo = {
  id: string
  authorName?: string
  number: number
  closed: boolean
  title: string
  changedFiles: number
  merged: boolean
  mergedAt: string
  state: string
  additions: number
  deletions: number
}

/**
 * Export pull requests to CSV
 *
 * @param {string} path - Path to export CSV file
 * @param {PullRequestInfo[]} pulls - Pull requests to export
 */
export async function exportPullRequests(
  path: string,
  pulls: PullRequestInfo[]
) {
  const csvWriter = createObjectCsvWriter({
    path: path,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'authorName', title: 'Author Name' },
      { id: 'number', title: 'Number' },
      { id: 'closed', title: 'Closed' },
      { id: 'title', title: 'Title' },
      { id: 'changedFiles', title: 'Changed Files' },
      { id: 'merged', title: 'Merged' },
      { id: 'mergedAt', title: 'Merged At' },
      { id: 'state', title: 'State' },
      { id: 'additions', title: 'Additions' },
      { id: 'deletions', title: 'Deletions' }
    ]
  })

  await csvWriter.writeRecords(pulls.filter(nonNullable))
  console.log('CSV file was written successfully')
}
