const glob = require('glob')
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { isFunction } = require('./utils')

const cwd = process.cwd()

function getFiles(context, pattern) {
    return glob.sync(pattern, {
        cwd: context
    })
}

function resolveEntry(options) {
    const files = getFiles(options.context, '**/index.js')
    const entry = {}
    files.forEach((file) => {
        const name = file.match(/.*(?=\/index\.js)/)[0]
        entry[name] = [`./${file}`]
    })
    return entry
}

function resolveHTMLPlugin(options) {
    const files = getFiles(options.context, '**/index.html')
    const htmlPlugins = []
    files.forEach((file) => {
        const chunksName = file.match(/.*(?=\/index\.html)/)[0]

        const chunks = [chunksName]

        htmlPlugins.push(
            new HtmlWebpackPlugin({
                filename: `${chunksName}.html`,
                template: path.resolve(options.context, file),
                inject: true,
                hash: true,
                chunks
            })
        )
    })
    return htmlPlugins
}

function addPlugins(options) {
    if (options.mode === 'production') {
        options.plugins.push(
            new CleanWebpackPlugin()
        )
    }
}

function addConfigs(options) {
    if (options.mode === 'production') {
        // 添加优化配置，分割代码块
        options.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        minChunks: 1,
                        priority: 1
                    },
                    common: {
                        name: "common",
                        chunks: 'all',
                        priority: 0
                    }
                }
            },
            runtimeChunk: {
                name: entrypoint => `manifest.${entrypoint.name}`
            }
        }
    }
}

exports.resolveConfig = function resolveConfig (options) {
    options.entry = resolveEntry(options)
    options.mode = process.env.NODE_ENV
    options.plugins = options.plugins.concat(resolveHTMLPlugin(options))
    addConfigs(options)
    addPlugins(options)
}

exports.loadConfig = function loadConfig() {
    const webpackConfig = require('./webpack.config')
    try {
        const confScriptPath = path.resolve(cwd, '.', 'express-assets-config.js')
        const fsStat = fs.statSync(confScriptPath)
        if (fsStat.isFile()) {
            const serviceStaticWebpack = require(confScriptPath)
            if (isFunction(serviceStaticWebpack)) {
                const resultConfig = serviceStaticWebpack(webpackConfig)
                return resultConfig ? resultConfig : webpackConfig
            } else {
                return webpackConfig
            }
        } else {
            return webpackConfig
        }
    } catch (e) {
        return webpackConfig
    }
}