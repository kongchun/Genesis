var express = require('express');
var read = require('../server/read.js');
var write = require('../server/write.js');
var router = express.Router();
var md5 = require("blueimp-md5");

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('login');
});


router.post('/login', function(req, res, next) {
	var user = {
		account: req.body.account,
		password: md5(req.body.password)
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

router.post('/addUser', function(req, res, next) {
	var user = {
		account: req.body.userName,
		password: md5(req.body.passWord)
	};
	read.addUser(user).then(function(data) {
		var result = false;
		if (data) {
			result = true;
		}
		res.send({
			result: result
		});
	})
});
router.post('/checkUserName', function(req, res, next) {
	var user = {
		account: req.body.userName
	};
	read.checkUserName(user).then(function(data) {
		var result = false;
		if (data) {
			result = true;
		}
		res.send({
			result: result
		});
	})
});

module.exports = router;