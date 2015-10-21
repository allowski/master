function inCollection(obj, list) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return true;
        }
    }

    return false;
}
var FILENAME = 'teste.json',
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
	},
	dbEntries = [];
	
document.addEventListener('deviceready', function () {
	var fail = failCB('requestFileSystem');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}, false);

window.load = function(){

	var fail = failCB('requestFileSystem');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);	
};

function gotFS(fs) {
	var fail = failCB('getFile');
	fs.root.getFile(FILENAME, {create: true, exclusive: false},
					gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
	var fail = failCB('createWriter');
	file.entry = fileEntry;
	fileEntry.createWriter(gotFileWriter, fail);
	readText();
}
function gotFileWriter(fileWriter) {
	file.writer.available = true;
	file.writer.object = fileWriter;
}
function saveText(e) {
	var name = $('name').value,
		desc = $('desc').value,
		fail;
	dbEntries.push('<dt>' + name + '</dt><dd>' + desc + '</dd>')
	$('name').value = '';
	$('desc').value = '';
	$('definitions').innerHTML = dbEntries.join('');
	if (file.writer.available) {
		file.writer.available = false;
		file.writer.object.onwriteend = function (evt) {
			file.writer.available = true;
			file.writer.object.seek(0);
		}
		file.writer.object.write(dbEntries.join("\n"));
	}
	return false;
}
function readText() {
	if (file.entry) {
		file.entry.file(function (dbFile) {
			var reader = new FileReader();
			reader.onloadend = function (evt) {
				var textArray = evt.target.result.split("\n");
				dbEntries = textArray.concat(dbEntries);
				$('definitions').innerHTML = dbEntries.join('');
			}
			reader.readAsText(dbFile);
		}, failCB("FileReader"));
	}
	return false;
}


        

var remember = {
	'collections' : {},
	'debug'	: true,
	'logs': "init\n",
	'load' 	: function(){
		try{
			this.collections = JSON.parse(window.localStorage['rememberData']);
		}catch(e){
			this.firstRun();
		}
		watch(this, "collections", function(r, m){
			remember.log('watch:' + m);
			remember.save();
		});
	},
	'save'	: function(){
		window.localStorage['rememberData'] = JSON.stringify(this.collections);
		saveText(JSON.stringify(this.collections));
	},
	'init'	: function(){
		
		this.log("init called");
		
		if(!window.localStorage.hasOwnProperty("rememberData")){
			this.log("Localstorage is empty");
			this.firstRun();
		}else{
			this.log("Localstorage is ok");
		}
		
		this.load();
	}, 
	'log' 	: function(m){
		this.logs += m+"\n";
		console.log(m);
	},
	'firstRun': function(){
		window.localStorage['rememberData'] = "{\"collections\":[]}";
		this.collections = JSON.parse(window.localStorage['rememberData']);
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
		
		indexOf = indexOf || 0;
		
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
					
					var attr = $(ele).attr("data-sento");
					
					if (typeof attr !== typeof undefined && attr !== false) {
				
						//setTimeout(function(){
						
						var imgEle = document.getElementById(attr);
						
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
		var collection = frm["collection"];
		var indexOf = frm["indexOf"];
		var newVal = $('#'+formId).serializeObject();
		var old = this.collections[collection][indexOf];
		if(old){
			if("real_id" in old){
				newVal.real_id = old.real_id;
				console.log("Real Id: "+old.real_id);
			}
		}
		this.collections[collection][indexOf] = newVal;
		console.log("Save form, new value is:");
		console.log(newVal);
		this.current_item = {"id":indexOf, "collection":collection};
		this.save();
	},
	'new': function(formId){
		this.log("new called");
		var frm = document.getElementById(formId);
		var collection = frm["collection"];
		frm["indexOf"] = this.collections[collection].length;
		this.collections[collection].push({});
		$("#form input").val("");
		this.saveForm(formId);
	},
	'clean': function(collection){
		
		if(this.isCollection(collection)===true){
			
			this.collections[collection] = [];
			
		}
		
	},
	'update': function(collection, index, value){
		
		var old_item = remember.getItem(collection, index);
		
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

remember.init();

