const autoprefixer = require('autoprefixer');
const fs = require('fs-extra');
const globby = require('globby');
const postcss = require('postcss');

const prefix = () => globby('./src/styles/parts/**/*.{css,scss}')
    .then(files => {
        const IOObjs = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'styles/parts/',
                    'styles/_parts-prefixed/',
                ),
            }
        ));
        IOObjs.forEach(file => fs.readFile(file.inFile, 'utf-8')
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

const emptyAndPrefix = () => fs.emptyDir('./src/styles/_parts-prefixed/')
    .then(() => {
        console.log('Emptied ./src/styles/_parts-prefixed/');
        prefix();
    }).catch(err => console.log(err));

emptyAndPrefix();
