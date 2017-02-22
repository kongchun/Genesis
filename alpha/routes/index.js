var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


router.get('/list', function(req, res, next) {
	if (req.session.user) {
		res.render('list', {
			title: 'Express'
		});
	} else {
		req.session.error = "请先登录"
		res.redirect('login.html');
	}
});

router.get('/choose', function(req, res, next) {
	if (req.session.user) {
		res.redirect('choose.html');
	} else {
		req.session.error = "请先登录"
		res.redirect('login.html');
	}
});


router.get('/logout', function(req, res, next) {
	res.session.user = null;
	res.redirect('login.html');
});
module.exports = router;