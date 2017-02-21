var data = require("./data/shop.js");
var areaData = data.data;

var arrA = [];
export var show = function(map) {
	price.show(map);
};



var price = {
	show: function(map) {
		loadArea(map);
	},
	hide: function(map) {
		arrA.forEach((i) => {
			map.removeOverlay(i)
		})
	}
}

export var hide = function(map) {
	price.hide(map);
}

function loadArea(map) {
	areaData.forEach(function(i) {
		if (i.point.lat == null) {
			return;
		}
		markerArea(map, i);
	})
}

function markerArea(map, i) {

	var opts = {
		position: getPoint(i.point), // 指定文本标注所在的地理位置
		offset: new BMap.Size(0, 0) //设置文本偏移量
	}
	var fillColor = color[2]

	var text = `${i.name}<br/>${i.mianji}${i.totalPrice}<br/> ${i.unitPrice}`
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