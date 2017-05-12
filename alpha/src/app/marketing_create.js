var message = require("../message.js");

var shop = null;
$(function() {
    $(".shop-choose-btn").click(function() {
        $('#shop_choose').modal("show")
    })


    $("#shop_choose .list-group-item").click(function() {
        var data = $(this).data("data");

        $('#shop_choose').modal("hide");

        console.log(data);

        $("#shopName").val(data.name);
        $("#shopAddr").text(data.address);
        $("#shopCategory").text(data.category);

        $("#item_addr").show();
        $("#item_category").show();

        shop = data;

    })

    var dateOption = {
        language: "zh-CN",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    }

    $('#startDate_group').datetimepicker(dateOption);
    $('#endDate_group').datetimepicker(dateOption);


    var editDom = $("#marketing_container");
    var id = editDom.data("id");
    if(id!=""){
        //编辑模式
        $("#item_addr").show();
        $("#item_category").show();

        var type = editDom.data("type");
        $("input[name='type']").each(function(i){
            if(type == $(this).val()){
                $(this).attr("checked","checked");
                $(this).parent().addClass("active")
            }
        })

        var time = editDom.data("time");
        $("input[name='time']").each(function(i){
            if(time.indexOf($(this).val())>-1){
                $(this).attr("checked","checked")
            }
        })

        var sex =  editDom.data("sex");
        $("input[name='sex']").each(function(i){
            if(sex.indexOf($(this).val())>-1){
                $(this).attr("checked","checked")
            }
        })

        var ageRange =  editDom.data("age");
        $("input[name='ageRange']").each(function(i){
            if(ageRange.indexOf($(this).val())>-1){
                $(this).attr("checked","checked")
            }
        })

        shop = edit_shop;
    }







    $(".btn-save").click(function() {

        var editDom = $("#marketing_container");
        var _id = editDom.data("id");

        if (shop == null) {
            message.alert("请选择店铺");
            return
        }

        var title = $("#title").val().replace(/(^\s*)|(\s*$)/g, "");
        if (title == "") {
            message.alert("请输入标题");
            return
        }
        var type = $("input[name='type']:checked").val();
        if (!type) {
            message.alert("请选择优惠类型");
            return
        }

        var percent = parseFloat($("#percent").val().replace(/(^\s*)|(\s*$)/g, ""));
        if (isNaN(percent)) {
            message.alert("请输入折扣率");
            return
        }

        var startDate = $("#startDate").val().replace(/(^\s*)|(\s*$)/g, "");
        var endDate = $("#endDate").val().replace(/(^\s*)|(\s*$)/g, "");
        if (startDate == "") {
            message.alert("请选择开始时间");
            return
        }
        if (endDate == "") {
            message.alert("请选择结束时间");
            return
        }

        var time = []
        $("input[name='time']:checked").each(function() {
            time.push($(this).val());
        });

        if (time.length == 0) {
            message.alert("请选择时段");
            return
        }

        var interval = parseInt($("#interval").val().replace(/(^\s*)|(\s*$)/g, ""));
        if (isNaN(interval)) {
            message.alert("请输入周期");
            return
        }

        var total = $("#total").val().replace(/(^\s*)|(\s*$)/g, "");
        if (total == "") {
            message.alert("请输入优惠券总数");
            return
        }

        var sex = []
        $("input[name='sex']:checked").each(function() {
            sex.push($(this).val());
        });

        if (sex.length == 0) {
            message.alert("请选择性别");
            return
        }

        var ageRange = []
        $("input[name='ageRange']:checked").each(function() {
            ageRange.push($(this).val());
        });

        if (ageRange.length == 0) {
            message.alert("请选择年龄段");
            return
        }


        var data = {
            title: title,
            shop: shop,
            type: type,
            startDate: startDate,
            endDate: endDate,
            percent: percent,
            time: time,
            interval: interval,
            total: total,
            sex: sex,
            ageRange: ageRange,
            description: $("#description").val()
        }

        var marketing = JSON.stringify(data);
        var url = "/marketing/save/"+_id;
        $.post(url,{data:marketing},function(data){
            if(data.result){
                location.href = "/marketing";
            }else{
                message.alert("操作失败");
            }
        })
    })


})
