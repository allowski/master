function t(x,y,z){
	return y;
}
function get_data(){
	
	toast(t("Sincronizando..", "Sincronizando..", "Syncing.."), "success", 50000);
	
	var list_col = [];
	
	for(var i  in remember.collections){
		list_col.push(i);
	}
	
	var iv;
	
	var c = 0;
	
	var processing = 0;
	
	var ammout = 0;
	
	iv = setInterval(function(){ 
		
		if((!list_col[c])||(list_col[c]=="undefined")||(list_col[c]=="collections")){
			
		}else{
		
			if(c<list_col.length){
				console.log("Fim");
				toast(t("Sincronizacion terminada ", "Sincronizacao terminada", "Syncing finished"), "success", 3000);
				clearInterval(iv);
			}
			
			if(processing == 1){ 
				
				return;
			
			}
			
			toast(t("Sincronizando "+list_col[c], "Sincronizando "+list_col[c], "Syncing.. "+list_col[c]), "warning", 50000);
			
			processing = 1;
			
			console.log("Syncing: "+list_col[c]);
			
			$.post(window.app.update_url, {"action":"get_data", "collection":i}, function(r){
				
				processing = 0;
				
				remember.collections[i] = r.data;
			
			});
			
		}
		
		c++;
	
	}, 1500);
	
	
}
