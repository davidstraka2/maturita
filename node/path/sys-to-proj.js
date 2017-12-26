/*

Input: full absolute system path
Output: path from project root

Example: sysToProj('C:/.../src/index.html') -> src/index.html

*/

exports.sysToProj = path => {
    const cwd = process.cwd();
    path = path.replace(/\\/g, '/');
    path = path.slice(path.indexOf(cwd) + cwd.length + 2);
    return path;
};
