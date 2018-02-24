const fs = require('fs-extra');
const globby = require('globby');
const jimp = require('jimp');

const makeThumbs = () => globby('./src/assets/pics/**/*')
    .then(files => {
        const IOObjs = files.map(file => (
            {
                inFile: file,
                outFile: file.replace(
                    'src/assets/pics/',
                    'src/assets/pics-thumbs/',
                ),
            }
        ));
        IOObjs.forEach(file => jimp
            .read(file.inFile)
            .then(img => {
                if (img.bitmap.width > img.bitmap.height)
                    img.resize(jimp.AUTO, 32);
                else
                    img.resize(32, jimp.AUTO);
                img.quality(50);
                img.write(file.outFile);
                console.log(`Written thumbnail of ${ file.inFile } to ${ file
                    .outFile }`);
            }).catch(err => console.log(err)));
    }).catch(err => console.log(err));

const emptyAndThumbs = () => fs.emptyDir('./src/assets/pics-thumbs/')
    .then(() => {
        console.log('Emptied ./src/assets/pics-thumbs/');
        makeThumbs();
    }).catch(err => console.log(err));

emptyAndThumbs();
