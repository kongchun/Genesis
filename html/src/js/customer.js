require.config({
    baseUrl: "js",
    paths: {
        "jquery": '//apps.bdimg.com/libs/jquery/1.9.1/jquery.min',
        "jquery.cookie": '//apps.bdimg.com/libs/jquery.cookie/1.4.1/jquery.cookie.min',
        "jqueryui": '//cdn.bootcss.com/jqueryui/1.11.4/jquery-ui.min',
        "bootstrap": '//apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min',
        "bdapi": "//api.map.baidu.com/getscript?v=2.0&ak=8hr2ZB5zsFI6dcId9Uj6ORy2kuLIP8vA&services=&t=20160401164342",
        "heatmap": "//api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min",
        "jquery.slimscroll": "jquery.slimscroll",
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

require(["app", "jquery", "jqueryui", "bootstrap", "echarts", "macarons"], function(app, $, $ui, bootstrap, echarts, macarons) {
    $(function() {
        App.init();
        chart1();
        chart2();
        //chart3();
    })
  function chart2() {
      var myChart = echarts.init(document.getElementById('chart2'),macarons);
        //yChart.setTheme("macarons")
        option = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: false,
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2016-01-11', '2016-01-12', '2016-01-13', '2016-01-14', '2016-01-15', '2016-01-16', '2016-01-17']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [{
                     name:'顾客数',
                    type: 'line',
                    data: [2652,1652,2652,2512,2901,3971,3806]
                },

            ]
        };

        myChart.setOption(option);
    }


    function chart3() {
        var myChart = echarts.init(document.getElementById('chart3'), macarons);
        //myChart.setTheme(macarons)
        option = {
            title: {
                text: '年龄分布',
            },
            tooltip: {
                trigger: 'axis',
                formatter: "{a} <br/>{b} : {c}%"
            },

            calculable: true,
            xAxis: [{
                type: 'category',
                data: ["18以下", "18-24", "25-34", "35-44", "45-54", "55-64", "65以上"]
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                    name: '年龄分布',
                    type: 'bar',
                    data: [3.2, 18.5, 23.3, 25.1, 20.5, 6.6, 2.8]
                }

            ]
        };

        myChart.setOption(option);
    }


    function chart1() {
        var myChart = echarts.init(document.getElementById('chart1'),macarons);
        //yChart.setTheme("macarons")
        option = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: false,
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2016-01-01','2016-01-02','2016-01-03','2016-01-04','2016-01-05','2016-01-06','2016-01-07','2016-01-08','2016-01-09','2016-01-10','2016-01-11', '2016-01-12', '2016-01-13', '2016-01-14', '2016-01-15', '2016-01-16', '2016-01-17']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [{
                     name:'累积顾客数',
                    type: 'line',
                    data: [13652,16652,23652,34512,36901,38971,42006,53154,61012,70124,74172, 76172, 77187, 78157, 80145, 82141, 83401]
                },

            ]
        };
        myChart.setOption(option);
    }

})
