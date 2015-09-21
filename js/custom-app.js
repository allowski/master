 /*
     * Date Format 1.2.3
     * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
     * MIT license
     *
     * Includes enhancements by Scott Trenda <scott.trenda.net>
     * and Kris Kowal <cixar.com/~kris.kowal/>
     *
     * Accepts a date, a mask, or a date and a mask.
     * Returns a formatted version of the given date.
     * The date defaults to the current date/time.
     * The mask defaults to dateFormat.masks.default.
     */


window.isBeingEdited = 1;     

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
  //  discuss at: http://phpjs.org/functions/number_format/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: davook
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Michael White (http://getsprink.com)
  // bugfixed by: Benjamin Lupton
  // bugfixed by: Allan Jensen (http://www.winternet.no)
  // bugfixed by: Howard Yeend
  // bugfixed by: Diogo Resende
  // bugfixed by: Rival
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //  revised by: Luke Smith (http://lucassmith.name)
  //    input by: Kheang Hok Chin (http://www.distantia.ca/)
  //    input by: Jay Klehr
  //    input by: Amir Habibi (http://www.residence-mixte.com/)
  //    input by: Amirouche
  //   example 1: number_format(1234.56);
  //   returns 1: '1,235'
  //   example 2: number_format(1234.56, 2, ',', ' ');
  //   returns 2: '1 234,56'
  //   example 3: number_format(1234.5678, 2, '.', '');
  //   returns 3: '1234.57'
  //   example 4: number_format(67, 2, ',', '.');
  //   returns 4: '67,00'
  //   example 5: number_format(1000);
  //   returns 5: '1,000'
  //   example 6: number_format(67.311, 2);
  //   returns 6: '67.31'
  //   example 7: number_format(1000.55, 1);
  //   returns 7: '1,000.6'
  //   example 8: number_format(67000, 5, ',', '.');
  //   returns 8: '67.000,00000'
  //   example 9: number_format(0.9, 0);
  //   returns 9: '1'
  //  example 10: number_format('1.20', 2);
  //  returns 10: '1.20'
  //  example 11: number_format('1.20', 4);
  //  returns 11: '1.2000'
  //  example 12: number_format('1.2000', 3);
  //  returns 12: '1.200'
  //  example 13: number_format('1 000,50', 2, '.', ' ');
  //  returns 13: '100 050.00'
  //  example 14: number_format(1e-8, 8, '.', '');
  //  returns 14: '0.00000001'

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
	
	
	var xy = (parseFloat( $('#aplicaciones').val()) * parseFloat($('#precio').val()) * parseFloat($('#dosis').val()) ); 
	
	var soja = parseFloat($("#soja").val());
	
	var numero = $("#emp").val();
	
	var xyz  = xy/soja*1000/60;
	
	var kg = xyz / soja * 1000;
	
	var clase = (numero == 1) ? 'success' : 'danger';
	
	$('#result'+numero).append(
		'<tr class="'+clase+'" onclick="edit(this);autoSum();return false;">'+
		'<td>'+		$('#producto').val()+
		'</td><td>'+	$('#um').val()+	
		'</td><td>'+	$('#dosis').val()+	
		'</td><td class="text-right">$ '+ 	number_format($('#precio').val(),2,",",".")+	
		'</td><td class="text-center">'+	$('#aplicaciones').val()+	
		'</td><td class="suma text-right" data-val="'+xy+'">$ '+number_format(xy,2,",", ".")+	
		'</td><td class="suma2 text-right" data-val="'+xyz+'"> '+number_format(xyz,2,",", ".")+
		'</td><td class="suma3 text-right" data-val="'+kg+'">$ '+number_format(kg,2,",", ".")+
		'</td><td><button class="btn btn-danger remove-email" onclick="eliminar(this, event); return false;"><span class="glyphicon glyphicon-remove"></span></button></td></tr>');
	clearAll();
	autoSum();
	
	salvar();
	
}

function eliminar(ele, e){
	
	e.preventDefault();
	
	e.stopPropagation();
	
	if(confirm("Desea eliminar este producto?")){
	
		$(ele).parent().parent().remove();
		
		autoSum();
		
	}
	
}


function edit(ele){
	
	window.isBeingEdited = 1;
	
	console.log($(ele).find("td:eq(0)"));
	
	var $dequien = "Diagro";
	
	if($(ele).hasClass('danger')){
		$dequien = "Competencia"
	}
	
	$("#emp option").prop('selected', false);
	
	$("#emp option").filter(function() {
		return $(this).text() == $dequien; 
	}).prop('selected', true);
	
	var $precio = parseFloat($(ele).find("td:eq(2)").text().replace(",", ".").replace("$", ""));
	var $aplicaciones = parseFloat($(ele).find("td:eq(3)").text().replace(",", ".").replace("$", ""));
	
	console.log("Precio:"+$precio);
	
	$("#producto").val($(ele).find("td:eq(0)").text());
	$("#um").val($(ele).find("td:eq(1)").text());
	$("#dosis").val($(ele).find("td:eq(2)").text());
	$("#precio").val($precio);
	$("#aplicaciones").val($aplicaciones);
	
	$(ele).remove();
	
}

function auto(num){
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
	$('#total,#total2,#total3').html("0");
	auto(1);
	auto(2);
}

function clearAll(){
	$('#producto,#um,#precio,#dosis,#aplicaciones').val("");
}

function salvar(){
	
	today = new Date();
	var dateString = today.format("dd-m-yy");
	
	if(window.localStorage['datos']==undefined){
		
		window.localStorage['datos'] = "[]";
		
	}
	
	var datos = JSON.parse(window.localStorage['datos']);
	
	var nome = "";
	
	if(window.currentFile === 999){
		if($("#nome").val()==""){ 
			if(nome==""){
				nome = prompt("Guardar como:");
				if (nome === undefined || nome === null || nome ==="") {
					return;
				}else{
					$("#nome").val(nome);
					selectFile();
				}
			}
		}else{
			nome = $("#nome").val();
		}
		datos.push({"nome":nome,"datos":$("#tblHtml").html(),"fecha":dateString, "soja":parseFloat($("#soja").val())});
		
		window.currentFile = datos.length-1;
		
        window.localStorage['currentFile'] = window.currentFile;
		
	}else{
		
		datos[window.currentFile].datos = $("#tblHtml").html();
		
		datos[window.currentFile].soja = parseFloat($("#soja").val());
		
		datos[window.currentFile].nome = ($("#nome").val());
		
	}
	
	window.localStorage['datos'] = JSON.stringify(datos);
	
	selectFile();
	
	$("#selFile option").prop('selected', false);
	
	$("#selFile option").filter(function(){
		return $(this).text() == nome;
	}).prop('selected', true);
	
}

if(window.localStorage['currentFile']==undefined){
    window.currentFile = 999;
    window.localStorage['currentFile'] = 999;
}else{
    window.currentFile = parseInt(window.localStorage['currentFile']);
    setTimeout(function(){
       $("#selFile").trigger("change"); 
    }, 500);
}

function selectFile(){
	var files = JSON.parse(window.localStorage['datos']);
	$("#selFile").html("<option value='999'>- Nuevo archivo -</option>");
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
    
	var files = JSON.parse(window.localStorage['datos']);
	
	var idx = (t!==null) ? t[t.selectedIndex].value : window.localStorage['currentFile'];
	
	console.log($(t).find(":selected").val());
	
	if(typeof idx !== "undefined"){
	
    	if(idx==999){
    		
    		window.currentFile = 999;
    		
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
    	if(window.currentFile !== 999){
        	$("#tblHtml").html(files[idx].datos);
        	$("#nome").val(files[idx].nome);
        	$("#soja").val(files[idx].soja);
    	}
    	
    }
	
}

function deletar(){
	if(window.currentFile !== 999){
		var files = JSON.parse(window.localStorage['datos']);
		files.splice(window.currentFile,1);
		window.localStorage['datos'] = JSON.stringify(files);
		clearAll();
		window.currentFile = 999;
        window.localStorage['currentFile'] = 999;
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
