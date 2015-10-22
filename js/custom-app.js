function filterClients(val){
	if(val!=""){
		$("#clis").find("div.cli").removeClass("hidden");
		$("#clis").find("div.cli:not(:contains('"+val+"'))").addClass("hidden");
	}
	
}
