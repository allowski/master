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
			
			console.log("Syncing: "+list_col[c]);
			
			$.post(window.app.update_url, {"action":"get_data", "collection":window.app.collections[c]}, function(r){
				
				console.log("Synced "+list_col[c]);
			
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
	
	$(that).removeClass('btn-primary').addClass('btn-default').addClass("disabled");
	
	getpos(function(r){
		$("#"+id).val(JSON.stringfy(r));
		$(that).addClass('btn-success').removeClass("disabled").removeClass('btn-default');
		alert("Capturado");
	});
	
}
