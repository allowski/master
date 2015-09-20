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
	
	$("#newItemForm").removeClass('hidde');
	
	$("#nwRet").removeClass("hidden");
	$("#nwItm").addClass("hidden");
	$("#nwItmOk").removeClass("hidden");
	
}

function newItemFormOK(xevent){
	
	var lastId = new Date().getTime();
	
	var newItem = {"id":lastId};
	
	newItem.event = xevent;
	
	newItem.text = $("#newItemTitle").val();
	
	newItem.value = $("#newItemValue").val();
	
	newItem.numero = $("#newItemNumber").val();
	
	newItem.ES = $("#newItemES").val();
	
	if(
		(newItem.value == "") || 
		(newItem.text == "")
	){
		return;
	}else{
		
		$("#newItemForm").addClass('hidde');
		$("#nwItmOk").addClass("hidden");
		$("#nwItm").removeClass("hidden");
		$("#nwRet").addClass("hidden");
		
	}
		
	
	remember.push("items", newItem);
	
	
}

function close_window(){
	$('#newItemForm').addClass('hidde');
	$("#nwRet").addClass("hidden");
	$("#nwItmOk").addClass("hidden");
	$("#nwItm").removeClass("hidden");
}

function editItem(itemIndex){
	
	$("#itemId").val(itemIndex);
	
	var item = remember.getItem('items', itemIndex);
	
	
	$("#newItemForm").removeClass('hidde');
	$("#nwRet").removeClass("hidden");
	$("#nwItm").addClass("hidden");
	$("#nwItmOk").removeClass("hidden");
	
	$("#newItemTitle").val(item.text);
	$("#newItemValue").val(item.value);
	$("#newItemES").val(item.ES);
	$("#newItemNumber").val(item.numero);
	
	
}

init();
