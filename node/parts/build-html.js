/* Tento modul má na starost úpravu HTML cest souborového systému, přímé
    vkládání SVG kódu a přímé vkládání rastrových náhledů obrázků v podobě
    schématu Data URI */

const fs = require('fs-extra');
const datauri = require('datauri').sync;

const {minify} = require('./minify-html');

/* eslint newline-per-chained-call: off */

const processCode = html => html
    .replace(
        // Upraví URL CSS
        new RegExp(
            '(<link data-prod="build" rel="stylesheet" href="[./]*)styles\\/' +
            '_out(\\/[^"]*?">)',
            'g',
        ),
        (match, p1, p2) => `${ p1 }css${ p2 }`,
    ).replace(
        // Nahradí url obrázků Data URI
        /(<img data-prod="build"[^>]*?(?= src=") src=")([^"]*?)("[^>]*?>)/g,
        (match, p1, p2, p3) => p1 + datauri(`./src/${ p2 }`) + p3,
    ).replace(
        // Nahradí prvek object vkládající externě SVG přímo vloženým SVG
        /<object data-prod="build" data="([^"]*?)"([^>]*?)><\/object>/g,
        (match, filepath, attr) => fs
            .readFileSync(`./src/${ filepath }`, 'utf-8')
            .replace(
                new RegExp(
                    '(.|\\n|\\r)*?(?=<svg)<svg' +
                    '(.|\\n|\\r)*?(?=viewBox=)(viewBox="[^"]*?")[^>]*?>' +
                    '((.|\\n|\\r)*?)(?=<\\/svg>)(.|\\n|\\r)*',
                    'g',
                ),
                (matchB, empty, empty2, viewBox, svg) => `<svg ${ attr } ${
                    viewBox }>${ svg }</svg>`,
            ),
    ).replace(
        // Upraví URL JavaScriptu
        /(<script data-prod="build" src="[./]*)scripts\/_out(\/[^>]*?>)/g,
        (match, p1, p2) => `${ p1 }js${ p2 }`,
    ).replace(
        // Odstraní atribut data-prod
        /(<[^>]*?)data-prod="build"([^>]*?>)/g,
        (match, p1, p2) => p1 + p2,
    )
    // Upraví relativní URL aby zahrnovaly složku maturita
    .replace(
        /(<[^>]*?(?= src="\/) src="\/)([^"]*?")/g,
        (match, p1, p2) => `${ p1 }maturita/${ p2 }`,
    ).replace(
        /(<[^>]*?(?= data-src="\/) data-src="\/)([^"]*?")/g,
        (match, p1, p2) => `${ p1 }maturita/${ p2 }`,
    ).replace(
        /(<[^>]*?(?= href="\/) href="\/)([^"]*?")/g,
        (match, p1, p2) => `${ p1 }maturita/${ p2 }`,
    ).replace(
        /(<[^>]*?(?= data="\/) data="\/)([^"]*?")/g,
        (match, p1, p2) => `${ p1 }maturita/${ p2 }`,
    ).replace(
        /(<[^>]*?(?= xlink:href="\/) xlink:href="\/)([^"]*?")/g,
        (match, p1, p2) => `${ p1 }maturita/${ p2 }`,
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
