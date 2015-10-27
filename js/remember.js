function inCollection(obj, list) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }

    return false;
}
var FILENAME = 'remember.txt',
	$ = function (id) {
		return document.getElementById(id);
	},
	failCB = function (msg) {
		return function () {
			alert('[FAIL] ' + msg);
		}
	},
	file = {
		writer: { available: false },
		reader: { available: false }
	};


function gotFS(fs) {
	console.log(arguments.callee.toString());
	var fail = failCB('getFile');
	console.log(fs);
	fs.root.getFile(window.app.appDomain+".txt", {create: true, exclusive: false},
					gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
	console.log(arguments.callee.toString());
	var fail = failCB('createWriter');
	file.entry = fileEntry;
	fileEntry.createWriter(gotFileWriter, fail);
	readText();
}
function gotFileWriter(fileWriter) {
	console.log(arguments.callee.toString());
	file.writer.available = true;
	file.writer.object = fileWriter;
}
function saveText(e) {
	console.log(arguments.callee.toString());
	var fail;
	if (file.writer.available) {
		file.writer.available = false;
		file.writer.object.onwriteend = function (evt) {
			file.writer.available = true;
			file.writer.object.seek(0);
		}
		file.writer.object.write(e);
	}
	return false;
}
function readText() {
	console.log(arguments.callee.toString());
	//alert("Read text");
	if (file.entry) {
		file.entry.file(function (dbFile) {
			var reader = new FileReader();
			
			reader.onload = function (evt) {
				remember.collections = JSON.parse(evt.target._result);
				//alert("Loaded");
			}
			
			reader.onerror = function(){
				alert("Error reading localfile");
			} 
			
			//alert( typeof dbFile);
			//alert(JSON.stringify(dbFile));
			try{
				reader.readAsText(dbFile);
			}catch(e){
				//alert("Error:\n"+JSON.stringify(e));
			}
			
		}, failCB("FileReader"));
	}
	return false;
}

if(isPhoneGap()){
	
	console.log("Running Phonegap");
	
}else{
	
	console.log("Running Web App");
	
}
        

var remember = {
	'collections' : {},
	'modified_items': [],
	'debug'	: true,
	'logs': "init\n",
	'load' 	: function(cb){
		this.firstRun();
		try{
			if(isPhoneGap()){
				//readText();
			}else{
				this.collections = JSON.parse(window.localStorage['rememberData']);
				console.log("Getting collections from LocalStorage");
				cb();
			}
		}catch(e){
			console.log("Error 404");
			console.log("Error ocurred");
			console.log(e);
		}
		watch(this, "collections", function(r, m){
			remember.log('watch:' + m);
			remember.save();
		});
	},
	'save'	: function(){
		
		if(isPhoneGap()){
			console.log("Writing to File");
			saveText(JSON.stringify(this.collections));
		}else{
			console.log("Writing to LocalStorage");
			window.localStorage['rememberData'] = JSON.stringify(this.collections);
		}
		
	},
	'init'	: function(f){
		
		this.log("init called");
		
		this.load(f);
		
	}, 
	'log' 	: function(m){
		this.logs += m+"\n";
		console.log(m);
	},
	'firstRun': function(){
		
		if('hasRemember' in window.localStorage){
			console.log("Has Remember? True");
		}else{
			console.log("Has Remember? False");
			console.log("Creating Collections..");
			window.localStorage['hasRemember'] = 1;
			this.collections = {"collections":[]};
			this.save();
		}
		
	},
	'create'	: function(name){
		this.log("create called");
		if(name in this.collections){
			this.log("Collection '"+name+"' already exists");
		}else{
			this.log("Creating collection '"+name+"'");
			this.collections[name] = new Array();
			this.save();
		}
	},
	'ls': function(){
		console.log(this.collections);
	},
	'summary': function(collection){
		if(collection in this.collections){
			console.log("Collection: "+collection+" found");
			console.log("Collection length: "+ this.collections[collection].length +" items");
			for(item in this.collections[collection]){
				console.log(item+") "+this.collections[collection][item]);
			}
		}else{
			this.log("Collection '"+collection+"' not found");
		}
	},
	'push': function(collection, value){
		
		if(collection in this.collections){
			
			if(!inCollection(value, this.collections[collection])){
				
				this.collections[collection].push(value);
				
				this.log("Pushed");
				
				this.log(value);
				
				this.log("To "+collection);
				
			}else{
				
				this.log("Repeated");
				
			}
			
		}else{
			
			this.log("Collection '"+collection+"' not found");
			
		}
		
	},
	'isCollection': function(collection){
		if(collection in this.collections){
			this.log("Collection '"+collection+"' found");
			return true;
		}
		this.log("Collection '"+collection+"' not found");
		return false;
	},
	'each': function(collection, callback){
		
		if(this.isCollection(collection)===true){
			
			if(typeof callback === 'function'){
				
				this.log("Callback ok");
				
				for(item in this.collections[collection]){
					
					callback(item, this.collections[collection][item]);
					
				}
				
			}
			
		}
		
	},
	'getItem': function(collection, indexOf){
		
		return this.collections[collection][indexOf];
		
	},
	'getItems': function(collection){
		
		return this.collections[collection];
		
	},
	'bind': function(formId, collection, indexOf){
		
		this.log("bind called");
		
		if(indexOf == -999){
			
			console.log("IndexOf is -999");
			
			return;
			
		}else{
			
			console.log("IndexOf = "+indexOf);
		
			indexOf = indexOf || 0;
		
		}
		
		if(this.isCollection(collection)===true){
			
			var frm = document.getElementById(formId);
			
			$("#"+formId+" input").val("");
			$("#"+formId+" img").attr("src", "");
			
			frm["collection"] = collection;
			
			frm["indexOf"] = indexOf;
			
			this.current_item = {"id":indexOf, "collection":collection};
			
			if(indexOf in this.collections[collection]){
				
				for(k in this.collections[collection][indexOf]){
					
					this.log("K: "+k+", V"+this.collections[collection][indexOf][k]);
					
					var ele = document.querySelector("#"+formId+" [name="+k+"]");
					
					if(!ele){
						console.log(k+" ignored");
						continue;
					}
					
					ele.value = this.collections[collection][indexOf][k];	
					
					var attr = "img_"+ele.id;
					
					var imgEle = document.getElementById(attr);
					
					if (typeof imgEle !== typeof undefined && imgEle !== false && imgEle && imgEle!=null) {
						
						
						imgEle.src = ele.value;
						
						//},50);
						
					}
					
				}
				
			}
			
		}
		
	},
	'next': function(formId, collection){
		
		var frm = document.getElementById(formId);
			
		var collection = frm["collection"];
		
		var indexOf = frm["indexOf"]+1;
		
		if(indexOf in this.collections[collection]){
			
			this.bind(formId, collection, indexOf);
			
		}else{
			
			indexOf = 0;
			
			this.bind(formId, collection, indexOf);
			
		}
		
		
		this.current_item = {"id":indexOf, "collection":collection};
		
	},
	'prev': function(formId, collection){
		
		var frm = document.getElementById(formId);
			
		var collection = frm["collection"];
		
		var indexOf = frm["indexOf"]-1;
		
		if(indexOf in this.collections[collection]){
			
			this.bind(formId, collection, indexOf);
			
		}else{
			
			indexOf = this.collections[collection].length-1;
			
			this.bind(formId, collection, indexOf);
			
		}
		
		this.current_item = {"id":indexOf, "collection":collection};
		
	},
	'delete': function(formId, mes, callback){
		
		this.log("delete called");
		
		var frm = document.getElementById(formId);
		var collection = frm["collection"];
		var indexOf = frm["indexOf"];
		
		if(mes!==""){
			if(!confirm(mes)){
				return false;
			}
		}
		if(typeof callback === 'function'){
			callback();
		}
		this.collections[collection].splice(indexOf, 1);
		this.save();
	},
	'append': function(formId){
		
		this.log("append called");
		var frm = document.getElementById(formId);
		var collection = frm["collection"];
		var newVal = $('#'+formId).serializeObject();
		this.push(collection, newVal);
		this.save();
	},
	'saveForm': function(formId){
		this.log("saveForm called");
		var frm = document.getElementById(formId);
		console.log(frm);
		
		var collection = frm.getAttribute("collection");
		
		var indexOf = frm.getAttribute("indexOf");
		
		var newVal = $('#'+formId).serializeObject();
		
		console.log(indexOf);
		
		if(indexOf == -999){
			indexOf = this.collections[collection].length;
			frm.setAttribute("indexOf", indexOf);
			this.collections[collection].push({"id": indexOf});
		}
		
		var old = this.collections[collection][indexOf];
		if(old){
			if("real_id" in old){
				newVal.real_id = old.real_id;
				console.log("Real Id: "+old.real_id);
			}
		}
		if(newVal != old){
			console.log("Modified row "+indexOf+" from "+collection+" collection");
			this.modified_items.push({"id":indexOf, "collection":collection});
		}
		newVal.sent = false;
		this.collections[collection][indexOf] = newVal;
		console.log("Save form, new value is:");
		console.log(newVal);
		this.current_item = {"id":indexOf, "collection":collection};
		this.save();
	},
	'new': function(formId){
		this.log("new called");
		var frm = document.getElementById(formId);
		var collection = frm.getAttribute("collection");
		frm["indexOf"] = "-999";
		$("#form input").val("");
	},
	'clean': function(collection){
		
		if(this.isCollection(collection)===true){
			
			this.collections[collection] = [];
			
		}
		
	},
	'update': function(collection, index, value){
		
		var old_item = remember.getItem(collection, index);
		
		value.sent = false;
		
		if(old_item.real_id)
			value.real_id = old_item.real_id;
		
		if(this.isCollection(collection)===true){
			
			this.collections[collection][index] = value;
			
			this.current_item = {"id":index, "collection":collection};
			
			this.save();
			
		}	
	},
	'getCurrentItem': function(){
		if(this.current_item != "undefined"){
			return this.getItem(this.current_item.collection, this.current_item.id);
		}
	}
	
};

remember.init(window.cb);
