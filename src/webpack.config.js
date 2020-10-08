const path = require('path')

const config = {
    assetsRoot: path.resolve(process.cwd(), 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
}

module.exports = {
    context: path.join(process.cwd(), 'client', 'views'),
    entry: {},
    output: {
        path: config.assetsRoot,
        filename: path.join(config.assetsSubDirectory, 'js/[name].js'),
        chunkFilename: path.join(config.assetsSubDirectory, 'js/[name].js'),
        publicPath: config.assetsPublicPath
    },              // 出口文件
    module: {
        
    },              // 处理对应模块
    plugins: [],             // 对应的插件
    devServer: {
        port: 9000,
        host: '127.0.0.1',
        useLocalIp: true
    },           // 开发服务器配置
    mode: 'development'      // 模式配置
}