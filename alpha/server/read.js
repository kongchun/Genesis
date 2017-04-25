var DB_URL = process.env.DB_URL || '10.82.0.1';
var db = require('./db.js')(DB_URL, "alpha");
var helper = require('./helper.js')

exports.checkUser = function(user) {
	return db.open("user").then(function() {
		return db.collection.findOne(user)
	}).then(function(data) {
		db.close()
		return data
	}).catch(function(e) {
		db.close()
		console.log(e);
		return null
	})
};
exports.addUser = function(user) {
	return db.open("user").then(function() {
		return db.collection.insert(user);
	}).then(function(data) {
		db.close()
		return data
	}).catch(function(e) {
		db.close()
		console.log(e);
		return null
	})
};
exports.checkUserName = function(user) {
	return db.open("user").then(function() {
		return db.collection.findOne(user);
	}).then(function(data) {
		db.close();
		return data
	}).catch(function(e) {
		db.close()
		console.log(e);
		return null
	})
};

exports.getMapListById = function(id) {
	return db.open("user_map").then(function() {
		return db.collection.find({
			userId: id
		}).toArray()
	}).then(function(data) {
		db.close()
		return data;
	}).catch(function(e) {
		db.close();
		return [];
	})
}

exports.getMapById = function(id) {
	return db.open("user_map").then(function() {
		return db.collection.findOne({
			_id: db.ObjectId(id)
		})
	}).then(function(data) {
		db.close()
		return data;
	}).catch(function(e) {
		db.close();
		return null;
	})
}

exports.getAllDistrictWithBusniss = function(city) {
	return db.open("district_bussiness").then(function() {
		return db.collection.find({
			city:city
		}).toArray()
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(e) {
		db.close();
		return null;
	})
}

exports.getAllIndustryWithBussiness = function(){
	return db.open("industry_bussiness").then(function() {
		return db.collection.find().toArray()
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(e) {
		db.close();
		return null;
	})
}

exports.getBussinessPoint = function(d_name){
	return db.open("district_bussiness").then(function(){
		return db.collection.find({
			"district":d_name
		}).toArray()
	}).then(function(data){
		db.close();
		return data;
	}).catch(function(e){
		db.close();
		return null;
	})
}
exports.getAreaData = function(d_name){
	return db.open("shanghai_anjuke_area").then(function(){
		if(d_name=="all"){
			return db.collection.find({}).toArray()
		}else{
			return db.collection.find({
				"district":d_name
			}).toArray()
		}
	}).then(function(data){
		console.log("apiJS");
		console.log(data);
		db.close();
		return data;
	}).catch(function(e){
		db.close();
		return null;
	})
}
