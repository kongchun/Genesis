$(function(){$("#btn_login").click(function(){var n=$("#account").val(),o=$("#password").val();$.post("api/login",{account:n,password:o},function(n){n.result?location.href="list":alert("登录失败！")},"json")})});