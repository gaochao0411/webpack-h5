const path = require('path');

const resolve =function(...args) {
    return path.join(__dirname, '..', ...args);
};
module.exports = [
    {
        name: 'index',
        path: resolve('src/pages', 'index/index.js'),
        filename: 'index.html',
        template: resolve('src/pages', 'index/index-render.js')
    },
    {
        name: 'activity1',
        path: resolve('src/pages', 'activity1/index.js'),
        filename: 'activity1.html',
        template: resolve('src/pages', 'activity1/index-render.js')
    },
    {
        name: 'activity2',
        path: resolve('src/pages', 'activity1/index.js'),
        filename: 'activity2.html',
        template: resolve('src/pages', 'activity1/index-render.js')
    }
];