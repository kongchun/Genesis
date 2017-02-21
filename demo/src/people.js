var district = require("./data/district.js");
var data = require("./data/district_data.js");
var color = ["#FF6600", "#FF9933", "#FFCC33", "#99CC33", "#789E27"];

var arr = [];
export var init = function(map) {
	district.forEach(function(i) {
		var name = (i.district);
		var boundary = i.boundary;
		var people = data.people[name];
		var point = i.point;

		arr.push({
			"polygon": polygon(map, boundary, getColor(people)),
			"marker": markerDistrict(map, name, point, people)
		})
	})
}

export var show = function(map) {
	arr.forEach(function(i) {
		map.addOverlay(i.polygon);
		map.addOverlay(i.marker);
	})
}

export var hide = function(map) {
	arr.forEach(function(i) {
		map.removeOverlay(i.polygon);
		map.removeOverlay(i.marker);
	})
}

function getColor(t) {
	if (t > 5000000) {
		return color[0]
	} else if (t > 1500000) {
		return color[1]
	} else if (t > 1200000) {
		return color[2]
	} else if (t > 800000) {
		return color[3]
	} else {
		return color[4]
	}
}
//===================
function markerDistrict(map, district, point, value) {
	var opts = {
		position: getPoint(point), // 指定文本标注所在的地理位置
		offset: new BMap.Size(-30, -10) //设置文本偏移量
	}
	var text = `${district}:${(value/10000).toFixed(2)}万`
	var label = new BMap.Label(text, opts); // 创建文本标注对象
	label.setStyle({
		backgroundColor: "#4D98DD",
		color: "white",
		fontSize: "12px",
		fontFamily: "微软雅黑",
		padding: "4px",
		border: 0
	});
	return label;
}

function getPoint(it) {
	return new BMap.Point(it.lng, it.lat);
}

function boundary(boundaryData) {
	return boundaryData.map(function(it) {
		return getPoint(it);
	})
}

function polygon(map, boundaryData, fillColor) {
	var arr = boundary(boundaryData);
	var polygon = new BMap.Polygon(arr, {
		fillColor: fillColor,
		fillOpacity: 0.8,
		strokeColor: "black",
		strokeWeight: 1,
		strokeOpacity: 0.5
	});
	//map.addOverlay(polygon);
	return polygon;
}