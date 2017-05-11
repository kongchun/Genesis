var marker = require("./marker.js");
var people = require("./people.js");
var line = require("./line.js");
var trading = require("./trading.js");
var brand = require("./brand.js");
var brand_sanlin = require("./brand_sanlin.js");
var house = require("./house.js");
var shop = require("./shop.js");
var pie = require("./pieDistrict.js");
var message = require("./message.js");
var analysis = require("./analysis.js");
/*var gps = require("./gps.js");*/
var cur_city = "上海市";
var cur_bponit;
var cur_bis_name;
var cur_district_name = null;
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
	initTabNav();
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

function initCategoryScrollBar(currentContent) {
	$(currentContent).slimScroll({
		size: '7px',
		color: '#a1b2bd',
		opacity: .3,
		height: '100%',
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
		if ($(this)[0].checked) {
			house.show(ChartMap.getMap(),cur_district_name);
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
}


function initTabNav() {
	$(".business-tab").click();
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
	});
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
			$(".select-analy-bg").text("选择商圈");
			$(".btn-next").hide();
		} else if (index == 1) {
			openTabIndex = 1;
			$("ul.brand-analy").show();
			$(".select-analy-bg").text("选择行业");
			$(".btn-next").hide();
		} else {
			openTabIndex = 2;
			$("ul.analysis").show();
			$(".select-analy-bg").text("商业分析");
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
		initCategoryScrollBar(".second-category");
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
		/*if($(".movie-panel-ul").css("display")=='none'){
			alert("请先去选择所在的行业,否则不能进行分析哦");
			return false;
		}*/
		var fc_width = $(".sidebar").width();
		var sc_width = $("#second-category").width();
		var left_width = fc_width + sc_width;
		var thirdCategory = $(".third-category");
		thirdCategory.css("left", left_width);
		//thirdCategory.height($(window).height() - 55);
		thirdCategory.toggle();
		initCategoryScrollBar("#echart-content");
		allData = [];
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
	//选择商圈
	var businessRadio = $("input:radio[name='business-area']");
	businessRadio.change(function() {
			var dName = $(this).closest("li.district-item").find("a>span.text").text();
		    var bName = $(this).val();
		    //当前所在区
		    cur_district_name = dName;
		    cur_bis_name = bName;
			 if(dName){
				 $.get("api/getBussinessPoint",{d_name:dName},function(data){
					 drawBussinessCircle(data,bName);
				 },"json")
			 }
		})
	function drawBussinessCircle(data,bName){
		var iterator_arr = data.data[0].bussiness;
		for(let i = 0;i < iterator_arr.length;i++){
			if(iterator_arr[i].bussiness_name==bName){
				cur_bponit = iterator_arr[i];
				break;
			}
		}
		if (cur_bponit) {
			analysis.clearMapOverlays(ChartMap.getMap());
			var cPoint = cur_bponit.center_point;
			analysis.drawCircle(ChartMap.getMap(), cPoint, 500,1000);
			//brand_sanlin.initTrading(ChartMap.getMap()); //TODB delete
		} else {
			analysis.clearMapOverlays(ChartMap.getMap());
			$(".analysis-item input").each(function() {
				this.checked = false;
			})
		}
	}
	//选择行业
	var bisNatureRadio = $("input:radio[name='industry']");
	bisNatureRadio.change(function() {
		var selectVal = $(this).val();
		$(".firm-name").text(selectVal);
		//选择行业后，分析面板的行业分析出现
        var childrens = $(this).parents("ul.nav-children").find("li>a");
		for(let i = 0;i < childrens.length ; i++){
			var val = childrens[i].text;
			if(val == selectVal){
				continue;
			}
			var li = "<li><a><input type='checkbox'  name='analysis-input' value='"+val+"'/>"+val+"</a></li>";
			$(".industry-common").append(li);
		}
		$(".movie-panel-ul").show();
	});

	//选择分析项

	//var brandChk2 = $("[name = analysis-input]:checkbox");
	$(".industry-common").on("change","li input[name='analysis-input']",function(){
			var arr = [];
			//选择
			var businessRadio = ($("input[name='business-area']:checked").length == 0);
			if (businessRadio) {
				this.checked = false;
				message.alert("请选择商圈");
				return false;
			}
			var bisNatureRadio = ($("input[name='industry']:checked").length == 0);
			if (bisNatureRadio) {
				message.alert("请选择行业");
				this.checked = false;
				return false;
			}

			if ($("input:checked").length > 10) {
				message.alert("最多勾选10条");
				this.checked = false;
				return false;
			}
			$(".industry-common input:checked").each(function() {
				arr.push(this.value);
			})
		   var options;
		   if(cur_bponit) {
			   options = GPS.distanceToBoundaryMaxMin(cur_bponit.center_point.lat, cur_bponit.center_point.lng, 1000);
			   brand.loadDatas(ChartMap.getMap(),arr,options)
		   }
	});
	var analysis_tabs = $(".analysis-tab");
	$(".analysis-tab-hy").click(function(){
		$("#pie-content").empty();
		$("#pie-content-all").empty().height(400);
		analysis_tabs.removeClass("box-shadow-tab");
		$(this).addClass("box-shadow-tab");
		allData = [];
		initHYAnalysis();
		initHYAnalysisAll();
	});
	$("li.analysis-tab-xf").on("click",function(){
		$("#pie-content").empty();
		$("#pie-content-all").empty().height(400);
		analysis_tabs.removeClass("box-shadow-tab");
		$(this).addClass("box-shadow-tab");
		allData = [];
		initXFAnalysis();
		initXFAnalysisAll();
	});
	$("li.analysis-tab-zz").on("click",function(){
		$("#pie-content").empty();
		$("#pie-content-all").empty().height(0);
		analysis_tabs.removeClass("box-shadow-tab");
		$(this).addClass("box-shadow-tab");
		allData = [];
		house.getHousePrice(map,cur_district_name,cur_bis_name);
	});
	$("li.analysis-tab-sp").on("click",function(){
		$("#pie-content").empty();
		$("#pie-content-all").empty().height(0);
		analysis_tabs.removeClass("box-shadow-tab");
		$(this).addClass("box-shadow-tab");
		allData = [];
		shop.getShopData(cur_district_name,cur_bis_name);
	});
    function initHYAnalysis(){
		var selectedVal = [];
		$("input[name='analysis-input']:checked").each(function(i,item){
			selectedVal.push($(item).val())
		});
        if(selectedVal && selectedVal.length > 0){
			getIndustryValue(selectedVal,appendDataCallback);
			initAnalyChart("pie-content",allData,cur_district_name+"已选各行业占比统计");
		}
	}
	function initHYAnalysisAll(){
		allData = [];
		var selectedVal = [];
		$("input[name='analysis-input']").each(function(i,item){
			selectedVal.push($(item).val())
		});
		if(selectedVal && selectedVal.length > 0){
			getIndustryValue(selectedVal,appendDataCallback);
			var all_data = allData.sort(sortArr("value")).slice(0,5);
			initAnalyChart("pie-content-all",all_data,cur_district_name+"占比最大的行业");
		}
	}
	function initXFAnalysis(){
		var selectedVal = [];
		$("input[name='analysis-input']:checked").each(function(i,item){
			selectedVal.push($(item).val())
		});
		if(selectedVal && selectedVal.length > 0){
			getXFIdustryPrice(selectedVal,appendDataCallback);
			initAnalyLine("pie-content",allData,cur_district_name+"已选各行业消费指数");
		}
	}
	function initXFAnalysisAll(){
		var selectedVal = [];
		$("input[name='analysis-input']").each(function(i,item){
			selectedVal.push($(item).val())
		});
		if(selectedVal && selectedVal.length > 0){
			getXFIdustryPrice(selectedVal,appendDataCallback);
			var all_data = allData.sort(sortArr("value")).slice(0,5);
			initAnalyLine("pie-content-all",all_data,cur_district_name+"消费指数最高的行业");
		}
	}

	var allData = [];
	function appendDataCallback(data){
		allData.push(data);
	}

	function sortArr(property){
		return function(a,b){
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	}
	function getIndustryValue(selectedVal,callback){
		for(var i = 0; i < selectedVal.length ;i++){
			$.get("api/getIndustryValue",{disName:cur_district_name,selectName:selectedVal[i]},function(data){
				var new_data = {
					name:selectedVal[i],
					value:data.data.length
				}
				callback(new_data);
			},"json")
		}
	}
	function getXFIdustryPrice(selectedVal,callback){
		allData = [];
		for(var i = 0; i < selectedVal.length ;i++){
			$.get("api/getIndustryValue",{disName:cur_district_name,selectName:selectedVal[i]},function(data){
				if(data && data.data.length > 0){
					var new_data = {
						name:selectedVal[i],
						value:meanPrice(data.data)
					}
					function meanPrice(arr){
						var sum = 0;
						for(let i = 0;i < arr.length;i++){
							if(arr[i].price==null || arr[i].price==''){
								arr[i].price = 0;
							}
							sum += arr[i].price;
						}
						return sum/arr.length;
					}
					callback(new_data);
				}
			},"json")
		}
	}

	function initAnalyChart(contentID,data,text) {
		var dataNames = [];
		for(let i = 0;i < data.length;i++){
			dataNames.push(data[i].name);
		}
		var mChart = echarts.init(document.getElementById(contentID));
		var option = {
			title: {
				text: text,
				subtext: '',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: dataNames
			},
			series: [{
				type: 'pie',
				radius: '50%',
				center: ['50%', '60%'],
				data: data,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
		mChart.setOption(option);
	}
	function initAnalyLine(contentID,data,text) {
		var dataX = [];
		var dataY = [];
		for(let i = 0;i < data.length;i++){
			dataX.push(data[i].name);
			dataY.push(data[i].value);
		}
		var mChart = echarts.init(document.getElementById(contentID));
		var option = {
			title : {
				text: text,
				subtext: '若图标上没有出现，则表示不存在该分类'
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:[]
			},
			toolbox: {
				show : true,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					magicType : {show: true, type: ['line', 'bar']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [
				{
					type : 'category',
					data : dataX
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'人均消费指数',
					type:'bar',
					data:dataY,
					itemStyle: {
						normal: {
							color: function(params) {
								// build a color map as your need.
								var colorList = [
									'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
									'#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
									'#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
								];
								return colorList[params.dataIndex]
							}
						}
					}
				}
			]
		};
		mChart.setOption(option);
	}
}