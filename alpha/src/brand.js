var data = require("./data/brand.js");
var color = ["#D8534C", "#FE971F", "#A4E501", "#8DC0F3", "#DF43C8"];
var brand = data.brand;
var pub = data.pub;
var company = data.company;
var districtPoint = data.district;
var allData = Object.assign(brand, pub, company);
var collections = [];
var marker = [];

//console.log(allData);

export var toggleShow = function(pie, chart, map, arr) {
	showCollection(map, arr);
	//showLabel(map, arr);
	showPie(pie, arr);
};
//showLabel(1, ["ATM"])
//showPie(1, ["ATM", "乐购"]);

function showPie(pie, arr) {
	let obj = {};
	arr.forEach((it, i) => {
			allData[it].district_count.forEach((j) => {
				var district = j.district;
				if (i == 0) {
					obj[district] = []
				}
				var count = j.count;

				obj[district].push({
					name: it,
					value: count
				});
			})
		})
		//console.log(obj)
	pie.setData(obj);
}

function showLabel(map, arr) {

	marker.forEach((i) => {
		map.removeOverlay(i)
	})

	let obj = {};
	arr.forEach((it, i) => {
		allData[it].district_count.forEach((j) => {
			var district = j.district;

			if (i == 0) {
				var point = j.point;
				obj[district] = {
					point: districtPoint[district],
					text: []
				};
			}
			var count = j.count;
			obj[district].text.push(it + ":" + count);
		})

	})

	for (var prop in obj) {
		var district = prop;
		var point = obj[prop].point;
		var text = obj[prop].text;
		console.log({
			district,
			point,
			text
		})
		var label = "<b>" + district + "</b><br/>" + text.join("<br>");
		var markerDist = markerDistrict(map, district, point, label)
		map.addOverlay(markerDist)
		marker.push(markerDist);
	}

}

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

	function getPoint(it) {
		return new BMap.Point(it.lng, it.lat);
	}
}



function showCollection(map, arr) {

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
	return points
}