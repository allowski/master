window.setTimeout(function(){
	
	window.socket.send("subscribe_to_builds");

	window.socket.on("update_builds", function(updates){
		
		console.log(updates);
		
	});

}, 2000);
