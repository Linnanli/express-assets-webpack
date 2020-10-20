const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { config } = require('./config')

exports.addStyleLoader = function (webpackConfig) {
    if (webpackConfig.mode === 'production') {
        webpackConfig.module.rules.push({
            test: /\.(scss|sass)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader'
            ]
        })

        webpackConfig.plugins.push(
            new MiniCssExtractPlugin({
                filename: `${config.assetsSubDirectory}/css/[name].css`
            })
        )
    } else {
        webpackConfig.module.rules.push({
            test: /\.(scss|sass)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        })
    }
}
