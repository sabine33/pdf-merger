const parser = require("../parser");
const fs = require("fs")

describe('Correctly parses the CLI args.', () => {
    it('should correctly parse cli args.', async () => {
        await parser({
            files: ["./tests/pdfs/1.pdf", "./tests/pdfs/2.pdf"],
            output: "abc.pdf",
        });
        expect(fs.existsSync("abc.pdf")).toBe(true)
    });

    it('If no files are supplied. Should return without merging.', async () => {
        await parser({
            files: [],
            output: "abc.pdf",
        });
        expect(fs.existsSync("abc.pdf")).toBe(true)
    });


});

