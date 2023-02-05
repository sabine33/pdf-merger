const parser = require("./parser")

const argv = require("yargs/yargs")(process.argv.slice(2))
    .usage(`
    Use the tool as:
    pdfmerge--folder < foldername > --files < file1 > <file2> --output <outputfile>
    `)
    .example(
        `
    pdfmerge --folder ./pdfs --output filename.pdf
    pdfmerge --files abc.pdf#1,2 apple.pdf#3,4 --output filename.pdf

    `
    )
    .option("folder", {
        alias: "F",
        describe: "The folder to get contents from.",
        type: 'string',
        requiresArg: true
    })
    .option("output", {
        alias: "o",
        describe: "Output file name or full path.",
        type: "string"
    })
    .option("files", {
        alias: "f",
        describe: "Files to merge.",
        type: "array",
        default: []
    })
    // .demandOption(["files"], "Please specify the files to convert")
    .help().
    // demandCommand().
    argv;

(async (argv) => {
    await parser(argv)
})(argv);