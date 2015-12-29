var Files = {
	"fail": function(msg){
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

alert("Init");

var myFile = Files.openFile("customtext.txt");
