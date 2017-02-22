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
				alert("µÇÂ¼Ê§°Ü£¡");
			}
		}, "json")
	})
})