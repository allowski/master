function camera(id){
	navigator.camera.getPicture(function(){
		
	}, function(){
		alert("Error");
	});
}