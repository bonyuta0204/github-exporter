import { parseArgv, generateHelpMessage } from '../src/cli'

describe('parseArgv', () => {
  let consoleLogSpy
  let consoleErrorSpy

  beforeEach(() => {
    consoleLogSpy = spyOn(console, 'log')
    consoleErrorSpy = spyOn(console, 'error')
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

  it('should return correct RunOptions for valid arguments', () => {
    const argv = [
      '--repo',
      'owner/repo',
      '--dist',
      'path/to/dist',
      '--limit',
      '10'
    ]
    expect(parseArgv(argv)).toEqual({
      owner: 'owner',
      repo: 'repo',
      path: 'path/to/dist',
      limit: 10
    })
  })

  it('should raise error when limit is not a valid number', () => {
    const result = parseArgv([
      '--repo',
      'owner/repo',
      '--dist',
      'path/to/dist',
      '--limit',
      '1AA'
    ])
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error: limit must be a valid number'
    )
    expect(result).toBeUndefined()
  })

  it('should return correct RunOptions without limit', () => {
    const argv = ['--repo', 'owner/repo', '--dist', 'path/to/dist']
    expect(parseArgv(argv)).toEqual({
      owner: 'owner',
      repo: 'repo',
      path: 'path/to/dist',
      limit: undefined
    })
  })
})
