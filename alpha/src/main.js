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
	initNav();
	ChartMap.init();
	var chart = ChartMap.getChart();
	var map = ChartMap.getMap();

	people.init(map);
	trading.init(map);
	line.init(map);

	pie.init(chart, map);
	initEvent(chart, map);
	initPageEvent();
})

function initPageEvent() {
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
	initScrollBar()

}

function initScrollBar() {
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
}
function initSecondCategory(currentContent){
	var contentBarHeight = $(window).height() - $('.navbar').height() + 1;
	$(currentContent).slimScroll({
		size: '7px',
		color: '#a1b2bd',
		opacity: .3,
		height: contentBarHeight,
		allowPageScroll: true,
		disableFadeOut: false
	})
}
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
		console.log(this.checked)
		if ($(this)[0].checked) {
			house.show(map);
		} else {
			house.hide(map);
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
	$("#clearAll").click(function(){
		$("input:checked").each(function(){
			$(this).prop('checked',false);
			$(this).change();
		})
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
		initScrollBar();
	})
	$("li.first-category").click(function(e) {
		var index = $(this).index();
		if(index==0){
			$("ul.district").show();
			$(".select-analy-bg").text("选择所属行政区");
			$(".btn-next").hide();
		}else if(index==1){
			$("ul.brand").show();
			$(".select-analy-bg").text("选择所属的行业");
			$(".btn-next").hide();
		}else{
			$("ul.analysis").show();
			$(".select-analy-bg").text("选择分析条件");
			$(".btn-next").show();
		}
		var mapParent = $("#map").parent("div");
		var contentCategory = $("#second-category");
        /*var contentsDiv = contentCategory.find("div.second-category");*/
		var width = $(".sidebar").width();
		if(mapParent.hasClass("col-md-offset-1")){
			mapParent.removeClass("col-md-offset-1").removeClass("col-sm-offset-1");
			mapParent.addClass("col-md-offset-3").addClass("col-sm-offset-3");
			contentCategory.css('left',width);
			$("#second-category").show();
		}else{
			mapParent.removeClass("col-md-offset-3").removeClass("col-sm-offset-3");
			mapParent.addClass("col-md-offset-1").addClass("col-sm-offset-1");
			contentCategory.css('left',0);
			$(".third-category").hide();
			$("#second-category").hide();
			$("ul.district").hide();
			$("ul.brand").hide();
			$("ul.analysis").hide();
		}
		/*initSecondCategory($(contentsDiv).find("ul"));*/
	})
	$(".btn-next button").click(function(){
		if($(".movie-panel-ul").css("display")=='none'){
			alert("请先去选择所在的行业,否则不能进行分析哦");
			return false;
		}
		var fc_width = $(".sidebar").width();
		var sc_width = $("#second-category").width();
		var left_width = fc_width + sc_width + 4;
        var thirdCategory = $(".third-category");
		thirdCategory.css("left",left_width);
		thirdCategory.toggle();
	})
	$(".colapsed-arrow").click(function(){
		var thirdCategory = $(".third-category");
		thirdCategory.toggle();
		thirdCategory.css("left",0);
	});
	//选择行政区
	$("[name = district]:checkbox").each(function () {
	    $(this).bind("click",function(){
			if ($(this).is(":checked")) {
				$(this).prop("checked", true);
				var districtName = "上海市"+$(this).val();
			} else {
				var districtName = "";
				$(this).prop("checked", false);
				$("[name = analysis-input]:checkbox").each(function () {
					$(this).prop("checked", false);
				});
				$("input:radio[name='休闲娱乐']").each(function(){
					$(this).prop("checked", false);
				})
			}
			analysis.getBoundary(ChartMap.getMap(),districtName);

	    })
	});
    //选择行业
	$("input:radio[name='休闲娱乐']").change(function(){
	    var selectVal = $(this).val();
		$(".firm-name").text(selectVal);
		//只有选择了电影院行业后，分析面板的同行业分析才会出现
        $(".movie-panel-ul").show();
	});

	//选择分析项
	$("[name = analysis-input]:checkbox").each(function () {
		$(this).bind("click",function(){
			var analyArr = [];
			if(!$("input.hp").is(":checked")){
				alert("请先去选择您所要查看的行政区");
				return false;
			}
			if ($(this).is(":checked")) {
				$(this).prop("checked", true);
				var analysisName =$(this).val();
				analyArr.push(analysisName);
			} else {
				$(this).prop("checked", false);
				analyArr = "";
			}
			brand.toggleShow(pie,null,ChartMap.getMap(),analyArr);
		})
	});

}