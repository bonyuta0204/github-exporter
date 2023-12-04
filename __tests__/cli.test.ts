import { parseArgv, generateHelpMessage } from '../src/cli'

import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest'

describe('parseArgv', () => {
  let consoleLogSpy
  let consoleErrorSpy

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log')
    consoleErrorSpy = vi.spyOn(console, 'error')
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  it('should print help message and exit for insufficient arguments', () => {
    const result = parseArgv([])
    expect(consoleLogSpy).toHaveBeenCalledWith(generateHelpMessage())
    expect(result).toBeUndefined()
  })

  it('should throw an error if repo is missing', () => {
    const result = parseArgv(['--dist', 'path/to/dist'])
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: repo is required')
    expect(consoleLogSpy).toHaveBeenCalledWith(generateHelpMessage())
    expect(result).toBeUndefined()
  })

  it('should throw an error if repo is not in the format of owner/repo', () => {
    const result = parseArgv([
      '--repo',
      'invalid-format',
      '--dist',
      'path/to/dist'
    ])
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error: repo must be in the format of owner/repo'
    )
    expect(consoleLogSpy).toHaveBeenCalledWith(generateHelpMessage())
    expect(result).toBeUndefined()
  })

  // Additional valid case test
  it('should return correct RunOptions for valid arguments', () => {
    const argv = ['--repo', 'owner/repo', '--dist', 'path/to/dist']
    expect(parseArgv(argv)).toEqual({
      owner: 'owner',
      repo: 'repo',
      path: 'path/to/dist'
    })
  })
})
