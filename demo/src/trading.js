var data = require("./data/trading.js");
var trading = {};
var type = ["餐饮类", "购物类", "旅游类", "金融类", "车房类", "教育类"];
var addr = {
	"北外滩商圈": [
		[121.500431, 31.234144],
		[121.552990, 31.279110]
	],
	"大宁商圈": [
		[121.442832, 31.233495],
		[121.495421, 31.296448]
	],
	"卢湾商圈": [
		[121.42497, 31.18102],
		[121.498556, 31.23320]
	],
	"三林商圈": [
		[121.507267, 31.187762],
		[121.559826, 31.232728]
	]
};

function setCenterAndArea(map, key) {
	var data = addr[key];
	var x1 = data[0][0];
	var y1 = data[0][1];
	var x2 = data[1][0];
	var y2 = data[1][1];

	//getMapCenter(map,x1, y1, x2, y2);
	return getMapArea(map, x1, y1, x2, y2)
}


function getMapCenter(map, x1, y1, x2, y2) {
	x = (x1 + x2) / 2;
	y = (y1 + y2) / 2;
	var point = new BMap.Point(x, y);
	map.centerAndZoom(point, 13); // 初始化地图，设置中心点坐标和地图级别 
}


function getMapArea(map, x1, y1, x2, y2) {
	// if (polyline != null) {
	// 	map.removeOverlay(polyline);
	// }


	// var x1 = 121.473941 //121.465621
	// var y1 = 31.230481 //31.223361
	// var x2 = 121.457301
	// var y2 = 31.216241

	var polyline = new BMap.Polygon([
		new BMap.Point(x1, y1),
		new BMap.Point(x1, y2),
		new BMap.Point(x2, y2),
		new BMap.Point(x2, y1),
		new BMap.Point(x1, y1)

	], {
		strokeColor: "blue",
		strokeWeight: 1,
		strokeOpacity: 0.8,
		fillOpacity: 0.1
	});


	map.addOverlay(polyline); //增加折线
	return polyline;

	//var pStart = new BMap.Point(x1, y1);
	//var pEnd = new BMap.Point(x2, y2);
	//var bs = new BMap.Bounds(pStart,pEnd);  

	//var local = new BMap.LocalSearch(map, {
	//renderOptions:{map: map}
	//});
	//121.465621,31.223361
	//local.searchInBounds("百盛购物中心(淮海店)", bs);

	// var point = new BMap.Point(121.465621, 31.223361);
	// var marker = new BMap.Marker(point);
	// var circle = new BMap.Circle(point, 800, {
	// 	strokeColor: "blue",
	// 	strokeWeight: 1,
	// 	strokeOpacity: 0.5,
	// 	fillOpacity: 0.4
	// }); //创建圆
	// map.addOverlay(marker);
	// //map.addOverlay(circle);


}

export var init = function(map) {


	trading["卢湾商圈"] = setCenterAndArea(map, "卢湾商圈");
	trading["三林商圈"] = setCenterAndArea(map, "三林商圈");

	trading["餐饮类"] = getHeatmap(map, getHData("餐饮类"), 5);
	trading["购物类"] = getHeatmap(map, getHData("购物类"), 5);

	trading["餐饮类"].hide();
	trading["购物类"].hide();
	trading["卢湾商圈"].hide();
	trading["三林商圈"].hide();
	//trading["三林商圈"].show();
}

function getHData(value) {
	var myData = []
	for (var prop in data) {
		//console.log(prop)
		myData = myData.concat(data[prop][value])
	}

	var x = myData.map((i) => {
		return gpsCover(i)
	});

	return x;
}

function getData(value) {
	var myData = []
	type.forEach(function(i) {
		myData = myData.concat(data[value][i]);
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