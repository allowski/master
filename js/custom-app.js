/**	
 * 		a4pp Tech
 */ 

function init(){
	
	remember.create("events");
	
}
 
function createNewEvent(){
	
	var newEventTitle = $("#newEventTitle").val();
	
	var lastId = new Date().getTime();
	
	var newEvent = {"id":lastId};
	
	if(newEventTitle == ""){
		
		alert("Insira o nome do evento");
		
		$("#newEventTitle").focus();
		
		return;
		
	}else{
		
		newEvent.title = newEventTitle;
		
		remember.push("events", newEvent);
		
	}
	
}

function openEvent(k){
	
	var myEvent = remember.getItem("events", k);
	
	window.app.items[0].dat = myEvent;
	
	triggerGoTo("0");
	
	$('#eventTitle').text(myEvent.title);
	
}

function getAll(id){
	
	var result = [];
	
	var all = remember.getItems("items");
	
	for(var i = 0;i<all.length; i++){
		
		if(all[i].event == id){
			
			result.push(all[i]);
			
		}
		
	}
	
	return result;
	
	
}

function createNewItem(xevent){
	
	var lastId = new Date().getTime();
	
	var newItem = {"id":lastId};
	
	newItem.event = xevent;
	
	newItem.text = $("#newItemTitle").val();
	
	remember.push("items", newItem);
	
	
}

init();
