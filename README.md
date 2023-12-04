# GitHub Exporter

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
git clone https://github.com/bonyuta0204/github-exporter.git
cd github-exporter
npm install
```

## Usage
To use GitHub Exporter, run the command-line interface with the required arguments:

```bash
ghex --repo <owner/repo> [--dist <path>]
```

- `--repo`: The GitHub repository in the format `owner/repo`.
- `--dist`: (Optional) The destination path for the exported CSV. If not specified, the output will be written to STDOUT.

## Development
For developers looking to contribute or customize:

- **Build**: `npm run build`
- **Linting**: `npm run lint`
- **Formatting**: `npm run format:write`

## Dependencies
GitHub Exporter utilizes several key dependencies:
- Apollo Client
- Google Spreadsheet
- GraphQL
- Minimist
- React

## Contributing
Contributions are welcome. Please feel free to fork the repository, make changes, and submit pull requests.

## License
This project is licensed under the MIT License.

## Issues
For any bugs or feature requests, please open an issue on the [GitHub issues page](https://github.com/bonyuta0204/github-exporter/issues).

## Author
Yuta Nakamura

