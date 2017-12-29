const fs = require('fs-extra');

fs.emptyDir('./src/scripts/_main-babel/')
    .then(() => console.log('Emptied ./src/scripts/_main-babel/'))
    .catch(err => console.log(err));
