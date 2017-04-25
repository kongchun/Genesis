var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.redirect('quan.html');
});

router.get('/list', function(req, res, next) {
	res.redirect('quan_list.html');
});

module.exports = router;