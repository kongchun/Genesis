var express = require('express');
var read = require('../server/read.js');
var write = require('../server/write.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('login');
});


router.post('/login', function(req, res, next) {
	var user = {
		account: req.body.account,
		password: req.body.password
	};
	read.checkUser(user).then(function(data) {
		var result = false;
		if (data) {
			req.session.user = data;
			result = true;
		}
		res.send({
			result: result,
			data: data
		});
	})
});

router.get("/logout", function(req, res, next) {
	req.session.user = null;
	res.send({
		result: true
	});
})


router.post('/map/save', function(req, res, next) {
	var map = {
		id: req.body.id,
		data: req.body.data
	};
	write.saveMap(map).then(function(data) {
		res.send({
			result: data
		});
	})
});

module.exports = router;