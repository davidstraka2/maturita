const fs = require('fs-extra');

const cwd = process.cwd();
const src = `${ cwd }/src`;

fs.emptyDir(`${ src }/js-browser/`)
    .then(() => console.log('Emptied js-browser dir'))
    .catch(err => console.log(err));
