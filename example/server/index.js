const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'html')
app.set('views', path.join(process.cwd(), 'dist/client'))
app.engine('html', require('hbs').__express);

const server = app.listen(3000)

require('../../src/index')(app, server)

app.use('/home', (req, res) => {
    res.render('home', {
        message: 'home page'
    })
})

app.use('/', (req, res) => {
    res.render('index', {
        message: 'index page'
    })
})