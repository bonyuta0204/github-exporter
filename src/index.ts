import { parseArgv } from './cli'
import { run, RunOptions } from './run'

run(parseArgv(process.argv.slice(2)))
