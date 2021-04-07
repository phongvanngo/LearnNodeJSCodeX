var express = require('express');
var router = express.Router();

var controller = require('../Controller/task.controller');
var validate = require('../Validate/task.validate');

router.get('/search', controller.search)
router.get('/create', controller.getCreate)
router.post('/create', validate.postCreate, controller.postCreate)
router.get('/:id', controller.getDetailed)
router.get('/', controller.index)

module.exports = router;