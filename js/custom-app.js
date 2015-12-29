var Files = {
	
	"openFile": function(fileName, createFile){
		fs.root.getFile(
			fileName, 
			{
				create: createFile || false, 
				exclusive: false
			}, 
			gotFileEntry, 
			fail
		);
	}
	
};

var myFile = Files.openFile("customtext.txt");
