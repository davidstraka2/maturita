/* Tento skript se stará o tvorbu náhledů obrázků */

const fs = require('fs-extra');
const globby = require('globby');
const jimp = require('jimp');

const makeThumbs = (filePatt, replacePattA, replacePattB) => globby(filePatt)
    .then(files => {
        const IOObjs = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    replacePattA,
                    replacePattB,
                ),
            }
        ));
        IOObjs.forEach(file => jimp
            .read(file.inFile)
            .then(img => {
                // Zmenší velikost a sníží kvalitu obrázku
                if (img.bitmap.width > img.bitmap.height)
                    img.resize(jimp.AUTO, 48);
                else
                    img.resize(48, jimp.AUTO);
                img.quality(20);
                img.write(file.outFile);
                console.log(`Written thumbnail of ${ file.inFile } to ${ file
                    .outFile }`);
            }).catch(err => console.log(err)));
    }).catch(err => console.log(err));

const emptyAndThumbs = () => fs.emptyDir('./src/assets/pics-thumbs/')
    .then(() => {
        console.log('Emptied ./src/assets/pics-thumbs/');
        makeThumbs('./src/assets/pics/**/*', 'src/assets/pics/',
            'src/assets/pics-thumbs/');
    }).catch(err => console.log(err));

const emptyAndThumbsTemplates = () => fs
    .emptyDir('./src/assets/templates/pics-thumbs/')
    .then(() => {
        console.log('Emptied ./src/assets/templates/pics-thumbs/');
        makeThumbs('./src/assets/templates/pics/**/*',
            'src/assets/templates/pics/', 'src/assets/templates/pics-thumbs/');
    }).catch(err => console.log(err));

const go = () => {
    emptyAndThumbs();
    emptyAndThumbsTemplates();
};

go();
