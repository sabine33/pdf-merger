#!/usr/bin/env node
const parser = require("./parser");

const argv =
    // demandCommand().
    require("yargs/yargs")(process.argv.slice(2))
        .usage(
            `
    Use the tool as:
    merge-the-pdfs --folder < foldername > --files < file1 > <file2> --output <outputfile>
    `
        )
        .example(
            `
    merge-the-pdfs  --folder ./pdfs --output filename.pdf
    merge-the-pdfs  --files abc.pdf#1,2 apple.pdf#3,4 --output filename.pdf

    `
        )
        .option("folder", {
            alias: "F",
            describe: "The folder to get contents from.",
            type: "string",
            requiresArg: true,
        })
        .option("output", {
            alias: "o",
            describe: "Output file name or full path.",
            type: "string",
        })
        .option("files", {
            alias: "f",
            describe: "Files to merge.",
            type: "array",
            default: [],
        })
        .help().argv;

(async (argv) => {
    if (!argv || (!argv.files || !argv.folder)) {
        console.log("Please provide at least one source to merge.");
        return;
    }
    await parser(argv);
})(argv);
