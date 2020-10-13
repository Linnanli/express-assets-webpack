const path = require('path')

exports.config = {
    assetsRoot: path.resolve(process.cwd(), 'dist/client'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
}