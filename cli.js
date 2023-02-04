const pdfMerger = require("./pdf");
const path = require("path");

// pdfmerge --folder ~/Downloads/PDFs --output filename.pdf

/**
 * Displays the default menu.
 */
const displayMenu = () => {
    console.log(`
    Welcome to pdf merger.
    Use this as: 
    pdfmerge --folder ~/Downloads/PDFs --output filename.pdf
    `);
};

/**
 * Returns the value for a argument key .
 * example: if CLI params are --name ram, it returns ram for --name.
 * @param {string[]} args
 * @param {string} key
 * @returns
 */
const getCLIValue = (args, key) => {
    let valueIndex = args.indexOf(key) + 1;
    return args[valueIndex];
};

/**
 * Fetch CLI params from user
 * @param {string[]} args
 * @returns
 */
const fetchCLIParams = (args) => {
    let folderName = "";
    let outputFile = "";
    args.forEach((arg) => {
        switch (arg) {
            case "--folder":
                folderName = getCLIValue(args, arg) || "./pdfs";
                break;
            case "--output":
                outputFile = getCLIValue(args, arg) || "./output.pdf";
                break;
            default:
                break;
        }
    });
    return { folderName, outputFile };
};

/**
 * Returns CLI args
 * @returns {string[]}
 */
const collectCLIargs = () => {
    let args = process.argv.slice(2);
    return args || [];
};

const mergePDF = async ({ outputFile, folderName }) => {
    if (!outputFile) {
        outputFile = path.basename(folderName) + ".pdf";
    }
    console.log({ outputFile, folderName });
    await pdfMerger({ folderName, outputFile: outputFile });
};

/**
 * Performs pdf merge operation based on input args.
 */
(() => {
    let args = collectCLIargs();
    if (args.length < 1) {
        displayMenu();
        return;
    }
    let { folderName, outputFile } = fetchCLIParams(args);
    mergePDF({ folderName, outputFile });
})();
