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
//获得图形分析页的商铺租金数据
export  var getShopData = function(dName,bName){
	$.get("api/getShopDataByDistrictAndName",{districtName:dName,bisName:bName},function(data){
		shopPriceCallBack(data.data);
	})
}
function shopPriceCallBack(data){
	if(data && data.length > 0){
		var all_data = getSorted10Data(data);
		CreateTable(all_data);
	}else{
		$("#pie-content").html("<div class='no-tips'>暂无该区域的商铺租金数据</div>");
	}
}
function getSorted10Data(arr){
	return arr.sort(sortArr("averalPrice")).slice(0,10);
	function sortArr(property){
		return function(a,b){
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	}
}
//构建表格
function CreateTable(arr) {
	$("#pie-content").empty();
	$("#pie-content-all").empty().height(0);
	var table=$("<table class='houseTable'>");
	table.appendTo($("#pie-content"));
	var caption = $("<caption class='center table-title '>"+arr[0].district+arr[0].area+"商铺租金</caption>");
	caption.appendTo(table);
	var thr = $("<tr class='houseTableTr'></tr>");
	thr.appendTo(table);
	var th = $("<th class='center'>#</th><th class='center'>地点</th><th class='center'>单位平米租金(㎡)</th>");
	th.appendTo(thr);
	for(var i=0;i<arr.length;i++) {
		var tr=$("<tr class='houseTableTr'></tr>");
		tr.appendTo(table);
		var tdNo = $("<td>"+(i+1)+"</td>");
		var tdAds = $("<td>"+arr[i].name+"</td>");
		var averPrice = $("<td>"+arr[i].averalPrice+"/㎡</td>");
		tdNo.appendTo(tr);
		tdAds.appendTo(tr);
		averPrice.appendTo(tr);
	}
	$("#pie-content").append("</table>");
}

