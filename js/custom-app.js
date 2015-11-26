function setActivity($id, $name){
	
	toast("<span class='spinner glyphicon glyphicon-refresh'></span> "+i("Aguarde..", "Aguarde..", "Wait.."), "warning", 50000);
	
	$("#btn").attr("src", "img/ponto-alt.png");
	
	setTimeout(function(){
		getpos(function(res){
			
			var ps = JSON.parse(window.localStorage["pos"]);
			
			var nw  = {};
			
			nw.accuracy = res.accurancy;
			nw.altitude = res.altitude;
			nw.altitudeAccuracy = res.altitudeAccuracy;
			nw.heading = res.heading;
			nw.latitude = res.latitude;
			nw.longitude = res.longitude;
			nw.speed = res.speed;
			nw.activity = {"id":$id, "name":$name};
			
			window.app.items[1].data = nw;
			
			a4pp(window.app.items[1]);
			
			var d = new Date();
			nw.timestamp = d.toLocaleString();
			
			ps.push(nw);
			
			window.localStorage["pos"] = JSON.stringify(ps);
			
			updateList();
			
			toast(i("Capturado", "Posicion capturada", "Captured position!"), "success", 3000);
			
			$("#btn").attr("src", "img/ponto.png");
			
			setTimeout(function(){
				
				
			
				if(isConnected()){
					
					//sendAll();
					
				}else{
					
					toast("offline", "warning", 1000);
					
				}
				
			}, 3000);
			
			
		});
		
	},1500);
	
}

function updateList(){

	var all = JSON.parse(window.localStorage["pos"]).reverse();
	
	$("#list").html("");
	
	if(all.length==0){
		
		$("<li>").text(i("Nada a mostrar", "Nada que mostrar", "No positions here")).appendTo("#list");
		
		return;
		
	}
	
	
		
	var gly = "glyphicon-map-marker";
	
	var cls = "text";
	
	for(x in all){
		
		var current = all[x];
		
		if(x == 0){
			
			gly = "glyphicon-triangle-right text-success";
			cls = "text-success"
			
		}else{
			
			gly = "glyphicon-map-marker";
			cls = "text";
			
		}
		
		var strx = " <span class='glyphicon "+gly+"'></span> "+current.activity.name+"</span> ";
		
		$("<li>").attr("onclick", "window.open('geo:"+current.latitude+", "+current.longitude+"', '_system');").html(strx).appendTo("#list").addClass(cls);
		
	}

}

function sendAll(){
	
	
	toast("Sending...", "success", 0);
	
	var sp = JSON.parse(window.localStorage["pos"]);
	
	var rq = $.post(window.app.download_url,  {"apx":"upload","data":sp}, function(r){
		
		toast("sent!", "success", 5000);
		
		window.localStorage["pos"] = "[]";
		
	});
	
	rq.error = function(){
		toast("oops! error", "danger", 5000);
	};
	
}

function init(){
	
	if(!window.localStorage["pos"]){
		
		window.localStorage["pos"] = "[]";
		
	}
	
}

init();
