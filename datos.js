var appo = {"id":1,"path":"\/var\/www\/apps\/app-auto71","domain":"http:\/\/cloud71.cloudcrm.tech\/appAuth.php?hash=68cee07b6b55553208ba0abdbdb9d1a7&app=auto71","version":null,"a4pp_dir":"\/var\/www\/apps\/","disableLog":false,"space":"apps\/app-auto71","appHeader":"#de911d","appHeaderColor":"#ffffff","appVersion":1,"appName":"Custom App","appDomain":"auto71.cloudcrm.tech","appUser":null,"addCss":"\n\/* - Version 0 - *\/\n.material-bar,.navbar.navbar-inverse{\n\tbackground:#de911d;\n\tbackground: #ff3019;\n\tbackground: -moz-linear-gradient(top, #de911d 0%, #de911d 100%);\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#de911d), color-stop(100%,#de911d));\n\tbackground: -webkit-linear-gradient(top, #de911d 0%,#de911d 100%);\n\tbackground: -o-linear-gradient(top, #de911d 0%,#de911d 100%);\n\tbackground: linear-gradient(to bottom, #de911d 0%,#de911d 100%);\n\tcolor:#ffffff;\n}\n.material-bar .navbar-item{\n\tcolor:#ffffff;\n}","lang":"es","runJS":"console.log(\"Callback\");","templates":{"loginform":"<form id=\"LoginForm\" style=\"padding:20px;\">\n\t<h1 style='margin-top:50px;'>Login<\/h1>\n\t<hr>\n\t<input type=\"hidden\" name=\"formId\" value=\"\">\n\t<label>Usuario<\/label>\n\t<input type=\"number\" class=\"form-control\" name=\"login\">\n\t<label>Senha<\/label>\n\t<input type=\"password\" class=\"form-control\" name=\"password\">\n\t<div class=\"panel-footer text-right\" style='margin-top:20px;'>\n\t\t<a href=\"#\" onclick=\"window.PDV.login();\" class=\"btn btn-primary btn-lg\">Login<\/a>\n\t<\/div>\n<\/form>\t","thanks":"<div class='container text-center'>\n\t<div class='alert alert-success jumbotron' style='padding-bottom:50px;'>\n\t<h3 style='color:#fff;margin-top:50px;maring-bottom:0px;'>Completado<\/h3>\n\t<h3 style='color:#fff;margin-top:0px;maring-bottom:0px;'>Codigo<\/h3>\n\t<h1 style='color:#fff;'>987 567<\/h1>\n\t\n\t<button class='btn btn-success btn-lg' onclick='a4pp(window.app);'>CONTINUAR<\/button>\n\t\n\t<\/div>\t\n<\/div>\t","finishHim":"<div class='container text-center'>\n\t<h3 style='margin-top:50px;text-indent:-70px;maring-bottom:0px;'>R$<\/h3>\n\t<h1>130,00<\/h1>\n\t\n\t<button class='btn btn-success btn-lg' onclick='a4pp(window.app.items[3]);'>CONFIRMAR RECEBIMENTO<\/button>\n\t\n\t\n<\/div>\t","clientInfo":"<div class='container'>\n\t<div class='alert alert-warning text-center'>CLIENTE N&Atilde;O CADASTRADO<\/div>\n\t<h3>Cadastro<\/h3>\n\t<label>CPF<\/label>\n\t<input type='number' class='form-control' name='CPF' id='CPF'>\n\t<label>Email<\/label>\n\t<input type='email' class='form-control' name='email' id='email'>\n\t<label>Celular<\/label>\n\t<input type='number' class='form-control' name='email' id='email'>\n\t<div class='panel-footer'>\n\t\t<button id='submitClientData' onclick='a4pp(window.app.items[1]);' class='btn btn-success btn-lg pull-right'>FINALIZAR CADASTRO <span class='glyphicon glyphicon-ok'><\/span><\/button>\n\t\t<div class='clearfix'><\/div>\n\t<\/div>\n<\/div>\t","autorizados":"<div class='container'>\n\t<div class='alert alert-success text-center'>AUTORIZADOS<\/div>\n\t<h3>Autorizacao<\/h3>\n\t<label>Pessoa 1<\/label>\n\t<input type='text' class='form-control' name='pessoa[]'>\n\t<label>Pessoa 2<\/label>\n\t<input type='text' class='form-control' name='pessoa[]'>\n\t<label>Pessoa 3<\/label>\n\t<input type='text' class='form-control' name='pessoa[]'>\n\t<label>Pessoa 4<\/label>\n\t<input type='text' class='form-control' name='pessoa[]'>\n\t<div class='panel-footer'>\n\t\t<button id='submitClientData' onclick='a4pp(window.app.items[2]);' class='btn btn-success btn-lg pull-right'>FINALIZAR COMPRA <span class='glyphicon glyphicon-ok'><\/span><\/button>\n\t\t<div class='clearfix'><\/div>\n\t<\/div>\n<\/div>\t","loteview":"<div class='container'>\n\t<table class='table'>\n\t\t<tr>\n\t\t\t<th class='text-right'>Lote<\/th>\n\t\t\t<td><% this.name %> <span><% this.number %><\/span><\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<th  class='text-right'>Valor<\/th>\n\t\t\t<td><% this.price %><\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<th  class='text-right'>CPF do Cliente<\/th>\n\t\t\t<td><input type='number' name='cpf_cliente' id='cpfCliente' class='form-control' autofocus><\/td>\n\t\t<\/tr>\n\t\t<tr>\n\t\t\t<th  class='text-right'>Quantidade<\/th>\n\t\t\t<td><input type='number' disabled name='quantidade' id='quantidade' class='form-control'><\/td>\n\t\t<\/tr>\n\t<\/table>\n\t<div class='panel-footer'>\n\t\t<button id='submitClientData' onclick='a4pp(window.app.items[0]);' class='btn btn-primary btn-lg pull-right'>VERIFICAR CPF <span class='glyphicon glyphicon-arrow-right'><\/span><\/button>\n\t\t<div class='clearfix'><\/div>\n\t<\/div>\n<\/div>","customListview":"<div class='container'>\n\t<h4 style='margin-bottom:20px;'>SELECIONE A QUANTIDADE<\/h4>\n\t<div class='row'>\n\t\t<% for(var x = 1; x < 6; x++){ this.template = 'loteview'; %>\n\t\t<div class='col-xs-6' style='margin-bottom:15px;'><span onclick='triggerGoTo(\"<% this.xpath  %>\");$(\"#quantidade\").val(\"<% x %>\");$(\"#cpfCliente\").focus();' style='font-size:42px;' class='btn btn-primary btn-lg btn-block'><% x %><\/span><\/div>\n\t\t<% } %>\n\t<\/div>\n<\/div>","listview":"<div class=\"container\">\r\n\t<div style='padding:10px;text-align:center;border-bottom:2px solid #ddd;'>\r\n\t\t<img src='<% window.app.company_logo %>'>\r\n\t<\/div>\r\n\t<div class='superior'>\r\n\t\t<% this.details %>\r\n\t<\/div>\r\n\t<ul class=\"model-list list <% if(this.extra!=undefined){ %> <% this.extra %> <% } %>\">\r\n\t\t<% for(var i=0;i<this.items.length;i++){ if(this.items[i].hidden == 1){ continue; } %>\r\n\t\t\t<% if(this.items[i].model=='heading'){ %>\r\n\t\t\t<h4><% this.items[i].title %><\/h4>\r\n\t\t\t<% }else{ %>\r\n\t\t\t<li class='model-list-item' onclick='triggerGoTo(\"<% this.items[i].xpath %>\");'>\r\n\t\t\t\t<% if(this.items[i].icon!=undefined){ %>\r\n\t\t\t\t<img src='<% this.items[i].icon %>' style='width:48px;'>\r\n\t\t\t\t<% } %> \r\n\t\t\t\t<% if(this.items[i].glyphicon!=\"none\"){ %>\r\n\t\t\t\t<div class='glyph' style='background-color:<% this.items[i].color %>'><span class='glyphicon glyphicon-<% this.items[i].glyphicon %>' style='width:48px;'><\/span><\/div>\r\n\t\t\t\t<% } %> \r\n\t\t\t\t<% this.items[i].title %>\r\n\t\t\t<\/li>\r\n\t\t\t<% } %>\r\n\t\t<% } %>\r\n\t<\/ul> \r\n<\/div> \r\n","header":"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='table'>\r\n\t<tr>\r\n\t\t<td>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<span class=\"glyphicon glyphicon-triangle-left\"><\/span>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<td style='width:100%'>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<% if(this.logo!=undefined){ %>\r\n\t\t\t\t<img src='<% this.logo %>' class='appLogo'>\r\n\t\t\t<% }else{ %>\r\n\t\t\t\t<% this.title %>\r\n\t\t\t<% } %>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<% for(var item in this.headerItems){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='<% this.headerItems[item].func %>'><span id='updateIcon' class=\"glyphicon glyphicon-<% this.headerItems[item].icon %>\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% if(this.menu.length > 0){ %>\r\n\t\t<td>\r\n\t\t\t<a class=\"navbar-item\" onclick='toggleMenu();'><span class=\"glyphicon glyphicon-option-vertical\"><\/span><\/a>\r\n\t\t<\/td>\r\n\t\t<% } %>\r\n\t<\/tr>\r\n<\/table>\r\n"},"download_images":[],"based":"base","onRememberLoaded":"console.log('onRememberLoaded triggered');","title":"Macticket","model":"template","items":[{"id":2,"title":"ClientInfo","model":"template","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/0","hidden":1,"template":"clientInfo"},{"id":3,"title":"ClientInfo","model":"template","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/1","hidden":1,"template":"autorizados"},{"id":4,"title":"ClientInfo","model":"template","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/2","hidden":1,"template":"finishHim"},{"id":5,"title":"ClientInfo","model":"template","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/3","hidden":1,"template":"thanks"},{"id":6,"title":"CAMPINAS","model":"template","items":[{"id":7,"title":"TESTE IMPRESSAO","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/4\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/4\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>TESTE IMPRESSAO - CAMPINAS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/4\/0","hidden":0,"template":"listview"}],"details":"<h4>CAMPINAS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/4","hidden":0,"template":"listview"},{"id":10,"title":"SANTOS","model":"template","items":[{"id":11,"title":"CABARE","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/5\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/5\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>CABARE - SANTOS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/5\/0","hidden":0,"template":"listview"},{"id":14,"title":"GIGANTES DO SAMBA","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/5\/1\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/5\/1\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>GIGANTES DO SAMBA - SANTOS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/5\/1","hidden":0,"template":"listview"}],"details":"<h4>SANTOS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/5","hidden":0,"template":"listview"},{"id":17,"title":"PIRACICABA","model":"template","items":[{"id":18,"title":"LOUBET","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/6\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/6\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>LOUBET - PIRACICABA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/6\/0","hidden":0,"template":"listview"}],"details":"<h4>PIRACICABA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/6","hidden":0,"template":"listview"},{"id":21,"title":"ARACATUBA","model":"template","items":[{"id":22,"title":"LOUBET","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>LOUBET - ARACATUBA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/0","hidden":0,"template":"listview"},{"id":25,"title":"--","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/1\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/1\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>-- - ARACATUBA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/1","hidden":0,"template":"listview"},{"id":28,"title":"TEST 2","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/2\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/2\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>TEST 2 - ARACATUBA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7\/2","hidden":0,"template":"listview"}],"details":"<h4>ARACATUBA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/7","hidden":0,"template":"listview"},{"id":31,"title":"ITATIBA","model":"template","items":[{"id":32,"title":"LOUBET","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/8\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/8\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>LOUBET - ITATIBA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/8\/0","hidden":0,"template":"listview"},{"id":35,"title":"PASSAPORTE LOUBET + H&J","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/8\/1\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/8\/1\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>PASSAPORTE LOUBET + H&J - ITATIBA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/8\/1","hidden":0,"template":"listview"}],"details":"<h4>ITATIBA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/8","hidden":0,"template":"listview"},{"id":38,"title":"ARARAS","model":"template","items":[{"id":39,"title":"ZE NETO E CRISTIANO","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/9\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/9\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>ZE NETO E CRISTIANO - ARARAS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/9\/0","hidden":0,"template":"listview"}],"details":"<h4>ARARAS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/9","hidden":0,"template":"listview"},{"id":42,"title":"GUARULHOS","model":"template","items":[{"id":43,"title":"HENRIQUE E JULIANO","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/10\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/10\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>HENRIQUE E JULIANO - GUARULHOS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/10\/0","hidden":0,"template":"listview"}],"details":"<h4>GUARULHOS<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/10","hidden":0,"template":"listview"},{"id":46,"title":"JUNDIAI","model":"template","items":[{"id":47,"title":"WESLEY SAFADAO","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/11\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/11\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>WESLEY SAFADAO - JUNDIAI<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/11\/0","hidden":0,"template":"listview"}],"details":"<h4>JUNDIAI<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/11","hidden":0,"template":"listview"},{"id":50,"title":"ARARAQUARA","model":"template","items":[{"id":51,"title":"PEDRO PAULO E ALEX","model":"template","items":[{"id":7263,"title":"INGRESSO INTEIRA PISTA","model":"template","items":null,"details":"<h4>INGRESSO INTEIRA PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/12\/0\/0","hidden":0,"template":"customListview","name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"title":"PISTA","model":"template","items":null,"details":"<h4>PISTA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/12\/0\/1","hidden":0,"template":"customListview","name":"PISTA","number":1,"price":40}],"details":"<h4>PEDRO PAULO E ALEX - ARARAQUARA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/12\/0","hidden":0,"template":"listview"}],"details":"<h4>ARARAQUARA<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"headerItems":[],"async":false,"xpath":"\/12","hidden":0,"template":"listview"}],"details":"<h4>ESCOLHA A CIDADE<\/h4>","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[{"title":"Iniciar sesion","onclick":"a4pp_login_form();"},{"title":"Restrarse","onclick":"a4pp_register_form();"}],"headerItems":[],"async":false,"xpath":"","hidden":0,"url":"http:\/\/cloud71.cloudcrm.tech\/appAuth.php?hash=68cee07b6b55553208ba0abdbdb9d1a7&app=auto71","appHeader2":"#de911d","appTitle":"Macticket","logged":false,"dt":{"request":{"login":0,"password":0,"formId":"5869be07bcef592350839ac9924c843b","checksum":"d5f86fc60edf63b6bfd4f5db6ef5a51e"},"sql":"SELECT ID_USUARIO, NIVEL, CIDADE, NOME FROM USUARIOS WHERE ID_USUARIO = '0' AND SENHAP = '0'","isValidUser":false,"user":{},"cities":[{"name":"CAMPINAS","id":7024,"events":[{"id":7001,"name":"TESTE IMPRESSAO","date":"2016-09-30","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"SANTOS","id":7025,"events":[{"id":7008,"name":"CABARE","date":"2016-04-29","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]},{"id":7031,"name":"GIGANTES DO SAMBA","date":"2016-07-23","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"PIRACICABA","id":7026,"events":[{"id":7023,"name":"LOUBET","date":"2016-04-20","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"ARACATUBA","id":7028,"events":[{"id":7007,"name":"LOUBET","date":"2016-04-15","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]},{"id":7024,"name":"--","date":"2016-06-30","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]},{"id":7025,"name":"TEST 2","date":"2016-12-31","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"ITATIBA","id":7031,"events":[{"id":7028,"name":"LOUBET","date":"2016-03-19","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]},{"id":7029,"name":"PASSAPORTE LOUBET + H&J","date":"2016-03-19","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"ARARAS","id":7032,"events":[{"id":7030,"name":"ZE NETO E CRISTIANO","date":"2016-04-29","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"GUARULHOS","id":7033,"events":[{"id":7032,"name":"HENRIQUE E JULIANO","date":"2016-04-30","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"JUNDIAI","id":7034,"events":[{"id":7033,"name":"WESLEY SAFADAO","date":"2016-06-05","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]},{"name":"ARARAQUARA","id":7035,"events":[{"id":7034,"name":"PEDRO PAULO E ALEX","date":"2016-05-14","lotes":[{"id":7263,"name":"INGRESSO INTEIRA PISTA","number":2,"price":50},{"id":7033,"name":"PISTA","number":1,"price":40}]}]}]},"template":"loginform","errmsg":"","download_url":"http:\/\/cloud71.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=auto71","update_url":"http:\/\/cloud71.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=auto71","md5":"425b47a385c2ccf763c51072266ea8b6"};