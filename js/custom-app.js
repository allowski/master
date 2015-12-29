var Files = {
	"fail": function(msg){
		alert("Failed");
		return function(msg){
			alert(msg);
		}
	},
	"openFile": function(fileName, createFile){
		
		alert("openFile Called");
		
		var returnFile = {};
		
		returnFile.fileName = fileName;
		
		window.requestFileSystem(window.PERSISTENT, 0, 
			function(fs){
				alert("RequestFileSystem Called");
				fs.root.getFile(
					fileName, 
					{
						create: createFile || false, 
						exclusive: false
					}, 
					this.gotFileEntry, 
					this.fail("cant load file")
				);
			}, this.fail("resquest failed")
		);
	}, 
	
	"gotFileEntry": function(){
			
		alert("GotFileEntry Called!");
			
	}
	
	
};

window.addEventListener('filePluginIsReady', function(){ console.log('File plugin is ready');}, false);

alert("Init");

var myFile = Files.openFile("customtext.txt");
