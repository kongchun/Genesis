var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var write = require('../server/write.js');
var marketingService = require('../server/service/marketingService.js');
var shopService = require('../server/service/shopService.js')
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
	marketingService.getListByUserId(id).then(function(data){
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

	shopService.getListByUserId(id).then(function(shops){
		//console.log(shops)
		res.render('marketing/create', {
			user: user,
			shops: shops,
			marketing:null
		});
	})

});

router.get('/edit/:id', function(req, res, next) {
	if (!req.session.user) {
		res.redirect('/login.html');
	}

	var id = req.params.id;
	var user = req.session.user;
	var userId = user._id;

	read.getShopListByUserId(userId).then(function(shops){
		//console.log(shops)
		marketingService.getById(id).then(function(marketing){
			console.log(marketing)
			res.render('marketing/create', {
				user: user,
				shops: shops,
				marketing:marketing
			});
		})
		
	})

});

router.post('/save', function(req, res, next) {
	if (!req.session.user) {
		res.send({
			result: false
		});
	}
	var user = req.session.user;
	var userId = user._id;

	var marketing = JSON.parse(req.body.data);
	marketingService.save(null,userId,marketing).then(function(data){
		var result = false;
		if (data) {
			result = true;
		}
		res.send({
			result: result
		});
	})
});

router.post('/save/:id', function(req, res, next) {
	if (!req.session.user) {
		res.send({
			result: false
		});
	}

	var user = req.session.user;
	var userId = user._id;
	var id = req.params.id;
	var marketing = JSON.parse(req.body.data);

	marketingService.save(id,userId,marketing).then(function(data){
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