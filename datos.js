var appo = {"id":1,"path":"\/var\/www\/apps\/app-forms","domain":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?hash=53413c9559e98dcbaebb932d840395da&app=forms","version":null,"a4pp_dir":"\/var\/www\/apps\/","disableLog":false,"space":"apps\/app-forms","appHeader":"#444","appHeaderColor":"#eee","appVersion":1,"appName":"Custom App","appDomain":"forms.cloudcrm.tech","appUser":null,"addCss":"\n.material-bar,.navbar.navbar-inverse{\n\tbackground:#444;\n\tbackground: #ff3019;\n\tbackground: -moz-linear-gradient(top, #444 0%, #444 100%);\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#444), color-stop(100%,#444));\n\tbackground: -webkit-linear-gradient(top, #444 0%,#444 100%);\n\tbackground: -o-linear-gradient(top, #444 0%,#444 100%);\n\tbackground: linear-gradient(to bottom, #444 0%,#444 100%);\n\tcolor:#eee;\n}\n.material-bar .navbar-item{\n\tcolor:#eee;\n}","lang":"es","runJS":"console.log(\"Callback\");","templates":{"header":"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='table'>\r\n\t<tr>\r\n\t\t<td>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<span class=\"glyphicon glyphicon-triangle-left\"><\/span>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<td style='width:100%'>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<% if(this.logo!=undefined){ %>\r\n\t\t\t\t<img src='<% this.logo %>' class='appLogo'>\r\n\t\t\t<% }else{ %>\r\n\t\t\t\t<% this.title %>\r\n\t\t\t<% } %>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<% if(this.logged===true){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='a4pp_update();'><span id='updateIcon' class=\"glyphicon glyphicon-refresh\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% for(var item in this.headerItems){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='<% this.headerItems[item].func %>'><span id='updateIcon' class=\"glyphicon glyphicon-<% this.headerItems[item].icon %>\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% if(this.menu.length > 0){ %>\r\n\t\t<td>\r\n\t\t\t<a class=\"navbar-item\" onclick='toggleMenu();'><span class=\"glyphicon glyphicon-option-vertical\"><\/span><\/a>\r\n\t\t<\/td>\r\n\t\t<% } %>\r\n\t<\/tr>\r\n<\/table>\r\n"},"download_images":[],"onRememberLoaded":"console.log('onRememberLoaded triggered');","title":"Acompa\u00f1amiento T\u00e9cnico","model":"login","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[{"title":"Iniciar sesion","onclick":"a4pp_login_form();"},{"title":"Restrarse","onclick":"a4pp_register_form();"}],"headerItems":[],"async":false,"xpath":"","hidden":0,"url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?hash=53413c9559e98dcbaebb932d840395da&app=forms","appHeader2":"#444","appTitle":"Acompa\u00f1amiento T\u00e9cnico","logged":false,"errmsg":"","download_url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=forms","update_url":"http:\/\/cloud.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=forms","md5":"4db8d762597e4eca735bbe8b15f09ba4"};