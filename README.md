# GitHub Exporter
![npm](https://img.shields.io/npm/v/%40bonyuta0204%2Fgithub-exporter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test](https://github.com/bonyuta0204/github-exporter/actions/workflows/test.yml/badge.svg)](https://github.com/bonyuta0204/github-exporter/actions/workflows/test.yml)



## Introduction
GitHub Exporter is a command-line tool written in TypeScript, designed to export GitHub repository information into a CSV format. It allows users to extract detailed data about pull requests, including author details, pull request numbers, status, and more.

## Features
- Export pull request information from GitHub repositories.
- Outputs data in a CSV format.
- Customizable export destination.

## Installation
Before installing GitHub Exporter, ensure you have Node.js installed on your system.

To install GitHub Exporter, clone the repository and install its dependencies:

```bash
npm install -g @bonyuta0204/github-exporter
```

## Environment Setup

To use GitHub Exporter, you must set the GITHUB_TOKEN environment variable with your GitHub personal access token. This token is used to authenticate with the GitHub API.

You can set the GITHUB_TOKEN by running:
```sh
export GITHUB_TOKEN='your_github_token_here'
```
Replace your_github_token_here with your actual GitHub personal access token.


## Usage
To use GitHub Exporter, run the command-line interface with the required arguments:

```bash
ghex --repo <owner/repo> [--dist <path>] [--limit <number>]
```

- `--repo`: The GitHub repository in the format `owner/repo`.
- `--dist`: (Optional) The destination path for the exported CSV. If not specified, the output will be written to STDOUT.
- `--limit`: (Optional) The number of pull requests to export. If not specified, all pull requests will be exported.


## Contributing
Contributions are welcome. Please feel free to fork the repository, make changes, and submit pull requests.

## License
This project is licensed under the MIT License.

## Issues
For any bugs or feature requests, please open an issue on the [GitHub issues page](https://github.com/bonyuta0204/github-exporter/issues).

## Author
Yuta Nakamura (nakamurayuta0204@gmail.com)

