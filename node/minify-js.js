/* Tento skript se stará o minifikaci JavaScriptu */

const fs = require('fs-extra');
const globby = require('globby');
const uglify = require('uglify-es');

class Cfg {
    constructor(map, outFileName) {
        this.compress = true;
        this.mangle = true;
        this.sourceMap = {
            content: map,
            filename: outFileName,
            url: `${ outFileName }.map`,
        };
        this.toplevel = true;
    }
}

const minify = (js, map, outFile) => uglify.minify(js, new Cfg(map, outFile
    .slice(outFile.lastIndexOf('/') + 1)));

const minifyFiles = () => globby('./src/scripts/_bundle/**/*.js')
    .then(files => {
        const IOObjs = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'src/scripts/_bundle/',
                    'src/scripts/_out/',
                ),
            }
        ));
        IOObjs.forEach(file => {
            try {
                const js = fs.readFileSync(file.inFile, 'utf-8');
                const map = fs.readFileSync(`${ file.inFile }.map`, 'utf-8');
                const result = minify(js, map, file.outFile);
                fs.outputFile(file.outFile, result.code)
                    .then(() => console.log(`Minified ${ file.inFile } to ${
                        file.outFile }`))
                    .catch(err => console.log(err));
                fs.outputFile(`${ file.outFile }.map`, result.map)
                    .then(() => console.log(`Written map for ${ file
                        .outFile } to ${ file.outFile }.map`))
                    .catch(err => console.log(err));
            } catch (err) {
                console.log(err);
            }
        });
    }).catch(err => console.log(err));

const emptyAndMinify = () => fs.emptyDir('./src/scripts/_out/')
    .then(() => {
        console.log('Emptied ./src/scripts/_out/');
        minifyFiles();
    }).catch(err => console.log(err));

emptyAndMinify();
