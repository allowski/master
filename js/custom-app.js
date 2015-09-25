function register_position(){
	
	toast("<span class='spinner glyphicon glyphicon-refresh'> "+i("Aguarde..", "Aguarde..", "Wait.."), "warning", 50000);
	
	$("#btn").attr("src", "img/ponto-alt.png");
	
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
		
		ps.push(nw);
		
		window.localStorage["pos"] = JSON.stringify(ps);
		
		toast("capturado", "success", 3000);
		
		$("#btn").attr("src", "img/ponto.png");
		
		if(isConnected()){
			
			sendAll();
			
		}else{
			
			toast("offline", "warning", 1000);
			
		}
		
		
	});
	
}

function sendAll(){
	
	
	toast("sending...", "success", 15000);
	
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
