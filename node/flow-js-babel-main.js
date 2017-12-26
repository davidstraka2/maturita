const fs = require('fs-extra');

const cwd = process.cwd();
const src = `${ cwd }/src`;

// Empty src/scripts/_main-babel/
fs.emptyDir(`${ src }/scripts/_main-babel/`)
    .then(() => console.log('Emptied src/scripts/_main-babel/'))
    .catch(err => console.log(err));
