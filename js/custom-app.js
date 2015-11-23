/**
 * 
 * 	CostoBeneficio App
 * 
 */ 

var costoBeneficio = {
	"files": {},
	"currentFile": "none",
	"result1": null,
	"result2": null,
	"init": function(){
		
		this.log("init function");
		
		this.loadData();
		
		this.loadElements();
	
	},
	
	"loadElements": function(){
		
		this.result1 = $("#result1");
		this.result2 = $("#result2");
		
		
		
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
	"addRow": function(producto, und, prec, dose, aplic){
		
	},
	"addRowEvent": function(){
		
		this.log("addRowEvent");
		
		this.result1.append(this.generateFromForm());
		this.result2.append(this.generateFromForm());
	},
	"generateFromForm": function(){
		
		this.log("generateFromForm");
	
		var prod = $("#producto").val();
		var um = $("#um").val();
		var dosis = $("#dosis").val();
		var precio = $("#precio").val();
		var aplic = $("#aplicaciones").val();
		
		var result = "<tr>\
		<td>"+prod+"</td>\
		<td>"+um+"</td>\
		<td>"+dosis+"</td>\
		<td>"+precio+"</td>\
		<td>"+aplic+"</td>\
		</tr>";
		
		this.log(result);
		
		return result;
		
	},
	"log": function(e){
		console.log(e);
	}
};


costoBeneficio.init();
