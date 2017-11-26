/* eslint no-console: off */

const fs = require('fs-extra');

const cwd = process.cwd();
const dist = `${ cwd }/dist/${ Date.now().toString(36) }`;
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
fs.copy(`${ src }/index.html`, `${ dist }/index.html`)
    .then(() => console.log('Copied index.html'))
    .catch(err => console.log(err));

// css
fs.copy(`${ src }/css/`, `${ dist }/css/`)
    .then(() => console.log('Copied css'))
    .catch(err => console.log(err));
