var Validador = {
	
	"servidor": "www.allingressos.com.br",
	
	"servidorFormatado": "",
	
	"verificaServidor": function(){
		
		this.servidor = $("#servidor").val();
		
		this.servidorFormatado = "http://"+this.servidor;
		
		var conexao = $.get(this.servidorFormatado, function(r){
			
			window.app[1].users = JSON.parse(r);
			
			a4pp(window.app[1]);
			
		}).fail(function() {
			alert('woops'); // or whatever
		});
	}
	
};
