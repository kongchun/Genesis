$(function(){ChartMap.init();ChartMap.getChart(),ChartMap.getMap()});var ChartMap={chart:null,map:null,init:function(){this.initChart(),this.initMap()},create:function(e){return echarts.init(document.getElementById(e),"macarons")},initChart:function(){var e=this.create("map"),t={bmap:{center:[121.523859,31.258039],zoom:12,roam:!0,mapStyle:{styleJson:[{featureType:"all",elementType:"all",stylers:{lightness:30,saturation:-75}},{featureType:"road",elementType:"geometry.fill",stylers:{color:"#ffffff",visibility:"on"}},{featureType:"subway",elementType:"geometry.fill",stylers:{color:"#d9d9d9"}},{featureType:"road",elementType:"geometry.stroke",stylers:{color:"#f3f3f3",visibility:"on"}},{featureType:"poi",elementType:"all",stylers:{visibility:"off"}},{featureType:"all",elementType:"labels.text.fill",stylers:{color:"#828282"}},{featureType:"all",elementType:"labels.text.stroke",stylers:{color:"#ffffff"}},{featureType:"subway",elementType:"labels.icon",stylers:{color:"#ffffff",visibility:"off"}},{featureType:"highway",elementType:"labels",stylers:{visibility:"off"}}]}},legend:{orient:"vertical",right:20,top:15,padding:10,backgroundColor:"rgba(255,255,255,0.8)",data:[]},series:[{type:"pie",data:[]}]};e.setOption(t),this.chart=e},getChart:function(){return this.chart},getMap:function(){return this.map},initMap:function(){var e=this.chart.getModel().getComponent("bmap").getBMap(),t=new BMap.NavigationControl({});e.addControl(t),e.removeEventListener("click"),this.map=e}};