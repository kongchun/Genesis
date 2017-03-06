var data = require("./data/brand.js");
var districtPoint = data.district;
let districtChart = {};
let parentChart = null;

var placeHolderStyle = {
	normal: {
		color: 'rgba(255,255,255,0.8)',
		label: {
			show: false
		},

		labelLine: {
			show: false
		}
	},
	emphasis: {
		color: 'rgba(0,0,0,0)'
	}
};

export let districtLabels = [];

export var init = function(chart, map) {
	parentChart = chart;
	var count = 0;
	for (var prop in districtPoint) {
		var district = prop;
		var position = districtPoint[prop];
		var id = "districtPoint" + count++;
		districtLabels.push(district);
		districtChart[district] = initPieMarker(map, id, district, position);
	}
}

export var clear = function() {
	// for (let prop in districtChart) {
	// 	districtChart[prop].setOption({
	// 		series: [{
	// 			data: []
	// 		}]
	// 	})
	// }
}


export var setData = function(data, label) {

	districtLabels.forEach((district) => {
		var count = 0;
		var dt = (data[district]);
		var newPieData = [];
		var innerPieData = [{
			value: 0,
			itemStyle: placeHolderStyle
		}];
		for (let prop in dt) {
			newPieData.push({
				name: prop,
				value: dt[prop]
			});
			count += dt[prop];
		}
		//console.log(newPieData);

		if (count === 0) {
			newPieData = [];
			innerPieData = [];
		}
		districtChart[district].setOption({
			title: {
				show: count > 0,
				text: district
			},

			series: [{
				data: newPieData
			}, {
				tooltip: {
					show: false
				},
				type: 'pie',
				radius: [0, 25],
				data: innerPieData
			}]
		})
	});

	let labelName = label.map((i) => {
		return {
			name: i
		};
	});
	//修改parentChart
	parentChart.setOption({
		legend: {
			show: (label.length > 0),
			data: label
		},
		series: [{
			data: labelName
		}]
	});
}



function initPieMarker(map, id, district, position) {
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
			left: "center",
			top: "center",
			textStyle: {
				fontSize: 14,
				fontWeight: "bold"
			}
		},
		series: [{
			name: district,
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