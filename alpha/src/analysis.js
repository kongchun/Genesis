//在地图上画圆
export var drawCircle = function(map,centerPoint,radius){
      var cPoint= new BMap.Point(centerPoint.lng,centerPoint.lat);
      var marker = new BMap.Marker(cPoint);
      var circle = new BMap.Circle(cPoint,radius,{strokeWeight: 2,strokeColor:"#317EF4",fillColor:"#DDE5F2",strokeStyle:"dashed"});
      map.addOverlay(marker);
      map.addOverlay(circle);
      map.setViewport(circle.getBounds());
}

export var clearMapOverlays = function(map){
      map.clearOverlays();
}

