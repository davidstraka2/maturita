const fs = require('fs-extra');
const glob = require('glob');
const globby = require('globby');

const longPath = require('./path/proj-to-sys').projToSys;
const {minify} = require('./minify-html');

const cwd = process.cwd();
const distId = Date.now().toString(36);
const dist = `${ cwd }/dist/${ distId }`;
const src = `${ cwd }/src`;

// Create new dist dir
try {
    fs.ensureDirSync(dist);
    console.log(`Created ${ dist }`);
} catch (err) {
    console.log(err);
}

// .gitignore
fs.outputFile(
    `${ dist }/.gitignore`,
    '[Tt]humbs.db\n' +
    '.vscode/\n' +
    'tempCodeRunnerFile\n',
).then(() => console.log('Created .gitignore'))
    .catch(err => console.log(err));

// LICENSE
fs.copy(`${ cwd }/LICENSE`, `${ dist }/LICENSE`)
    .then(() => console.log('Copied LICENSE'))
    .catch(err => console.log(err));

// index.html
fs.readFile(`${ src }/index.html`, 'utf-8')
    .then(data => {
        // Replace stylesheet links w/ styles/_out/* href with css/* href
        data = data.replace(
            /<link rel="stylesheet" href="styles\/_out\/[^"]+?">/g,
            match => {
                let patt = 'href="styles/_out/';
                let idx = match.search(patt);
                match = `${ match.slice(0, idx) }href="css/${ match.slice(idx +
                    patt.length) }`;
                return match;
            },
        // Replace scripts w/ scripts/_main/* src with js/* src
        ).replace(
            /<script src="[^"]+?">/g,
            match => {
                let patt = 'src="scripts/_bundle/';
                let idx = match.search(patt);
                match = `${ match.slice(0, idx) }src="js/${ match.slice(idx +
                    patt.length) }`;
                return match;
            },
        );
        console.log('Modified ./src/index.html contents (shadow)');
        minify([{
            content: data,
            outputFile: `./dist/${ distId }/index.html`,
        }]);
    }).catch(err => console.log(err));

// css
glob(`${ src }/styles/_out/**/*.css`, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => fs.readFile(file, 'utf-8')
            .then(data => {
                // Remove last line of css file (assumed source map link)
                data = data.split('\n');
                data.pop();
                data = data.join('\n');
                // Resolve output file path
                let patt = 'src/styles/_out/';
                let outFile = file.slice(file.search(patt) + patt.length);
                outFile = `${ dist }/css/${ outFile }`;
                fs.outputFile(outFile, data)
                    .then(() => console.log('Copied and modified css'))
                    .catch(err2 => console.log(err2));
            }).catch(err3 => console.log(err3)));
    }
});

// js
globby(`${ longPath() }src/scripts/_out/**/*.js`)
    .then(files => files.forEach(file => fs.readFile(file, 'utf-8')
        .then(content => {
            fs.outputFile(
                file.replace('src/scripts/_out/', `dist/${ distId }/js/`),
                content.slice(0, content.lastIndexOf('\n')),
            ).then(() => console.log(`Copied and modified ${ file }`))
                .catch(err3 => console.log(err3));
        })
        .catch(err2 => console.log(err2))))
    .catch(err => console.log(err));
