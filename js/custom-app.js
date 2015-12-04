var Validador = {
	
	"servidor": "www.allingressos.com.br",
	
	"servidorFormatado": "",
	
	"id_usuario": 0,
	
	"verificaServidor": function(){
		
		this.servidor = $("#servidor").val();
		
		this.servidorFormatado = "http://"+this.servidor;
		
		var conexao = $.get(this.servidorFormatado, function(r){
			
			window.app.items[1].users = JSON.parse(r);
			
			a4pp(window.app.items[1]);
			
		}).fail(function() {
			alert('ERROR: Nao foi possivel conectar ao servidor.'); // or whatever
		});
	},
	
	"setUser": function(id_usu){
		
		this.id_usuario = id_usu;
	
		a4pp(window.app.items[2]);
		
	},
	
	"validate": function(){
		
		var url = this.servidorFormatado."/?action=validador&uid="+this.id_usuario;
		
		$.post(url, {"codbar": $("#codbar").val()}, function(r){
			
			alert(r);
			
		});
		
	}
	
};
