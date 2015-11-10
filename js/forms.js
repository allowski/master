function t(x,y,z){
	return y;
}

window.hasUpdates = false;

function check_for_updates(){
	
	var list_col = [];
	
	for(var i  in window.app.collections){
		list_col.push(window.app.collections[i]);
	}
	
	var iv;
	
	var c = 0;
	
	var processing = 0;
	
	var ammount = 0;
	
	if(!window.hasUpdates){
		
		iv = setInterval(function(){ 
			
			if(c>=list_col.length){
				clearInterval(iv);
				remember.save();
			}
			
			if((!list_col[c])||(list_col[c]=="undefined")||(list_col[c]=="collections")){
				
			}else{
				
				if(processing == 1){ 
					
					console.log("Still processing: "+list_col[c]+" .. waiting..");
					
					return;
				
				}
				
				processing = 1;
				
				//console.log("Syncing: "+list_col[c]);
				
				$.post(window.app.update_url, {"action":"get_last_import", "collection":window.app.collections[c]}, function(rd){
					
					remember.collections.collections[c] = c;
					
					if(!("import_ids" in remember.collections)){
						remember.collections.import_ids = [];
					}
					
					if(remember.collections.import_ids[c] != rd.id){
						
						window.hasUpdates = true;
						
					}
					
					processing = 0;
					
					c++;
					
				});
				
			}
		
		},500);
		
	}else{
		
		if(confirm(t("Hay informaciones que bajar, desea bajar ahora?", "Tem informacoes novas no para baixar, deseja baixar agora?", "There are updates in the server, do you want to download it now?"))){
			sendAllAll(function(){
				get_data();
			});
		}
		
	}
	
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
			if(ammount > 0){
				toast(t("Sincronizacion terminada "+ammount+" filas", "Sincronizacao terminada "+ammount+" filas", "Syncing finished "+ammount+" rows"), "success", 3000);
				main();
			}else{
				toast(t("Sincronizacion concluida", "Sincronizacao terminada", "Syncing finished"), "warning", 3000);
			}
			window.hasUpdates = false;
			clearInterval(iv);
		}
		
		if((!list_col[c])||(list_col[c]=="undefined")||(list_col[c]=="collections")){
			
		}else{
			
			if(processing == 1){ 
				
				console.log("Still processing: "+list_col[c]+" .. waiting..");
				
				return;
			
			}
			
			processing = 1;
			
			//console.log("Syncing: "+list_col[c]);
			
			$.post(window.app.update_url, {"action":"get_last_import", "collection":window.app.collections[c]}, function(rd){
				
				remember.collections.collections[c] = c;
				
				if(!("import_ids" in remember.collections)){
					remember.collections.import_ids = [];
				}
				if(remember.collections.import_ids[c]!=rd.import_id){
					
					toast(t("Sincronizando "+list_col[c], "Sincronizando "+list_col[c], "Syncing.. "+list_col[c]), "warning", 50000);
				
					remember.collections.import_ids[c] = rd.import_id;
					
					$.post(window.app.update_url, {"action":"get_data", "collection":window.app.collections[c]}, function(r){
					
						processing = 0;
						
						remember.collections[list_col[c]] = r.data;
						
						remember.save();
						
						ammount+=r.data.length;
						
						c++;
					
					});
					
				}else{
					
					console.log("Skipping "+remember.collections.collections[c]);
					
					processing = 0;
					
					c++;
					
				}
				
			});
			
			
			
		}
		
	}, 1500);
	
	
}


	function sendItem(collection, indexOf){
		
		var item = remember.getItem(collection, indexOf);
		
		toast(i("Enviando ..", "Enviando..", "Sending.."), "warning", 3000); 
		
		$.post(window.app.update_url, {"action":"update_data", "data":item, "collection":collection}, function(r){
			
			if(!r){
				return;
			}
			
			item.real_id = r.id; 
			
			toast(i("1 arquivo enviado", "1 archivo enviado", "1 row sent!"), "warning", 1000); 
			
			remember.update(collection, indexOf, item);
			
			remember.save();
			
			alert(r.message);
			
		});
		
	}
	
window.sendingItem = 0;

window.totalSent = 0;

window.isSending = false;

window.sendingAll = false;

function sendAll(collection){
	
	if(!remember.isCollection(collection)){
		
		window.isSending = false;
		
		return false;
	}
	
	
	var item = remember.getItem(collection, window.sendingItem);
	
	if(!item){
		
		console.log("Error item not found");
		window.sendingItem = 0;
		window.isSending = false;
		return false;
	}
	
	window.isSending = true;
	
	if(window.sendingItem in remember.collections[collection]){
		
		if(remember.collections[collection][window.sendingItem].sent !== false){
			
			//console.log("Skiping item "+window.sendingItem);
			
			window.sendingItem++;
			
			sendAll(collection);
			
			return true;
			
		}
		
		//console.log("Sending "+window.sendingItem);
	
	}else{
		
		if(window.sendingAll != true){
			if(window.totalSent == 0){
			
				toast(i("Nada que enviar", "Nada a sincronizar", "Everything Up-to-date"), "success", 1000);
				
			}else{
				
				toast(i(window.totalSent+" arquivos enviados", window.totalSent+" archivos enviados", window.totalSent+" rows sent!"), "warning", 1000); 
			
			}
			
			
			window.totalSent = 0;
		
			console.log("End");
			
			window.isSending = false;
			
			return true;
			
		}
		
		window.sendingItem = 0;
			
	}
	
	toast(i("Enviando fila "+window.sendingItem+" ..", "Enviando fila "+window.sendingItem+"  ..", "Sending row "+window.sendingItem+"  .."), "warning", 3000); 
	
	$.post(window.app.update_url, {"action":"update_data", "data":item, "collection":collection}, function(r){
		
		if(!r){
			return false;
		}
		
		
		try{
			item.real_id = r.id; 
		}catch(e){
			alert("Error loading file");
			console.log(r);
			return false;
		}
		
		window.totalSent++;
		
		console.log("Sent "+window.sendingItem);
		
		item.sent = true;
		
		remember.collections[collection][window.sendingItem] = item;
		
		remember.save();
		
		window.sendingItem++;
		setTimeout(function(){
			sendAll(collection);
		},800);
		
	}).error(a4pp_conn_error);
	
}

function sendAllAll(callback){
	
	toast(i("Inicializando..", "Iniciando ..", "Starting.."), "success", 1000000);
	
	var allCollections = [];
	
	for(var k in remember.collections){
		allCollections.push(k);
	}
	
	var iv;
	
	var ci = 0;
	
	iv = window.setInterval(function(){
	
		if(ci in allCollections){
			
			if(window.isSending == true){
			
				//console.log("Waiting ..");
			
			}else{
				
				setTimeout(function(){
					
					window.sendingAll = true;
					
					toast(i("Enviando "+allCollections[ci]+"..", "Enviando "+allCollections[ci]+"..", "Sending "+allCollections[ci]+".."), "success", 1000000);
				
					sendAll(allCollections[ci]);
					
					ci++;
				
				});
				
			}
			
			
		}else{
			
			if(typeof callback != "undefined"){
				callback();
			}
			
			console.log("Fin");
			
			toast(i("Nada que enviar", "Nada a sincronizar", "Everything Up-to-date"), "success", 2000);
			
			window.sendingAll = false;
			
			window.clearInterval(iv);
			
			return;
		}
		
	}, 500);
	
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
