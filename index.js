const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

app.set('view engine', 'pug');
app.set('views', './views');

//db demo
const adapter = new FileSync('db.json')
const db = low(adapter)

const originalTask = [
    {
        name: 'di hoc',
        status: 'done',
    },
    {
        name: 'di lam',
        status: 'not ready'
    }
]

db.defaults({ tasks: originalTask, user: {} })
    .write();

let AllTasks = db.get('tasks').value();
let CurrentTasks = AllTasks;

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
    CurrentTasks = AllTask.filter(element => element.name.includes(keyword, 0))
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
    db.get('tasks')
        .push({ ...req.body, status: 'not ready' })
        .write()

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