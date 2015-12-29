var Files = {
	"fail": function(msg){
		return function(msg){
			alert(msg);
		}
	},
	"openFile": function(fileName, createFile){
		
		var returnFile = {};
		
		returnFile.fileName = fileName;
		
		window.requestFileSystem(window.PERSISTENT, 0, 
			function(fs){
				fs.root.getFile(
					fileName, 
					{
						create: createFile || false, 
						exclusive: false
					}, 
					this.gotFileEntry(), 
					this.fail("cant load file")
				);
			}, this.fail("resquest failed")
		);
	}, 
	
	"gotFileEntry": function(){
	
		return function(fEntry){
			
			alert("GotFileEntry Called!");
			
		}
			
	}
	
	
};

var myFile = Files.openFile("customtext.txt");
