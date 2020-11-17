require.config({
    baseUrl: "js",
    paths: {
        "jquery": '//apps.bdimg.com/libs/jquery/1.9.1/jquery.min',
        "jquery.cookie": '//apps.bdimg.com/libs/jquery.cookie/1.4.1/jquery.cookie.min',
        "jqueryui": '//cdn.bootcss.com/jqueryui/1.11.4/jquery-ui.min',
        "bootstrap": '//apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min',
        "bdapi": "//api.map.baidu.com/getscript?v=2.0&ak=8hr2ZB5zsFI6dcId9Uj6ORy2kuLIP8vA&services=&t=20160401164342",
        "heatmap": "//api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min",
        "jquery.slimscroll":"jquery.slimscroll",
        "app": "script"
    },

    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        "heatmap": {
            deps: ['bdapi', 'gps']
        },
        "jqueryui": {
            deps: ['jquery']
        },
        "jquery.slimscroll": {
            deps: ['jquery']
        },
        "jquery.cookie": {
            deps: ['jquery']
        },
        "app": {
            deps: ['jquery', "jquery.cookie", "jquery.slimscroll"]
        }

    }
});

window.BMap_loadScriptTime = (new Date).getTime();


define("shanghaimap", ["bdapi"], function() {
    var map = new BMap.Map("container");
    var point = new BMap.Point(121.523859, 31.258039);
    map.centerAndZoom(point, 14); // 初始化地图，设置中心点坐标和地图级别 
    map.enableScrollWheelZoom(); // 允许滚轮缩放
    var top_left_navigation = new BMap.NavigationControl(); 
    map.addControl(top_left_navigation);
    return map;
});



define("myHeatMap", ["shanghaimap", "heatmap"], function(map) {

    var heatmapOverlay = null;
    var myHeatMap = {
        show: function(points,max) {
            showHeatmap(points,max);
        },
        hide: function() {
            closeHeatmap();
        },
        remove: function() {
            map.removeOverlay(heatmapOverlay);
            heatmapOverlay = null;
        }
    }

    function gpsCover(obj) {
        var bd = GPS.bd_encrypt(obj.lat, obj.lng);
        return {
            "lng": parseFloat(bd.lon),
            "lat": parseFloat(bd.lat),
            "count": obj.count
        }
    }

    function coverPoints(points) {
        for (var i = 0; i < points.length; i++) {
            points[i] = gpsCover(points[i]);
        }
    }

    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    function showHeatmap(points,max) {

        if (!isSupportCanvas()) {
            alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
        }
        var max = max || 6;

        //console.log((points))
        //coverPoints(points);
        //console.log((points))


        heatmapOverlay = new BMapLib.HeatmapOverlay({
            "radius": 20
        });
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({
            data: points,
            max: max
        });

    }

    function closeHeatmap() {
        heatmapOverlay.hide();
    }

    return myHeatMap;
})


require(["gwData","myHeatMap"], function(gwData, myHeatMap) {

  

});


var addr = {
    "北外滩商圈": [
        [121.500431, 31.234144],
        [121.552990, 31.279110]
    ],
    "大宁商圈": [
        [121.442832, 31.233495],
        [121.495421, 31.296448]
    ],
    "卢湾商圈": [
        [121.42497, 31.18102],
        [121.498556, 31.23320]
    ],
    "三林商圈": [
        [121.507267,31.187762],
        [121.559826,31.232728]
    ]
};




require(["app", "jquery", "jqueryui", "bootstrap", "shanghaimap","allData", "myHeatMap"], function(app, $, $ui, bootstrap, map,allData,myHeatMap) {
    $(function() {
        App.init();


        //setCenterAndArea("北外滩商圈");
        //setCenterAndArea("大宁商圈");
        //setCenterAndArea("卢湾商圈");
        //setCenterAndArea("三林商圈");
        $("#btnAnalysis").click(function(){

            try{
            myHeatMap.hide();
            }catch(e){}

            var area = $(".area").val();


            setCenterAndArea(area);


            var time = $(".time").val();
             if(time !="昨天"){
                 alert("演示请选择【昨天】");
                return;
             }

            var tt = (allData[area][time]);

            var type = $(".type");
            var data = [];
            var max = 6;
            type.each(function(i,t){


                var dom = $(t);

                var checked = dom.prop("checked");
                var val = dom.val();

                if(checked){
                    data = data.concat(tt[val]);
                    max = max*1.2;
                }


            })



            if(data.length==0){
                alert("演示请选择【类型】");
                return;
            }

     
            myHeatMap.show(data,max)
            
        })
    })
    var polyline = null;


    function setCenterAndArea(key) {
        var data = addr[key];
        var x1 = data[0][0];
        var y1 = data[0][1];
        var x2 = data[1][0];
        var y2 = data[1][1];

        getMapCenter(x1, y1, x2, y2);
        getMapArea(x1, y1, x2, y2)
    }


    function getMapCenter(x1, y1, x2, y2) {
        x = (x1 + x2) / 2;
        y = (y1 + y2) / 2;
        var point = new BMap.Point(x, y);
        map.centerAndZoom(point, 13); // 初始化地图，设置中心点坐标和地图级别 
    }


    function getMapArea(x1, y1, x2, y2) {
        if (polyline != null) {
             map.removeOverlay(polyline);
        }


        var x1=121.473941   //121.465621
        var y1=31.230481   //31.223361
        var x2=121.457301 
        var y2=31.216241

        polyline = new BMap.Polygon([
            new BMap.Point(x1, y1),
            new BMap.Point(x1, y2),
            new BMap.Point(x2, y2),
            new BMap.Point(x2, y1),
            new BMap.Point(x1, y1)

        ], {
            strokeColor: "blue",
            strokeWeight: 1,
            strokeOpacity: 0.5,
            fillOpacity:0.4
        });
        //map.addOverlay(polyline); //增加折线


        //var pStart = new BMap.Point(x1, y1);
        //var pEnd = new BMap.Point(x2, y2);
         //var bs = new BMap.Bounds(pStart,pEnd);  

        //var local = new BMap.LocalSearch(map, {
            //renderOptions:{map: map}
        //});
        //121.465621,31.223361
        //local.searchInBounds("百盛购物中心(淮海店)", bs);

        var point = new BMap.Point(121.465621,31.223361);
        var marker = new BMap.Marker(point);
            var circle = new BMap.Circle(point,800,{strokeColor:"blue", strokeWeight:1, strokeOpacity:0.5,fillOpacity:0.4}); //创建圆
        map.addOverlay(marker);  
         //map.addOverlay(circle);  


    }
})
