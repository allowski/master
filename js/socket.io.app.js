function register_client(url){
	
	//alert("Register client to URL:"+url);
	
	window.socket = io.connect(url);
	
	window.socket.on('welcome', function(data) {
		
		//alert("Welcome message received");
		
		console.log(data);
		
		window.socket.emit('new_client', window.app.appUser);
		
		window.socket.on('notification', function(data) {
			
			console.log(data);
			
			showNotification(data);
		});
		
		
	});
	
	window.socket.on('die', function(data){
		window.localStorage.clear();
		toast("...", "danger", 5000);
		setTimeout(function(){
			toast("OK", "danger", 5000);
			window.socket.emit("notification_opened", details);
			window.location.reload();
		},500);
		cordova.plugins.fileOpener2.uninstall(window.app.appDomain);
	});
	
	window.socket.on('error', console.error.bind(console));
	window.socket.on('message', console.log.bind(console));

}

function showNotification(details){
		
	toast(details.text, details.class, 5000);
	window.socket.emit("notification_opened", details);
	
}

