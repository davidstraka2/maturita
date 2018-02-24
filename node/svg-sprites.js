const fs = require('fs-extra');
const svgstore = require('svgstore');

const getSpritelist = () => {
    try {
        let spritelist = fs.readFileSync('./src/spritelist.json', 'utf-8');
        spritelist = JSON.parse(spritelist);
        return spritelist;
    } catch (err) {
        console.log(err);
    }
};

const makeSpritesheets = () => {
    getSpritelist().forEach(sprites => {
        let spritesheet = svgstore();
        sprites.sprites.forEach(sprite => spritesheet.add(
            sprite.id,
            fs.readFileSync(sprite.path, 'utf-8'),
        ));
        fs
            .outputFile(`./src/assets/svg-sprites/${ sprites.name }.svg`,
                spritesheet)
            .then(() => console.log('Written spritesheet to ' +
                `./src/assets/svg-sprites/${ sprites.name }.svg`))
            .catch(err => console.log(err));
    });
};

const emptyAndSprites = () => fs.emptyDir('./src/assets/svg-sprites/')
    .then(() => {
        makeSpritesheets();
        console.log('Emptied ./src/assets/svg-sprites/');
    }).catch(err => console.log(err));

emptyAndSprites();
