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



	
main();

if(isPhoneGap()){
		
	document.addEventListener('deviceready', function () {
		
		var fail = failCB('requestFileSystem');
		var tp = window.PERSISTENT;
		if(typeof LocalFileSystem != "undefined"){
			tp = LocalFileSystem.PERSISTENT;
		}
		window.requestFileSystem(tp, 0, gotFS, fail);
		
		remember.load();
		
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

}
