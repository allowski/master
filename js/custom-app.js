var Validador = {
	
	"servidor": "www.allingressos.com.br",
	
	"servidorFormatado": "",
	
	"verificaServidor": function(){
		
		this.servidor = $("#servidor").val();
		
		this.servidorFormatado = "http://"+this.servidor;
		
		var conexao = $.get(this.servidorFormatado, function(r){
			
			window.app.items[1].users = JSON.parse(r);
			
			a4pp(window.app.items[1]);
			
		}).fail(function() {
			alert('ERROR: Nao foi possivel conectar ao servidor.'); // or whatever
		});
	}
	
};
