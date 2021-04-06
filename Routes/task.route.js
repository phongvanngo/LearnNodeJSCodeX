var express = require('express');
var router = express.Router();
var db = require('../db');
const shortid = require('shortid');

let AllTasks = db.get('tasks').value();
let CurrentTasks = AllTasks;

router.get('/search', function (req, res) {
    const keyword = req.query.search ? req.query.search : '';
    CurrentTasks = AllTasks.filter(element => element.name.includes(keyword, 0))
    console.log(CurrentTasks);
    res.render('./Task/Search', {
        AllTasks: CurrentTasks
    })
})
router.get('/create', function (req, res) {
    res.render('./Task/Create', {
        AllTasks: AllTasks
    })
})
router.post('/create', function (req, res) {
    db.get('tasks')
        .push({ ...req.body, status: 'not ready', id: shortid.generate() })
        .write()

    res.redirect('/task/create');
})
router.get('/:id', function (req, res) {
    const id = req.params.id;
    res.render('./Task/TaskDetail', {
        task: db.get('tasks').find({ id: id }).value(),
    })
})
router.get('/', function (req, res) {
    res.render('./Task/Task', {
        AllTasks: AllTasks
    })
})


module.exports = router;