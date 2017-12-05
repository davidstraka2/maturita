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
fs.readFile(`${ src }/index.html`, 'utf-8')
    .then(data => {
        data = data.replace(/<script src="[^"]+?"><\/script>/g, '');
        let idx = data.search('</body>');
        data = `${ data.slice(0, idx) }<script src="js/bundle.js"></script>\n` +
            `${ data.slice(idx) }`;
        fs.writeFile(`${ dist }/index.html`, data)
            .then(() => console.log('Copied and modified index.html'))
            .catch(err => console.log(err));
    }).catch(err => console.log(err));

// css
fs.copy(`${ src }/css/`, `${ dist }/css/`)
    .then(() => console.log('Copied css'))
    .catch(err => console.log(err));

// js
fs.copy(`${ src }/js-min/bundle.js`, `${ dist }/js/bundle.js`)
    .then(() => console.log('Copied js'))
    .catch(err => console.log(err));
