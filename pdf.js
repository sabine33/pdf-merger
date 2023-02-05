const PDFMerger = require("pdf-merger-js");
const METADATA = {
    producer: "pdfmerge CLI application",
    author: "https://github.com/sabine33/pdf-merger",
}

/**
 * Merges the PDF..
 * @param {Object[]} files - The files to merge.
 * @param {string} files[].path - The name of a file to merge.
 * @param {number[]} files[].pages - The page numbers of a file to merge.
 */
module.exports = async ({ outputFile, files }) => {
    const merger = new PDFMerger();
    await merger.setMetadata(METADATA);
    try {
        for (let file of files) {
            try {
                await merger.add(file.path, file.pages ?? null)
            }
            catch (ex) {
                console.log(`Error adding ${file.path} file. Make sure the page number or file name is correct.`)
            }
        }
        await merger.save(outputFile);
        console.log(`PDF files merged successfully. The output file name is ${outputFile}.`)
    } catch (ex) {
        console.log("Unable to merge PDF. Make sure your input is correct & file exists.");
        console.trace(ex);
    }
};
