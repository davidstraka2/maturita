/* Tento modul má na starost minifikaci HTML */

const minifier = require('html-minifier').minify;

const minifierOptions = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
};

const minify = html => minifier(html, minifierOptions);

exports.minify = minify;
