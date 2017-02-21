var data = require("./data/brand.js");
var districtPoint = data.district;
let districtChart = {};
let parentChart = null;

export var init = function(chart, map) {
	parentChart = chart;
	var count = 0;
	for (var prop in districtPoint) {
		var district = prop;
		var position = districtPoint[prop];
		var id = "districtPoint" + count++;
		// console.log({
		// 	district,
		// 	position
		// })
		districtChart[district] = initPieMarker(map, id, district, position)
	}
}

export var clear = function() {
	for (let prop in districtChart) {
		districtChart[prop].setOption({
			series: [{
				data: []
			}]
		})
	}
}


export var setData = function(data) {

	var count = 0;
	var parentData = [];
	var label = [];
	for (let prop in data) {
		var district = prop;
		var pieData = data[prop] || [];
		if (count == 0) {
			pieData.forEach((it) => {
				label.push(it.name);
				parentData.push({
					name: it.name
				})
			})
		}
		var newPieData = pieData.filter((it) => {
			return it.value > 0;
		})

		//console.log(district, pieData);
		districtChart[district].setOption({
			title: {
				text: district
			},
			series: [{
				data: newPieData
			}]
		})
		count++;
	}
	if (label.length == 0) {
		clear();
	}
	parentChart.setOption({
		legend: {
			data: label
		},
		series: [{
			data: parentData
		}]
	})
}



function initPieMarker(map, id, area, position) {
	var htm = '<div id="' + id + '" style="width:100px;height:100px;"></div>';
	var point = new BMap.Point(position.lng, position.lat);
	var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {
		"anchor": new BMap.Size(-30, -30),
		barkground: "transparent"
	});
	map.addOverlay(myRichMarkerObject);
	document.getElementById(id).parentNode.style.backgroundColor = "transparent";
	document.getElementById(id).parentNode.style.zIndex = "1";
	var myChart = echarts.init(document.getElementById(id), "macarons");
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		title: {
			//text:"园区",
			left: "center",
			top: "center",
			textStyle: {
				fontSize: 14,
				fontWeight: "bold"
			}
		},
		series: [{
			name: area,
			type: 'pie',
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: 'center',
					formatter: "{a}"
				}
			},
			radius: ['25', '40'],
			data: []
		}]
	}
	myChart.setOption(option);
	return myChart;
}