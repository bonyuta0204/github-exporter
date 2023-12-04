import minimist from "minimist"
import { RunOptions } from "./run"

export function parseArgv(argv: string[]): RunOptions {
  const args = minimist(argv)
  const repo = args.repo
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
    path: args.dist
  }
}
