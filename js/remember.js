function FileManager(fName){
	
	console.log("CCRM: new FileManager('"+fName+"'); called");
	
	this.fileName = fName;
	
	var self = this;
	
	console.log("CCRM: new FileManager('"+this.fileName+"'); called -----");
	
	this.file = {
		writer:{
			available: false
		},
		reader:{
			available: false
		}
	};
	
	this.fileEntry = null;
	
	this.fileWriter = null;
	
	this.fileReader = null;
	
	
	this.tp = window.PERSISTENT;
	
	if(typeof LocalFileSystem != "undefined"){
		
		console.log("CCRM: LocalFileSystem is not undefined!");
		
		this.tp = LocalFileSystem.PERSISTENT;
		
	}
	
	/*
	 * 		Methods
	 **/
	 
	this.fail = function(){
			
		console.log("CCRM: Error fail");
		 
	 };
		 
	this.read = function(){
		
		console.log("CCRM: Read();");
		
		this.fileReader.onload = function(evt){
			
			console.log("Text: "+evt.target._result);
			
		};

		this.fileReader.readAsText();
		 
	 };
		 
	this.gotFileWriter = function(fileWriter){
			 
		 console.log("CCRM: Got File Writer");
		 
		 self.fileWriter = fileWriter;
		 
		 self.writer = true;
		 
	 };
		
	this.gotFileEntry = function(fileEntry){
			
		console.log("CCRM: Got File Entry");
		
		self.fileEntry = fileEntry;
		
		fileEntry.createWriter(self.gotFileWriter, self.fail);
		
		self.fileReader = new FileReader();
		 
	 };
		
		
	this.gotFileSystem = function(fs){
			
		console.log("CCRM: Got File System ("+self.fileName+")");
		
		console.log("---------------------------------------------------------");
		
		console.log(JSON.stringify(self));

		fs.root.getFile(self.fileName, {create: true, exclusive: false}, self.gotFileEntry, self.fail);

	};
	
	
	window.requestFileSystem(this.tp, 0, self.gotFileSystem, self.fail);

	
};







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
	var fileName = ".cloudcrm/"+window.app.appDomain+".txt";
	fs.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, fail);
	
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
function saveText(e, ask) {
	
	console.log("CCRM SaveText();");
	
	var fail;
	if (file.writer.available) {
		file.writer.available = false;
		file.writer.object.onwriteend = function (evt) {
			file.writer.available = true;
			file.writer.object.seek(0);
			if(ask){
				if("plugins" in window){
					try{
						window.plugins.webintent.sendBroadcast({
									action: 'com.cloudcrm.receiver',
									extras: {
										'option': true
									}
								}, function() {
									
									console.log("CCRM: after reading text by new..");
									
									readText();
									
								}, function() {
									
							
									console.log("CCRM: after 2");
									
						});	
					}catch(err){
						
						
						alert("CCRM Error ocurred: "+err);
						
					}
				}else{
					
					alert("CCRM: No plugins");
					
				}
				
				//if(confirm(window.i("Arquivo salvo, deseja voltar?", "El archivo fue salvo, desea volver?", "File saved, do you want to go back?"))){
				goBack(1);
				//}
			}
		}
		file.writer.object.write(e);
	}
	return false;
}
function readText() {
	
	console.log("CCRM ReadText();");
	
	if (file.entry) {
		file.entry.file(function (dbFile) {
			
			console.log("CCRM new FileReader();");
			
			var reader = new FileReader();
			
			reader.onload = function (evt) {
				remember.collections = JSON.parse(evt.target._result);
			}
			
			reader.onerror = function(){
				alert("CCRM Error reading localfile");
			} 
			
			try{
				reader.readAsText(dbFile);
			}catch(e){
				console.log("CCRM Error while reading file.");
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
	'save'	: function(ask){
		
		if(isPhoneGap()){
			console.log("Writing to File");
			saveText(JSON.stringify(this.collections), ask);
		}else{
			console.log("Writing to LocalStorage");
			if(ask==true){
				if(window.localStorage['rememberData'] != JSON.stringify(this.collections)){
					if(confirm(window.i("Arquivo salvo, deseja voltar?", "El archivo fue salvo, desea volver?", "File saved, do you want to go back?"))){
						goBack(1);
					}
				}else{
					alert(i("Nao houve modificacoes", "No se modifico el archivo", "File not modified"));
				}
			}
			
			window.localStorage['rememberData'] = JSON.stringify(this.collections);
		}
		
	},
	'init'	: function(f){
		
		this.log("init called");
		
		this.load(f);
		
	}, 
	'log' 	: function(m){
		//this.logs += m+"\n";
		console.log(m);
		if(window.socket && "emit" in window.socket){
			window.socket.emit('log', {"user":window.appUser, "log":m});
		}
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
	'count': function(collection){
		
		return this.collections[collection].length;
		
	},
	'getItems': function(collection){
		
		return this.collections[collection];
		
	},
	'bind': function(formId, collection, indexOf){
		
		this.log(arguments);
		
		this.log("bind called");
		
		if(indexOf == -999){
			
			this.log("IndexOf is -999");
			
			return;
			
		}else{
			
			this.log("IndexOf = "+indexOf);
		
			indexOf = indexOf || 0;
		
		}
		
		if(this.isCollection(collection)===true){
			
			var frm = document.getElementById(formId);
			
			$("#"+formId+" input").val("");
			$("#"+formId+" img").attr("src", "");
			
			frm.setAttribute("collection",  collection);
			
			frm.setAttribute("indexOf", indexOf);
			
			this.current_item = {"id":indexOf, "collection":collection};
			
			console.log(this.collections[collection][indexOf]);
			
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
						
					}
					
					
					var canvas = document.getElementById("can"+ele.id);
					
					if(canvas && typeof imgEle !== typeof undefined){
						
						canvas.style.backgroundImage = "url('"+ele.value+"')";
						
					}
					
				}
				
			}
			
		}
		
	},
	'next': function(formId, collection){
		
		var frm = document.getElementById(formId);
			
		var collection = frm.getAttribute("collection");
		
		var indexOf = parseInt(frm.getAttribute("indexOf"))+1;
		
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
			
		var collection = frm.getAttribute("collection");
		
		var indexOf = parseInt(frm.getAttribute("indexOf"))-1;
		
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
		var collection = frm.getAttribute("collection");
		var indexOf = frm.getAttribute("indexOf");
		
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
		var collection = frm.getAttribute("collection");
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
				this.log("Real Id: "+old.real_id);
			}
		}
		if(newVal != old){
			this.log("Modified row "+indexOf+" from "+collection+" collection");
			this.modified_items.push({"id":indexOf, "collection":collection});
		}
		newVal.sent = false;
		this.collections[collection][indexOf] = newVal;
		this.log("Save form, new value is:");
		this.log(newVal);
		this.current_item = {"id":indexOf, "collection":collection};
		this.save(true);
	},
	'new': function(formId){
		this.log("new called");
		var frm = document.getElementById(formId);
		var collection = frm.getAttribute("collection");
		frm.setAttribute("indexOf", "-999");
		$("#form input").val("");
		$("#form img").attr("src", "");
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
