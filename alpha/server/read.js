var DB_URL = process.env.DB_URL || '127.0.0.1';
var db = require('./db.js')(DB_URL, "alpha");

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