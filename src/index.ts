import { parseArgv } from './cli'
import { run } from './run'

const options = parseArgv(process.argv.slice(2))
if (!options) process.exit(1)
run(options)
