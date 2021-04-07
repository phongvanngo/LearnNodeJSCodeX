var db = require('../db');
const shortid = require('shortid');

let AllTasks = db.get('tasks').value();
let CurrentTasks = AllTasks;

module.exports.index = function (req, res) {
    res.render('./Task/Task', {
        AllTasks: AllTasks
    })
}

module.exports.search = function (req, res) {
    const keyword = req.query.search ? req.query.search : '';
    CurrentTasks = AllTasks.filter(element => element.name.includes(keyword, 0))
    console.log(CurrentTasks);
    res.render('./Task/Search', {
        AllTasks: CurrentTasks
    })
};

module.exports.getCreate = function (req, res) {
    console.log(req.cookies);
    res.render('./Task/Create', {
        AllTasks: AllTasks
    })
};

module.exports.postCreate = function (req, res) {
    console.log(res.locals);
    db.get('tasks')
        .push({ ...req.body, status: 'not ready', id: shortid.generate() })
        .write()

    res.redirect('/task/create');
};

module.exports.getDetailed = function (req, res) {
    const id = req.params.id;
    res.render('./Task/TaskDetail', {
        task: db.get('tasks').find({ id: id }).value(),
    })
};
module.exports.cookie = function (req, res) {
    res.cookie('user-id', 12345);
    res.redirect('/task/create');
};

