var DB_URL = process.env.DB_URL || '10.82.0.1';
var db = require('./db.js')(DB_URL, "alpha");
var helper = require('./helper.js')

var getBrandPointsByName = function(name, options = {}) {
	var {
		latMin = 0,
			latMax = 180,
			lngMin = 0,
			lngMax = 180
	} = options;
	//console.log([latMin, latMax, lngMin, lngMax])
	return db.open("industry_brand").then(function() {
		return db.findToArray({
			"category": name,
			"location.lat": {
				"$gte": parseFloat(latMin),
				"$lte": parseFloat(latMax)
			},
			"location.lng": {
				"$gte": parseFloat(lngMin),
				"$lte": parseFloat(lngMax)
			}
		}, {
			_id: 0,
			name: 0
		})
	}).then(function(arr) {
		db.close();
		return arr;
	}).catch(function(e) {
		db.close();
		console.log(e)
		return null;
	})
}

exports.getBrandPointsByName = getBrandPointsByName;

var getBrandCountByNameDistrict = function(name, district = {
	$ne: null
}) {
	return db.open("brand_count").then(function() {
		return db.findToArray({
			name: name,
			district: district
		}, {
			_id: 0,
			name: 0,
			point: 0
		})
	}).then(function(arr) {
		db.close();
		return arr;
	}).catch(function(e) {
		db.close();
		return null;
	})
}
exports.getBrandCountByNameDistrict = getBrandCountByNameDistrict;

var getBrandAllDataByName = function(name) {
	var obj = {
		"district_count": [],
		"area": []
	}
	return getBrandCountByNameDistrict(name).then(function(arr) {
		obj.district_count = arr;
		return;
	}).then(function() {
		return getBrandPointsByName(name)
	}).then(function(arr) {
		obj.area = arr;
		return;
	}).then(function() {
		return (obj);
	})
}

exports.getBrandAllDataByName = getBrandAllDataByName;


var getBrandAllDataByNames = function(arr) {
	var obj = {};
	return helper.iteratorArr(arr, function(name) {
		return getBrandAllDataByName(name).then(function(arr) {
			obj[name] = arr;
			return arr;
		});
	}).then(function() {
		//console.log(obj);
		return obj;
	})
}

exports.getBrandAllDataByNames = getBrandAllDataByNames;

// getBrandAllDataByNames(["麦当劳", "肯德基"]).then(function(data) {
// 	console.log(JSON.stringify(data));
// })

var getDistrict = function() {
	return db.open("district").then(function() {
		return db.findToArray({}, {
			_id: 0
		})
	}).then(function(arr) {
		db.close();
		return arr;
	}).catch(function(e) {
		db.close();
		return null;
	})
}

exports.getDistrict = getDistrict;