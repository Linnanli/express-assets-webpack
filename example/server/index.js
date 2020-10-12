const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'html')
app.set('views', path.join(process.cwd(), 'dist/client'))
app.engine('html', require('hbs').__express);

require('../../src/index')(app)

app.listen(3000)

app.use('/', (req, res) => {
    res.render('index', {
        message: 'success'
    })
})