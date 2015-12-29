var FileFactory = {
	returnFile: {},
	callback: function(){},
	"fail": function(msg){
		return function(msg){
			alert(JSON.stringify(msg));
		}
	},
	
	"gotFileEntry": function(fileEntry){
		
		FileFactory.returnFile.fileEntry = fileEntry;
		
		FileFactory.returnFile.writer = {"available":false, "object":{}};
		
		FileFactory.returnFile.reader = {"available":false, "object":{}};
		
		FileFactory.createReader();
		
		FileFactory.createWriter();
			
	},
	"createReader": function(){
		
		this.returnFile.reader.object = new FileReader();
		
		this.returnFile.reader.object.onload = function(r){
			
			FileFactory.returnFile.content = r;
			
		};
		
		this.returnFile.reader.object.onerror = function(){
			
			FileFactory.fail("Can't read file");
			
		};
		
		this.returnFile.read = function(callback){
			
			alert("Read text!");
			
			FileFactory.returnFile.reader.object.onloadend = function(r){
				
				FileFactory.returnFile.content = r;
				
				callback(r);
				
			};
			
			FileFactory.returnFile.reader.object.readAsText(FileFactory.returnFile.entryFile);
			
		};
		
	},
	"createWriter": function(){
		
		this.returnFile.fileEntry.createWriter(function(writer){
			alert("FileWriter created");
			FileFactory.returnFile.writer.object = writer;
			FileFactory.callback(FileFactory.returnFile);
		}, this.fail("Error creating Writer"));
	},
	"create": function(fileName, createFile, callback){
		
		this.returnFile = {};
		
		this.callback = callback;
		
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
	FileFactory.create("customtext.txt", true, function(myFile){
		alert("Entered mf");
		myFile.read(function(result){
			alert(result);
		});
	});
});
