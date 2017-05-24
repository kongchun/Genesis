var brand = require("./brand.js");
var main = require("./main.js");
var house = require("./house.js");
var shop = require("./shop.js");
//全局变量
export var GlobalMain = {
      cur_bponit:null,
      cur_bis_name:null,
      cur_district_name:null,
      allData:[]
}

export var AnalysisPage = {
      analysis_tabs:$(".analysis-tab"),
      init:function(){
            this.selectBussiness();
            this.selectIndustry();
            this.selectAnalysisItem();
            this.analysisPanelEvent();
            this.firstCheckeEvent();
      },
      analysisPanelEvent:function(){
            this.initAnalysisHy();
            this.initAnalysisXF();
            this.initAnalysisZZ();
            this.initAnalysisSP();
            this.initAnalysisRQ();
      },
      selectBussiness:function(){
            var that = this;
            var businessRadio = $("input:radio[name='business-area']");
            businessRadio.change(function() {
                  $("input:radio[name='industry'][value='私房菜']").prop("checked", "checked").change();
                  var dName = $(this).closest("li.district-item").find("a>span.text").text();
                  var bName = $(this).val();
                  //当前所在区
                  GlobalMain.cur_district_name = dName;
                  GlobalMain.cur_bis_name = bName;
                  $(".cur-bussiness").text(GlobalMain.cur_bis_name);
                  if(dName){
                        $.get("api/getBussinessPoint",{d_name:dName},function(data){
                              that.drawBussinessCircle(data,bName);
                        },"json")
                  }
            })
      },
      selectIndustry:function(){
            var bisNatureRadio = $("input:radio[name='industry']");
            bisNatureRadio.change(function() {
                  $(".industry-common-div").empty();
                  var selectVal = $(this).val();
                  $(".cur-industry").text(selectVal);
                  var childrens = $(this).parents("ul.industry-area").find("a.industy-area-item");
                  for(let i = 0;i < childrens.length ; i++){
                        var val = childrens[i].text;
                        if(val == selectVal){
                              continue;
                        }
                        var li = "<span class='analy-area-item'><a><input type='checkbox'  name='analysis-input' value='"+val+"'/>"+val+"</a></span>";
                        $(".industry-common-div").append(li);
                  }
            });
      },
      selectAnalysisItem:function(){
            $(".industry-common").on("change",".analy-area-item input[name='analysis-input']",function(){
                  var arr = [];
                  //选择
                  var businessRadio = ($("input[name='business-area']:checked").length == 0);
                  if (businessRadio) {
                        this.checked = false;
                        message.alert("请选择商圈");
                        return false;
                  }
                  var bisNatureRadio = ($("input[name='industry']:checked").length == 0);
                  if (bisNatureRadio) {
                        message.alert("请选择行业");
                        this.checked = false;
                        return false;
                  }

                  if ($("input:checked").length > 10) {
                        message.alert("最多勾选10条");
                        this.checked = false;
                        return false;
                  }
                  $(".industry-common input:checked").each(function() {
                        arr.push(this.value);
                  })
                  var options;
                  if(GlobalMain.cur_bponit) {
                        options = GPS.distanceToBoundaryMaxMin(GlobalMain.cur_bponit.center_point.lat, GlobalMain.cur_bponit.center_point.lng, 1000);
                        brand.loadDatas(main.ChartMap.getMap(),arr,options)
                  }
            });
      },
      drawBussinessCircle:function(data,bName){
            var iterator_arr = data.data[0].bussiness;
            for(let i = 0;i < iterator_arr.length;i++){
                  if(iterator_arr[i].bussiness_name==bName){
                        GlobalMain.cur_bponit = iterator_arr[i];
                        break;
                  }
            }
            if (GlobalMain.cur_bponit) {
                  main.ChartMap.clearMapOverlays(main.ChartMap.getMap());
                  var cPoint = GlobalMain.cur_bponit.center_point;
                  main.ChartMap.drawCircle(main.ChartMap.getMap(), cPoint, 500,1000);
            } else {
                  main.ChartMap.clearMapOverlays(main.ChartMap.getMap());
                  $(".analysis-item input").each(function() {
                        this.checked = false;
                  })
            }
      },
      initAnalysisHy:function(){
            var that = this;
            $(".analysis-tab-hy").click(function(){
                  $("#pie-content").empty().height(400);
                  $("#pie-content-all").empty().height(400);
                  that.analysis_tabs.removeClass("box-shadow-tab");
                  $(this).addClass("box-shadow-tab");
                  GlobalMain.allData = [];
                  that.initHYAnalysis();
                  that.initHYAnalysisAll();
            });
      },
      initAnalysisXF:function(){
            var that = this;
            $("li.analysis-tab-xf").on("click",function(){
                  $("#pie-content").empty().height(400);
                  $("#pie-content-all").empty().height(400);
                  that.analysis_tabs.removeClass("box-shadow-tab");
                  $(this).addClass("box-shadow-tab");
                  GlobalMain.allData = [];
                  that.initXFAnalysis();
                  that.initXFAnalysisAll();
            });
      },
      initAnalysisZZ:function(){
            var that = this;
            $("li.analysis-tab-zz").on("click",function(){
                  $("#pie-content").empty();
                  $("#pie-content-all").empty().height(0);
                  that.analysis_tabs.removeClass("box-shadow-tab");
                  $(this).addClass("box-shadow-tab");
                  GlobalMain.allData = [];
                  house.getHousePrice(map,GlobalMain.cur_district_name,GlobalMain.cur_bis_name);
            });
      },
      initAnalysisRQ:function(){
            var that = this;
            $("li.analysis-tab-rq").on("click",function(){
                  $("#pie-content").empty().height(0);
                  $("#pie-content-all").empty().height(550);
                  that.analysis_tabs.removeClass("box-shadow-tab");
                  $(this).addClass("box-shadow-tab");
                  GlobalMain.allData = [];
                 /* house.getHousePrice(map,GlobalMain.cur_district_name,GlobalMain.cur_bis_name);*/
                  that.setRQoptions("pie-content-all");
            });
      },
      initAnalysisSP:function(){
            var that = this;
            $("li.analysis-tab-sp").on("click",function(){
                  $("#pie-content").empty();
                  $("#pie-content-all").empty().height(0);
                  that.analysis_tabs.removeClass("box-shadow-tab");
                  $(this).addClass("box-shadow-tab");
                  GlobalMain.allData = [];
                  shop.getShopData(GlobalMain.cur_district_name,GlobalMain.cur_bis_name);
            });
      },
      initHYAnalysis:function(){
            var selectedVal = [];
            $("input[name='analysis-input']:checked").each(function(i,item){
                  selectedVal.push($(item).val())
            });
            if(selectedVal && selectedVal.length > 0){
                  this.getIndustryValue(selectedVal,this.appendDataCallback);
                  this.initAnalyChart("pie-content",GlobalMain.allData,GlobalMain.cur_district_name+"已选各行业占比统计");
            }
      },
      initHYAnalysis:function(){
            var selectedVal = [];
            $("input[name='analysis-input']:checked").each(function(i,item){
                  selectedVal.push($(item).val())
            });
            if(selectedVal && selectedVal.length > 0){
                  this.getIndustryValue(selectedVal,this.appendDataCallback);
                  this.initAnalyChart("pie-content",GlobalMain.allData,GlobalMain.cur_district_name+"已选各行业占比统计");
            }
      },
      initHYAnalysisAll:function(){
            GlobalMain.allData = [];
            var selectedVal = [];
            $("input[name='analysis-input']").each(function(i,item){
                  selectedVal.push($(item).val())
            });
            if(selectedVal && selectedVal.length > 0){
                  this.getIndustryValue(selectedVal,this.appendDataCallback);
                  var all_data = GlobalMain.allData.sort(this.sortArr("value")).slice(0,5);
                  this.initAnalyChart("pie-content-all",all_data,GlobalMain.cur_district_name+"占比最大的行业");
            }
      },
      initXFAnalysis:function(){
            var selectedVal = [];
            $("input[name='analysis-input']:checked").each(function(i,item){
                  selectedVal.push($(item).val())
            });
            if(selectedVal && selectedVal.length > 0){
                  this.getXFIdustryPrice(selectedVal,this.appendDataCallback);
                  this.initAnalyLine("pie-content",GlobalMain.allData,GlobalMain.cur_district_name+"已选各行业消费指数");
            }
      },
      initXFAnalysisAll:function(){
            var selectedVal = [];
            $("input[name='analysis-input']").each(function(i,item){
                  selectedVal.push($(item).val())
            });
            if(selectedVal && selectedVal.length > 0){
                  this.getXFIdustryPrice(selectedVal,this.appendDataCallback);
                  var all_data = GlobalMain.allData.sort(this.sortArr("value")).slice(0,5);
                  this.initAnalyLine("pie-content-all",all_data,GlobalMain.cur_district_name+"消费指数最高的行业");
            }
      },
      appendDataCallback:function(data){
            GlobalMain.allData.push(data);
      },
      sortArr:function(property){
            return function(a,b){
                  var value1 = a[property];
                  var value2 = b[property];
                  return value2 - value1;
            }
      },
      getIndustryValue:function(selectedVal,callback){
            $.get("api/getIndustryValue",{disName:GlobalMain.cur_district_name,selectName:selectedVal},function(data){
                  var result = data.data;
                  for(let i = 0;i < result.length;i++){
                        var new_data = {
                              name:result[i][0].category,
                              value:result[i].length
                        }
                        callback(new_data);
                  }
            },"json")
      },
      getXFIdustryPrice:function(selectedVal,callback){
            GlobalMain.allData = [];
            $.get("api/getIndustryValue",{disName:GlobalMain.cur_district_name,selectName:selectedVal},function(data){
                  var result = data.data;
                  if(data && result.length > 0){
                        for(let i = 0;i < result.length;i++){
                              var new_data = {
                                    name:result[i][0].category,
                                    value:meanPrice(result[i])
                              }
                              callback(new_data);
                        }
                        function meanPrice(arr){
                              var sum = 0;
                              for(let i = 0;i < arr.length;i++){
                                    if(arr[i].price==null || arr[i].price==''){
                                          arr[i].price = 0;
                                    }
                                    sum += arr[i].price;
                              }
                              return sum/arr.length;
                        }

                  }
            },"json")
      },
      initAnalyChart:function(contentID,data,text) {
            var dataNames = [];
            for(let i = 0;i < data.length;i++){
                  dataNames.push(data[i].name);
            }
            var mChart = echarts.init(document.getElementById(contentID));
            var option = {
                  title: {
                        text: text,
                        subtext: '',
                        x: 'center'
                  },
                  tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: dataNames
                  },
                  series: [{
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '60%'],
                        data: data,
                        itemStyle: {
                              emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                        }
                  }]
            };
            mChart.setOption(option);
      },
      initAnalyLine:function(contentID,data,text) {
            var dataX = [];
            var dataY = [];
            for(let i = 0;i < data.length;i++){
                  dataX.push(data[i].name);
                  dataY.push(data[i].value);
            }
            var mChart = echarts.init(document.getElementById(contentID));
            var option = {
                  title : {
                        text: text,
                        subtext: '若图标上没有出现，则表示不存在该分类'
                  },
                  tooltip : {
                        trigger: 'axis'
                  },
                  legend: {
                        data:[]
                  },
                  toolbox: {
                        show : true,
                        feature : {
                              mark : {show: true},
                              dataView : {show: true, readOnly: false},
                              magicType : {show: true, type: ['line', 'bar']},
                              restore : {show: true},
                              saveAsImage : {show: true}
                        }
                  },
                  calculable : true,
                  xAxis : [
                        {
                              type : 'category',
                              data : dataX
                        }
                  ],
                  yAxis : [
                        {
                              type : 'value'
                        }
                  ],
                  series : [
                        {
                              name:'人均消费指数',
                              type:'bar',
                              data:dataY,
                              itemStyle: {
                                    normal: {
                                          color: function(params) {
                                                // build a color map as your need.
                                                var colorList = [
                                                      '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                                      '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                                      '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                                ];
                                                return colorList[params.dataIndex]
                                          }
                                    }
                              }
                        }
                  ]
            };
            mChart.setOption(option);
      },
      setRQoptions:function(contentID){
            var mChart = echarts.init(document.getElementById(contentID));
            var myData = ['川菜', '云南菜', '自助餐', 'KTV', '面包甜点', '韩国料理', '眼镜店', '药店', '男装', '网咖', '女装', '女鞋', '手机店', '意大利菜', '日本菜', '小吃'];
            var databeast = {
                  1: [389, 259, 262, 324, 232, 176, 196, 214, 133, 370, 268, 360, 185, 392, 392, 153],
                  2: [111, 315, 139, 375, 204, 352, 163, 258, 385, 209, 209, 243, 204, 352, 163, 258],
                  3: [227, 210, 328, 292, 241, 110, 130, 185, 392, 392, 153, 187, 150, 200, 250, 300],
                  4: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  5: [280, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 263, 302, 372, 163],
                  6: [121, 388, 233, 309, 133, 308, 297, 283, 349, 273, 229, 238, 224, 291, 185, 203],
                  7: [200, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  8: [380, 129, 173, 101, 310, 393, 386, 296, 366, 268, 208, 149, 356, 239, 208, 330],
                  9: [363, 396, 388, 108, 325, 120, 180, 292, 200, 309, 223, 236, 209, 271, 215, 216],
                  10: [300, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  11: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  12: [280, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 263, 302, 372, 163],

            };
            var databeauty = {
                  1: [121, 388, 233, 309, 133, 308, 297, 283, 349, 273, 229, 238, 224, 291, 185, 203],
                  2: [200, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  3: [380, 129, 173, 101, 310, 393, 386, 296, 366, 268, 208, 149, 356, 239, 208, 330],
                  4: [363, 396, 388, 108, 325, 120, 180, 292, 200, 309, 223, 236, 209, 271, 215, 216],
                  5: [300, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  6: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  7: [280, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 263, 302, 372, 163],
                  8: [389, 259, 262, 324, 232, 176, 196, 214, 133, 370, 268, 360, 185, 392, 392, 153],
                  9: [111, 315, 139, 375, 204, 352, 163, 258, 385, 209, 209, 243, 204, 352, 163, 258],
                  10: [227, 210, 328, 292, 241, 110, 130, 185, 392, 392, 153, 187, 150, 200, 250, 300],
                  11: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
                  12: [280, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 263, 302, 372, 163],

            };
            var timeLineData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

           var option = {
                  baseOption: {
                        backgroundColor: '#FFF',
                        timeline: {
                              show: true,
                              axisType: 'category',
                              tooltip: {
                                    show: true,
                                    formatter: function(params) {
                                          return params.name + '月份数据统计';
                                    }
                              },
                              autoPlay: true,
                              currentIndex: 6,
                              playInterval: 3000,
                              label: {
                                    normal: {
                                          show: true,
                                          interval: 'auto',
                                          formatter: '{value}月',
                                    },
                              },
                              data: [],
                        },
                        title: {
                              textStyle: {
                                    color: '#000',
                                    fontSize: 16,
                              },
                              subtext: '数据不具有实效性',
                        },
                        legend: {
                              data: ['帅哥', '美女'],
                              top: 4,
                              right: '10%',
                              textStyle: {
                                    color: '#000',
                              },
                        },
                        tooltip: {
                              show: true,
                              trigger: 'axis',
                              formatter: '{b}<br/>{a}: {c}人',
                              axisPointer: {
                                    type: 'shadow',
                              }
                        },
                        toolbox: {
                              feature: {
                                    dataView: {
                                          show: false,
                                          readOnly: false
                                    },
                                    restore: {
                                          show: false
                                    },
                                    saveAsImage: {
                                          show: false
                                    }
                              }
                        },
                        grid: [{
                              show: false,
                              left: '4%',
                              top: 60,
                              bottom: 60,
                              containLabel: true,
                              width: '46%',
                        }, {
                              show: false,
                              left: '50.5%',
                              top: 80,
                              bottom: 60,
                              width: '0%',
                        }, {
                              show: false,
                              right: '4%',
                              top: 60,
                              bottom: 60,
                              containLabel: true,
                              width: '46%',
                        }, ],

                        xAxis: [
                              {
                                    type: 'value',
                                    inverse: true,
                                    axisLine: {
                                          show: false,
                                    },
                                    axisTick: {
                                          show: false,
                                    },
                                    position: 'top',
                                    axisLabel: {
                                          show: true,
                                          textStyle: {
                                                color: '#B2B2B2',
                                                fontSize: 12,
                                          },
                                    },
                                    splitLine: {
                                          show: true,
                                          lineStyle: {
                                                color: '#1F2022',
                                                width: 1,
                                                type: 'solid',
                                          },
                                    },
                              }, {
                                    gridIndex: 1,
                                    show: false,
                              }, {
                                    gridIndex: 2,
                                    type: 'value',
                                    axisLine: {
                                          show: false,
                                    },
                                    axisTick: {
                                          show: false,
                                    },
                                    position: 'top',
                                    axisLabel: {
                                          show: true,
                                          textStyle: {
                                                color: '#B2B2B2',
                                                fontSize: 12,
                                          },
                                    },
                                    splitLine: {
                                          show: true,
                                          lineStyle: {
                                                color: '#1F2022',
                                                width: 1,
                                                type: 'solid',
                                          },
                                    },
                              }, ],
                        yAxis: [{
                              type: 'category',
                              inverse: true,
                              position: 'right',
                              axisLine: {
                                    show: false
                              },
                              axisTick: {
                                    show: false
                              },
                              axisLabel: {
                                    show: false,
                                    margin: 8,
                                    textStyle: {
                                          color: '#9D9EA0',
                                          fontSize: 12,
                                    },

                              },
                              data: myData,
                        }, {
                              gridIndex: 1,
                              type: 'category',
                              inverse: true,
                              position: 'left',
                              axisLine: {
                                    show: false
                              },
                              axisTick: {
                                    show: false
                              },
                              axisLabel: {
                                    show: true,
                                    textStyle: {
                                          color: '#9D9EA0',
                                          fontSize: 12,
                                    },

                              },
                              data: myData.map(function(value) {
                                    return {
                                          value: value,
                                          textStyle: {
                                                align: 'center',
                                          }
                                    }
                              }),
                        }, {
                              gridIndex: 2,
                              type: 'category',
                              inverse: true,
                              position: 'left',
                              axisLine: {
                                    show: false
                              },
                              axisTick: {
                                    show: false
                              },
                              axisLabel: {
                                    show: false,
                                    textStyle: {
                                          color: '#9D9EA0',
                                          fontSize: 12,
                                    },

                              },
                              data: myData,
                        }, ],
                        series: [],

                  },

                  options: [],


            };

            for (var i = 0; i < timeLineData.length; i++) {
                  option.baseOption.timeline.data.push(timeLineData[i]);
                  option.options.push({
                        title: {
                              text: '大上海' + timeLineData[i] + '月份所选地区帅哥美女去向统计',
                        },
                        series: [{
                              name: '帅哥',
                              type: 'bar',
                              barGap: 20,
                              barWidth: 20,
                              label: {
                                    normal: {
                                          show: false,
                                    },
                                    emphasis: {
                                          show: true,
                                          position: 'left',
                                          offset: [0, 0],
                                          textStyle: {
                                                color: '#000',
                                                fontSize: 14,
                                          },
                                    },
                              },
                              itemStyle: {
                                    normal: {
                                          color: '#659F83',
                                    },
                                    emphasis: {
                                          color: '#08C7AE',
                                    },
                              },
                              data: databeast[timeLineData[i]],
                        },


                              {
                                    name: '美女',
                                    type: 'bar',
                                    barGap: 20,
                                    barWidth: 20,
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    label: {
                                          normal: {
                                                show: false,
                                          },
                                          emphasis: {
                                                show: true,
                                                position: 'right',
                                                offset: [0, 0],
                                                textStyle: {
                                                      color: '#fff',
                                                      fontSize: 14,
                                                },
                                          },
                                    },
                                    itemStyle: {
                                          normal: {
                                                color: '#F68989',
                                          },
                                          emphasis: {
                                                color: '#F94646',
                                          },
                                    },
                                    data: databeauty[timeLineData[i]],
                              }
                        ]
                  });
            }
            mChart.setOption(option);
      },
      firstCheckeEvent:function(){
            if($(".district-title").length > 0){
                  $("input:radio[name='business-area'][value='徐家汇']").prop("checked", "checked").change();
                  $("input:radio[name='industry'][value='私房菜']").prop("checked", "checked").change();
                  setTimeout(function(){
                        $("input:checkbox[name='analysis-input'][value='川菜']").prop("checked", "checked").change();
                        $("input:checkbox[name='analysis-input'][value='台湾菜']").prop("checked", "checked").change();
                        $("input:checkbox[name='analysis-input'][value='自助餐']").prop("checked", "checked").change();
                  },0);
            }
      }
}
