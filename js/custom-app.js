var Validador = {
	
	"servidor": "www.allingressos.com.br",
	
	"servidorFormatado": "",
	
	"verificaServidor": function(){
		
		this.servidor = $("#servidor").val();
		
		this.servidorFormatado = "http://"+this.servidor;
		
		var conexao = $.get(this.servidorFormatado, function(r){
			alert(r);
		});
		
		conexao.error = function(){
			alert("NAO FOI POSSIVEL FAZER A CONEXAO");
		};
	}
	
};
