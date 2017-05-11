var express = require('express');
var read = require('../server/read.js');
var write = require('../server/write.js');
var brand = require("../server/brand.js");
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

router.get('/getBrandAllDataByName', function(req, res, next) {
	var name = req.query.name;
	brand.getBrandAllDataByName(name).then(function(data){
		res.send({
			data:data
		})
	})
});

router.get("/getBussinessPoint",function(req,res,next){
	var d_name = req.query.d_name;
    read.getBussinessPoint(d_name).then(function(data){
		res.send({
			data:data
		})
	})
})

router.get("/getBrandPointsByName",function(req,res,next){
	var name = req.query.name;
	var options = req.query.options;
	brand.getBrandPointsByName(name,options).then(function(data){
		res.send({
			data:data
		})
	})
})

router.get("/getAreaData",function(req,res,next){
	var districtName = req.query.districtName;
	read.getAreaData(districtName).then(function(data){
		res.send({
			data:data
		})
	})
})
router.get("/getIndustryValue",function(req,res,next){
	var selectName = req.query.selectName;
	var disName = req.query.disName;
	read.getIndustryValue(selectName,disName).then(function(data){
		res.send({
			data:data
		})
	})
})
//根据行政区和商圈名称查找住宅信息
router.get("/getAreabByDistrictAndName",function(req,res,next){
	var districtName = req.query.districtName;
	var bisName = req.query.bisName;
	read.getAreabByDistrictAndName(districtName,bisName).then(function(data){
		res.send({
			data:data
		})
	})
})
//根据行政区和商圈名称查找商铺信息
router.get("/getShopDataByDistrictAndName",function(req,res,next){
	var districtName = req.query.districtName;
	var bisName = req.query.bisName;
	read.getShopDataByDistrictAndName(districtName,bisName).then(function(data){
		res.send({
			data:data
		})
	})
})
module.exports = router;