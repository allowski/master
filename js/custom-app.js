console.log = function(m){
	
	alert(JSON.stringify(m));
	
};

window.setTimeout(function(){
	
	window.socket.emit("subscribe_to_builds");
	
	window.socket.on("update_builds", function(updates){
		
		alert("Updates!");
		
		for(build in updates){
			
			var curr_build  = updates[build];
			
			var new_color = "#333";
			
			new_color = (curr_build.isFree == "Y") ? '#090' : '#d00';
			
			$("#b"+curr_build.app_id).css("color", new_color);
			
			console.log("#b"+curr_build.app_id);
			
			console.log(curr_build);
			
		}
		
		
		
	});

}, 5000);
