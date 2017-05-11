var mapvLayer = null;
var options = {
	fillStyle: '#99C1DB',
	strokeStyle: 'white', // 描边颜色
	lineWidth: 1,
	size: 60,
	globalAlpha: 0.8,
	gradient: {
		0.2: "rgba(64, 134, 181,0.25)",
		0.5: "rgba(64, 134, 181,0.5)",
		0.8: "rgba(64, 134, 181,0.75)",
		1.0: "rgba(64, 134, 181,1)"
	},
	label: {
		show: true,
		fillStyle: 'white',
		average: true
		//shadowColor: 'black',
		// font: '20px Arial',
		//shadowBlur: 10,
	},
	max: 80000,

	draw: 'grid'
}
export var show = function(map,dname) {
	if(dname==null){
		dname = "all";
	}
	getAreaData(map,dname);
}
export var getHousePrice = function(map,dname,bName) {
	getHousePriceAjax(map,dname,bName);
}
//获取行政区范围内某商圈的住宅数据
function getHousePriceAjax(map,dname,bName){
	$.get("api/getAreabByDistrictAndName",{districtName:dname,bisName:bName},function(data){
		housePriceCallBack(data.data);
	})
}
//住宅数据回调函数:动态的创建表格数据,并填充到分析页
function housePriceCallBack(data){
	if(data && data.length > 0){
		var all_data = getSorted10Data(data);
		CreateTable(all_data);
	}else{
		$("#pie-content").empty();
		$("#pie-content-all").empty();
		$("#pie-content").html("<div class='no-tips'>暂无该区域的住宅价格数据</div>");
	}
}
//构建表格
function CreateTable(arr) {
	$("#pie-content").empty();
	$("#pie-content-all").empty().height(0);
	var table=$("<table class='houseTable'>");
	table.appendTo($("#pie-content"));
	var caption = $("<caption class='center table-title '>"+arr[0].district+arr[0].area+"住宅价格</caption>");
	caption.appendTo(table);
	var thr = $("<tr class='houseTableTr'></tr>");
	thr.appendTo(table);
	var th = $("<th class='center'>#</th><th class='center'>地点</th><th class='center'>单位平米价格(㎡)</th>");
	th.appendTo(thr);
	for(var i=0;i<arr.length;i++) {
		var tr=$("<tr class='houseTableTr'></tr>");
		tr.appendTo(table);
			var tdNo = $("<td>"+(i+1)+"</td>");
		    var tdAds = $("<td>"+arr[i].name+"</td>");
		    var averPrice = $("<td>"+arr[i].price+"/㎡</td>");
		    tdNo.appendTo(tr);
			tdAds.appendTo(tr);
			averPrice.appendTo(tr);
	}
	$("#pie-content").append("</table>");
}
function getSorted10Data(arr){
	return arr.sort(sortArr("price")).slice(0,10);
	function sortArr(property){
		return function(a,b){
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	}
}
function getAreaData(map,districtName){
	$.get("api/getAreaData",{districtName:districtName},function(data){
		getDataSet(map,data.data);
	})
}
function getDataSet(map,areaData){
	var randomCount = areaData.length;
	var myData = [];
	//构造数据
	while (randomCount--) {
		var cityCenter = areaData[randomCount];
		if(cityCenter.point){
			myData.push({
				geometry: {
					type: 'Point',
					coordinates: [cityCenter.point.lng, cityCenter.point.lat]
				},
				count: cityCenter.price
			});
		}
	}
	var dataSet = new mapv.DataSet(myData);
	if (mapvLayer == null) {
		mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
	}
	mapvLayer.show(map);
}
export var hide = function(map) {
	mapvLayer.hide(map);
}