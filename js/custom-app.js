function filterClients(val){
	
	$("#clis").find("div.cli:not(:contains('"+val+"'))").addClass("hidden");
	
}
