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
	if (!req.session.user) {
		res.redirect('/login.html');
	}
	var user = req.session.user;
	var id = user._id;

	read.getShopListById(id).then(function(shops){
		console.log(shops)
		res.render('marketing/create', {
			user: user,
			shops: shops
		});
	})

});

module.exports = router;