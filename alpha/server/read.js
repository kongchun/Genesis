var DB_URL = process.env.DB_URL || '10.82.0.1'
var db = require('./db.js')(DB_URL, "alpha");

exports.checkUser = function(user) {
	return db.open("user").then(function() {
		return db.collection.findOne(user)
	}).then(function(data) {
		db.close()
		if (data) {
			return {
				result: true,
				data: data
			}
		} else {
			return {
				result: false
			}
		}
	}).catch(function(e) {
		db.close()
		console.log(e);
		return {
			result: false
		}
	})
};