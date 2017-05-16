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
		db.close();
		return data;
	}).catch(function(e){
		db.close();
		return null;
	})
}
exports.getIndustryValue =function(selectName,dis_name){
	return db.open("industry_brand").then(function() {
		return db.collection.find({
			district:{$regex:dis_name,$options:'i'},
			category:{$regex:selectName,$options:'i'}
		}).toArray()
		/*var newArr = [];
		for(let j = 0;j < selectNameArr.length;j++){
			return db.collection.find({
				district:{$regex:dis_name,$options:'i'},
				category:{$regex:selectNameArr[j],$options:'i'}
			}).toArray().then(function(tempResult){
				console.log(tempResult);
				newArr.push(tempResult);
				/!*return newArr;*!/
				return "haha";
			})
		}*/
	}).then(function(data) {
		db.close();
		return data;
	}).catch(function(e) {
		db.close();
		return [];
	})
}
exports.getAreabByDistrictAndName = function(d_name,b_name){
	return db.open("shanghai_anjuke_area").then(function(){
			return db.collection.find({
				"district":d_name,
				"area":b_name
			}).toArray()
	}).then(function(data){
		db.close();
		return data;
	}).catch(function(e){
		db.close();
		return null;
	})
}
exports.getShopDataByDistrictAndName = function(d_name,b_name){
	return db.open("anjuke_shanghai_shop").then(function(){
		return db.collection.find({
			"district":d_name,
			"area":b_name
		}).toArray()
	}).then(function(data){
		db.close();
		return data;
	}).catch(function(e){
		db.close();
		return null;
	})
}




