const globby = require('globby');
const guetzli = require('imagemin-guetzli');
const imagemin = require('imagemin');
const jimp = require('jimp');

const aspectRatio = (a, b) => {
    const gcd_ = gcd(a, b);
    return [a / gcd_, b / gcd_];
};

// Greatest common divisor
const gcd = (numerator, denominator) => denominator ? gcd(denominator,
    numerator % denominator) : numerator;

const lowerRes = (inFile, outFile, maxRes, callback) => jimp.read(inFile)
    .then(img => {
        const targetWidth = scaleDown(
            [img.bitmap.width, img.bitmap.height],
            maxRes,
        );
        img.resize(targetWidth, jimp.AUTO);
        img.write(outFile, callback);
    }).catch(err => console.log(err));

const optimize = (inFile, outFile, outDir) => imagemin([outFile], outDir, {
    use: [
        guetzli({quality: 85}),
    ],
}).then(() => console.log(`Optimized ${ inFile } to ${ outFile }`))
    .catch(err => console.log(err));

const scaleDown = (dimensions, maxRes) => {
    if (dimensions[0] * dimensions[1] < maxRes)
        return dimensions[0];
    const aspectRatio_ = aspectRatio(...dimensions);
    return Math.floor(Math.sqrt(aspectRatio_[0] * maxRes / aspectRatio_[1]));
};

const go = cfg => globby(cfg.input)
    .then(files => files.forEach(file => {
        const outFile = cfg.getOutput(file);
        lowerRes(
            file, outFile, cfg.maxRes,
            optimize.bind(null, file, outFile, cfg.getOutputDir(outFile)),
        );
    })).catch(err => console.log(err));

go({
    input: './node/optimize-jpeg/input/**/*.{jpg,jpeg}',
    maxRes: 1920 * 1080,
    getOutput: filepath => filepath.replace('input', 'output'),
    getOutputDir: filepath => filepath.substr(0, filepath.lastIndexOf('/')),
});
