const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
const { resolveConfig, loadConfig } = require('./resolve')
const webpack = require('webpack')
const { rewriteFs } = require('./fs')

const config = loadConfig()
resolveConfig(config)

module.exports = function (app) {
    const compiler = webpack(config)
    config.mode = 'development'
    const devServerOptions = Object.assign({}, config.devServer)
    app.use(webpackDevMiddleware(compiler, devServerOptions))
    rewriteFs(compiler.outputFileSystem, config)
}
