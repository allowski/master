var FileFactory = {
	"fail": function(msg){
		alert("Failed");
		return function(msg){
			alert(msg);
		}
	},
	"create": function(fileName, createFile){
		
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

var myFile = FileFactory.create("customtext.txt");
