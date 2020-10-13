const MiniCssExtractPlugin = require("mini-css-extract-plugin")

exports.addStyleLoader = function (config) {
    console.log(config.mode)
    if (config.mode === 'production') {
        config.module.rules.push({
            test: /\.(scss|sass)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'sass-loader'
            ]
        })

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            })
        )
    } else {
        config.module.rules.push({
            test: /\.(scss|sass)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        })
    }
}
