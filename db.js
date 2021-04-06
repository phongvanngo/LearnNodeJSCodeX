//db demo
const FileSync = require('lowdb/adapters/FileSync')

const low = require('lowdb')
const adapter = new FileSync('db.json')
const db = low(adapter)

const originalTask = [
    {
        id: "1",
        name: 'di hoc',
        status: 'done',
    },
    {
        id: "2",
        name: 'di lam',
        status: 'not ready'
    }
]

db.defaults({ tasks: originalTask, user: {} })
    .write();

module.exports = db;