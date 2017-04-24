var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var write = require('../server/write.js');
var moment = require('moment');
/* GET home page. */

router.get('/', function(req, res, next) {
	res.redirect('marketing.html');
});

router.get('/create', function(req, res, next) {
	res.redirect('../marketing_create.html');
});

module.exports = router;