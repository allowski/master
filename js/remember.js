function FileManager(fName, callback){
	
	console.log("CCRM: new FileManager('"+fName+"'); called");
	
	this.fileName = fName;
	
	this.file = {
		writer:{
			available: true
		},
		reader:{
			available: true
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
	
	console.log("CCRM: new FileManager('"+this.fileName+"'); called -----");
	
	var self = this;
	
	
	/*
	 * 		Methods
	 **/
	 
	this.fail = function(){
			
		console.log("CCRM: Error fail");
		 
	 };
	 
	this.write = function(text, callback){
		
		console.log("CCRM: Write('"+text+"') -> called");
		
		self.fileWriter.onwriteend = function(event){
			
			callback();
			
		};
		
		self.fileWriter.write(text);
		
	};
		 
	this.read = function(callback){
		
		console.log("CCRM: Read();");
		
		self.fileEntry.file(function(mFile){
		
			if(self.file.reader.available == false){
				
				console.log("CCRM: Reader is not available at this time");
				
			}
			
			self.file.reader.available = false;
			
			self.fileReader.onload = function(evt){
				
				console.log("CCRM: ReadText: "+evt.target._result);
				
				callback(evt.target._result);
				
				self.file.reader.available = true;
				
			};
			
			self.fileReader.onerror = function(){
				
				console.log("CCRM: FileReader onError()");
				
			};

			self.fileReader.readAsText(mFile);
			
		});
		 
	 };
		 
	this.gotFileWriter = function(fileWriter){
			 
		 console.log("CCRM: Got File Writer");
		 
		 self.fileWriter = fileWriter;
		 
		 self.file.writer.available = true;
		 
		 callback(self);
		 
	 };
		
	this.gotFileEntry = function(fileEntry){
			
		console.log("CCRM: Got File Entry");
		
		self.fileEntry = fileEntry;
		
		console.log("CCRM: new self.FileReader();");
		
		self.fileReader = new FileReader();
		
		self.file.reader.available = true;
		
		fileEntry.createWriter(self.gotFileWriter, self.fail);
		 
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

function saveText(e, ask) {
	
	console.log("------------------------- > CCRM SaveText();");
	
	return false;
}
function readText() {
	
	console.log("------------------------ > CCRM ReadText();");
	
}

if(isPhoneGap()){
	
	console.log("Running Phonegap");
	
}else{
	
	console.log("Running Web App");
	
}

var mainFileName = ".cloudcrm/"+window.app.appDomain+".txt";        

var remember = {
	'collections' : {},
	'modified_items': [],
	'debug'	: true,
	'logs': "init\n",
	'load' 	: function(cb){
		this.firstRun();
		
		console.log("CCRM: Loading ..");
		
		try{
			if(isPhoneGap()){
				
				console.log("CCRM: Is Phonegap");

				new FileManager(mainFileName, function(self){
					
					console.log("CCRM: Read file: "+mainFileName);
					
					self.read(function(text){
						
						console.log("CCRM: Read results:"+text);
						
						remember.collections = JSON.parse(text);
						
					});
					
				});
				
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
		
	},
	'save'	: function(ask){
		
		if(isPhoneGap()){
			
			console.log("CCRM: new FileManager();");
			
			new FileManager(mainFileName, function(self){
				
				self.write(JSON.stringify(this.collections), function(){
					
					console.log("CCRM: Writen to "+self.fileName);
					
				});
				
			});
			
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
		
		}
		
		if(typeof indexOf == "undefined")
			indexOf = 0;
		
		indexOf = indexOf || 0;
		
		var parent = this;
		
		new FileManager(".cloudcrm/"+collection+"-"+indexOf+".txt", function(self){
			
			self.read(function(text){
				
				if(text == ""){
					text = "{}";
				}
				
				var obj = JSON.parse(text);
				
				console.log("CCRM: Readed text ()"+text);
				
				
				if(parent.isCollection(collection)===true){
					
					var frm = document.getElementById(formId);
					
					$("#"+formId+" input").val("");
					$("#"+formId+" img").attr("src", "");
					
					frm.setAttribute("collection",  collection);
					
					frm.setAttribute("indexOf", indexOf);
					
					parent.current_item = {"id":indexOf, "collection":collection};
					
					
					if(text!="{}"){
						
						console.log("Loading fields into form");
						
						for(k in obj){
							
							parent.log("K: "+k+", V"+obj[k]);
							
							var ele = document.querySelector("#"+formId+" [name="+k+"]");
							
							if(!ele){
								console.log(k+" ignored");
								continue;
							}
							
							ele.value = obj[k];	
							
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
				
			});
			
		});
		
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
		
		var f = new FileManager(".cloudcrm/"+collection+"-"+indexOf+".txt", function(self){
			
			self.write(JSON.stringify(newVal), function(){
			
				console.log("CCRM: File Written");
				
			});
			
		});
		
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
