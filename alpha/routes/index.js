var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var write = require('../server/write.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


router.get('/list', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('login.html');
	}

	var user = req.session.user;
	var id = user._id;

	read.findMapListById(id).then(function(data) {
		console.log(data, "findMapListById")
		if (data.length > 0) {
			return data;
		}

		return write.createMap(id).then(function(data) {
			return data.ops;
		})

	}).then(function(data) {
		console.log(data);
		res.render('list', {
			user: user,
			list: data
		});
	})



});

router.get('/choose', function(req, res, next) {
	if (req.session.user) {
		res.redirect('choose.html');
	} else {
		res.redirect('login.html');
	}
});


router.get('/logout', function(req, res, next) {
	res.session.user = null;
	res.redirect('login.html');
});
module.exports = router;