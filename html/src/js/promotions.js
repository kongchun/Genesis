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









require(["app", "jquery", "jqueryui", "bootstrap","echarts","macarons"], function(app, $, $ui, bootstrap, echarts,macarons) {
    $(function() {
        App.init();

                        // 基于准备好的dom，初始化echarts图表

                                  $(".datepicker").datepicker();
        
        chart1();
         chart2();
       
    })


        function chart1(){
          var myChart = echarts.init(document.getElementById('chart1')); 
          myChart.setTheme("macarons")
           option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['访问数']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['8.27','8.30','9.2','9.5','9.8','9.11','9.15']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'访问数',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            }
               
        ]
    };
                                
             myChart.setOption(option); 
         }


           function chart2(){
          var myChart = echarts.init(document.getElementById('chart2')); 
          myChart.setTheme("macarons")
           option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['下载数']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['8.27','8.30','9.2','9.5','9.8','9.11','9.15']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'下载数',
                type:'line',
                stack: '总量',
                data:[80, 92, 71, 94, 70, 130, 110]
            }
               
        ]
    };
                                
             myChart.setOption(option); 
         }
})
