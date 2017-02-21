var marker = require("./marker.js");
var line = require("./line.js");
$(function() {
	var map = initMap();
	line.init(map);
	line.show(map, 1);
	line.show(map, 2);
	line.show(map, 3);
	line.show(map, 4);
	//line.hide(map);

})

function initMap() {
	var map = new BMap.Map("map"); // 创建地图实例  
	var top_left_navigation = new BMap.NavigationControl();
	var top_left_control = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_TOP_RIGHT
	}); // 左上角，添加比例尺
	map.centerAndZoom("上海市", 12); // 初始化地图，设置中心点坐标和地图级别  
	map.addControl(top_left_navigation);
	//map.addControl(top_left_control);
	map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
	return map;
}