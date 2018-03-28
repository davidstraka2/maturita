/* Tento skript vyprazdňuje před transpilací složku pro JavaScriptové soubory
    transpilované Babelem */

const fs = require('fs-extra');

const empty = () => fs.emptyDir('./src/scripts/_main-babel/')
    .then(() => console.log('Emptied ./src/scripts/_main-babel/'))
    .catch(err => console.log(err));

empty();
