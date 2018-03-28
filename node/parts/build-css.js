/* Tento modul má na starost odstranění extra řádku z minifikovaného
    CSS kódu */

const fs = require('fs-extra');

const processCode = css => css.slice(0, css.lastIndexOf('\n'));

const processFiles = IOObjs => IOObjs.forEach(entry => {
    if (entry.content) {
        fs.outputFile(entry.outFile, processCode(entry.content))
            .then(() => console.log(`Processed CSS code to ${ entry.outFile }`))
            .catch(err => console.log(err));
    } else {
        fs.readFile(entry.inFile, 'utf-8')
            .then(content => fs.outputFile(entry.outFile, processCode(content))
                .then(() => console.log(`Processed ${ entry.inFile } to ${ entry
                    .outFile }`))
                .catch(err => console.log(err)))
            .catch(err => console.log(err));
    }
});

exports.process = processFiles;
