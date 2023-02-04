const PDFMerger = require("pdf-merger-js");
const fs = require("fs");
const path = require("path");

const EXTENSION = ".pdf";

/**
 * Get files inside a particular folder.
 * @param {string} folderPath 
 * @returns 
 */
const getFilesInsideFolder = (folderPath) => {
    try {
        let filesInsideFolder = fs.readdirSync(folderPath);
        let pdfOnlyFiles = filesInsideFolder.filter(
            (file) => path.extname(file) == EXTENSION
        );
        console.log(pdfOnlyFiles);
        return pdfOnlyFiles;
    } catch (ex) {
        console.error("Unable to read the given directory.");
        return [];
    }
};

/**
 * Sort the files based on alphanumeric flag.
 * @param {string[]} files 
 * @returns 
 */
const sortFiles = (files) => {
    return [...files].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
};
/**
 * Returns full path for files.
 * @param {string} folderName
 * @param {string[]} files 
 * @returns {string[]} Full path file names
 */
const createFullPath = ({ folderName, files }) => {
    return files.map((filename) => path.join(folderName, filename));
};

/**
 * Merges the pdfs into a output file.
 * @param {string} Folder Name
 * @param {string} Output file path 
 */
module.exports = async ({ folderName, outputFile }) => {
    const merger = new PDFMerger();

    try {
        let files = getFilesInsideFolder(folderName);
        files = createFullPath({ folderName, files });
        files = sortFiles(files);

        for (let file of files) {
            await merger.add(file);
        }

        await merger.save(outputFile);
    } catch (ex) {
        console.log("Unable to generate output file.");
        console.trace(ex);
    }
};
