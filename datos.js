var appo = {"id":1,"path":"\/var\/www\/apps\/app-testimonios","domain":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?hash=c678f467a6d49626ffcba586915f5e66&app=testimonios","version":null,"a4pp_dir":"\/var\/www\/apps\/","disableLog":false,"space":"apps\/app-testimonios","appHeader":"#06F","appHeaderColor":"#FFF","appVersion":1,"appName":"Custom App","appDomain":"testimonios.cloudcrm.tech","appUser":null,"addCss":"\n.material-bar,.navbar.navbar-inverse{\n\tbackground:#06F;\n\tbackground: #ff3019;\n\tbackground: -moz-linear-gradient(top, #06F 0%, #06F 100%);\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#06F), color-stop(100%,#06F));\n\tbackground: -webkit-linear-gradient(top, #06F 0%,#06F 100%);\n\tbackground: -o-linear-gradient(top, #06F 0%,#06F 100%);\n\tbackground: linear-gradient(to bottom, #06F 0%,#06F 100%);\n\tcolor:#FFF;\n}\n.material-bar .navbar-item{\n\tcolor:#FFF;\n}","lang":"es","runJS":"console.log(\"Callback\");","templates":{"header":"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='table'>\r\n\t<tr>\r\n\t\t<td>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<span class=\"glyphicon glyphicon-triangle-left\"><\/span>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<td style='width:100%'>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<% if(this.logo!=undefined){ %>\r\n\t\t\t\t<img src='<% this.logo %>' class='appLogo'>\r\n\t\t\t<% }else{ %>\r\n\t\t\t\t<% this.title %>\r\n\t\t\t<% } %>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<% if(this.logged===true){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='a4pp_update();'><span id='updateIcon' class=\"glyphicon glyphicon-refresh\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% for(var item in this.headerItems){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='<% this.headerItems[item].func %>'><span id='updateIcon' class=\"glyphicon glyphicon-<% this.headerItems[item].icon %>\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% if(this.menu.length > 0){ %>\r\n\t\t<td>\r\n\t\t\t<a class=\"navbar-item\" onclick='toggleMenu();'><span class=\"glyphicon glyphicon-option-vertical\"><\/span><\/a>\r\n\t\t<\/td>\r\n\t\t<% } %>\r\n\t<\/tr>\r\n<\/table>\r\n"},"download_images":[],"title":"Testimonios","model":"login","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[{"title":"Iniciar sesion","onclick":"a4pp_login_form();"},{"title":"Restrarse","onclick":"a4pp_register_form();"}],"headerItems":[],"async":false,"xpath":"","url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?hash=c678f467a6d49626ffcba586915f5e66&app=testimonios","appHeader2":"#06F","appTitle":"Testimonios","logged":false,"errmsg":"","download_url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=testimonios","update_url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=testimonios","md5":"ef33c91129b82949a9a40db930dca394"};