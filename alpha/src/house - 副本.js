var data = require("./data/house.js");
var districtData = data.districtData;
var areaData = data.areaData;

var arrD = [];
var arrA = [];
var callback = function(map) {
	var zoom = map.getZoom(map);

	arrD.forEach((i) => {
		map.removeOverlay(i)
	})
	arrA.forEach((i) => {
		map.removeOverlay(i)
	})
	arrD = [];
	arrA = [];
	if (zoom < 14) {
		loadDistrict(map);
		//loadArea(map);
	} else {
		loadArea(map);
	}
}
export var show = function(map) {
	price.show(map);
};

var price = {
	show: function(map) {
		callback(map);
		this.evt = function() {
			callback(map);
		}
		map.addEventListener("zoomend", this.evt);
	},
	hide: function(map) {
		arrD.forEach((i) => {
			map.removeOverlay(i)
		})
		arrA.forEach((i) => {
			map.removeOverlay(i)
		})
		arrD = [];
		arrA = [];

		map.removeEventListener("zoomend", this.evt);
	}
}

export var hide = function(map) {
	price.hide(map);
}

function loadDistrict(map) {
	districtData.forEach(function(i) {
		polygon(map, i.boundary, getColorByPrice(i.price));
		markerDistrict(map, i);
	})
}

function loadArea(map) {
	areaData.forEach(function(i) {
		markerArea(map, i);
	})
}

function markerArea(map, i) {
	var opts = {
		position: getPoint(i.point), // 指定文本标注所在的地理位置
		offset: new BMap.Size(0, 0) //设置文本偏移量
	}
	var fillColor = color[1]
	var compare = "";
	if (i.upDown == "up") {
		compare = i.compare + "% ↑"

	} else {
		compare = i.compare + "% ↓"
		fillColor = color[3]
	}
	var text = `${i.area} ${i.price}元/m²<br/>浮动：${compare}`
	var label = new BMap.Label(text, opts); // 创建文本标注对象
	label.setStyle({
		borderRadius: "10px",
		backgroundColor: fillColor,
		color: "white",
		fontSize: "12px",
		fontFamily: "微软雅黑",
		padding: "8px",
		border: 0
	});
	arrA.push(label)
	map.addOverlay(label);
}

function markerDistrict(map, i) {
	//var arr = boundary(i.boundary);
	//console.log(map.getViewport(arr).center);
	var opts = {
		position: getPoint(i.point), // 指定文本标注所在的地理位置
		offset: new BMap.Size(-30, -10) //设置文本偏移量
	}
	var compare = "";
	if (i.upDown == "up") {
		compare = i.compare + "% ↑"
	} else {
		compare = i.compare + "% ↓"
	}
	var text = `${i.district} ${i.price}元/m²;${compare}`
	var label = new BMap.Label(text, opts); // 创建文本标注对象
	label.setStyle({
		backgroundColor: "#4D98DD",
		color: "white",
		fontSize: "12px",
		fontFamily: "微软雅黑",
		padding: "4px",
		border: 0
	});
	arrD.push(label)
	map.addOverlay(label);
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
	arrD.push(polygon)
	map.addOverlay(polygon);
}

function boundary(boundaryData) {
	return boundaryData.map(function(it) {
		return getPoint(it);
	})
}

var color = ["#FF6600", "#FF9933", "#FFCC33", "#99CC33", "#789E27"]

function getColorByPrice(price) {
	if (price > 80000) {
		return color[0]
	} else if (price > 60000) {
		return color[1]
	} else if (price > 40000) {
		return color[2]
	} else if (price > 20000) {
		return color[3]
	} else {
		return color[4]
	}
}

function getPoint(it) {
	return new BMap.Point(it.lng, it.lat);
}

function getUp(x) {
	if (x.indexOf("-") > -1) {

		return false;
	}
	return true;
}