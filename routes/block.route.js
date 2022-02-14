

var express = require('express');
var router = express.Router();
var solanaController = require('../controllers/block.controller');

router.get('/getdata', solanaController.getdata)
router.get('/getAccountInfo/:address', solanaController.getAccountInfo)


module.exports = router;