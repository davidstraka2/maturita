const autoprefixer = require('autoprefixer');
const fs = require('fs-extra');
const glob = require('glob');
const postcss = require('postcss');
const postcssImport = require('postcss-import');

const cwd = process.cwd();
const src = `${ cwd }/src`;

// Empty _lib-imports/
fs.emptyDir(`${ src }/styles/_lib-imports/`)
    .then(() => console.log('Emptied src/styles/_lib-imports/'))
    .catch(err => console.log(err));

// Empty _out/
fs.emptyDir(`${ src }/styles/_out/`)
    .then(() => console.log('Emptied src/styles/_out/'))
    .catch(err => console.log(err));

// Empty _parts-prefixed/
fs.emptyDir(`${ src }/styles/_parts-prefixed/`)
    .then(() => console.log('Emptied src/styles/_parts-prefixed/'))
    .catch(err => console.log(err));

// Prefix parts/**/*{.css,.scss} w/ PostCSS Autoprefixer
glob(`${ src }/styles/parts/**/*{.css,.scss}`, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            let outFile = file.replace(
                'styles/parts/',
                'styles/_parts-prefixed/',
            );
            fs.readFile(file, 'utf-8')
                .then(content => postcss(autoprefixer)
                    .process(content, {
                        from: file,
                        to: outFile,
                    }).then(output => fs.outputFile(outFile, output.css)
                        .then(() => console.log(`Prefixed ${ file })`))
                        .catch(err2 => console.log(err2))))
                .catch(err3 => console.log(err3));
        });
    }
});

// Import libs lib/**/*{.css,.scss} w/ PostCSS postcss-import
glob(`${ src }/styles/lib/**/*{.css,.scss}`, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            let outFile = file.replace(
                'src/styles/lib/',
                'src/styles/_lib-imports/',
            );
            fs.readFile(file, 'utf-8')
                .then(content => postcss(postcssImport)
                    .process(content, {
                        from: file,
                        to: outFile,
                    }).then(output => fs.outputFile(outFile, output.css)
                        .then(() => console.log(`Imported libs ${ file })`))
                        .catch(err2 => console.log(err2))))
                .catch(err3 => console.log(err3));
        });
    }
});
