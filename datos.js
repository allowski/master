var appo = {"id":1,"path":"\/var\/www\/apps\/app-personal","domain":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?hash=d42b873d32c0df93f120378ae73a39df&app=personal","version":null,"a4pp_dir":"\/var\/www\/apps\/","disableLog":false,"space":"apps\/app-personal","appHeader":"#282","appHeaderColor":"#fff","appVersion":1,"appName":"Custom App","appDomain":"personal.cloudcrm.tech","appUser":null,"addCss":"\n.material-bar,.navbar.navbar-inverse{\n\tbackground:#282;\n\tbackground: #ff3019;\n\tbackground: -moz-linear-gradient(top, #282 0%, #282 100%);\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#282), color-stop(100%,#282));\n\tbackground: -webkit-linear-gradient(top, #282 0%,#282 100%);\n\tbackground: -o-linear-gradient(top, #282 0%,#282 100%);\n\tbackground: linear-gradient(to bottom, #282 0%,#282 100%);\n\tcolor:#fff;\n}\n.material-bar .navbar-item{\n\tcolor:#fff;\n}","lang":"es","runJS":"console.log(\"Callback\");","templates":{"header":"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='table'>\r\n\t<tr>\r\n\t\t<td>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<span class=\"glyphicon glyphicon-triangle-left\"><\/span>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<td style='width:100%'>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<% if(this.logo!=undefined){ %>\r\n\t\t\t\t<img src='<% this.logo %>' class='appLogo'>\r\n\t\t\t<% }else{ %>\r\n\t\t\t\t<% this.title %>\r\n\t\t\t<% } %>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<% if(this.logged===true){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='a4pp_update();'><span id='updateIcon' class=\"glyphicon glyphicon-refresh\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% for(var item in this.headerItems){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='<% this.headerItems[item].func %>'><span id='updateIcon' class=\"glyphicon glyphicon-<% this.headerItems[item].icon %>\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% if(this.menu.length > 0){ %>\r\n\t\t<td>\r\n\t\t\t<a class=\"navbar-item\" onclick='toggleMenu();'><span class=\"glyphicon glyphicon-option-vertical\"><\/span><\/a>\r\n\t\t<\/td>\r\n\t\t<% } %>\r\n\t<\/tr>\r\n<\/table>\r\n"},"title":"Personal","model":"login","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[{"title":"Iniciar sesion","onclick":"a4pp_login_form();"},{"title":"Restrarse","onclick":"a4pp_register_form();"}],"headerItems":{"0ab531c2ee1d60c3b83dff575c5f3052":{"func":"alert(\"refresh\");","icon":"ok"}},"async":false,"xpath":"","url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?hash=d42b873d32c0df93f120378ae73a39df&app=personal","appHeader2":"#282","appTitle":"Personal","logged":false,"errmsg":"","download_url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=personal","update_url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=personal","md5":"4a690d13b783e558cd0ef1985075c528"};