var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var write = require('../server/write.js');
var moment = require('moment');
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

	read.getMapListById(id).then(function(data) {
		//console.log(data, "getMapListById")
		if (data.length > 0) {
			return data;
		}

		return write.createMap(id).then(function(data) {
			return data.ops;
		})

	}).then(function(data) {

		data.map((i) => {
			console.log(i.date)
			i.date = moment(i.date).format('YYYY-MM-DD HH:mm:ss')
		})

		//console.log(data);
		res.render('list', {
			user: user,
			list: data
		});
	})



});

router.get('/map', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('login.html');
	}
	var id = req.param("id");
	console.log(id, "id")
	read.getMapById(id).then(function(data) {
		console.log(data)
		if (data) {
			res.render('choose', {
				user: req.session.user,
				map: data
			});
		} else {
			res.redirect("list");
		}

	})


});


router.get('/logout', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('login.html');
	}
	if (req.session.user) {
		req.session.user = null;
	}
	res.redirect('login.html');
});
module.exports = router;