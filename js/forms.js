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
			
			$.post(window.app.update_url, {"action":"get_last_import", "collection":window.app.collections[c]}, function(rd){
				
				remember.collections.collections[c] = c;
				
				if(!("import_ids" in remember.collections)){
					remember.collections.import_ids = [];
				}
				if(remember.collections.import_ids[c]!=rd.import_id){
				
					remember.collections.import_ids[c] = rd.import_id;
					
					$.post(window.app.update_url, {"action":"get_data", "collection":window.app.collections[c]}, function(r){
					
						processing = 0;
						
						remember.collections[list_col[c]] = r.data;
						
						remember.save();
						
						ammount+=r.data.length;
						
						c++;
					
					});
					
				}
				
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
		alert("Capturado!");
		
	}, function(){
		
		alert("Se ha producido un error");
		that.className = "btn btn-primary btn-lg btn-block";
		
	});
	
}

var backgroundInterval;

document.addEventListener('deviceready', function () {
    // Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:i('Sincronizacao Ativa', "Sincronizacion Activa", "Syncing Enabled"), title:window.app.title, ticker:window.app.title});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.ondeactivate = function () {
		clearInterval(backgroundInterval);
	};
	
    cordova.plugins.backgroundMode.onactivate = function () {
        window.backgroundInterval = setInterval(function () {
            cordova.plugins.backgroundMode.configure({
                text:i('Enviando..', 'Enviando..', 'Sending..'),
                title:i('Trabalhando', 'Trabajando', 'Working')
            });
			sendAllAll(function(){
				cordova.plugins.backgroundMode.configure({
					text:'Finalizado..'
				});	
				setTimeout(function(){
					 cordova.plugins.backgroundMode.configure({ text:i('Sincronizacao Ativa', "Sincronizacion Activa", "Syncing Enabled")});
				},3000);
			});
            
        }, 15000);
    }
}, false);


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
