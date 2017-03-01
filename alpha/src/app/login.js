var message = require("../message.js");
$(function() {

	$("#btn_login").click(function() {

		var account = $("#account").val();
		var password = $("#password").val();

		$.post("api/login", {
			account: account,
			password: password
		}, function(data) {
			if (data.result) {
				location.href = "list";
			} else {
				message.alert("用户名或密码不正确!");
			}
		}, "json")
	})


})