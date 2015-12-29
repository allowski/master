var FileFactory = {
	returnFile = {},
	"fail": function(msg){
		return function(msg){
			alert(msg);
		}
	},
	
	"gotFileEntry": function(fileEntry){
			
		alert("GotFileEntry Called!");
		
		this.returnFile.fileEntry = fileEntry;
		
		this.returnFile.writer = {"available":false, "writer":{}};
		
		this.returnFile.reader = {"available":false, "reader":{}};
		
		this.createReader();
		
		this.createWriter();
			
	},
	"createReader": function(){
		
		this.returnFile.reader.object = new FileReader();
		
		this.returnFile.reader.object.onload = function(){
			
			
			
		};
		
		this.returnFile.reader.object.onerror = function(){
			
			FileFactory.fail("Can't read file");
			
		};
		
	},
	"createWriter": function(){
		
		this.returnFile.fileEntry.createWriter(function(writer){
			FileFactory.fail("FileWriter created");
			FileFactory.returnFile.writer.object = writer;
		}, this.fail("Error creating Writer"));
	},
	"create": function(fileName, createFile){
		
		this.fail("openFile Called");
		
		this.returnFile = {};
		
		this.returnFile.fileName = fileName;
		
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
