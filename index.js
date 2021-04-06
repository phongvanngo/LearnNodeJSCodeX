const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'pug');
app.set('views', './views');


var taskRoute = require('./routes/task.route');


app.get('/', function (req, res) {
    res.render('index', {
        name: 'AAA'
    })
})

app.get('/home', function (req, res) {
    res.render('./Home/home', {
        name: 'home'
    })
})

app.use('/task', taskRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})