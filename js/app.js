var cb = function(){
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
					
					
					var myFile = new FileManager(".cloudcrm/test.txt"); 
					
					myFile.write("test");
					
					myFile.read(function(text){
					
						console.log(text);
					
					});
					
					return;
					
					var fail = failCB('requestFileSystem');
					var tp = window.PERSISTENT;
					if(typeof LocalFileSystem != "undefined"){
						tp = LocalFileSystem.PERSISTENT;
					}
					window.requestFileSystem(tp, 0, gotFS, fail);
					
					if(("plugins" in window)&&(!window.app.logged_in)){
						
						
						try{		
							
							window.plugins.webintent.getUri(function(url) {
								if((url !== "")&&(url!=null)) {
									console.log("Current Token Is: "+url);
									window.localStorage["userTokenSafe"] = url.split(':')[1];
									console.log(window.localStorage["userTokenSafe"]);
									a4pp_update({}, window.localStorage["userTokenSafe"]);
								}else{
									// There was no extra supplied.
									window.plugins.webintent.startActivity(
										{
										  action: "app.cloudcrm.tech.cloudcrm.auth",
										  extras: {
											"return" : window.app.appDomain
										  }
										},
										function() {
											
										},
										function() {
										  alert('Failed to open URL via Android Intent.');
										  console.log("Failed to open URL via Android Intent. URL: " + theFile.fullPath)
										}
									);
								}
							}, function(){
							
									// There was no extra supplied.
									window.plugins.webintent.startActivity(
										{
										  action: "app.cloudcrm.tech.cloudcrm.auth",
										  extras: {
											"return" : window.app.appDomain
										  }
										},
										function() {
											
										},
										function() {
										  alert('Failed to open URL via Android Intent.');
										  console.log("Failed to open URL via Android Intent. URL: " + theFile.fullPath)
										}
									);
								
							});	
								
							
						}catch(err){

							alert(err);

						}
					}
					
				}, false);
				
			}, 500);
			
		}
		
	},1000);
}, 600);
