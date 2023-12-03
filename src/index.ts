import { run, RunOptions } from './run'
import minimist, { ParsedArgs } from 'minimist'

const argv = minimist(process.argv.slice(2))

function parseArgv(argv: ParsedArgs): RunOptions {
  const repo = argv.repo
  if (!repo) {
    throw new Error('repo is required')
  }

  const splitted = repo.split('/')

  if (!splitted || splitted.length !== 2) {
    throw new Error('repo must be in the format of owner/repo')
  }

  return {
    owner: splitted[0],
    repo: splitted[1],
    path: argv.dist
  }
}

run(parseArgv(argv))
