var cb = function(){
	alert("Callback called");
	new Function(window.app.onRememberLoaded);
};

function main(){
	init = 0;
	if(typeof window.localStorage['data']!= "undefined"){
		window.app = JSON.parse(window.localStorage['data']);
	}else{
		window.app = appo;
	}
	
	window.a4pp(window.app);

}



setTimeout(function(){
	main();
	setTimeout(function(){
		if(window.app.logged==true){
			a4pp_update();
		}
		
		if(isPhoneGap()){
			setTimeout(function(){
				document.addEventListener('deviceready', function () {
					var fail = failCB('requestFileSystem');
					var tp = window.PERSISTENT;
					if(typeof LocalFileSystem != "undefined"){
						tp = LocalFileSystem.PERSISTENT;
					}
					window.requestFileSystem(tp, 0, gotFS, fail);
				}, false);
				
			}, 500);
			
		}
		
	},1000);
}, 600);
