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
				location.href = "home";
			} else {
				message.alert("用户名或密码不正确!");
			}
		}, "json")
	});
	//注册
	$("#btn_regist").click(function() {
		var userName = $("#username").val();
		var password = $("#userpassword").val();
		var anotherpass = $("#useranotherPass").val();
		if (!ValidationFun.userName_validate(userName)) {
			$("#username").focus();
			return;
		}
		if (!ValidationFun.password_validate(password)) {
			$("#userpassword").focus();
			return;
		}
		if (!ValidationFun.anotherpass_validate(password, anotherpass)) {
			$("#useranotherPass").focus();
			return;
		}
		$.post("api/addUser", {
			userName: userName,
			passWord: password //需要MD5加密
		}, function(data) {
			if (data.result) {
				$(".regist-box-container").hide();
				$(".regist-success-box").show();
			} else {
				message.alert("注册失败,请联系网管");
				$("#username").empty();
				$("#userpassword").empty();
				$("#useranotherPass").empty();
			}
		}, "json")

	});
	/*异步验证用户名是否已经存在*/
	$("#username").keyup(function() {
		var userName = $("#username").val();
		$.post("api/checkUserName", {
			userName: userName
		}, function(data) {
			if (data.result) {
				$(".userName-exsit").slideDown(500, function() {
					$(this).css("display", "block");
				});
				$("#username").focus();
			} else {
				$(".userName-exsit").slideUp(500, function() {
					$(this).css("display", "none");
				})
			}
		}, "json");
	});
	/*
	 * 封装一个校验对象，校验用户名、密码等
	 * */
	var ValidationFun = {
		userName_validate: function(userName) {
			//用户名由 6-10位的字母下划线和数字组成;不能以数字或下划线开头;只能已字母开头;允许全部是字母
			var pattern_username = /[a-zA-z][a-zA-Z0-9_]{5,9}/g;
			if (userName == "") {
				message.alert("用户名是必填项");
				return false;
			} else if (!pattern_username.test(userName)) {
				message.alert("用户名由6-10位的字母和数字组成,开头只能是字母");
				return false;
			} else {
				return true;
			}
			return true;
		},
		password_validate: function(password) {
			if (password == "") {
				message.alert("密码是必填项");
				return false;
			} else if (password.length < 6 || password.length > 18) {
				message.alert("密码长度在6-18位之间");
				return false;
			}
			return true;
		},
		anotherpass_validate: function(password, anotherpass) {
			if (anotherpass == "") {
				message.alert("确认密码是必填项");
				return false;
			}
			if (password != anotherpass) {
				message.alert("两次密码应该一致");
				return false;
			}
			return true;
		}
	}
})