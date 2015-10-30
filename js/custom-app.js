function filterClients(val){
	if(val!=""){
		$("#clis").find("div.cli").removeClass("hidden");
		$("#clis").find("div.cli:not(:Contains('"+val+"'))").addClass("hidden");
	}else{
		$("#clis").find("div.cli").removeClass("hidden");
	}
	
}

jQuery.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};


function getEleClass(dd){
	if(dd.area_total != '' || dd.area_propia != '' 
	|| dd.area_arrendada !='' || dd.costo_alquiler !='' || dd.estimativa_produccion_1 !=''
	|| dd.imagen_1 != '' || dd.punto_gps != ''){
		return "ok";
	}else{
		return "not-ok";
	}
}

function sendByEmail(){
	
	var email = "";
	
	email = prompt("DIGITE EMAIL:");

	if(email){
		
		$.get(window.app.update_url+"&action=send_email&id="+remember.collections.deudas[remember.current_item.id]+"&email="+email, function(r){
			if(!r){
				return false;
			}
			alert("Sent!"+r);
		});
		
	}
	
}
