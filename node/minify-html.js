/*

fileIOObject = [
    {
        inputFile: 'file path',
        outputFile: 'file path'
    },
    {
        content: 'html code',
        outputFile: 'file path'
    },
    ...
]

*/

const fs = require('fs-extra');
const minifier = require('html-minifier').minify;

const cfg = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
};

exports.minify = fileIOObject => fileIOObject.forEach(file => {
    let {content} = file;
    if (!content) {
        try {
            content = fs.readFileSync(file.inputFile, 'utf-8');
        } catch (err) {
            console.log(err);
        }
    }
    fs.outputFile(file.outputFile, minifier(content, cfg))
        .then(() => console.log(`Minified ${ file.content ? 'html code' : file
            .inputFile } → ${ file.outputFile }`));
});
