/**	
 * 		a4pp Tech
 */ 

function init(){
	
	remember.create("events");
	remember.create("items");
	
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

function newItemForm(){
	
	$("#newItemForm").removeClass('hidden');
	
	$("#nwItm").addClass("hidden");
	$("#nwItmOk").removeClass("hidden");
	
}

function newItemFormOK(xevent){

	$("#newItemForm").addClass('hidden');
	
	$("#nwItmOk").addClass("hidden");
	$("#nwItm").removeClass("hidden");
	
	var lastId = new Date().getTime();
	
	var newItem = {"id":lastId};
	
	newItem.event = xevent;
	
	newItem.text = $("#newItemTitle").val();
	
	newItem.value = $("#newItemValue").val();
	
	newItem.ES = $("#newItemES").val();
	
	remember.push("items", newItem);
	
	
}

init();
