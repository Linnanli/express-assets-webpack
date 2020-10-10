const path = require('path')

module.exports = (config) => {
    return {
        ...config,
        entryContext: 'example/views',
        context: path.resolve(__dirname, './example/views')
    }
}