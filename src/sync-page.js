const chokidar = require('chokidar')
const path = require('path')
const socketIO = require('socket.io')

let currentSocket = null

exports.syncPage = function (server, config) {
    chokidar.watch('**/*.html', {
        persistent: true,
        ignored: /(^|[\/\\])\../,
        cwd: config.context,
        depth: 1
    }).on('all', (event, path) => {
        if (!currentSocket) return
        if (event === 'change') {
            currentSocket.emit('client_refresh', {
                refresh: true
            })
        }
    })

    const io = socketIO.listen(server)
    io.sockets.on('connection', socket => {
        console.log('socket 已连接')
        currentSocket = socket
        socket.on('disconnect', function () {
            console.log('socket 已断开链接')
        })
    })
}