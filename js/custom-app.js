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

function date(n,t){var e,r,u=this,o=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],i=/\\?(.?)/gi,c=function(n,t){return r[n]?r[n]():t},a=function(n,t){for(n=String(n);n.length<t;)n="0"+n;return n};return r={d:function(){return a(r.j(),2)},D:function(){return r.l().slice(0,3)},j:function(){return e.getDate()},l:function(){return o[r.w()]+"day"},N:function(){return r.w()||7},S:function(){var n=r.j(),t=n%10;return 3>=t&&1==parseInt(n%100/10,10)&&(t=0),["st","nd","rd"][t-1]||"th"},w:function(){return e.getDay()},z:function(){var n=new Date(r.Y(),r.n()-1,r.j()),t=new Date(r.Y(),0,1);return Math.round((n-t)/864e5)},W:function(){var n=new Date(r.Y(),r.n()-1,r.j()-r.N()+3),t=new Date(n.getFullYear(),0,4);return a(1+Math.round((n-t)/864e5/7),2)},F:function(){return o[6+r.n()]},m:function(){return a(r.n(),2)},M:function(){return r.F().slice(0,3)},n:function(){return e.getMonth()+1},t:function(){return new Date(r.Y(),r.n(),0).getDate()},L:function(){var n=r.Y();return n%4===0&n%100!==0|n%400===0},o:function(){var n=r.n(),t=r.W(),e=r.Y();return e+(12===n&&9>t?1:1===n&&t>9?-1:0)},Y:function(){return e.getFullYear()},y:function(){return r.Y().toString().slice(-2)},a:function(){return e.getHours()>11?"pm":"am"},A:function(){return r.a().toUpperCase()},B:function(){var n=3600*e.getUTCHours(),t=60*e.getUTCMinutes(),r=e.getUTCSeconds();return a(Math.floor((n+t+r+3600)/86.4)%1e3,3)},g:function(){return r.G()%12||12},G:function(){return e.getHours()},h:function(){return a(r.g(),2)},H:function(){return a(r.G(),2)},i:function(){return a(e.getMinutes(),2)},s:function(){return a(e.getSeconds(),2)},u:function(){return a(1e3*e.getMilliseconds(),6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)"},I:function(){var n=new Date(r.Y(),0),t=Date.UTC(r.Y(),0),e=new Date(r.Y(),6),u=Date.UTC(r.Y(),6);return n-t!==e-u?1:0},O:function(){var n=e.getTimezoneOffset(),t=Math.abs(n);return(n>0?"-":"+")+a(100*Math.floor(t/60)+t%60,4)},P:function(){var n=r.O();return n.substr(0,3)+":"+n.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-e.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(i,c)},r:function(){return"D, d M Y H:i:s O".replace(i,c)},U:function(){return e/1e3|0}},this.date=function(n,t){return u=this,e=void 0===t?new Date:t instanceof Date?new Date(t):new Date(1e3*t),n.replace(i,c)},this.date(n,t)}

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
	"filenameInput": null,
	"modal": null,
	"init": function(){
		
		this.log("init function");
		
		this.loadData();
		
		this.loadElements();
	
	},
	
	"loadElements": function(){
		
		this.result1 = $("#result1");
		
		this.result2 = $("#result2");
		
		this.modal = $("#myModal").clone();
		
		this.modal.appendTo("body").attr("id", "costoModal");
		
		this.fileList = this.modal.find(".list-group");
		
		this.filenameInput = $("input#nome");
		
	},
	
	"refreshList": function(){
		
		this.fileList.html("");
		
		$.each(this.files, function(){
			
			costoBeneficio.fileList.append("<a class='list-group-item text-uppercase' onclick='costoBeneficio.editFile(event, \""+this.filename+"\");'>"+this.filename+" ["+this.datetime+"]</a>");
			
		});
		
	},
	
	"save": function(){
		
		this.log("save function");
		
		if(this.currentFile == "none"){
		
			var file_name = prompt("Digite nombre para el archivo:");
			
			if((file_name) && (file_name!="") && (typeof file_name !== "null")){
				
				var newItemObj = {};
				
				newItemObj.filename = file_name;
				
				newItemObj.content = $("#tblHtml").html();
				
				newItemObj.datetime = date("d/m/Y H:i:s");
				
				this.files[file_name] = newItemObj;
				
				this.currentFile = file_name;
				
			}
			
		}else{
			
			this.files[this.currentFile].content = $("#tblHtml").html();
			
			this.files[this.currentFile].datetime = date("d/m/Y H:i:s");
			
		}
		
		this.filenameInput.val(this.currentFile);
		
		window.localStorage["costoBeneficio"] = JSON.stringify(this.files);
		
		this.refreshList();
		
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
			this.editedRow = null;
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
		}else{
			this.log("this:---"+this.appendTo);
		}
		
		this.sumAll();
		
		this.isBeingEdited = false;
		
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
		var sc_ha = (usd_ha / (this.ton/1000) / 60);
		var kg_ha = (usd_ha / (this.ton/1000));
		
		var result = "<tr class='one-row' onclick='costoBeneficio.editRow(event, this, "+appendTo+");'>\n\
		<td class='hasData' data-target='#producto' data-value='"+prod+"'>"+prod+"</td>\n\
		<td class='hasData text-center' data-target='#um' data-value='"+um+"'>"+um+"</td>\n\
		<td class='hasData text-right' data-target='#dosis' data-value='"+dosis+"'>"+number_format(dosis, 2, ",", ".")+"</td>\n\
		<td class='hasData text-right' data-target='#precio' data-value='"+precio+"'>"+number_format(precio, 2, ",", ".")+"</td>\n\
		<td class='hasData text-center' data-target='#aplicaciones' data-value='"+aplic+"'>"+number_format(aplic, 2, ",", ".")+"</td>\n\
		<td class='tt1 text-right' data-value='"+usd_ha+"'>"+number_format(usd_ha, 2, ",", ".")+"</td>\n\
		<td class='tt2 text-right' data-value='"+sc_ha+"'>"+number_format(sc_ha, 2, ",", ".")+"</td>\n\
		<td class='tt3 text-right' data-value='"+kg_ha+"'>"+number_format(kg_ha, 2, ",", ".")+"</td>\n\
		<td><a href='#' class='btn btn-danger' onclick='costoBeneficio.removeItem(event, this);'><span class='glyphicon glyphicon-remove'></span></a></td>\n\
</tr>";
		
		this.log(result);
		
		return result;
		
	},
	"clear": function(){
		$("#producto, #um, #precio, #dosis, #aplicaciones").val("");
	},
	"log": function(e){
		console.log(e);
	},
	"selectFile": function(e){
		e.preventDefault();
		
		this.modal.modal('show');
	},
	"removeItem": function(e, ele){
		e.preventDefault();
		e.stopPropagation();
		$(ele).parent().parent().remove();
		
		this.sumAll();
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
		
		this.sumAll();
		
	},
	
	"editFile": function(event, filename){
		
		event.preventDefault();
		
		if(filename in this.files){
			
			$("#tblHtml").html(this.files[filename].content);
		
			this.result1 = $("#result1");
			
			this.result2 = $("#result2");
			
			this.currentFile = filename;
			
			this.filenameInput.val(filename);
			
			this.modal.modal('toggle');
			
			this.sumAll();
			
		}
		
	},
	"sendEmail": function(){
		
		var email = prompt("Digite email:");
		
		if(email != ""){
		
			var title = "Presupuesto "+$("#nome").val();
		
			var content = $("#tblHtml").html();
			
			toast("Mandando correo..", "warning", 0);
			
			$.post(window.app.update_url, {"apx":"send_email","email":email, "title": title, "content":content}, function(){
				
				toast("Correo enviado", "success", 3000);
				
			});
		
		}else{
			
			
			
		}
		
	}
	,
	
	"sumAll": function(){
		
		this.log("sumAll Func");
		
		$("#result1, #result2").each(function(){
			
			costoBeneficio.log("Sum "+this.id);
			
			var rs = {tt1:0, tt2:0, tt3:0};
			
			costoBeneficio.log(rs);
			
			var select = "#"+this.id+" .tt1";
			
			costoBeneficio.log("Query: "+ select);
			
			$(select).each(function(){
				costoBeneficio.log("tt1");
				rs.tt1+=parseFloat($(this).data("value"));
				costoBeneficio.log(rs);
			});
			$("#"+this.id+" .tt2").each(function(){
				costoBeneficio.log("tt2");
				rs.tt2+=parseFloat($(this).data("value"));
				costoBeneficio.log(rs);
			});
			$("#"+this.id+" .tt3").each(function(){
				costoBeneficio.log("tt3");
				rs.tt3+=parseFloat($(this).data("value"));
				costoBeneficio.log(rs);
			});
			
			costoBeneficio.log(rs);
			
			var that = this;
			
			setTimeout(function(){
				$(that).parent().find("#tt1").text(number_format(rs.tt1, 2, ".", ","));
				$(that).parent().find("#tt2").text(number_format(rs.tt2, 2, ".", ","));
				$(that).parent().find("#tt3").text(number_format(rs.tt3, 2, ".", ","));
			}, 400);
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

	console.log("afterRender fired!");
	
	setTimeout(function(){
	
		costoBeneficio.init();
		
		costoBeneficio.refreshList();
	
	}, 500);

});
