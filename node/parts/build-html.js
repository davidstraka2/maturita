const fs = require('fs-extra');

const {minify} = require('./minify-html');

const processCode = html => html
    .replace(
        new RegExp(
            '(<link data-prod="build" rel="stylesheet" href="[./]*)styles\\/' +
            '_out(\\/[^"]*?">)',
            'g',
        ),
        (match, p1, p2) => `${ p1 }css${ p2 }`,
    ).replace(
        /(<script data-prod="build" src="[./]*)scripts\/_out(\/[^>]*?>)/g,
        (match, p1, p2) => `${ p1 }js${ p2 }`,
    ).replace(
        /(<[^>]*?)data-prod="build"([^>]*?>)/g,
        (match, p1, p2) => p1 + p2,
    );

const processFiles = IOObjs => IOObjs.forEach(entry => {
    if (entry.content) {
        fs.outputFile(entry.outFile, minify(processCode(entry.content)))
            .then(() => console.log(`Processed and minified HTML code to ${
                entry.outFile }`))
            .catch(err => console.log(err));
    } else {
        fs.readFile(entry.inFile, 'utf-8')
            .then(content => fs.outputFile(entry.outFile, minify(processCode(
                content,
            ))).then(() => console.log(`Processed and minified ${ entry
                .inFile } to ${ entry.outFile }`))
                .catch(err => console.log(err)))
            .catch(err => console.log(err));
    }
});

exports.process = processFiles;
