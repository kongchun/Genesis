var marker = require("./marker.js");
var people = require("./people.js");
var line = require("./line.js");
var trading = require("./trading.js");
var brand = require("./brand.js");
var house = require("./house.js");
var shop = require("./shop.js");
var pie = require("./pieDistrict.js");
$(function() {
	initNav();
	ChartMap.init();
	var chart = ChartMap.getChart();
	var map = ChartMap.getMap();

	people.init(map);
	trading.init(map);
	line.init(map);

	pie.init(chart, map);
	initEvent(chart, map);


})


var ChartMap = {
	chart: null,
	map: null,
	init: function() {
		this.initChart();
		this.initMap();
	},

	create: function(id) {
		var myChart = echarts.init(document.getElementById(id), "macarons");
		return myChart;
	},

	initChart: function() {
		var myChart = this.create("map");
		var option = {
			bmap: {
				center: [121.523859, 31.258039],
				zoom: 12,
				roam: true,

				mapStyle: {
					styleJson: [{
						"featureType": "all",
						"elementType": "all",
						"stylers": {
							"lightness": 30,
							"saturation": -75
						}
					}, {
						"featureType": "road",
						"elementType": "geometry.fill",
						"stylers": {
							"color": "#ffffff",
							"visibility": "on"
						}
					}, {
						"featureType": "subway",
						"elementType": "geometry.fill",
						"stylers": {
							"color": "#d9d9d9"
						}
					}, {
						"featureType": "road",
						"elementType": "geometry.stroke",
						"stylers": {
							"color": "#f3f3f3",
							"visibility": "on"
						}
					}, {
						"featureType": "poi",
						"elementType": "all",
						"stylers": {
							"visibility": "off"
						}
					}, {
						"featureType": "all",
						"elementType": "labels.text.fill",
						"stylers": {
							"color": "#828282"
						}
					}, {
						"featureType": "all",
						"elementType": "labels.text.stroke",
						"stylers": {
							"color": "#ffffff"
						}
					}, {
						"featureType": "subway",
						"elementType": "labels.icon",
						"stylers": {
							"color": "#ffffff",
							"visibility": "off"
						}
					}, {
						"featureType": "highway",
						"elementType": "labels",
						"stylers": {
							"visibility": "off"
						}
					}]
				}
			},
			legend: {
				orient: 'vertical',
				right: 20,
				top: 15,
				padding: 10,
				backgroundColor: "rgba(255,255,255,0.8)",
				data: []
			},
			series: [{
				type: 'pie',
				data: []
			}]
		}

		myChart.setOption(option);
		this.chart = myChart;
	},
	getChart: function() {
		return this.chart;
	},
	getMap: function() {
		return this.map;
	},
	initMap: function() {
		var map = this.chart.getModel().getComponent('bmap').getBMap();
		var top_left_navigation = new BMap.NavigationControl({
			//type: BMAP_NAVIGATION_CONTROL_SMALL
		});
		map.addControl(top_left_navigation);
		map.removeEventListener("click");
		this.map = map;
	}
}



function initEvent(chart, map) {
	var peopleChk = $(".district .people");
	peopleChk.change(function() {
		if ($(this)[0].checked) {
			people.show(map);

		} else {
			people.hide(map);
		}
	})

	var lwChk = $(".trading input");
	lwChk.change(function() {
		if ($(this)[0].checked) {
			trading.show(map, $(this).val());

		} else {
			trading.hide(map, $(this).val());
		}
	})


	var subway = $(".subway input");
	subway.change(function() {
		if ($(this)[0].checked) {
			line.show(map, $(this).val());

		} else {
			line.hide(map, $(this).val());
		}
	})

	var brandChk = $(".brand input");
	brandChk.change(function() {
		if ($("input:checked").length > 5) {
			alert("最多勾选5条");
			this.checked = false;
			return false;
		}
		var arr = [];
		$(".brand input:checked").each(function() {
			arr.push(this.value);
		})
		brand.toggleShow(pie, chart, map, arr);
	})

	var housePrice = $(".house .housePrice");
	housePrice.change(function() {
		console.log(this.checked)
		if ($(this)[0].checked) {
			house.show(map);
		} else {
			house.hide(map);
		}
	})

	var shopPrice = $(".house .shopPrice");
	shopPrice.change(function() {
		console.log(this.checked)
		if ($(this)[0].checked) {
			shop.show(map);
		} else {
			shop.hide(map);
		}
	})
}



function initNav() {

	$("#map").height($(window).height() - 50);

	$(".nav-parent a").click(function(e) {
		var dom = $(this).parent(".nav-parent");
		if (dom.hasClass("nav-expanded")) {
			dom.removeClass("nav-expanded")
			$(".nav-children", dom).hide();
		} else {
			dom.addClass("nav-expanded")
			$(".nav-children", dom).show();
		}

	})



}