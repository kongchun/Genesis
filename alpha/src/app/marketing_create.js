$(function() {
	$(".shop-choose-btn").click(function(){
		$('#shop_choose').modal("show")
	})


	$("#shop_choose .list-group-item").click(function(){
		var data = $(this).data("data");
		
		$('#shop_choose').modal("hide");

		console.log(data);

		$("#shopName").val(data.name);
		$("#shopAddr").text(data.address);
		$("#shopCategory").text(data.category);
	})
})
