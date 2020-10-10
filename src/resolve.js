const glob = require('glob')
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { isFunction } = require('./utils')

const cwd = process.cwd()

function getFiles(context, pattern) {
    return glob.sync(pattern, {
        cwd: context
    })
}

function resolveEntry(options) {
    const files = getFiles(options.entryContext, '**/index.js')
    const entry = {}
    files.forEach((file) => {
        const name = file.match(/.*(?=\/index\.js)/)[0]
        entry[name] = `./${file}`
    })
    return entry
}

function resolveHTMLPlugin(options) {
    const files = getFiles(options.entryContext, '**/index.html')
    const htmlPlugins = []
    files.forEach((file) => {
        const chunksName = file.match(/.*(?=\/index\.html)/)[0]

        htmlPlugins.push(
            new HtmlWebpackPlugin({
                filename: `${chunksName}.html`,
                template: path.resolve(options.entryContext, file),
                inject: 'body',
                hash: true,
                chunks: [chunksName]
            })
        )
    })
    return htmlPlugins
}

function deleteOption(options) {
    delete options.entryContext
}

exports.resolveConfig = function resolveConfig (options) {
    options.entryContext = path.resolve(cwd, options.entryContext)
    options.entry = resolveEntry(options)
    options.plugins = options.plugins.concat(resolveHTMLPlugin(options))
    // console.log(JSON.stringify(options, null, 2))
    deleteOption(options)
}

exports.loadConfig = function loadConfig() {
    const webpackConfig = require('./webpack.config')
    try {
        const confScriptPath = path.resolve(cwd, '.', 'service-static-webpack.js')
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
        console.log(e)
        return webpackConfig
    }
}