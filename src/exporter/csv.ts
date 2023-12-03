import { createObjectCsvStringifier } from 'csv-writer'
import { nonNullable } from '../utils'
import { writeFile } from 'fs/promises'

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
  pulls: PullRequestInfo[],
  path?: string
) {
  const csvStringifier = createObjectCsvStringifier({
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

  const csvString =
    csvStringifier.getHeaderString() +
    csvStringifier.stringifyRecords(pulls.filter(nonNullable))

  /** write CSV string to destination path */
  if (path) {
    await writeFile(path, csvString)
  } else {
    process.stdout.write(csvString)
  }
  console.log('CSV file was written successfully')
}
