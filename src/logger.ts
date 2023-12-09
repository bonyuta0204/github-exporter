import { Writable } from 'stream'

interface Logger {
  log: (message: string) => void
  error: (message: string) => void
}

export const logger: Logger = (() => {
  const output: Writable = process.stdout.isTTY
    ? process.stdout
    : process.stderr

  return {
    log: (message: string) => {
      output.write(message)
    },
    error: (message: string) => {
      process.stderr.write(message)
    }
  }
})()
