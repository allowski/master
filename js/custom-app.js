/**	
 * 		a4pp Tech
 */ 

function init(){
	
	remember.create("events");
	
}
 
function createNewEvent(){
	
	var newEventTitle = $("#newEventTitle").val();
	
	var newEvent = {};
	
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
	
	triggerGoTo("/0/");
	
	$('#eventTitle').text(myEvent.title);
	
}


init();
