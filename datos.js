var appo = {"id":1,"path":"\/var\/www\/apps\/app-auto76","domain":"http:\/\/cloud76.cloudcrm.tech\/appAuth.php?hash=dc1e48a7a941bb6b77261a0d785a5080&app=auto76","version":null,"a4pp_dir":"\/var\/www\/apps\/","disableLog":false,"space":"apps\/app-auto76","appHeader":"#f40000","appHeaderColor":"#ffffff","appVersion":1,"appName":"Custom App","appDomain":"auto76.cloudcrm.tech","appUser":null,"addCss":"\n.material-bar,.navbar.navbar-inverse{\n\tbackground:#f40000;\n\tbackground: #ff3019;\n\tbackground: -moz-linear-gradient(top, #f40000 0%, #f40000 100%);\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f40000), color-stop(100%,#f40000));\n\tbackground: -webkit-linear-gradient(top, #f40000 0%,#f40000 100%);\n\tbackground: -o-linear-gradient(top, #f40000 0%,#f40000 100%);\n\tbackground: linear-gradient(to bottom, #f40000 0%,#f40000 100%);\n\tcolor:#ffffff;\n}\n.material-bar .navbar-item{\n\tcolor:#ffffff;\n}","lang":"es","runJS":"console.log(\"Callback\");","templates":{"header":"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='table'>\r\n\t<tr>\r\n\t\t<td>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<span class=\"glyphicon glyphicon-triangle-left\"><\/span>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<td style='width:100%'>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<% if(this.logo!=undefined){ %>\r\n\t\t\t\t<img src='<% this.logo %>' class='appLogo'>\r\n\t\t\t<% }else{ %>\r\n\t\t\t\t<% this.title %>\r\n\t\t\t<% } %>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<% for(var item in this.headerItems){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='<% this.headerItems[item].func %>'><span id='updateIcon' class=\"glyphicon glyphicon-<% this.headerItems[item].icon %>\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% if(this.menu.length > 0){ %>\r\n\t\t<td>\r\n\t\t\t<a class=\"navbar-item\" onclick='toggleMenu();'><span class=\"glyphicon glyphicon-option-vertical\"><\/span><\/a>\r\n\t\t<\/td>\r\n\t\t<% } %>\r\n\t<\/tr>\r\n<\/table>\r\n"},"download_images":[],"based":"base","onRememberLoaded":"console.log('onRememberLoaded triggered');","title":"Coca Cola","model":"login","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[{"title":"Iniciar sesion","onclick":"a4pp_login_form();"},{"title":"Restrarse","onclick":"a4pp_register_form();"}],"headerItems":[],"async":false,"xpath":"","hidden":0,"url":"http:\/\/cloud76.cloudcrm.tech\/appAuth.php?hash=dc1e48a7a941bb6b77261a0d785a5080&app=auto76","appHeader2":"#f40000","appTitle":"Coca Cola","logged":false,"errmsg":"","download_url":"http:\/\/cloud76.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=auto76","update_url":"http:\/\/cloud76.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=auto76","md5":"6328c5e04ccb2e9d54f97204b9bd1fdc"};