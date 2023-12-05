import minimist from 'minimist'
import { RunOptions } from './run'

export function generateHelpMessage() {
  return `
  Usage: [command] --repo <owner/repo> [--dist <path>]

  Arguments:
    --repo   Repository in the format of 'owner/repo'.
    --dist   Distribution path (optional).
    --limit  Limit numberfor result (optional).

  Example:
    command --repo owner/repo --dist path/to/dist --limit 100
  `
}

export function parseArgv(argv: string[]): RunOptions | undefined {
  if (argv.length == 0) {
    console.log(generateHelpMessage())
    return
  }

  const args = minimist(argv)

  const repo = args.repo

  if (!repo) {
    console.error('Error: repo is required')
    console.log(generateHelpMessage())
    return
  }

  const splitted = repo.split('/')

  if (!splitted || splitted.length !== 2) {
    console.error('Error: repo must be in the format of owner/repo')
    console.log(generateHelpMessage())
    return
  }

  const limit = args.limit

  if (limit && isNaN(limit)) {
    console.error('Error: limit must be a valid number')
    console.log(generateHelpMessage())
    return
  }

  return {
    owner: splitted[0],
    repo: splitted[1],
    path: args.dist,
    limit: limit ? parseInt(limit) : undefined
  }
}
