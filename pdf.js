const PDFMerger = require("pdf-merger-js");

/**
 * Merges the pdfs into a output file.
 * @param {string} Folder Name
 * @param {string} Output file path 
 */
module.exports = async ({ outputFile, files }) => {
    const merger = new PDFMerger();
    try {
        for (let file of files) {
            await merger.add(file);
        }

        await merger.save(outputFile);
        console.log(`PDF files merged successfully. The output file name is ${outputFile}.`)
    } catch (ex) {
        console.log("Unable to generate output file.");
        console.trace(ex);
    }
};
