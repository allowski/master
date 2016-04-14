
window.PDV = {
	
	event_id : 0,
	
	lote_id : 0,
	
	quantity : 0,
	
	CPF : 0,
	
	/**this.checkCPF = function(strCPF){
		
		var Soma;
		var Resto;
		Soma = 0;
		if (strCPF == "00000000000") return false;
		for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
		Resto = (Soma * 10) % 11;
		if ((Resto == 10) || (Resto == 11)) Resto = 0;
		if (Resto != parseInt(strCPF.substring(9, 10))) return false;
		Soma = 0;
		for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
		Resto = (Soma * 10) % 11;
		if ((Resto == 10) || (Resto == 11)) Resto = 0;
		if (Resto != parseInt(strCPF.substring(10, 11))) return false;
		return true;
		
	};*/
	
	setQuantity : function(qty){
		
		this.quantity = qty;
		
	},
	
	setLoteId : function(loteId){
		
		this.lote_id = loteId;
		
	},
	
	setEventId : function(eventId){
		
		this.event_id = eventId;
		
	},
	
	setCPF : function(strCPF){
		
		this.CPF = strCPF;
		
	},
	
	submitOrder : function(){
		
		//var request = this;
		
		this.method = "submitOrder";
		
		$.post(window.app.update_url, this, function(resp){
			
			var response = JSON.parse(resp);
			
			if(response.isOK == true){
				
				window.PDV.transaction_id = response.transaction_id;
				
			}else{
				
				alert("ERROR 400");
				
			}
			
		});
		
	},
	
	login : function(){
		
		var LoginForm = $("#LoginForm");
		
		var LoginData = LoginForm.serialize();
		
		window.app.update_url = window.app.update_url + "&login=".LoginData();
		
		window.a4pp_update();
		
	}
	
};


