function register_client(url){
	
	window.socket = io.connect(url);
	
	window.socket.on('welcome', function(data) {
		$.post("?action=getUser", function(r){
			var resp = JSON.parse(r);
			window.socket.emit('new_client', resp);
		});
	});
	window.socket.on('notification', function(data) {
		showNotification(data);
	});
	
	window.socket.on('error', console.error.bind(console));
	window.socket.on('message', console.log.bind(console));

}

function showNotification(details){
		
	toast(details.text, 5000);
	window.socket.emit("notification_opened", details);
	
}

