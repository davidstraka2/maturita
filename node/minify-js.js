const fs = require('fs-extra');
const glob = require('glob');
const uglify = require('uglify-es');

const cwd = process.cwd();
const src = `${ cwd }/src`;

// Empty src/scripts/_out/
fs.emptyDir(`${ src }/scripts/_out/`)
    .then(() => console.log('Emptied src/scripts/_out/'))
    .catch(err => console.log(err));

glob(`${ src }/scripts/_bundle/**/*.js`, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => fs.readFile(file, 'utf-8')
            .then(content => {
                const outFile = file.replace(
                    'src/scripts/_bundle/',
                    'src/scripts/_out/',
                );
                const outFileRelPath = outFile.slice(outFile.lastIndexOf('/') +
                    1);
                const mapRelPath = outFileRelPath.concat('.map');
                const result = uglify.minify(content, {
                    compress: true,
                    mangle: true,
                    sourceMap: {
                        content: fs.readFileSync(`${ file }.map`, 'utf-8'),
                        filename: outFileRelPath,
                        url: mapRelPath,
                    },
                    toplevel: true,
                });
                fs.outputFile(outFile, result.code);
                console.log(`Minified ${ outFile }`);
                fs.outputFile(outFile.concat('.map'), result.map);
                console.log('Created map');
            }).catch(err2 => console.log(err2)));
    }
});
