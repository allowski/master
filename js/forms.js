function get_data(){
	
	toast(i("Sincronizando..", "Sincronizando..", "Syncing.."), "success", 50000);
	
	var list_col = [];
	
	for(var i  in remember.collections){
		list_col.push(i);
	}
	
	var iv;
	
	var c = 0;
	
	var processing = 0;
	
	iv = setInterval(function(){ 
		
		if(c>list_col.length){
			clearInterval(iv);
			console.log("Fim");
		}
		
		if(processing == 1){ 
			
			return;
		
		}
		
		toast(i("Sincronizando "+list_col[c], "Sincronizando "+list_col[c], "Syncing.. "+list_col[c]), "success", 50000);
		
		processing = 1;
		
		console.log("Syncing: "+list_col[c]);
		
		$.post(window.app.update_url, {"action":"get_data", "collection":i}, function(r){
			
			processing = 0;
			
			remember.collections[i] = r.data;
		
		});
		
		c++;
	
	}, 1500);
	
	
}
