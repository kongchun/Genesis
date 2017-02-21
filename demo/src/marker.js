var COLOR = ["#FF6600", "#FF9933", "#FFCC33", "#99CC33", "#789E27"];

export var loadDistrict = function(arr) {
	var markers = arr.map(function(i) {
		return getMarker(i, i.district)
	})
	return markers;
}

export var loadArea = function(arr) {
	var markers = arr.map(function(i) {
		return getMarker(i, i.area)
	})
	return markers;
}

export var loadCommunity = function(arr) {
	var markers = arr.map(function(i) {
		return getCommunityMarker(i, i.name)
	})
	return markers;
}

export var showMarkers = function(map, markers) {
	markers.forEach((marker) => {
		map.addOverlay(marker);
	})
};

export var showMarkersInBounds = function(map, markers) {
	var bounds = map.getBounds()
	markers.forEach((marker) => {
		var result = BMapLib.GeoUtils.isPointInRect(marker.point, bounds);
		if (result) {
			map.addOverlay(marker);
		} else {
			map.removeOverlay(marker);
		}
	})
};

var getSimplePriceLabel = function(i, addr) {
	var {
		point,
		compare,
		fillColor
	} = getPointCompareColor(i);
	var text = `${addr} ${i.price}元/m²<br/>浮动：${compare}`;
	return {
		point,
		text,
		fillColor
	}
}

var getCommunityPriceLabel = function(i, addr) {
	var {
		point,
		compare,
		fillColor
	} = getPointCompareColor(i)
	var text = `${addr} <br/>${i.price}元/m² ${compare}`;
	return {
		point,
		text,
		fillColor
	}
}

var getPointCompareColor = function(i) {
	var point = getPoint(i.point);
	var compare = "";
	var fillColor = COLOR[1];
	if (i.upDown == "up") {
		compare = i.compare + "% ↑"
	} else {
		compare = i.compare + "% ↓"
		fillColor = COLOR[3]
	}
	return {
		point,
		compare,
		fillColor
	}
}



function getPoint(it) {
	return new BMap.Point(it.lng, it.lat);
}



var getSimplePriceMarker = function(map, point, text, fillColor) {
	var opts = {
		position: point, // 指定文本标注所在的地理位置
		offset: new BMap.Size(-30, -30) //设置文本偏移量
	}
	var label = new BMap.Label(text, opts); // 创建文本标注对象
	label.setStyle({
		backgroundColor: fillColor,
		fontSize: "14px",
		fontFamily: "微软雅黑",
		padding: "6px",
		border: 0,
		opacity: 0.9
	});
	//console.log(label, "markerLabel");
	return label;
}

function getMarker(i, name) {
	var {
		point,
		text,
		fillColor
	} = getSimplePriceLabel(i, name);
	var label = getSimplePriceMarker(map, point, text, fillColor);
	return label;
}

function getCommunityMarker(i, name) {
	var {
		point,
		text,
		fillColor
	} = getCommunityPriceLabel(i, name);
	var label = getSimplePriceMarker(map, point, text, fillColor);
	return label;
}