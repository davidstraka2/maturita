const cjs = require('rollup-plugin-commonjs');
const fs = require('fs-extra');
const glob = require('glob');
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');
const sourcemaps = require('rollup-plugin-sourcemaps');

const cwd = process.cwd();
const src = `${ cwd }/src`;

const build = async(inCfg, outCfg) => {
    const bundle = await rollup.rollup(inCfg);
    await bundle.write(outCfg);
    console.log(`Bundled ${ inCfg.input }`);
};

// Empty src/scripts/_bundle/
fs.emptyDir(`${ src }/scripts/_bundle/`)
    .then(() => console.log('Emptied src/scripts/_bundle/'))
    .catch(err => console.log(err));

// Find all js files in src/scripts/_main-babel/ and bundle them w/ Rollup
glob(`${ src }/scripts/_main-babel/**/*.js`, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            const outFile = file.replace(
                'src/scripts/_main-babel/',
                'src/scripts/_bundle/',
            );
            build(
                {
                    input: file,
                    plugins: [
                        resolve({
                            jsnext: true,
                            main: true,
                            browser: true,
                        }),
                        cjs(),
                        sourcemaps(),                        
                    ],
                },
                {
                    file: outFile,
                    format: 'iife',
                    sourcemap: true,
                    sourcemapFile: outFile.concat('.map'),
                },
            );
        });
    }
});
