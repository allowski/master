function main(){
	init = 0;
	if(typeof window.localStorage['data']!= "undefined"){
		window.app = JSON.parse(window.localStorage['data']);
	}else{
		window.app = appo;
	}
	
	var cb = function(){
		window.a4pp(window.app);
		new Function(window.app.onRememberLoaded);
	};
	
	console.log(typeof cb);
	
	remember.init(cb);

}
setTimeout(function(){
	main();
	setTimeout(function(){
		if(window.app.logged==true){
			a4pp_update();
		}
	},1000);
}, 600);
