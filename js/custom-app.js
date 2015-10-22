function filterClients(val){
	if(val!=""){
		$("#clis").find("div.cli").removeClass("hidden");
		$("#clis").find("div.cli:not(:Contains('"+val+"'))").addClass("hidden");
	}
	
}

jQuery.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};
