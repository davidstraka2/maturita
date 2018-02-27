const globby = require('globby');
const guetzli = require('imagemin-guetzli');
const imagemin = require('imagemin');
const jimp = require('jimp');

const optimize = (inFile, outFile, outDir) => imagemin([outFile], outDir, {
    use: [
        guetzli({quality: 85}),
    ],
}).then(() => console.log(`Optimized ${ inFile } to ${ outFile }`))
    .catch(err => console.log(err));

const downsize = (inFile, outFile, maxHeight, maxWidth, callback) => jimp
    .read(inFile)
    .then(img => {
        if (img.bitmap.height > img.bitmap.width)
            img.resize(maxWidth, jimp.AUTO);
        else
            img.resize(jimp.AUTO, maxHeight);
        img.write(outFile, callback);
    }).catch(err => console.log(err));

const go = cfg => globby(cfg.input)
    .then(files => files.forEach(file => {
        const outFile = cfg.getOutput(file);
        downsize(file, outFile, cfg.maxHeight, cfg.maxWidth, optimize
            .bind(null, file, outFile, cfg.getOutputDir(outFile)));
    })).catch(err => console.log(err));

go({
    input: './node/optimize-jpeg/input/**/*.{jpg,jpeg}',
    maxHeight: 1080,
    maxWidth: 1920,
    getOutput: filepath => filepath.replace('input', 'output'),
    getOutputDir: filepath => filepath.substr(0, filepath.lastIndexOf('/')),
});
