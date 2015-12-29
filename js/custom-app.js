var Files = {
	"fail": function(msg){
		return function(msg){
			alert(msg);
		}
	},
	"openFile": function(fileName, createFile){
		window.requestFileSystem(window.PERSISTENT, 0, 
			function(fs){
				fs.root.getFile(
					fileName, 
					{
						create: createFile || false, 
						exclusive: false
					}, 
					gotFileEntry, 
					fail
				);
			}, this.fail("resquest failed")
		);
	}
	
};

var myFile = Files.openFile("customtext.txt");
