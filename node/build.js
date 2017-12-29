const fs = require('fs-extra');
const globby = require('globby');

const buildCSS = require('./parts/build-css').process;
const buildHTML = require('./parts/build-html').process;
const buildJS = require('./parts/build-js').process;
const makeGitignore = require('./parts/build-gitignore').write;

const distId = Date.now().toString(36);

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
