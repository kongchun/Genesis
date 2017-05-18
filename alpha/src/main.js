var marker = require("./marker.js");
var people = require("./people.js");
var line = require("./line.js");
var trading = require("./trading.js");
var brand = require("./brand.js");
var house = require("./house.js");
var shop = require("./shop.js");
var pie = require("./pieDistrict.js");
var message = require("./message.js");
var analysis = require("./analysis.js");
$(function() {
	MainFrame.initNav();
	ChartMap.init();
	var chart = ChartMap.getChart();
	var map = ChartMap.getMap();
	people.init(map);
	trading.init(map);
	line.init(map);
	pie.init(chart, map);

	MainPageEvent.initAllEvent();
	analysis.AnalysisPage.init();
})

/*
* 功能：初始化页面的框架方法
* Author:@Lindandan 2017-5-18
* */
var MainFrame = {
	initScrollBar:function(){
		var menu = $('.sidebar-menu');
		var sidebarHeight = $(window).height() - $('.navbar').height() + 1;
		menu.slimScroll({
			size: '7px',
			color: '#a1b2bd',
			opacity: .3,
			height: sidebarHeight,
			allowPageScroll: true,
			disableFadeOut: false
		});
	},
	initCategoryScrollBar:function(currentContent){
		$(currentContent).slimScroll({
			size: '7px',
			color: '#a1b2bd',
			opacity: .3,
			height: '100%',
			allowPageScroll: true,
			disableFadeOut: false
		})
	},
	initNav:function() {
		var that = this;
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
			that.initScrollBar();
		});
    }
}
/*
 * 功能：初始化页面的事件函数集
 * Author:@Lindandan 2017-5-18
 * */
var MainPageEvent = {
    initAllEvent:function(){
		this.initPageEvent();
		this.initSelectEvent();
		this.initCategory();
		this.initTabNav();
		/*MainFrame.initNav;*/
	},
	initPageEvent:function(){
		$("#save").click(function() {
			var id = $(this).data("id");
			var arr = [];
			$("input:checked", ".nav-sidebar").each(function(i, item) {
				arr.push($(item).val())
			})
			var data = (arr.join(","))
			$.post("api/map/save", {
				id: id,
				data: data
			}, function(data) {
				if (data) {
					message.alert("保存成功!", "success")
				} else {
					message.alert("保存失败!")
				}
			}, "json")
		})

		var data = $(".nav-sidebar").data("id");
		$("input", ".nav-sidebar").each(function(i, item) {

			if (data.indexOf($(item).val()) > -1) {
				$(item).click()
			}
		})
		MainFrame.initScrollBar()
	},
	initSelectEvent:function(chart,map){
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
			if ($("input:checked").length > 10) {
				message.alert("最多勾选10条");
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
			if ($(this)[0].checked) {
				house.show(ChartMap.getMap(),analysis.GlobalMain.cur_district_name);
			} else {
				house.hide(ChartMap.getMap());
			}
		})

		var shopPrice = $(".house .shopPrice");
		shopPrice.change(function() {
			if ($(this)[0].checked) {
				shop.show(map);
			} else {
				shop.hide(map);
			}
		})
		$("#clearAll").click(function() {
			$("input:checked").each(function() {
				$(this).prop('checked', false);
				$(this).change();
			})
		})
	},
	initCategory:function(){
			//记录当前打开的是第几个标签页
			var openTabIndex;
			$("li.first-category").click(function(e) {
				var index = $(this).index();
				if (index == openTabIndex) {
					toggleTab();
					return false;
				}
				$("ul.nav-second").hide();
				if (index == 0) {
					openTabIndex = 0;
					$("ul.district").show();
					$(".btn-next").hide();
				} else if (index == 1) {
					openTabIndex = 1;
					$("ul.brand-analy").show();
					$(".btn-next").hide();
				} else {
					openTabIndex = 2;
					$("ul.analysis").show();
					$(".btn-next").show();
				}
				openCurrentTab();
			})
			var mapParent = $("#map").parent("div");
			var contentCategory = $("#second-category");
			var width = $(".sidebar").width();
			//打开当前切换的tab页
			function openCurrentTab() {
				closeTab();
				toggleMapSize(true);
				contentCategory.css('left', width);
				//contentCategory.height($(window).height() - 55);
				MainFrame.initCategoryScrollBar(".second-category");
				$("#second-category").show();
			}
			//关闭打开的tab
			function closeTab() {
				if (mapParent.hasClass("col-md-offset-3")) {
					toggleMapSize(false);
					contentCategory.css('left', 0);
					$(".third-category").hide();
					$("#second-category").hide();
				}
			}

			function toggleTab() {
				if (mapParent.hasClass("col-md-9")) {
					toggleMapSize(false);
					contentCategory.css('left', 0);
					$(".third-category").hide();
					$("#second-category").hide();
				} else {
					toggleMapSize(true);
					contentCategory.css('left', width);
					$("#second-category").show();
				}
				ChartMap.getMap().reset();
			}
			//地图宽度是否变窄：true表示变窄,二级菜单出来
			function toggleMapSize(zoomOrNot) {
				if (zoomOrNot) {
					mapParent.removeClass("col-md-offset-1").removeClass("col-sm-offset-1");
					mapParent.removeClass("col-md-11").removeClass("col-sm-11");
					mapParent.addClass("col-md-offset-3").addClass("col-sm-offset-3");
					mapParent.addClass("col-md-9").removeClass("col-sm-9");
				} else {
					mapParent.removeClass("col-md-offset-3").removeClass("col-sm-offset-3");
					mapParent.removeClass("col-md-9").removeClass("col-sm-9");
					mapParent.addClass("col-md-offset-1").addClass("col-sm-offset-1");
					mapParent.addClass("col-md-11").removeClass("col-sm-11");
				}
			}
			$(".btn-next button").click(function() {
				var fc_width = $(".sidebar").width();
				var sc_width = $("#second-category").width();
				var left_width = fc_width + sc_width;
				var thirdCategory = $(".third-category");
				thirdCategory.css("left", left_width);
				thirdCategory.toggle();
				MainFrame.initCategoryScrollBar("#echart-content");
				analysis.GlobalMain.allData = [];
				$(".analysis-tab-hy").click();
			})
			$(".colapsed-arrow").click(function() {
				var thirdCategory = $(".third-category");
				thirdCategory.toggle();
				thirdCategory.css("left", 0);
			});

			var district_titles = $(".district-title");
			district_titles.each(function(){
				$(this).bind("click",function(){
					$(this).parents(".district-item").children(".business-area").toggle("slow");
				})
			})
	},
	initTabNav:function() {
		$(".business-tab").click();
    }
}

/*
 * 功能：页面中图标的函数集(公用方法)
 * Author:@Lindandan 2017-5-18
 * */
export var ChartMap = {
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
	},
    drawCircle:function(map,centerPoint,radius,radiusOut){
		var cPoint= new BMap.Point(centerPoint.lng,centerPoint.lat);
		var marker = new BMap.Marker(cPoint);
		var circle = new BMap.Circle(cPoint,radius,{strokeWeight: 1,strokeColor:"#317EF4",fillColor:"#BCC7CB",strokeStyle:"dashed"});
		var circleOut = new BMap.Circle(cPoint,radiusOut,{strokeWeight: 1,strokeColor:"#97A77B",fillColor:"#C3E5C0",strokeStyle:"dashed"})
		map.addOverlay(marker);
		map.addOverlay(circleOut);
		map.addOverlay(circle);
		map.centerAndZoom(cPoint,15);
    },
    clearMapOverlays:function(map){
		map.clearOverlays();
    }
}

