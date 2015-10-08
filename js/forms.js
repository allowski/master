function get_data(){
	
	toast("Sincronizando..", "Sincronizando..", "Syncing..", "success");
	
	for(var i  in remember.collections){
	
		$.post(window.app.update_url, {"action":"get_data", "collection":i}, function(r){
			
			console.log(typeof r);
			console.log(typeof r.data);
			
			remember.collections[i] = JSON.parse(r.data);
		
		});
	
	}
	
	
}
