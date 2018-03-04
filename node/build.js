const fs = require('fs-extra');
const globby = require('globby');

const buildCSS = require('./parts/build-css').process;
const buildHTML = require('./parts/build-html').process;
const buildJS = require('./parts/build-js').process;
const makeGitignore = require('./parts/build-gitignore').write;

const distId = Date.now().toString(36);

const assets = () => {
    fs.ensureDirSync(`./dist/${ distId }/assets/`);
    fs.copy('./src/assets/pics/', `./dist/${ distId }/assets/pics/`)
        .then(() => console.log(
            `Copied ./src/assets/pics/ to ./dist/${ distId }/assets/pics/`,
        )).catch(err => console.log(err));
    fs.copy(
        './src/assets/svg-sprites/',
        `./dist/${ distId }/assets/svg-sprites/`,
    ).then(console.log(
        `Copied ./src/assets/svg-sprites/ to ./dist/${
            distId }/assets/svg-sprites/`,
    )).catch(err => console.log(err));
};

const css = () => globby('./src/styles/_out/**/*.css')
    .then(files => {
        files = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'src/styles/_out/',
                    `dist/${ distId }/css/`,
                ),
            }
        ));
        buildCSS(files);
    }).catch(err => console.log(err));

const gitignore = () => makeGitignore(`./dist/${ distId }/.gitignore`);

const html = () => globby('./src/**/*.html')
    .then(files => {
        files = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'src/',
                    `dist/${ distId }/`,
                ),
            }
        ));
        buildHTML(files);
    }).catch(err => console.log(err));

const js = () => globby('./src/scripts/_out/**/*.js')
    .then(files => {
        files = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'src/scripts/_out/',
                    `dist/${ distId }/js/`,
                ),
            }
        ));
        buildJS(files);
    }).catch(err => console.log(err));

const license = () => fs.copy('./LICENSE', `./dist/${ distId }/LICENSE`)
    .then(() => console.log(`Copied ./LICENSE to ./dist/${ distId }/LICENSE`))
    .catch(err => console.log(err));

const build = () => {
    // Create new dist dir
    try {
        fs.ensureDirSync(`./dist/${ distId }/`);
        console.log(`Created ./dist/${ distId }/`);
        assets();
        license();
        gitignore();
        html();
        css();
        js();
    } catch (err) {
        console.log(err);
    }
};

build();
