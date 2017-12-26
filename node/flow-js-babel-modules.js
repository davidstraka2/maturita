const fs = require('fs-extra');

const cwd = process.cwd();
const src = `${ cwd }/src`;

// Empty src/scripts/_modules-babel/
fs.emptyDir(`${ src }/scripts/_modules-babel/`)
    .then(() => console.log('Emptied src/scripts/_modules-babel/'))
    .catch(err => console.log(err));
