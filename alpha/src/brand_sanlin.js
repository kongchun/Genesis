var data = require("./data/brand_sanlin.js");
var color = [
	'#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
	'#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
	'#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
	'#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
];
var brand = data.brand;
var allData = Object.assign(brand);
var collections = [];
var marker = [];

//console.log(allData);
var cPoint = {
	lng: 121.533546,
	lat: 31.210245
};
var circle = new BMap.Circle(getPoint(cPoint), 3000);

function markerDistrict(map, district, point, text) {
	var opts = {
		position: getPoint(point), // 指定文本标注所在的地理位置
		offset: new BMap.Size(-30, -10) //设置文本偏移量
	}
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
export var showCollection = function(map, arr) {
	collections.forEach((i) => {
		map.removeOverlay(i)
	})
	collections = [];
	arr.forEach((it, i) => {
		var pointCollection = loadBrand(it, i);
		map.addOverlay(pointCollection);
		collections.push(pointCollection);
	})
}

function loadBrand(name, i = 0) {
	var data = getDataByTypeName(name);
	var points = getPoints(data.area);
	var options = {
		size: BMAP_POINT_SIZE_SMALL,
		shape: BMAP_POINT_SHAPE_SQUARE,
		color: color[i]
	}
	var pointCollection = new BMap.PointCollection(points, options);
	return pointCollection;
}

function getDataByTypeName(name) {
	return (allData[name])
}


function getPoints(data) {
	var points = data.map((i) => {
		//console.log(i.location.lng, i.location.lat)
		return new BMap.Point(i.location.lng, i.location.lat)
	})

	points = points.filter((i) => {
		return BMapLib.GeoUtils.isPointInCircle(i, circle)
	})
	return points
}



var data_trading = require("./data/trading.js");
var trading = {};
var type = ["餐饮类", "购物类", "旅游类", "金融类", "车房类", "教育类"];


export var initTrading = function(map) {
	trading["餐饮类"] = getHeatmap(map, getHData("餐饮类"), 6);
	trading["购物类"] = getHeatmap(map, getHData("购物类"), 6);
	trading["旅游类"] = getHeatmap(map, getHData("旅游类"), 6);
	trading["金融类"] = getHeatmap(map, getHData("金融类"), 6);
	trading["车房类"] = getHeatmap(map, getHData("车房类"), 6);
	trading["教育类"] = getHeatmap(map, getHData("教育类"), 6);

	trading["餐饮类"].hide();
	trading["购物类"].hide();
	trading["旅游类"].hide();
	trading["金融类"].hide();
	trading["车房类"].hide();
	trading["教育类"].hide();
}

function getHData(value) {
	var myData = []
	for (var prop in data_trading) {
		//console.log(prop)
		myData = myData.concat(data_trading[prop][value])
	}

	var x = myData.map((i) => {
		return gpsCover(i)
	});

	x = x.filter((i) => {
		return BMapLib.GeoUtils.isPointInCircle(new BMap.Point(i.lng, i.lat), circle)
	})

	return x;
}

function getData(value) {
	var myData = []
	type.forEach(function(i) {
		myData = myData.concat(data_trading[value][i]);
	})

	var x = myData.map((i) => {
		return gpsCover(i)

	});


	return x;
}

export var show = function(map, name) {
	trading[name].show();
}

export var hide = function(map, name) {
	trading[name].hide();
}

function gpsCover(obj) {
	var bd = GPS.bd_encrypt(obj.lat, obj.lng);
	return {
		"lng": parseFloat(bd.lon),
		"lat": parseFloat(bd.lat),
		"count": obj.count
	}
}

function getHeatmap(map, points, max) {
	if (!isSupportCanvas()) {
		alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
	}
	var max = max || 6;


	var heatmapOverlay = new BMapLib.HeatmapOverlay({
		"radius": 20
	});

	//console.log(points);
	map.addOverlay(heatmapOverlay);
	heatmapOverlay.setDataSet({
		data: points,
		max: max
	});
	//heatmapOverlay.show()
	return heatmapOverlay;
}

function closeHeatmap() {
	heatmapOverlay.hide();
}

function isSupportCanvas() {
	var elem = document.createElement('canvas');
	return !!(elem.getContext && elem.getContext('2d'));
}