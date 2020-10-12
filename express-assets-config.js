const path = require('path')

module.exports = (config) => {
    return {
        ...config,
        context: path.resolve(__dirname, './example/client/views')
    }
}