const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
const { resolveConfig, loadConfig } = require('./resolve')
const webpack = require('webpack')
const fs = require('fs')

const config = loadConfig()
resolveConfig(config)

module.exports = function (app) {
    console.log(config)
    const readFile = fs.readFile
    fs.readFile = function () {
        const fileName = arguments[0]
        console.log(111, fileName)
        readFile.apply(this, arguments)
    }

    const compiler = webpack(config)
    const devServerOptions = Object.assign({}, config.devServer)
    app.use(webpackDevMiddleware(compiler, devServerOptions))
}
