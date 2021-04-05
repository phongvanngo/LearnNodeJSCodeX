const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'pug');
app.set('views', './views');


let AllTasks = [
    {
        name: 'di hoc',
        status: 'done',
    },
    {
        name: 'di lam',
        status: 'not ready'
    }
]

let CurrentTasks = AllTasks

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
app.get('/task/search', function (req, res) {
    const keyword = req.query.search ? req.query.search : '';
    CurrentTasks = AllTasks.filter(element => element.name.includes(keyword, 0))
    console.log(CurrentTasks);
    res.render('./Task/Search', {
        AllTasks: CurrentTasks
    })
})
app.get('/task/create', function (req, res) {
    res.render('./Task/Create', {
        AllTasks: AllTasks
    })
})
app.post('/task/create', function (req, res) {
    AllTasks.push({ ...req.body, status: 'not ready' });
    res.redirect('/task/create');
})
app.get('/task', function (req, res) {
    res.render('./Task/Task', {
        AllTasks: AllTasks
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})