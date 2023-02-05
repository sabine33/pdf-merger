const pdfMerger = require("../pdf")
const fs = require("fs")

describe('PDF module', () => {
    it('should merge a pdf files into a output file.', async () => {
        await pdfMerger({
            outputFile: "output.pdf", files: [{
                path: "./pdfs/1.pdf",
                pages: [1]
            },
            {
                path: "./pdfs/2.pdf",
                pages: [1, 2]
            }
            ]
        })
        expect(fs.existsSync("output.pdf")).toBe(true)
    });
});