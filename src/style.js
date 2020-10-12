const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.addStyleLoader = function (config) {
    console.log(config.mode)
    if (config.mode === 'production') {
        config.module.rules.push({
            test: /\.(scss|sass)$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: config.output.publicPath
                }
            )
        })

        config.plugins.push(
            new ExtractTextPlugin({
                allChunks: true,
                filename: '[name].css'
            })
        )
    } else {
        config.module.rules.push({
            test: /\.(scss|sass)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        })
    }
}
