/**
 * 
 * 	CostoBeneficio App
 * 
 */ 

var costoBeneficio = {
	"files": {},
	"currentFile": "none",
	"init": function(){
		
		this.log("init function");
		
		this.loadData();
	
	},
	"save": function(){
		
		this.log("save function");
		
		window.localStorage["costoBeneficio"] = JSON.stringify(this.files);
	},
	"loadData": function(){
		
		this.log("loadData function");
		
		if("costoBeneficio" in window.localStorage){
		
			this.log("costoBeneficio in localStorage");
		
		}else{
			
			this.log("costoBeneficion not in localStorage");
			
			window.localStorage["costoBeneficio"] = "{}";
		}
		
		this.files = JSON.parse(window.localStorage["costoBeneficio"]);
	},
	"addRow": function(){
		
	}, 
	"log": function(e){
		console.log(e);
	}
};

costoBeneficio.init();
