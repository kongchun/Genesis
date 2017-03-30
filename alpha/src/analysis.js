/**
 * Created by Administrator on 2017/3/27.
 */
//district参数的格式 xx市xx区 eg："上海市黄浦区" /"北京市海淀区"
/*export var getBoundary = function(map,district){
    var bdary = new BMap.Boundary();
    bdary.get(district, function(rs){       //获取行政区域
        map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
            return ;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#317EF4",fillColor:"#DDE5F2",strokeStyle:"dashed"}); //建立多边形覆盖物
            map.addOverlay(ply);
            pointArray = pointArray.concat(ply.getPath());
        }
        map.setViewport(pointArray);
    });
}*/
//在地图上画圆
export var drawCircle = function(map, centerPoint, radius, businessName) {
  //map.clearOverlays();
  var cPoint = new BMap.Point(centerPoint.lng, centerPoint.lat);
  var marker = new BMap.Marker(cPoint);
  var circle = new BMap.Circle(cPoint, radius, {
    strokeWeight: 2,
    strokeColor: "#317EF4",
    fillColor: "#DDE5F2",
    strokeStyle: "dashed"
  });
  map.addOverlay(marker);
  map.addOverlay(circle);
}