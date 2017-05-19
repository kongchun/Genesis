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
                  $("#pie-content").empty();
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
                  $("#pie-content").empty();
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
