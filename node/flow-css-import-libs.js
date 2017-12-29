const fs = require('fs-extra');
const globby = require('globby');
const postcss = require('postcss');
const postcssImport = require('postcss-import');

const importLibs = () => globby('./src/styles/lib/**/*.{css,scss}')
    .then(files => {
        const IOObjs = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'styles/lib/',
                    'styles/_lib-imports/',
                ),
            }
        ));
        IOObjs.forEach(file => fs.readFile(file.inFile, 'utf-8')
            .then(content => postcss(postcssImport)
                .process(content, {
                    from: file.inFile,
                    to: file.outFile,
                }).then(output => fs.outputFile(file.outFile, output.css)
                    .then(() => console.log(`Imported libs ${ file.inFile
                    } to ${ file.outFile }`))
                    .catch(err => console.log(err))))
            .catch(err => console.log(err)));
    }).catch(err => console.log(err));

const emptyAndImport = () => fs.emptyDir('./src/styles/_lib-imports/')
    .then(() => {
        console.log('Emptied ./src/styles/_lib-imports/');
        importLibs();
    }).catch(err => console.log(err));

emptyAndImport();
