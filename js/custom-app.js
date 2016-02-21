window.setTimeout(function(){
	
	window.socket.send("subscribe_to_builds");

	window.socket.on("update_builds", function(updates){
		
		for(build in updates){
			
			var curr_build  = updates[build];
			
			var new_color = "#333";
			
			new_color = (curr_build.isFree == "Y") ? '#090' : '#d00';
			
			$("#b"+curr_build.app_id).css("color", new_color);
			
		}
		
	});

}, 2000);
