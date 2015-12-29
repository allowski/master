var FileFactory = {
	returnFile: {},
	callback: function(){},
	"fail": function(msg){
		return function(msg){
			alert(JSON.stringify(msg));
		}
	},
	
	"gotFileEntry": function(fileEntry){
			
		alert("GotFileEntry Called!");
		
		FileFactory.returnFile.fileEntry = fileEntry;
		
		FileFactory.returnFile.writer = {"available":false, "object":{}};
		
		FileFactory.returnFile.reader = {"available":false, "object":{}};
		
		FileFactory.createReader();
		
		FileFactory.createWriter();
			
	},
	"createReader": function(){
		
		this.returnFile.reader.object = new FileReader();
		
		var that = this;
		
		this.returnFile.reader.object.onload = function(r){
			
			that.returnFile.content = r;
			
		};
		
		this.returnFile.reader.object.onerror = function(){
			
			that.fail("Can't read file");
			
		};
		
		this.returnFile.read = function(callback){
			
			alert("Read text!");
			
			that.returnFile.reader.object.onloadend = function(r){
				
				that.returnFile.content = r;
				
				callback(r);
				
			};
			
			that.returnFile.reader.object.readAsText(that.returnFile.entryFile);
			
		};
		
	},
	"createWriter": function(){
		
		var that = this;
		
		this.returnFile.fileEntry.createWriter(function(writer){
			alert("FileWriter created");
			that.returnFile.writer.object = writer;
			alert("Created Writer");
			that.callback(FileFactory.returnFile);
		}, this.fail("Error creating Writer"));
	},
	"create": function(fileName, createFile, callback){
		
		var that = this;
		
		this.fail("openFile Called");
		
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
					that.gotFileEntry, 
					that.fail("cant load file")
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
