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
	"ton": 300.00,
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
		
		var gen = this.generateFromForm();
		
		this.log("append result1");
		this.result1.append(gen);
		this.log("append result2");
		this.result2.append(gen);
	},
	"generateFromForm": function(){
		
		this.log("generateFromForm");
	
		var prod = $("#producto").val();
		var um = $("#um").val();
		var dosis = $("#dosis").val();
		var precio = $("#precio").val();
		var aplic = $("#aplicaciones").val();
		var usd_ha = precio * aplic * usd_ha;
		var sc_ha = (usd_ha / (this.ton/1000) * 60);
		var kg_ha = (usd_ha / (this.ton/1000));
		
		var result = "<tr>\n\
		<td>"+prod+"</td>\n\
		<td>"+um+"</td>\n\
		<td>"+dosis+"</td>\n\
		<td>"+precio+"</td>\n\
		<td>"+aplic+"</td>\n\
		<td>"+usd_ha+"</td>\n\
		<td>"+sc_ha+"</td>\n\
		<td>"+kg_ha+"</td>\n\
</tr>";
		
		this.log(result);
		
		return result;
		
	},
	"log": function(e){
		console.log(e);
	}
};


costoBeneficio.init();
