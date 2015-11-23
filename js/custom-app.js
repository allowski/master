/**
 * 
 * 	CostoBeneficio App
 * 
 */
 
 
String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
}; 

var number_format=function(e,n,t,r){e=(e+"").replace(/[^0-9+\-Ee.]/g,"");var i=isFinite(+e)?+e:0,a=isFinite(+n)?Math.abs(n):0,o="undefined"==typeof r?",":r,d="undefined"==typeof t?".":t,u="",f=function(e,n){var t=Math.pow(10,n);return""+(Math.round(e*t)/t).toFixed(n)};return u=(a?f(i,a):""+Math.round(i)).split("."),u[0].length>3&&(u[0]=u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,o)),(u[1]||"").length<a&&(u[1]=u[1]||"",u[1]+=new Array(a-u[1].length+1).join("0")),u.join(d)};
  

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
		var dosis = parseFloat($("#dosis").val());
		var precio = parseFloat($("#precio").val());
		var aplic = parseFloat($("#aplicaciones").val());
		var usd_ha = precio * aplic * dosis;
		this.log("USD/Ha: "+(usd_ha));
		var sc_ha = (usd_ha / (this.ton/1000) * 60);
		var kg_ha = (usd_ha / (this.ton/1000));
		
		var result = "<tr>\n\
		<td>"+prod+"</td>\n\
		<td>"+um+"</td>\n\
		<td>"+dosis+"</td>\n\
		<td>"+precio+"</td>\n\
		<td>"+aplic+"</td>\n\
		<td class='tt1' data-value='"+usd_ha+"'>"+usd_ha+"</td>\n\
		<td class='tt2' data-value='"+sc_ha+"'>"+sc_ha+"</td>\n\
		<td class='tt3' data-value='"+kg_ha+"'>"+kg_ha+"</td>\n\
		<td><a href='#' class='btn btn-danger'><span class='glyphicon glyphicon-remove'></span></a></td>\n\
</tr>";
		
		this.log(result);
		
		return result;
		
	},
	"log": function(e){
		console.log(e);
	}
};

function toDbl(evt, ele){
	
	console.log("Keyup");
	
	var valant = $(ele).val();
	
	valant = valant.replace(".", "");
		
	console.log("Value:"+valant.length);
	
	if((valant.length > 1)&&(valant.indexOf(".")===-1)){
		valant = valant.insert(valant.length-2, ".");
		console.log("insert into:"+(valant.length-2));
	}
	
	$(ele).val(valant);
}



costoBeneficio.init();
