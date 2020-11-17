require.config({
    baseUrl: "js",
    paths: {
        "jquery": '//apps.bdimg.com/libs/jquery/1.9.1/jquery.min',
        "jquery.cookie": '//apps.bdimg.com/libs/jquery.cookie/1.4.1/jquery.cookie.min',
        "jqueryui": '//cdn.bootcss.com/jqueryui/1.11.4/jquery-ui.min',
        "bootstrap": '//apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min',
        "jquery.slimscroll":"jquery.slimscroll",
        "app": "script"
    },

    shim: {
        bootstrap: {
            deps: ['jquery']
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





require(["app", "jquery", "jqueryui", "bootstrap","echarts","macarons"], function(app, $, $ui, bootstrap, ec,macarons) {
    $(function() {
        App.init();

        chart1( ec,macarons);
        chart2( ec,macarons);
        chart3( ec,macarons);
                       
    })

    
})
  

function chart1(ec,macarons){

var myChart = ec.init(document.getElementById("chart1"),macarons); 
        option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['教育','餐饮','购物','金融','理财','旅游','房产','汽车']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['北外滩商圈','大宁商圈','卢湾商圈','三林商圈']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],

        series : [
            {
                name:'餐饮',
                type:'bar',
                stack: '休闲娱乐',
                data:[466, 946, 1222, 527]
            },
            {
                name:'购物',
                type:'bar',
                stack: '休闲娱乐',
                data:[25274, 54380, 69006, 28471]
            },
            {
                name:'旅游',
                type:'bar',
                stack: '休闲娱乐',
                data:[6726, 13895, 18615, 8019]
            },
            {
                name:'金融',
                type:'bar',
                stack: '金融商务',
                data:[15527, 32215, 42352, 17841]
            },
            {
                name:'理财',
                type:'bar',
                stack: '金融商务',
                data:[800, 600, 1000, 1200]
            },
            {
                name:'教育',
                type:'bar',
                data:[12809, 26761, 34408, 15037]
            },
            {
                name:'汽车',
                type:'bar',
                barWidth : 5,
                stack: '生活出行',
                data:[92, 232, 229, 132]
            },
            {
                name:'房产',
                type:'bar',
                stack: '生活出行',
                data:[5015, 10095, 12537, 5831]
            }
        ]
    };

     myChart.setOption(option); 


    chart('北外滩商圈','chart1-1',[
                        {value:466, name:'餐饮'},
                        {value:12809, name:'教育'},
                        {value:25274, name:'购物'},
                        {value:15527, name:'金融'},
                        {value:6726, name:'旅游'},
                        {value:5100, name:'车房'}
                    ])

    chart('大宁商圈','chart1-2',[
                        {value:946, name:'餐饮'},
                        {value:26761, name:'教育'},
                        {value:54380, name:'购物'},
                        {value:32215, name:'金融'},
                        {value:13895, name:'旅游'},
                        {value:232, name:'车房'}
                    ])


    chart('卢湾商圈','chart1-3',[
                        {value:1222, name:'餐饮'},
                        {value:34408, name:'教育'},
                        {value:69006, name:'购物'},
                        {value:42352, name:'金融'},
                        {value:18615, name:'旅游'},
                        {value:12537, name:'车房'}
                    ])


    chart('三林商圈','chart1-4',[
                        {value:527, name:'餐饮'},
                        {value:15037, name:'教育'},
                        {value:28471, name:'购物'},
                        {value:17841, name:'金融'},
                        {value:8019, name:'旅游'},
                        {value:5831, name:'车房'}
                    ])


        function chart(title,id,data){
            var myChart = ec.init(document.getElementById(id),macarons); 
            var option = {
                title : {
                    text: title,
                    textStyle:{fontSize:14},
                    x : 'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['餐饮','教育','购物','金融','旅游','车房']
                },
                toolbox: {
                    show : false
                },
                calculable : true,
                series : [
                    {
                        name:'商圈群体特征',
                        type:'pie',
                        radius : ['30%', '70%'],
                        //roseType : 'radius',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '30',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },

                        data:data
                    }
                ]
            };

            myChart.setOption(option); 
    }

}

function chart2(ec,macarons){
 var myChart = ec.init(document.getElementById("chart2-1"),macarons); 
option = {
    title: {
        text: '商圈特性',
        x:'left'
    },
    tooltip: {},
    legend: {
        orient : 'vertical',
        x : 'right',
        data: ['北外滩商圈', '大宁商圈','卢湾商圈','三林商圈']
    },
    radar: {
        // shape: 'circle',


        indicator: [
           { name: '餐饮', max: 1000},
           { name: '购物', max: 70000},
           { name: '教育', max: 35000},
           { name: '金融', max: 50000},
           { name: '旅游', max: 20000},
           { name: '车房', max: 15000}
        ]
    },
    series: [{
        name: '',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [466,25274,12809,15527,6726,5015],
                name : '北外滩商圈'
            },
             {
                value : [946,54380,26761,32215,13895,10095],
                name : '大宁商圈'
            },
                        {
                value : [299,69006,34408,42352,18615,12537],
                name : '卢湾商圈'
            },
             {
                value : [527,28471,34376,17841,8019,5831],
                name : '三林商圈'
            }
        ]
    }]
};

 myChart.setOption(option); 


 var myChart2 = ec.init(document.getElementById("chart2-2"),macarons); 
option2 = {
    title: {
        text: '人群特性',
        x:'left'
    },
    tooltip: {},
    legend: {
        orient : 'vertical',
        x : 'right',
        data: ['北外滩商圈', '大宁商圈','卢湾商圈','三林商圈']
    },
    radar: {
        shape: 'circle',


        indicator: [
           { name: '休闲娱乐', max: 5000},
           { name: '金融商务', max: 80000},
           { name: '文化教育', max: 35000}
        ]
    },
    series: [{
        name: '',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4754,45584,27440],
                name : '北外滩商圈'
            },
             {
                value : [2756,54380,26761],
                name : '大宁商圈'
            },
                        {
                value : [3739,69006,34408],
                name : '卢湾商圈'
            },
             {
                value : [2336,72661,34376],
                name : '三林商圈'
            }
        ]
    }]
};

 myChart2.setOption(option2); 
}

function chart3(ec,macarons){

 // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('chart3-1',macarons)); 
        
        var option = {
            title : {
                text: '',
                subtext: '北外滩商圈'
            },

            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['餐饮','车房','购物','金融','旅游','教育']
            },
            toolbox: {
                show : false
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['20151231','20160101','20160102','20160103','20160104','20160105','20160106']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'餐饮',
                    type:'line',
                    //stack: '总量',
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[1740,1170,1279,1228,1544,1582,1176]
                },
                {
                    name:'车房',
                    type:'line',
                    //stack: '总量',
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[2119, 1482, 1654, 1618, 1986, 1951, 1477]
                },
                {
                    name:'购物',
                    type:'line',
                   // stack: '总量',
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[9177, 6586, 7088, 6897, 8548, 8306, 6284]
                },
                {
                    name:'金融',
                    type:'line',
                   // stack: '总量',
                  //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[5713,3981,4324,3232,5369,5238,4990]
                },
                {
                    name:'教育',
                    type:'line',
                  //  stack: '总量',
                  //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[7345,5587,6457,5745,7852,7241,5217]
                }
                ,
                {
                    name:'旅游',
                    type:'line',
                  //  stack: '总量',
                    //itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[1900,1530,1390,1300,2040,2020,1260]
                }
            ]
        };

        // 为echarts对象加载数据 
        myChart.setOption(option); 



         var myChart2 = ec.init(document.getElementById('chart3-2',macarons)); 

            var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a','10a','11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'];
            var days = ['周六', '周五', '周四',
                    '周三', '周二', '周一', '周日'];

            var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
            data = data.map(function (item) {
                return [item[1], item[0], item[2]];
            });

            option2 = {
                title: {
                    text: '北外滩商圈-金融'
                },

                grid: {
                    left: 2,
                    bottom: 10,
                    right: 10,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: hours,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd',
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: days,
                    axisLine: {
                        show: false
                    }
                },
                series: [{
                    type: 'scatter',
                    symbolSize: function (val) {
                        return val[2] * 2;
                    },
                    data: data
                }]
            };
         myChart2.setOption(option2); 
}