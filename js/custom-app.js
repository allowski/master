function filterClients(val){
	
	$("#clis").find("div.cli:not(:conains("+this.value+"))").addClass("hidden");
	
}
