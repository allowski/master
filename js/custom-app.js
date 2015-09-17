function register_position(){
	
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
		
		alert("Capturado:\n"+nw.latitude+", "+nw.longitude);
		
		sendAll();
		
		
	});
	
}

function sendAll(){
	
	var sp = JSON.parse(window.localStorage["pos"]);
	
	$.post(window.app.download_url,  {"apx":"upload","data":sp}, function(){
		
		toast("sent!", "success", 5000);
		
		window.localStorage["pos"] = "[]";
		
	});
	
}

function init(){
	
	if(!window.localStorage["pos"]){
		
		window.localStorage["pos"] = "[]";
		
	}
	
}

init();
