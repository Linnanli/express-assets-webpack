const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { resolveConfig, loadConfig } = require('./resolve')
const webpack = require('webpack')
const { rewriteFs } = require('./fs')
const { setNodeEnv } = require('./utils')

setNodeEnv('development')

const config = loadConfig()
resolveConfig(config)

function addHotReplacementClient(config) {
    for (const name in config.entry) {
        config.entry[name].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true')
    }
}

module.exports = function (app) {
    // 补充配置
    addHotReplacementClient(config)
    config.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    const compiler = webpack(config)

    // 添加配置
    const devServerOptions = Object.assign({}, config.devServer)
    delete devServerOptions.port
    delete devServerOptions.host
    devServerOptions.index = false
    devServerOptions.serverSideRender = true

    const hotServerOptions = {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }

    // 设置插件
    app.use(webpackDevMiddleware(compiler, devServerOptions))
    app.use(webpackHotMiddleware(compiler, hotServerOptions))
    rewriteFs(compiler.outputFileSystem, config)
}
