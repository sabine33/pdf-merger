const path = require("path");
const fs = require("fs");
const EXTENSION = ".pdf";

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
        return pdfOnlyFiles;
    } catch (ex) {
        console.log(ex);
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

module.exports = { sortFiles, getFilesInsideFolder, createFullPath };
