var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var write = require('../server/write.js');
var moment = require('moment');
/* GET home page. */

router.get('/', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('/login.html');
	}
	var user = req.session.user;
	var id = user._id;

	//待重构
	var progress = [];
	var draft = [];
	var finish = [];
	read.getMarketing(id).then(function(data){
		data.forEach(function(data){
			if(data.status == 0){
				draft.push(data);
			}else if(data.status == 1){
				progress.push(data);
			}else{
				finish.push(data);
			}
		})

		res.render('marketing/list', {
			user: user,
			draft:draft,
			progress:progress,
			finish:finish
		});
	})


});

router.get('/create', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('/login.html');
	}
	var user = req.session.user;
	var id = user._id;

	read.getShopListById(id).then(function(shops){
		//console.log(shops)
		res.render('marketing/create', {
			user: user,
			shops: shops
		});
	})

});

router.post('/create', function(req, res, next) {
	if (!req.session.user) {
		res.send({
			result: false
		});
	}
	var user = req.session.user;
	var id = user._id;

	var marketing = JSON.parse(req.body.data);
	write.createMarketing(id,marketing).then(function(data){
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