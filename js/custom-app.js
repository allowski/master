window.isBeingEdited = 0;     

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
    var dateFormat = function () {
        var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };
    
        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;
    
            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }
    
            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");
    
            mask = String(dF.masks[mask] || mask || dF.masks["default"]);
    
            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }
    
            var    _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };
    
            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();
    
    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    
    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };
    
    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

var number_format = function number_format(number, decimals, dec_point, thousands_sep) {
  
  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

function addRow(){
	
	console.log("addRow called");
	
	if(window.isBeingEdited == 0){
		
		console.log("isBeignEdited is 0");
	
		for(var numero = 1; numero <= 2; numero++){
			
			console.log("For numero = "+ numero);
		
			var xy = (parseFloat( $('#aplicaciones').val()) * parseFloat($('#precio').val()) * parseFloat($('#dosis').val()) ); 
			
			var soja = parseFloat($("#soja").val());
			
			var xyz  = xy/soja*1000/60;
			
			var kg = xy	 / (1000 / soja);
			
			var clase = (numero == 1) ? 'success' : 'danger';
		
			var precio = $('#precio').val();
			
			var appl = $('#aplicaciones').val();
			
			$('#result'+numero).append(
				'<tr class="'+clase+'" onclick="edit(this, '+numero+');autoSum();return false;">'+
				'<td>'+		$('#producto').val()+
				'</td><td>'+	$('#um').val()+	
				'</td><td>'+	$('#dosis').val()+	
				'</td><td class="text-right" data-val="'+precio+'">$ '+ 	number_format(precio,2,",",".")+	
				'</td><td class="text-center" data-val="'+appl+'">'+appl+	
				'</td><td class="suma text-right" data-val="'+xy+'">$ '+number_format(xy,2,",", ".")+	
				'</td><td class="suma2 text-right" data-val="'+xyz+'"> '+number_format(xyz,2,",", ".")+
				'</td><td class="suma3 text-right" data-val="'+kg+'">$ '+number_format(kg,2,",", ".")+
				'</td><td><button class="btn btn-danger remove-email" onclick="eliminar(this, event); return false;"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
				
		}
		
	}else{
		
		console.log("isBeignEdited is 1");
		
		window.isBeingEdited = 0;
		
		var xy = (parseFloat( $('#aplicaciones').val()) * parseFloat($('#precio').val()) * parseFloat($('#dosis').val()) ); 
		
		var soja = parseFloat($("#soja").val());
		
		var xyz  = xy/soja*1000/60;
		
		numero = $("#emp").val();
		
		var kg = xy / (soja/1000);
		
		var clase = (numero == 1) ? 'success' : 'danger';
		
		var precio = $('#precio').val();
		
		var appl = $('#aplicaciones').val();
		
		$('#result'+numero).append(
			'<tr class="'+clase+'" onclick="edit(this, '+numero+');autoSum();return false;">'+
			'<td>'+		$('#producto').val()+
			'</td><td>'+	$('#um').val()+	
			'</td><td>'+	$('#dosis').val()+	
			'</td><td class="text-right" data-val="'+precio+'">$ '+ 	number_format(precio,2,",",".")+	
			'</td><td class="text-center" data-val="'+appl+'">'+appl+	
			'</td><td class="suma text-right" data-val="'+xy+'">$ '+number_format(xy,2,",", ".")+	
			'</td><td class="suma2 text-right" data-val="'+xyz+'"> '+number_format(xyz,2,",", ".")+
			'</td><td class="suma3 text-right" data-val="'+kg+'">$ '+number_format(kg,2,",", ".")+
			'</td><td><button class="btn btn-danger remove-email" onclick="eliminar(this, event); return false;"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
			
		
	}
	
	clearAll();
	
	autoSum();

}

function eliminar(ele, e){
	
	
	console.log("eliminar func called");
	
	e.preventDefault();
	
	e.stopPropagation();
	
	if(confirm("Desea eliminar este producto?")){
	
		$(ele).parent().parent().remove();
		
		autoSum();
		
	}
	
	window.isBeingEdited = 0;
	
}


function edit(ele, de){
	
	
	console.log("edit_called");
	
	if(window.isBeingEdited == 1){
		if(!confirm("Ja esta editando uma fila\n Deseja excluir a fila editada?")){
			return;
		}
		
	}
	
	window.isBeingEdited = 1;
	
	$("#addToTwo").prop("checked", true);
	
	console.log($(ele).find("td:eq(0)"));
	
	var $dequien = "Diagro";
	
	if($(ele).hasClass('danger')){
		$dequien = "Competencia"
	}
	
	$("#emp option").prop('selected', false);
	
	$("#emp option").filter(function() {
		return $(this).attr("value") == de; 
	}).prop('selected', true);
	
	var $precio = $(ele).find("td:eq(3)").attr("data-val");
	var $aplicaciones = $(ele).find("td:eq(4)").attr("data-val");
	
	console.log("Precio: "+$precio);
	console.log("Aplicaciones: "+$aplicaciones);
	
	$("#producto").val($(ele).find("td:eq(0)").text());
	$("#um").val($(ele).find("td:eq(1)").text());
	$("#dosis").val($(ele).find("td:eq(2)").text());
	$("#precio").val($precio);
	$("#aplicaciones").val($aplicaciones);
	
	$(ele).remove();
	
}

function auto(num){
	console.log("auto func called");
	
	var sum3 = 0;
	var sum2 = 0;
	var sum = 0; 
	console.log("Calc: "+num);
	$("#result"+num).find('.suma').each(function(){ 
		sum+=parseFloat($(this).attr("data-val")); 
		console.log(sum);
		$("#t"+num).find('#total').text("$ "+number_format(sum, 2, ",", ".")); 
	});
	$("#result"+num).find('.suma2').each(function(){ 
		sum2+=parseFloat($(this).attr("data-val")); 
		console.log(sum2);
		$("#t"+num).find('#total2').text("Sc "+number_format(sum2, 2, ",", ".")); 
	});
	$("#result"+num).find('.suma3').each(function(){ 
		sum3+=parseFloat($(this).attr("data-val")); 
		console.log(sum3);
		$("#t"+num).find('#total3').text("Kg "+number_format(sum3, 2, ",", ".")); 
	});
	
}

function autoSum(){
	console.log("autoSum func called");
	$('#total,#total2,#total3').html("0");
	auto(1);
	auto(2);
}

function clearAll(){
	
	console.log("clearAll func called")
	//if($("#nome").val()!=""){ 
	$('#producto,#um,#precio,#dosis,#aplicaciones').val("");
	//}
}

function salvar(){
	
	console.log("func salvar called");
	
	today = new Date();
	
	var dateString = today.format("dd-m-yy");
	
	console.log("Is localStorage dados undefined?");
	
	if(window.localStorage['datos']==undefined){
		
		window.localStorage['datos'] = "{}";
		
		console.log("Yes");
		
	}else{
		
		console.log("Nope");
		
	}
	
	console.log("Parse datos JSON");
	
	var datos = JSON.parse(window.localStorage['datos']);
	
	var len = Object.keys(datos).length;
	
	console.log("Number of keys is: "+len);
	
	var nome = "";
	
	console.log("Is current file == none?");
	
	if(window.currentFile === "none"){
		
		console.log("Yes, it is");
		
		console.log("#Nome empty?");
		
		if($("#nome").val()==""){ 
			
			console.log("Yes, it is");
			
			nome = i("Sin titulo "+(len+1), "Sem titulo "+(len+1), "Untitled "+(len+1));
			
			console.log("Auto generated title is "+ nome);
			
			$("#nome").val(nome);
			
			selectFile();
			
		}else{
			
			nome = $("#nome").val();
			
			console.log("New file name is: "+nome);
			
		}
		
		console.log("Appending new file to list");
		
		datos[nome] = {"nome":nome,"datos":$("#tblHtml").html(),"fecha":dateString, "soja":parseFloat($("#soja").val())};
		
		console.log("New item is:");
		
		console.log(datos[nome]);
		
		console.log("set currentFile to "+nome);
		
		window.currentFile = nome;
		
        window.localStorage['currentFile'] = window.currentFile;
		
		
	}else{
		
		console.log("currentFile is "+window.currentFile);
		
		datos[window.currentFile].datos = $("#tblHtml").html();
		
		datos[window.currentFile].soja = parseFloat($("#soja").val());
		
		datos[window.currentFile].nome = ($("#nome").val());
		
	}
	
	console.log("Save to localStorage datos");
	
	window.localStorage['datos'] = JSON.stringify(datos);
	
	console.log("selectFile called");
	
	selectFile();
	
	console.log("clear selFile options");
	
	$("#selFile option").prop('selected', false);
	
	
	conosle.log("select the current file");
	
	$("#selFile option").filter(function(){
		
		console.log($(this).text()+ " == "+nome);
		
		return $(this).text() == nome;
	}).prop('selected', true);
	
	console.log("User feedback");
	
	toast(i("Arquivo salvo", "Archivo guardado", "File saved"), "success", 3000);
	
	console.log("End salvar");
	
}

if(window.localStorage['currentFile']==undefined){
    window.currentFile = "none";
    window.localStorage['currentFile'] = "none";
}else{
    window.currentFile = parseInt(window.localStorage['currentFile']);
    setTimeout(function(){
       $("#selFile").trigger("change"); 
    }, 500);
}

function selectFile(){
	
	console.log("func selectFile called");
	
	var ol = window.localStorage['datos'] || "{}";
	
	var files = JSON.parse(ol);
	$("#selFile").html("<option value='none'>- Nuevo archivo -</option>");
	$.each(files, function(k){
		if(k=="null") return;
		
		sel = ""; 
		if(window.localStorage['currentFile'] == k){
		    console.log("CurrentFile: "+window.currentFile);
			sel = 'selected="selected"';
		}
		$("#selFile").append("<option "+sel+" value='"+k+"'>"+this.nome+"</option>");
	});
	selectChange(null);
	
}

function selectChange(t){
	
	console.log("func selectChange called");
    
    var ol = window.localStorage['datos'] || "{}";
    
	var files = JSON.parse(ol);
	
	var idx = (t!==null) ? t[t.selectedIndex].value : window.localStorage['currentFile'];
	
	console.log($(t).find(":selected").val());
	
	if(typeof idx !== "undefined"){
	
    	if(idx=="none"){
    		
    		window.currentFile = "none";
    		
    		$("#result1, #result2").html("");
    		
    		$("#nome").val("");
    		
    		$("#soja").val("300");
    		
    		clearAll();
    		
    		autoSum();
    		
    		return;
    	}
    	
    	window.currentFile  = idx;
    
        window.localStorage['currentFile'] = idx; 
    	
    	console.log(idx);
    	
    	console.log(files[idx]);
    	if(window.currentFile !== "none"){
        	$("#tblHtml").html(files[idx].datos);
        	$("#nome").val(files[idx].nome);
        	$("#soja").val(files[idx].soja);
    	}
    	
    }
	
}

function deletar(){
	if(window.currentFile !== "none"){
		var files = JSON.parse(window.localStorage['datos']);
		delete(files[window.currentFile]);
		window.localStorage['datos'] = JSON.stringify(files);
		clearAll();
		window.currentFile = "none";
        window.localStorage['currentFile'] = "none";
		$("#tblHtml,#nome").val("");
		selectFile();
		autoSum();
		$("#result1,#result2").html("");
	}else{
		clearAll();
		autoSum();
		$("#result1,#result2").html("");
		$("#tblHtml,#nome").val("");
	}
}

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

function send_email(){
	
	var email = prompt("Digite el email:");
	
	if(email != ""){
	
		var title = "Presupuesto "+$("#nome").val();
	
		var content = $("#tblHtml").html();
		
		toast("Mandando correo..", "warning", 0);
		
		$.post(window.app.update_url, {"apx":"send_email","email":email, "title": title, "content":content}, function(){
			
			toast("Correo enviado", "success", 3000);
			
		});
	
	}else{
		
		alert("cancelado");
		
	}
	
}
