## Description

- A simple CLI app to merge multiple PDF into a single PDF file.

## Installation

```sh
npx pdfmerge --help
```

or

- Clone the repo.
- npm i && npm link
- Open terminal & Enter pdfmerger.

## Usage

```sh
pdfmerge--folder < foldername > --files < file1 > <file2> --output <outputfile>
```

## Example

```sh
pdfmerge --folder ~/Downloads/pdfs --output filename.pdf --files abc.pdf#1,2 apple.pdf#3,4
pdfmerge --output filename.pdf --files abc.pdf#1,2 apple.pdf#3,4

```

## Options

```
      --version  Show version number                                   [boolean]
  -F, --folder   The folder to get contents from.                       [string]
  -o, --output   Output file name or full path.                         [string]
  -f, --files    Files to merge.                           [array] [default: []]
      --help     Show help                                             [boolean]

```

## Todo

- ~~Converting folders at once~~
- ~~Multiple files support~~
- ~~Files with page range support~~
- Merging contents from URL
