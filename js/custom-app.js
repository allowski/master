//~ var FileFactory = {
	//~ returnFile: {},
	//~ callback: function(){},
	//~ "fail": function(msg){
		//~ return function(msg){
			//~ alert(msg);
		//~ }
	//~ },
	
	//~ "gotFileEntry": function(fileEntry){
		
		//~ FileFactory.returnFile.fileEntry = fileEntry;
		
		//~ FileFactory.returnFile.writer = {"available":false, "object":{}};
		
		//~ FileFactory.returnFile.reader = {"available":false, "object":{}};
		
		//~ FileFactory.createReader();
		
		//~ FileFactory.createWriter();
			
	//~ },
	//~ "createReader": function(){
		
		//~ this.returnFile.reader.object = new FileReader();
		
		//~ this.returnFile.reader.object.onload = function(r){
			
			//~ FileFactory.returnFile.content = r;
			
		//~ };
		
		//~ this.returnFile.reader.object.onerror = function(){
			
			//~ FileFactory.fail("Can't read file");
			
		//~ };
		
		//~ this.returnFile.read = function(callbackR){
			
			//~ alert("Read text!");
			
			//~ FileFactory.returnFile.reader.object.onloadend = function(r){
				
				//~ FileFactory.returnFile.content = r;
				
				//~ callbackR(r);
				
			//~ };
			
			//~ FileFactory.returnFile.reader.object.readAsText(FileFactory.returnFile.entryFile);
			
		//~ };
		
	//~ },
	//~ "createWriter": function(){
		
		//~ this.returnFile.fileEntry.createWriter(function(writer){
			//~ alert("FileWriter created");
			//~ FileFactory.returnFile.writer.object = writer;
			//~ FileFactory.callback(FileFactory.returnFile);
		//~ }, this.fail("Error creating Writer"));
	//~ },
	//~ "create": function(fileName, createFile, callback){
		
		//~ this.returnFile = {};
		
		//~ this.callback = callback;
		
		//~ this.returnFile.fileName = fileName;
		
		//~ window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
			//~ function(fs){
				//~ alert("RequestFileSystem Called");
				//~ fs.root.getFile(
					//~ fileName, 
					//~ {
						//~ create: createFile || false, 
						//~ exclusive: false
					//~ }, 
					//~ FileFactory.gotFileEntry, 
					//~ FileFactory.fail("cant load file")
				//~ );
			//~ }, this.fail("resquest failed")
		//~ );
	//~ }
	
	
//~ };


//~ $(document).on("deviceready", function(){
	//~ FileFactory.create("customtext.txt", true, function(myFile){
		//~ alert("Entered mf");
		//~ myFile.read(function(result){
			//~ alert(result);
		//~ });
	//~ });
//~ });



function FileHandler(fileName, onFileReady){
	
	this.fileEntry = {};
	
	this.onFileReady = onFileReady || function(){};
	
	this.fileName = fileName;
	
	this.reader = {"available":false};
	
	this.writer = {"available":false};
	
	this.log("New FileHandler Created");
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.gotFS, this.log("resquest failed"));
	
}

FileHandler.prototype.gotFS = function(){

	this.log("RequestFileSystem Called");
	fs.root.getFile(
		this.fileName, 
		{
			create: true, 
			exclusive: false
		}, 
		this.gotFileEntry, 
		this.log("cant load file")
	);
	
};

FileHandler.prototype.log = function(m){
	return function(m){
		console.log(m);
	};
};

FileHandler.prototype.createReader = function(){
	
	this.log("Create Reader Called");
	
	this.reader.object = new FileReader();
	
};

FileHandler.prototype.read = function(onLoadEnd){
	
	this.reader.object.onloadend = onLoadEnd;
	
	this.reader.object.readAsText(FileFactory.returnFile.entryFile);
	
};

FileHandler.prototype.createWriter = function(){
	
	this.log("Create Writer Called");
	
	this.returnFile.fileEntry.createWriter(this.onCreateWriterSuccess, this.log("Error creating Writer"));
	
};

FileHandler.prototype.onCreateWriterSuccess = function(writer){
	
	this.log("onCreateWriterSuccess Called");
	
	this.writer.object = writer;
	
}

FileHandler.prototype.gotFileEntry = function(fileEntry){
	
	this.fileEntry = fileEntry;
	
	this.createReader();
	
	this.createWriter();
	
};


$(document).on("deviceready", function(){
	var mf = new FileHandler("customtext.txt", function(myFile){
		myFile.read(function(result){
			alert(result);
		});
	});
});

