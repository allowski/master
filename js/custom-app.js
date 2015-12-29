var FileFactory = {
	"fail": function(msg){
		alert("Failed");
		return function(msg){
			alert(msg);
		}
	},
	
	"gotFileEntry": function(){
			
		alert("GotFileEntry Called!");
			
	},
	"create": function(fileName, createFile){
		
		this.fail("openFile Called");
		
		var returnFile = {};
		
		returnFile.fileName = fileName;
		
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
			function(fs){
				alert("RequestFileSystem Called");
				fs.root.getFile(
					fileName, 
					{
						create: createFile || false, 
						exclusive: false
					}, 
					FileFactory.gotFileEntry, 
					FileFactory.fail("cant load file")
				);
			}, this.fail("resquest failed")
		);
	}
	
	
};


$(document).on("deviceready", function(){
	var myFile = FileFactory.create("customtext.txt");
});
