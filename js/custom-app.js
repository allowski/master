function register_position(){
	
	getpos(function(res){
		
		console.log(res);
		
		var ps = JSON.parse(window.localStorage["pos"]);
		
		ps.push(res);
		
		window.localStorage["pos"] = JSON.stringify(ps);
		
		
	});
	
}

function init(){
	
	if(!window.localStorage["pos"]){
		
		window.localStorage["pos"] = "[]";
		
	}
	
}

init();
