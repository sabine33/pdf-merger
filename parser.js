const pdfMerger = require("./pdf");
const {
    getFilesInsideFolder,
    sortFiles,
    createFullPath,
    createFileObjectFromFileNames,
} = require("./fsUtils");


module.exports = async ({ output, folder, files }) => {
    let filesList = [];
    //If folder argument is given.
    if (folder) {
        //Get list of files inside a folder.
        filesList = getFilesInsideFolder(argv.folder);
        //Create full path for folder names
        filesList = createFullPath({ folderName: folder, files: filesList });
        //Sort files based on alphanumeric order.
        filesList = sortFiles(filesList);
    }
    //If files argument is given.
    if (files.length > 0) {
        filesList = files;
    }
    //create file object from file names
    filesList = createFileObjectFromFileNames(filesList)

    console.table(filesList)
    //if output args is empty: default output file.
    let outputFile = output || "output.pdf";
    if (filesList.length < 1) {
        console.log("Empty files list.");
        return;
    }

    await pdfMerger({ files: filesList, outputFile });
}
