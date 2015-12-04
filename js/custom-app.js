var Validador = {
	
	"servidor": "www.allingressos.com.br",
	
	"servidorFormatado": "",
	
	"id_usuario": 0,
	
	"verificaServidor": function(){
		
		this.servidor = $("#servidor").val();
		
		this.servidorFormatado = "http://"+this.servidor;
		
		var conexao = $.get(this.servidorFormatado+"/?action=listUsers", function(r){
			
			window.app.items[1].users = JSON.parse(r);
			
			a4pp(window.app.items[1]);
			
			this.config.servidor = servidor;
		
			this.saveConfig();
			
		}).fail(function() {
			alert('ERROR: Nao foi possivel conectar ao servidor.'); // or whatever
		});
		
	},
	
	"setUser": function(c, id_usu){
		
		this.id_usuario = id_usu;
		
		this.config.usuario.id = window.app.items[1].users[x].id;
		
		this.config.usuario.lotes = window.app.items[1].users[x].lotes.split("|");
	
		this.saveConfig();
	
		a4pp(window.app.items[2]);
		
	},
	
	"validate": function(event){
				
		var url = this.servidorFormatado+"/?action=validador&uid="+this.id_usuario;
		
		$("#codbar").attr("disabled", "disabled")
		
		$("#alert").css("opacity", "0.0");
		
		$.post(url, {"codbar": $("#codbar").val()}, function(r){
			
			var resp = JSON.parse(r);
			
			$("#alert").removeClass("alert-danger");
			$("#alert").removeClass("alert-success");
			$("#alert").removeClass("alert-warning");
			$("#alert").removeClass("alert-info");
			
			
			$("#alert").addClass("alert-"+resp.class).text(resp.mes);
			
			setTimeout(function(){
				
				$("#alert").css("opacity", "1.0");
				
				$("#codbar").attr("disabled", false);
				
				$("#codbar").val("").focus();
				
			},100);
			
		});
		
	},
	
	"saveConfig": function(){
		
		window.localStorage["validador"] = JSON.parse(this.config);
		
	},
	"init": function(){
		
		if("validador" in window.localStorage){
			
			window.localStorage["validador"] = "{'servidor':'','usuario':{'id':'0','lotes':[]}}";
			
		}
		
		this.config = JSON.parse(window.localStorage["validador"]);

		
	}
	
};

Validador.init();
