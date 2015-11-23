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
	"isBeingEdited": false,
	"appendTo": 0,
	"editedRow": null,
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
		
		var gen;
		
		this.log("addRowEvent");
		
		this.log("append result1");
		
		if(this.isBeingEdited == true){
			this.editedRow.remove();
		}
		
		if(this.appendTo == 0){
			gen = this.generateFromForm(1);
			this.result1.append(gen);
			gen = this.generateFromForm(2);
			this.result2.append(gen);
		}else if(this.appendTo == 1){
			gen = this.generateFromForm(1);
			this.result1.append(gen);
		}else if(this.appendTo == 2){
			gen = this.generateFromForm(2);
			this.result2.append(gen);
		}
		
		this.appendTo = 0;
		
		this.clear();
		
	},
	"generateFromForm": function(appendTo){
		
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
		
		var result = "<tr onclick='costoBeneficio.editRow(event, this, "+appendTo+");'>\n\
		<td class='hasData' data-target='#producto' data-value='"+prod+"'>"+prod+"</td>\n\
		<td class='hasData' data-target='#um' data-value='"+um+"'>"+um+"</td>\n\
		<td class='hasData' data-target='#dosis' data-value='"+dosis+"'>"+dosis+"</td>\n\
		<td class='hasData' data-target='#precio' data-value='"+precio+"'>"+precio+"</td>\n\
		<td class='hasData' data-target='#aplicaciones' data-value='"+aplic+"'>"+aplic+"</td>\n\
		<td class='tt1' data-value='"+usd_ha+"'>"+usd_ha+"</td>\n\
		<td class='tt2' data-value='"+sc_ha+"'>"+sc_ha+"</td>\n\
		<td class='tt3' data-value='"+kg_ha+"'>"+kg_ha+"</td>\n\
		<td><a href='#' class='btn btn-danger' onclick='costoBeneficio.removeItem(event, this);'><span class='glyphicon glyphicon-remove'></span></a></td>\n\
</tr>";
		
		this.log(result);
		
		return result;
		
	},
	"clear": function(){
		$("#producto, #um, $precio, #dosis, #aplicaciones").val("");
	},
	"log": function(e){
		console.log(e);
	},
	"removeItem": function(e, ele){
		e.preventDefault();
		e.stopPropagation();
		$(ele).parent().parent().remove();
	},
	"editRow": function (event, element, appendTo){
		
		this.appendTo = appendTo;
		
		event.preventDefault();
		
		this.editedRow = $(element);
		
		this.isBeingEdited = true;
		
		this.editedRow.find(".hasData").each(function(k, v){
			
			var _target = $(this).data('target');
			var _value = $(this).data('value');
			
			$(_target).val(_value);
			
		});
		
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


$(function(){
	
	costoBeneficio.init();

});
