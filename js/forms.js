function t(x,y,z){
	return y;
}
function get_data(){
	
	toast(t("Sincronizando..", "Sincronizando..", "Syncing.."), "success", 50000);
	
	var list_col = [];
	
	for(var i  in window.app.collections){
		list_col.push(window.app.collections[i]);
	}
	
	var iv;
	
	var c = 0;
	
	var processing = 0;
	
	var ammount = 0;
	
	iv = setInterval(function(){ 
		
	
		if(c>=list_col.length){
			console.log("Fim");
			toast(t("Sincronizacion terminada "+ammount+" filas", "Sincronizacao terminada "+ammount+" filas", "Syncing finished "+ammount+" rows"), "success", 3000);
			main();
			clearInterval(iv);
		}
		
		if((!list_col[c])||(list_col[c]=="undefined")||(list_col[c]=="collections")){
			
		}else{
			
			if(processing == 1){ 
				
				console.log("Still processing: "+list_col[c]+" .. waiting..");
				
				return;
			
			}
			
			toast(t("Sincronizando "+list_col[c], "Sincronizando "+list_col[c], "Syncing.. "+list_col[c]), "warning", 50000);
			
			processing = 1;
			
			//console.log("Syncing: "+list_col[c]);
			
			$.post(window.app.update_url, {"action":"get_data", "collection":window.app.collections[c]}, function(r){
				
				//console.log("Synced "+list_col[c]);
			
				processing = 0;
				
				remember.collections[list_col[c]] = r.data;
				
				remember.save();
				
				ammount+=r.data.length;
				
				c++;
			
			});
			
			
			
		}
		
	}, 1500);
	
	
}


function capt_gps(that, id){
	
	console.log("capt_gps");
	
	that.className = "btn btn-default btn-lg btn-block disabled";
	
	console.log("This is..");
	console.log(that);
	
	getpos(function(r){
		
		$("#"+id).val(JSON.stringify(r));
		that.className = "btn btn-success btn-lg btn-block";
		alert("Capturado\n:"+JSON.stringify(r));
		
	}, function(){
		
		alert("Se ha producido un error");
		that.className = "btn btn-primary btn-lg btn-block";
		
	});
	
}




function getEventById(){
	for(x in remember.collections.eventos){
		at = remember.collections.eventos[x];
		if(at.real_id == window.current_evento_id){
			nm = [at.nome, at.cidade, at.estado].join();
			$("input[name=evento]").val(nm).attr("disabled", "disabled");
			$("input[name=id_evento]").val(id);
		} 
	}
}
