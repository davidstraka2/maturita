/* Tento skript vyprazdňuje před transpilací složku pro JavaScriptové soubory
    transpilované Babelem */

const fs = require('fs-extra');

const empty = () => fs.emptyDir('./src/scripts/_parts-babel/')
    .then(() => console.log('Emptied ./src/scripts/_parts-babel/'))
    .catch(err => console.log(err));

empty();
