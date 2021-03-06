var init = 0;
var count = 0;
var onSearch = 0;
var searchInput;
var lastList;
var wHash;


wHash = window.location.hash.replace("#", "").split("/");

window.isOnline = true;


function isPhoneGap() {
    return /^file:\/{3}[^\/]/i.test(window.location.href) 
    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}

function isConnected(){
	return window.isOnline;
}

function a4pp_ping(){
	
	var ping = new Date;
	
	if(isConnected()){

		$.ajax({ type: "POST",
			url: window.app.update_url,
			data: {"action":"ping", "api_key":window.app.appUser.appToken},
			cache:false,
			success: function(output){ 

				ping = new Date - ping;
				
				alert("Ping: "+ping);

			}
		});
		
	}
		
}

function getNodeIndex(node) {
    var index = 0;
    while ( (node = node.previousSibling) ) {
        if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
            index++;
        }
    }
    return index;
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function a4pp_logout(){
	if(confirm("Deseja fechar sua conta?")){
		delete window.localStorage['data'];
		$(".content:not(:first)").remove();
		init = 0;
		main();
	}
}

function i($pt, $es, $en){

	if(typeof window.app.lang == "undefined"){
		return $pt;
	}

	switch(window.app.lang){
		case "pt":
			return $pt;
		break;
		case "es":
			return $es;
		break;
		case "en":
			return $en;
		break;
	}

	return $es;

}


function toast(text, type, timeout){
	
	if(timeout==0){
		timeout = 15000;
	}

	var dv = document.createElement("div");

	dv.classList.add("alert");

	dv.classList.add("alert-"+type);

	dv.classList.add("toast");

	dv.innerHTML = text;

	var dvid = Math.random();
	
	dv.id = dvid;

	document.documentElement.appendChild(dv);

	$("body").addClass("has-toast");

	setTimeout(function(){
		$(".toast.opened").addClass("out");
		dv.classList.add("opened");
	}, 250);

	if((timeout>0)&&(typeof timeout != "undefined")){

		setTimeout(function(){
			$("body").removeClass("has-toast");
			dv.classList.add("out");
			eval("setTimeout(function(){\
				var lz = document.getElementById('"+dvid+"');\
				if(lz !== undefined){\
				lz.parentNode.removeChild(lz);}\
			},700);");
		}, timeout);

	}
}

function a4pp_login_form(){

	a4pp({"model":"login", "title":"Login", "items":[], "menu":[]});

}

function a4pp_register_form(){

	a4pp({"model":"register", "title":i("Entrar", "Entrar", "Login"), "items":[], "menu":[]});

}

function a4pp_async(path){
	toast("Cargando contenido..", "success", 0);
	$.post(window.app.update_url, {'api_key':window.app.token,'action':'path','path':path}, function(r){
		var jsn = JSON.parse(r);
		toast("Contenido OK", "success", 3000);
		a4pp(jsn);
	}).error(a4pp_conn_error);
}


function a4pp_register(that){

	if(isConnected()==false){
		return;
	}

	var lod = $(".loading-login");

	var ff = $(".form-form");

	lod.attr("class", "spinner loading-login glyphicon glyphicon-refresh");

	toast(i("Conectando..", "Conectado..", "Connecting.."), "success", 0);

	ff.addClass("opacity50");

	$.post(window.app.domain, $(that).serialize(), function(r){
		lod.removeClass("spinner");
		setTimeout(function(){
			ff.removeClass("opacity50");
			lod.addClass("hidden");
		}, 1000);
		if(r.logged == true){
			lod.removeClass("glyphicon-refresh").addClass("glyphicon-ok");
			window.localStorage['data'] = JSON.stringify(r);
			$(".content:not(:first)").remove();
			$(".toast").remove();
			main();
		}else{
			lod.removeClass("glyphicon-refresh").addClass("glyphicon-remove");
			toast("Not logged in", "danger", 5000);
		}
	}).error(a4pp_conn_error);

	return false;

}

function a4pp_login(that){

	if(isConnected()==false){
		return;
	}

	var lod = $(".loading-login");

	var ff = $(".form-form");

	lod.attr("class", "spinner loading-login glyphicon glyphicon-refresh");

	toast(i("Conectando..", "Conectando..", "Connecting.."), "success", 0);

	ff.addClass("hidden");

	$.post(window.app.domain, $(that).serialize(), function(r){
		lod.removeClass("spinner");
		setTimeout(function(){
			ff.removeClass("hidden");
			lod.addClass("hidden");
		}, 2000);
		if(r.logged == true){
			lod.removeClass("glyphicon-refresh").addClass("glyphicon-ok");
			window.localStorage['data'] = JSON.stringify(r);
			$(".content:not(:first)").remove();
			$(".toast").remove();
			main();
		}else{
			lod.removeClass("glyphicon-refresh").addClass("glyphicon-remove");
			toast(r.errmsg, "danger", 5000);
		}
	}).error(a4pp_conn_error);

	return false;

}

function a4pp_conn_error(jqXHR, textStatus, errorThrown){

	if(isConnected()==false){
		return;
	}

	var spinners = document.getElementsByClassName("spinner");

	var error = JSON.parse(jqXHR.responseText);

	switch(jqXHR.status){
		case 500:
			toast("Erro no servidor", "danger", 9000);
		break;
		case 500:
			toast("Erro no servidor", "danger", 9000);
		break;
		case 404:
			toast("<b>Erro "+error.details.type+":</b><br>"+error.details.description, "danger", 9000);
		break;
		case 0:
			toast("N&atilde;o foi possivel conectar ao servidor", "danger", 4000);
		break;
	}
	for(var i=0;i<spinners.length;i++){
		spinners[i].classList.remove("spinner");
	}

}

function a4pp_build(){
	toast('<span class=\'glyphicon glyphicon-cog spinner pull-left\'></span> Building app..', 'success', 0);
	$.get(window.app.domain+'/app.php?apx=build', function(){
		toast('<span class=\'glyphicon glyphicon-ok pull-left \'></span> Build completed', 'info', 0);
		setTimeout(function(){ 
			toast('<span class=\'glyphicon glyphicon-cog spinner pull-left \'></span> Reloading...', 'info', 0);
			window.location.reload(true);
		},500);
	});
}


function a4pp_update(){

	if(isConnected()==false){
		return;
	}

	//$("#updateIcon").addClass("spinner");

	toast("<span class='glyphicon glyphicon-refresh spinner pull-left'></span>"+i("Conectando..", "Conetando..", "Connecting.."), "success", 0);

	var postRequest = $.post(window.app.update_url, {"api_key":window.app.token, "action":"update"}, function(r){

		if((window.localStorage['md5'] != r.md5)||(typeof window.localStorage['md5'] == "undefined")){

			toast("<span class='glyphicon glyphicon-refresh spinner pull-left'></span>"+i("Atualiza&ccedil;&atilde;o disponivel", "Nova vers&atilde;o disponivel", "Update available"), "warning", 1500);

			setTimeout(function(){

				toast("<span class='glyphicon glyphicon-cog spinner pull-left'></span>"+i("Baixando atualiza&ccedil;&atilde;o..", "Baixando ultima vers&atilde;o..", "Downloading update.."), "success", 0);

				window.localStorage['md5'] = r.md5;
				window.localStorage['last_update'] = r.date;

					console.log(r);
					
					var request = $.post(r.download_url, {"action":"download", "token":"", "user":window.app.appUser}, function(resp){
						if(resp.logged == true){
							//console.log(resp);
							window.localStorage['data'] = JSON.stringify(resp);
							$("#updateIcon").removeClass("spinner");
							toast("<span class='glyphicon glyphicon-ok pull-right'></span>"+i("Atualizado com exito", "Atualizado corretamente", "Update success"), "success", 2000);
							$(".content").css("opacity", "0.0");
							setTimeout(function(){
								toast("<span class='glyphicon glyphicon-cog spinner pull-left'></span>"+i("Recarregando dados", "Recarregando datos", "Refreshing data"), "warning", 650);
								window.localStorage['dt'] = 1;
								setTimeout(function(){
									$(".content:not(:first)").remove();
									main();
								}, 700)
							},2000);
						}else{
							$(".content:not(:first)").remove();
							toast(resp.errmsg, "danger", 5000);
							$("#updateIcon").removeClass("spinner");
							delete window.localStorage['data'];
							main();
						}
					});

					request.error(a4pp_conn_error);

			}, 1500);
		}else{

			toast(i("Não ha atualizaçōes", "No hay actualizaciones", "No updates available"), "warning", 2000);

			$(".content").css("opacity", "1.0");
			
			$("#updateIcon").removeClass("spinner");

		}
	});

	postRequest.error(a4pp_conn_error);

	return false;

}

function include(template, options){

	console.log(window.app.templates[template]);

	return a4pp_template(window.app.templates[template], options);
	
}

function foreach(array, f){

	for (x in array){

		f(array[x]);

	}

}

function a4pp_template(html, options){
	
	console.log("Rendering..");
	
	var re = /<%(.+?)%>/g, 
		reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, 
		code = 'with(obj) { var r=[];\n', 
		cursor = 0, 
		result;
	var add = function(line, js) {
		js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
			(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		return add;
	}
	while(match = re.exec(html)) {
		add(html.slice(cursor, match.index))(match[1], true);
		cursor = match.index + match[0].length;
	}
	add(html.substr(cursor, html.length - cursor));
	code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, '');
	try { result = new Function('obj', code).apply(options, [options]); }
	catch(err) { console.log("HTML:\n"+html); console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
	
	console.log("Rendering OK..");
	return result;

}

function goTo(whereToGo){
	var lst = whereToGo.replace("#", "").split("/");
	console.log(lst);
	var i = 0;
	var interval = setInterval(function(){
		if(typeof lst[i] == "undefined"){
			clearInterval(interval);
			return;
		}else{
			console.log("Set inter");
			if(triggerClickElement(lst[i])==1){
				clearInterval(interval);
			}
			i++;
			if(i>lst.length){
				clearInterval(interval);
			}
		}
	}, 1000);
}





function bindClick(element, that){
	element.addEventListener("click", function(){
		console.log("Clicked item");
		var id = getNodeIndex(element);
		if(typeof that.callback != "undefined"){
			var result = new Function(that.callback)();
			if(result === false){
				return false;
			}
		}
		a4pp(that);
	});
}

function goHome(){
	return triggerGoTo(null);
}

function triggerGoTo(whereToGo){
	
	whereToGo = whereToGo || "";
	
	var arr = whereToGo.split("/");
	
	if(arr.length===null){
		main();
		return 1;
	}
	
	var $item = window.app.items;
	
	var litem = window.app;
	
	for(var i=0;i<arr.length;i++){
		
		if($item[arr[i]] !== undefined){
			
			litem = $item[arr[i]];
			
			$item = $item[arr[i]].items;
			
		}
		
	}
	
	if(litem !== undefined){
	
		a4pp(litem);
	
	}
	
}

function getFromPath(whereToGo){
	
	whereToGo = whereToGo || "";
	
	var arr = whereToGo.split("/");
	
	if(arr.length===null){
		main();
		return 1;
	}
	
	var $item = window.app.items;
	
	var litem = window.app;
	
	for(var i=0;i<arr.length;i++){
		
		if($item[arr[i]] !== undefined){
			
			litem = $item[arr[i]];
			
			$item = $item[arr[i]].items;
			
		}
		
	}
	
	if(litem !== undefined){
	
		return litem;
	
	}
	
}
function a4pp_close(){
	if(confirm(i("Deseja sair do aplicativo?", "Deseja sair do app?", "Do you want to quit the app?"))){
		if(navigator.app!==undefined){
			navigator.app.exitApp();
		}
	}
}


function a4pp_hide_menu(){
	$(".content .dropdown-menu").hide();
}

function toggleMenu(){
	var ele = $(".content:last #dMenu .dropdown-menu");
	if(ele.is(":visible")){
		ele.css("display", "none");
	}else{
		ele.css("display", "inline-block");
	}
}

function goBack(dispatch){
	
	
	if(window.current_a4pp.onBack && dispatch){
		var cancel = new Function(window.current_a4pp.onBack)();
		if(!cancel){
			return false;
		}
	}
	
	if($(".content:last .dropdown-menu").is(":visible")){
		$(".content:last .dropdown-menu").hide();
		console.log("Close menu");
		return false;
	}else if($(".content").length == 2){
		console.log("Close app");
		a4pp_close();
	}else{
		console.log("Go back();");
		history.back();
	}
}

	window.addEventListener("popstate", function(){

		var lista = document.querySelectorAll(".content");

		if(lista.length > 2){
			var remv = lista[lista.length-1];
			
			remv.parentNode.removeChild(remv);

			var act = lista[lista.length-2];
			
		}else{
			return false;
		}
	});

	function filterx() {
	    var filter = searchInput.value.toUpperCase();
	    var lis = lastList.getElementsByTagName('li');
	    for (var i = 0; i < lis.length; i++) {
	        var name = lis[i].innerHTML;
	       //console.log(name.toUpperCase()+"!="+filter);
	        if (name.toUpperCase().indexOf(filter) > -1) 
	            lis[i].style.display = 'list-item';
	        else
	            lis[i].style.display = 'none';
	    }
	}

var preventDef = function (e) { e.preventDefault(); }

document.addEventListener("deviceready", function(){
	document.addEventListener("backbutton", function(){
		goBack();
	});
	document.addEventListener("menubutton", function(){
		toggleMenu();
	});
	
	document.addEventListener("offline", function(){
		window.isOnline = false;
		toast(i("Modo offline ativado", "Modo offline activado", "Offline mode on"), "warning", 1000);
	});
	document.addEventListener("online", function(){
		toast(i("Modo online ativado", "Modo online activado", "Online mode on"), "success", 1000);
		window.isOnline = true;
	});

}, true);

window.a4pp = function(data, auto){

	/* Variable declarations */

	var thatx = this;
	
	window.current_a4pp = data;

	var title_less = ["login", "register", "template"];

	var baseContent = document.getElementsByClassName("content")[0];

	var documentBody = document.getElementsByTagName("body")[0];

	//var btnGoSearch = document.getElementById("goSearch");

	//var search = document.getElementById("searchForm");

	var body = document.createElement("div");

	//var iconSearch = document.getElementById("iconSearch");
	
	//window.currentData = data; 
	
	body.classList.add("model-"+data.model);

	body.classList.add("content");

	body.classList.add("container");

	body.innerHTML = baseContent.innerHTML;

	document.title=data.title;
	
	if(init == 0){

		init = 1;
		
		var header = document.getElementById("navbar");
		
		header.innerHTML = a4pp_template(data.templates.header, data);

		var custom = document.createElement("style");

		var lcustom = document.getElementById("custom-style");

		if(typeof lcustom!= "undefined"){

			if(lcustom!=null){

				lcustom.parentNode.removeChild(lcustom);

			}

		}

		custom.id = "custom-style";

		custom.innerHTML = data.addCss;

		document.documentElement.appendChild(custom);
	
	}else{
		
		a4pp_hide_menu();

		if(title_less.indexOf(data.model)===-1){

			var titlex = document.createTextNode(data.title);

			var h4 = document.createElement("h4");

			h4.appendChild(titlex);

			body.appendChild(h4);

		}
	
	}

	if(auto!="1"){
		history.pushState(data, data.title, "#"+data.xpath);
		count = Math.random();
	}
	
	if(data.callback!==undefined){
			var fn = new Function(data.callback)();
			if(fn===false){
				return;
			}
	}
	switch(data.model){
		case "horizontal-scroll":
			
			body.innerHTML = data.details;
	
		break;
		case "link":
		
			return false;
		break;
		case "listview":
		case "list":
			
			var nscroller = document.createElement("div");
			var nwrapper = document.createElement("div");
			
			nscroller.id = "scrollxer";
			nwrapper.id = "wrappxer";
		
			if((data.model=="list")&&(typeof data.items != "undefined")){

				var list = document.createElement("ul");

				list.className = "model-list "+data.model;

				if(data.details!=""){
					var superior = document.createElement("div");
					superior.className="superior";
					superior.innerHTML = data.details;
					nscroller.appendChild(superior);
				}

				if(data.items !== null){

					var items = data.items;
				
					for(var that=0;that<items.length;that++){
						var text;
						var item;
						var img;
						var currItem = items[that];
						item = document.createElement("li");
						text = document.createElement("span");
						text.innerHTML = currItem.title;
						if(currItem.model=='heading'){
							item.classList.add("heading");
						}
						item.classList.add("model-list-item");
						if(currItem.icon != null){
							//console.log(data.items[that].icon);
							img = document.createElement("img");
							img.src = currItem.icon;
							img.classList.add("icon");
							item.appendChild(img);
						}
						if((currItem.glyphicon != "none")&&(typeof currItem.glyphicon != "undefined")){
							dvicn = document.createElement("div");
							dvicn.classList.add("glyph");
							dvicn.style.backgroundColor = currItem.color;
							icn = document.createElement("span");
							icn.classList.add("glyphicon");
							icn.classList.add("glyphicon-"+currItem.glyphicon);
							dvicn.appendChild(icn);
							item.appendChild(dvicn);
						}
						if(currItem.hidden == true){
							item.classList.add("hidden");
						}
						item.appendChild(text);
						list.appendChild(item);
						//console.log(that);
						bindClick(item, currItem);
					}
				}
				//console.log(documentBody);
				nscroller.appendChild(list);
				lastList = list;
			}
			
			nwrapper.appendChild(nscroller);
			
			body.appendChild(nwrapper);
			
			window.isloaded = function  () {
				document.addEventListener('touchmove', preventDef, false);
			}
			
		break;
		case "login":

			var login_form = document.getElementById("login-form");

			body.innerHTML= body.innerHTML+login_form.innerHTML;
			body.classList.add("details");


		break;

		case "register":

			var login_form = document.getElementById("register-form");

			body.innerHTML= body.innerHTML+login_form.innerHTML;
			body.classList.add("details");


		break;

		case "details":
			body.innerHTML= data.details;
			body.classList.add("details");
		break;
		
		case "template":
			if(data.template != undefined){
				body.classList.add(data.template);
				if(data.beforeRender){
					var fx = new Function(data.beforeRender)();
				}
				body.innerHTML = body.innerHTML + a4pp_template(window.app.templates[data.template], data);
			}
		break;
		
	}

	documentBody.appendChild(body);

	if(data.afterRender){
		setTimeout(function(){
			var fx = new Function(data.afterRender)();
		},200);
	}

	/**
	 *	App Menu
	 */
	 
	 if(data.menu === undefined){
		 data.menu = window.app.menu;
	 }


	if(data.menu.length == 0){
		data.menu = window.app.menu;
	}

	if(data.menu.length > 0){

		body.classList.add("has-menu");

		for(var c = 0; c<data.menu.length; c++){


			var x = document.createElement("li");
			var sf = document.createElement("a");

			sf.innerHTML = data.menu[c].title;

			sf.onclick = new Function(data.menu[c].onclick+"a4pp_hide_menu();");

			x.appendChild(sf);

			body.id = Math.random();

			document.getElementById(body.id).getElementsByClassName("dropdown-menu")[0].appendChild(x);

		}

	}
	
	if(data.beforeLoad !== undefined){
		new Function(data.beforeLoad)();
	}

}


function addItem(data, title, type){
	var new_item = {"title":title, "model": type, "details":"http://google.com.br"};
	data.items.push(new_item);
}


function goIndex(e, path){
	var itemx = getFromPath(path);
	console.log("X: "+e.clientX);
	console.log("Y: "+e.clientY);
	console.log("Client Height: "+window.innerHeight);
	for(var x in itemx.items){
		var myCoords = itemx.items[x].coords.split(',');
		var Y1 = myCoords[1];
		var Y2 = myCoords[3];
		console.log(myCoords);
		var factor = 1080/window.innerHeight;
		if((e.clientY < 50+Y2/factor) && (e.clientY > 50+Y1/factor)){
			a4pp(itemx.items[x]);
		}
	}
}

function a4pp_carousel(id){
	
	$('#car').carousel('next'); 
	
	$('#car').carousel('pause');
	
	$('#car').hammer().on('swipeleft', function(){
		$('#car').carousel('next'); 
	});
	$('#car').hammer().on('swiperight', function(){
		$('#car').carousel('prev'); 
	});
	$('#car').bind('slide.bs.carousel', function (e) {
		console.log($('.active', e.target).index());
		if($('.active', e.target).index()+1===$(id).find(".item").length){
			history.back();
		}
	});
	
}

function getGallery(){
	if(window.localStorage["gallery2"] == undefined){
		window.localStorage["gallery2"] = "[]";
	}
	return JSON.parse(window.localStorage["gallery"]);
}

function setGallery(arr){
	window.localStorage["gallery2"] = JSON.stringify(arr);
}

function openCamera(w, h, q, callback){
	
	console.log("openCamera called");
	
	navigator.notification.confirm(i('Anexar imagem', 'Subir imagen', 'Upload picture'), function(indexOpt){
		
		st = Camera.PictureSourceType.CAMERA;
		
		if(indexOpt == 1){
		
			st = Camera.PictureSourceType.CAMERA;
			
		}else if(indexOpt == 2){
			
			st = Camera.PictureSourceType.SAVEDPHOTOALBUM;
			
		}else{
			
			return;
			
		}
	
		navigator.camera.getPicture(function(imgData){
			callback( "data:image/jpeg;base64,"+imgData);
		}, function(){
			alert(i("Nao foi possivel capturar a foto", "No fue posible capturar la foto", "Cant get the picture"));
		},{ 
			quality: q,
			destinationType: Camera.DestinationType.DATA_URL,
			targetWidth: w,
			targetHeight: h,
			sourceType: st
		});
	
	}, 'Nova foto', ['Abrir Camera', 'Abrir Galeria']);
	
}

function take_photo_id($id){
	//alert("take_photo_id called id:"+$id);
	inp = "#"+$id;
	openCamera(500, 400, 75, function(img){
		console.log("photo taken");
		
		$(inp).val(img).trigger("change");
		//alert($(inp).attr("data-sento"));
		var imgEle = "#img_"+$id;
		console.log(imgEle);
		//alert($(imgEle).length);
		$(imgEle).attr("src", img);
	});
}

function a4pp_destroy_only(){

	$(".content:not(:last):not(:first):not(:eq(1)):not(:eq(2))").remove();

}

function a4pp_destroy_prev_last(){
	
	$(".content:last").prev().remove();
	
}

function a4pp_destroy_last(){
	
	$(".content:last").remove();
	
}


function a4pp_scan(){

	cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );

}

function a4pp_gps(callback){
	
	var watchID = navigator.geolocation.watchPosition(function(p){
		alert(p.longitude);
	}, function(){
		alert("Error");
	}, { timeout: 30000 });
	
}

function a4pp_download_file(url, fname, prog){
	downloadFile(url, fname, prog);
}

 function downloadFile(url, fname, prog){
	 
		var pro = document.getElementById(prog);
		
		$('#thePer').show();
		
		$("#downloadBtn").hide();
	 
        window.requestFileSystem(
                     LocalFileSystem.PERSISTENT, 0, 
                     function onFileSystemSuccess(fileSystem) {
                     fileSystem.root.getFile(
                                 "dummy.html", {create: true, exclusive: false}, 
                                 function gotFileEntry(fileEntry){
                                 var sPath = fileEntry.toURI().replace("dummy.html","");
                                 var fileTransfer = new FileTransfer();
                                 var porc = 0;
                                 fileTransfer.onprogress = function(progressEvent){
									  porc = Math.round((progressEvent.loaded / progressEvent.total) *100);
									 pro.style.width = porc + "%";
									 $('#perc').text(porc + "%");
								 };
                                 
                                 fileEntry.remove();
 
                                 fileTransfer.download(
                                           encodeURI(url),
                                           sPath + fname,
                                           function(theFile) {
                                           $('#perc').text("100%");
                                           pro.style.width = "100%";
                                           
											window.open(theFile.toURI(), "_system");   
                                           
											$('#thePer').hide();
											
											$("#downloadBtn").show();
                                           
                                           },
                                           function(error) {
												alert("No se pudo bajar: " + error.source);
												alert(JSON.stringify(error));
												$('#thePer').hide();
												$("#downloadBtn").show();
                                           }
                                           );
                                 }, 
                                 fail);
                     }, 
                     fail);
 
    }
 
    function showLink(url){
        alert(url);
        var divEl = document.getElementById("ready");
        var aElem = document.createElement("a");
        aElem.setAttribute("target", "_blank");
        aElem.setAttribute("href", url);
        aElem.appendChild(document.createTextNode("Ready! Click To Open."))
        divEl.appendChild(aElem);
 
    }
 
 
    function fail(evt) {
        alert(evt.target.error.code);
    }
    
    function getpos(callback, onerr){

		var onSuccess = function(position) {
			var ret = {};
			for(x in position.coords){
				ret[x] = position.coords[x];
				console.log(x+" -> "+ret[x]);
			}
			console.log(ret);
			 callback(ret);
		};

		// onError Callback receives a PositionError object
		//
		function onError(error) {
			alert('code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
		}

		var	onRealError = (onerr) ? onerr : onError;

		navigator.geolocation.getCurrentPosition(onSuccess, onRealError, {maximumAge:0, timeout:10000, enableHighAccuracy: true});
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
			
		});
		
	}
	
	window.sendingItem = 0;
	
	window.totalSent = 0;
	
	window.isSending = false;
	
	window.sendingAll = false;
	
	function sendAll(collection){
		
		if(!remember.isCollection(collection)){
			
			console.log("Collection "+collection+" not found");
			
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
				
				console.log("Skiping item "+window.sendingItem);
				
				window.sendingItem++;
				
				sendAll(collection);
				
				return true;
				
			}
			
			console.log("Sending "+window.sendingItem);
		
		}else{
			
			if(window.sendingAll != true){
				if(window.totalSent == 0){
				
					toast(i( "Nada a sincronizar", "Nada que enviar", "Everything Up-to-date"), "success", 1000);
					
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
				
					console.log("Waiting ..");
				
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
	
	
	window.sendEmailCurrentItem = function(){
			
		console.log("test");
		
		var email = prompt(window.i("Digite email", "Digite email", "Write email address"));
		
		if(email){
				
			console.log("test");
			
			remember.saveForm("form");
				
			var collection = $("form:last").attr("collection");
			var tid = $("form:last").attr("indexof");
			
			sendItem(collection, tid);
			
			console.log(collection);
			setTimeout(function(){
				$.get(window.app.update_url+"&action=send_email&collection="+collection+"&id="+remember.collections[collection][remember.current_item.id].real_id+"&ent="+$("[name=entidad_]").val()+"&email="+email, function(r){
					alert(r.message);
					console.log(r);
				});
			}, 1000);
					
		}
		
		return false;
		
	}
	
