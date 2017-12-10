const fs = require('fs-extra');
const glob = require('glob');

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
        // Remove all external scripts
        ).replace(/<script src="[^"]+?"><\/script>/g, '');
        data = data.replace(/<script src="[^"]+?"><\/script>/g, '');
        // Add js/bundle.js script at the end of body
        let idx = data.search('</body>');
        data = `${ data.slice(0, idx) }<script src="js/bundle.js"></script>\n` +
            `${ data.slice(idx) }`;
        fs.writeFile(`${ dist }/index.html`, data)
            .then(() => console.log('Copied and modified index.html'))
            .catch(err => console.log(err));
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
fs.copy(`${ src }/js-min/bundle.js`, `${ dist }/js/bundle.js`)
    .then(() => console.log('Copied js'))
    .catch(err => console.log(err));
