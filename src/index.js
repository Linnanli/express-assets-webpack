const webpackDevMiddleware = require('webpack-dev-middleware')
const { resolveConfig, loadConfig } = require('./resolve')
const webpack = require('webpack')
const { rewriteFs } = require('./fs')
const { setNodeEnv } = require('./utils')

setNodeEnv('development')

const config = loadConfig()
resolveConfig(config)

module.exports = function (app) {
    const compiler = webpack(config)
    const devServerOptions = Object.assign({}, config.devServer)
    delete devServerOptions.port
    delete devServerOptions.host
    devServerOptions.index = false
    devServerOptions.serverSideRender = true
    app.use(webpackDevMiddleware(compiler, devServerOptions))
    app.use(require('webpack-hot-middleware')(compiler))
    rewriteFs(compiler.outputFileSystem, config)
}
