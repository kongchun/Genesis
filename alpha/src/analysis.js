//在地图上画圆
export var drawCircle = function(map,centerPoint,radius,radiusOut){
      var cPoint= new BMap.Point(centerPoint.lng,centerPoint.lat);
      var marker = new BMap.Marker(cPoint);
      var circle = new BMap.Circle(cPoint,radius,{strokeWeight: 1,strokeColor:"#317EF4",fillColor:"#BCC7CB",strokeStyle:"dashed"});
      var circleOut = new BMap.Circle(cPoint,radiusOut,{strokeWeight: 1,strokeColor:"#97A77B",fillColor:"#C3E5C0",strokeStyle:"dashed"})
      map.addOverlay(marker);
      map.addOverlay(circleOut);
      map.addOverlay(circle);
      map.setZoom(14);
      map.centerAndZoom(cPoint,14);
}

export var clearMapOverlays = function(map){
      map.clearOverlays();
}

