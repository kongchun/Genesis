var message = require("../message.js");
$(function(){
    $("#main-btn").click(function(){

        var id = $("#main").data("id");

        var val = $("#main-phone").val().replace(/(^\s*)|(\s*$)/g, "");
        if(val.length!=11){
            message.alert("请输入正确的手机号!");
            return
        }

        if($("#main-tips-checkbox:checked").length==0){
            message.alert("请先同意优惠规则!");
            return
        }
        $.post("/quan/invite/"+id,{tel:val},function(data){
            if(data.result){
                location.href="/quan/customer/"+data.customer._id;
            }else{
                location.reload();
            }
        })
    })
})