/*

Input: path from project root
Output: full absolute system path

Example: projToSys('src/index.html') -> C:/.../src/index.html

*/

exports.projToSys = path => {
    let cwd = process.cwd().replace(/\\/g, '/').concat('/');
    if (typeof path !== 'undefined')
        cwd += path;
    return cwd;
};
