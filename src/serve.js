const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

exports.serve = function (config) {
    const compiler = webpack(config)
    const devServerOptions = Object.assign({}, config.devServer)

    const server = new WebpackDevServer(compiler, devServerOptions)

    server.listen(devServerOptions.port, devServerOptions.host, function () {
        console.log(`> Starting server on http://localhost:${devServerOptions.port}`)
    })
}