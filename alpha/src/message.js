export var alert = function(message, type = "warning") {
	var classList = {
		warning: ["alert-warning", "fa-exclamation-circle"],
		success: ["alert-success", "fa-check"]
	}

	var html = `<div class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
	    <div class="alert alert-block ${classList[type][0]} fade in">
	        <a class="close" data-dismiss="modal" aria-label="Close" href="#" aria-hidden="true">×</a>
	        <p></p>
	        <i class="fa  ${classList[type][1]}"></i>
	        <span>
	        ${message}
	        </span>
	        <p></p>
	    </div>
	    </div> 
	 </div>`

	var dom = $(html);
	$("body").append(dom);

	$(dom).modal("show");
	$(dom).on("hidden.bs.modal", function() {
		dom.remove();
	})
}