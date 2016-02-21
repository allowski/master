window.socket.emit("subscribe_to_builds");

window.socket.on("update_builds", function(updates){
	
	console.log(updates);
	
});
