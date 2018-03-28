/* Tento modul má na starost tvorbu souboru .gitignore pro složku s produkční
    verzí webu */

const fs = require('fs-extra');

const patts = [
    '[Tt]humbs.db',
    '.vscode/',
    'tempCodeRunnerFile',
];

const buildAndWrite = outFile => fs.outputFile(outFile, patts.join('\n'))
    .then(() => console.log(`Written .gitignore to ${ outFile }`))
    .catch(err => console.log(err));

exports.write = buildAndWrite;
