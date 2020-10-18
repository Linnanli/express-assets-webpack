const path = require('path')
const { addStyleLoader } = require('./style')
const { config } = require('./config')

const outputJsPath = `${config.assetsSubDirectory}/js/[name].js`

const webpackConfig = {
    context: path.join(process.cwd(), 'client', 'views'),
    entry: {},
    output: { // 出口文件
        path: config.assetsRoot,
        filename: outputJsPath,
        chunkFilename: outputJsPath,
        publicPath: config.assetsPublicPath
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.html$/, exclude: /node_modules/, loader: "html-loader" },
            { 
                test: /\.ejs$/, 
                exclude: /node_modules/,
                loader: 'ejs-loader',
                options: {
                    variable: "data"
                }
            }
        ]
    },              // 处理对应模块
    plugins: [],             // 对应的插件
    devServer: {
        port: 9000,
        host: '127.0.0.1',
        publicPath: config.assetsPublicPath,
        quiet: true,
        noInfo: true
    },           // 开发服务器配置
    mode: process.env.NODE_ENV      // 模式配置
}

addStyleLoader(webpackConfig)

module.exports = webpackConfig