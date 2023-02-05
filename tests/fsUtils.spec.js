const {
    getFilesInsideFolder,
    sortFiles,
    createFullPath,
    createFileObjectFromFileNames,
} = require("../fsUtils");

let expected = ['1.pdf', '2.pdf', '3.pdf']


describe('File Utils related tests', () => {
    it('should  return list of files', () => {
        let files = getFilesInsideFolder("./tests/pdfs");
        expect(files).toEqual(expect.arrayContaining(expected));
    });
    it('should sort files correctly', () => {
        let files = getFilesInsideFolder("./tests/pdfs");
        expect(sortFiles(files)).toEqual(expect.arrayContaining(expected));
    })
});
