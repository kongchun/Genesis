require.config({
    baseUrl: "js",
    paths: {
        "jquery": '//apps.bdimg.com/libs/jquery/1.9.1/jquery.min',
        "jquery.cookie": '//apps.bdimg.com/libs/jquery.cookie/1.4.1/jquery.cookie.min',
        "jqueryui": '//cdn.bootcss.com/jqueryui/1.11.4/jquery-ui.min',
        "bootstrap": '//apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min',
        "bdapi": "//api.map.baidu.com/getscript?v=2.0&ak=8hr2ZB5zsFI6dcId9Uj6ORy2kuLIP8vA&services=&t=20160401164342",
        "heatmap": "//api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min",
        "jquery.easypiechart": "jquery.easypiechart",
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
        "jquery.easypiechart": {
            deps: ['jquery']
        },
        "jquery.slimscroll": {
            deps: ['jquery']
        },
        "jquery.cookie": {
            deps: ['jquery']
        },
        "app": {
            deps: ['jquery', "jquery.cookie", "jquery.slimscroll", "jquery.easypiechart"]
        }

    }
});

require(["app", "bootstrap", "echarts", "macarons"], function(app, bootstrap, echarts, macarons) {
    $(function() {
        App.init();
        chart0();
        chart1();
        chart2();
        chart3();
        chart4();
        chart5();
    })

    function chart0() {
        //Pie 1
        $('#dash_pie_1').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent) + "%");
            },
            lineWidth: 6,
            barColor: Theme.colors.purple
        });
        $('#dash_pie_1').data('easyPieChart');
        //Pie 2
        $('#dash_pie_2').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent) + "%");
            },
            lineWidth: 6,
            barColor: Theme.colors.yellow
        });

        //Pie 3
        $('#dash_pie_3').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent) + "%");
            },
            lineWidth: 6,
            barColor: Theme.colors.pink
        });


        $('#dash_pie_4').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent) + "%");
            },
            lineWidth: 6,
            barColor: Theme.colors.green
        });

    }



    function chart1() {
        var myChart = echarts.init(document.getElementById('chart1'),macarons);
        //myChart.setTheme("macarons")
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
                    name: '日销售额',
                    type: 'line',
                    data: [122364, 102783, 132754, 120100, 180783, 237425, 210782],
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    }
                },

            ]
        };
        myChart.setOption(option);
    }


    function chart2() {
        var myChart = echarts.init(document.getElementById('chart2'), macarons);
        //myChart.setTheme(macarons)
        option = {
            title: {
                text: '男女比例',
                x: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 30,
                data: ['男性', '女性']
            },
            calculable: true,
            series: [{
                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner',
                            formatter: function(params) {
                                return (params.percent - 0).toFixed(0) + '%'
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                name: '男女比例',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                        value: 3350,
                        name: '男性'
                    }, {
                        value: 4200,
                        name: '女性'
                    }

                ]
            }]
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

    function chart4() {
        var myChart = echarts.init(document.getElementById('chart4'), macarons);
        //myChart.setTheme(macarons)
        option = {
            title: {
                text: '用户偏好',
            },
            tooltip: {
                trigger: 'axis'
            },

          
            calculable: true,
            xAxis: [{
                type: 'value',
                boundaryGap: [0, 0.01]
            }],
            yAxis: [{
                type: 'category',
                data: ['房车', '旅游', '教育', '金融', '购物', '餐饮']
            }],
            series: [{
                name: '热度',
                type: 'bar',
                data: [16224, 18203, 23489, 29034, 104970, 131744]
            }]
        };


        myChart.setOption(option);
    }

     function chart5() {
        var myChart = echarts.init(document.getElementById('chart5'), macarons);
        //myChart.setTheme(macarons)
        option = {
            title: {
                text: '消费类目',
            },
            tooltip: {
                trigger: 'axis'
            },

          
            calculable: true,
            yAxis: [{
                type: 'value'
            }],
            xAxis: [{
                type: 'category',
                data: ['家居', '服装', '母婴', '食品', '数码', '美容','运动','户外','娱乐','家装']
            }],
            series: [{
                name: '热度',
                type: 'bar',
                data: [382, 842, 1029, 1841, 1201, 627,414,1288,587]
            }]
        };


        myChart.setOption(option);
    }




})
