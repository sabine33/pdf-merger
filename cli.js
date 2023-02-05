#!/usr/bin/env node
const pdfMerger = require("./pdf");
const {
    getFilesInsideFolder,
    sortFiles,
    createFullPath,
    createFileObjectFromFileNames,
} = require("./fsUtils");

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
    demandCommand().
    argv;

(async () => {
    let filesList = [];
    //If folder argument is given.
    if (argv.folder) {
        //Get list of files inside a folder.
        filesList = getFilesInsideFolder(argv.folder);
        //Create full path for folder names
        filesList = createFullPath({ folderName: argv.folder, files: filesList });
        //Sort files based on alphanumeric order.
        filesList = sortFiles(filesList);
    }
    //If files argument is given.
    if (argv.files.length > 0) {
        filesList = argv.files;
    }
    //create file object from file names
    filesList = createFileObjectFromFileNames(filesList)

    console.table(filesList)
    //if output args is empty: default output file.
    let outputFile = argv.output || "output.pdf";
    if (filesList.length < 1) {
        console.log("Empty files list.");
        return;
    }

    await pdfMerger({ files: filesList, outputFile });
})();
