/* Tento skript se stará o bundling JavaScriptových modulů */

const cjs = require('rollup-plugin-commonjs');
const fs = require('fs-extra');
const globby = require('globby');
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');
const sourcemaps = require('rollup-plugin-sourcemaps');

class InCfg {
    constructor(inFile) {
        this.input = inFile;
        this.plugins = [
            resolve({
                jsnext: true,
                main: true,
                browser: true,
            }),
            cjs(),
            sourcemaps(),
        ];
    }
}

class OutCfg {
    constructor(outFile) {
        this.file = outFile;
        this.format = 'iife';
        this.sourcemap = true;
        this.sourcemapFile = `${ outFile }.map`;
    }
}

const build = async(inCfg, outCfg) => {
    const bundle = await rollup.rollup(inCfg);
    await bundle.write(outCfg);
    console.log(`Bundled ${ inCfg.input } to ${ outCfg.file }`);
};

const bundle = () => globby('./src/scripts/_main-babel/**/*.js')
    .then(files => {
        const IOObjs = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'src/scripts/_main-babel/',
                    'src/scripts/_bundle/',
                ),
            }
        ));
        IOObjs.forEach(file => build(new InCfg(file.inFile), new OutCfg(file
            .outFile)));
    }).catch(err => console.log(err));

const emptyAndBundle = () => fs.emptyDir('./src/scripts/_bundle/')
    .then(() => {
        console.log('Emptied ./src/scripts/_bundle/');
        bundle();
    }).catch(err => console.log(err));

emptyAndBundle();
