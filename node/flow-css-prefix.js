const autoprefixer = require('autoprefixer');
const fs = require('fs-extra');
const globby = require('globby');
const postcss = require('postcss');

const prefix = () => globby('./src/styles/parts/**/*.{css,scss}')
    .then(files => {
        files = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'styles/parts/',
                    'styles/_parts-prefixed/',
                ),
            }
        ));
        files.forEach(file => fs.readFile(file.inFile, 'utf-8')
            .then(content => postcss(autoprefixer)
                .process(content, {
                    from: file.inFile,
                    to: file.outFile,
                }).then(output => fs.outputFile(file.outFile, output.css)
                    .then(() => console.log(`Prefixed ${ file.inFile } to ${
                        file.outFile }`))
                    .catch(err => console.log(err))))
            .catch(err => console.log(err)));
    }).catch(err => console.log(err));

const emptyAndPrefix = () => {
    try {
        fs.emptyDirSync('./src/styles/_parts-prefixed/');
        console.log('Emptied ./src/styles/_parts-prefixed/');
        prefix();
    } catch (err) {
        console.log(err);
    }
};

emptyAndPrefix();
