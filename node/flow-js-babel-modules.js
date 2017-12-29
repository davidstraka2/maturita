const fs = require('fs-extra');

const empty = () => fs.emptyDir('./src/scripts/_modules-babel/')
    .then(() => console.log('Emptied ./src/scripts/_modules-babel/'))
    .catch(err => console.log(err));

empty();
