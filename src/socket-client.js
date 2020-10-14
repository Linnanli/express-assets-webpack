const io = require('socket.io-client')

const socket = io()

socket.on('client_refresh', (data) => {
    if (data.refresh) {
        console.log('refresh page')
        location.reload()
    }
})