var express = require('express');
var router = express.Router();

var controller = require('../Controller/task.controller');

router.get('/search', controller.search)
router.get('/create', controller.getCreate)
router.post('/create', controller.postCreate)
router.get('/:id', controller.getDetailed)
router.get('/', controller.index)

module.exports = router;