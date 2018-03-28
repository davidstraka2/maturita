/* Tento skript vyprazdňuje před preprocesí a minifikací složku pro CSS
    zpracované Node-sass */

const fs = require('fs-extra');

const empty = () => fs.emptyDir('./src/styles/_out/')
    .then(() => console.log('Emptied ./src/styles/_out/'))
    .catch(err => console.log(err));

empty();
