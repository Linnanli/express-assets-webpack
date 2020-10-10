const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
const { resolveConfig, loadConfig } = require('./resolve')
const webpack = require('webpack')
const { rewriteFs } = require('./fs')

const config = loadConfig()
resolveConfig(config)

module.exports = function (app) {
    config.mode = 'development'

    const compiler = webpack(config)
    const devServerOptions = Object.assign({}, config.devServer)
    delete devServerOptions.port
    delete devServerOptions.host
    devServerOptions.index = false
    devServerOptions.serverSideRender = true
    app.use(webpackDevMiddleware(compiler, devServerOptions))
    rewriteFs(compiler.outputFileSystem, config)
}
