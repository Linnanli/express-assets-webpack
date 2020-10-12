exports.addStyleLoader = function (config) {
    config.module.rules.push({
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
    })
}
