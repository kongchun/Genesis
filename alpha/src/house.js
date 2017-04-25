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
function getAreaData(map,districtName){
	$.get("api/getAreaData",{districtName:districtName},function(data){
		getDataSet(map,data.data);
	})
}
function getDataSet(map,areaData){
	var randomCount = areaData.length;
	var myData = []
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

	console.log(myData);
	var dataSet = new mapv.DataSet(myData);
	if (mapvLayer == null) {
		mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
	}
	mapvLayer.show(map);
}
export var hide = function(map) {
	mapvLayer.hide(map);
}