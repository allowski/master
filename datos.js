var appo = {"id":1,"path":"\/var\/www\/apps\/app-auto79","domain":"http:\/\/cloud51.cloudcrm.tech\/appAuth.php?hash=1ba1a43a66ee8bf65b2fcd5a1d35c4f1&app=auto79","version":null,"a4pp_dir":"\/var\/www\/apps\/","disableLog":false,"space":"apps\/app-auto79","appHeader":"#80ffff","appHeaderColor":"#ffffff","appVersion":1,"appName":"Custom App","appDomain":"auto79.cloudcrm.tech","appUser":null,"addCss":"\n\/* - Version 0 - *\/\n.material-bar,.navbar.navbar-inverse{\n\tbackground:#80ffff;\n\tbackground: #ff3019;\n\tbackground: -moz-linear-gradient(top, #80ffff 0%, #80ffff 100%);\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#80ffff), color-stop(100%,#80ffff));\n\tbackground: -webkit-linear-gradient(top, #80ffff 0%,#80ffff 100%);\n\tbackground: -o-linear-gradient(top, #80ffff 0%,#80ffff 100%);\n\tbackground: linear-gradient(to bottom, #80ffff 0%,#80ffff 100%);\n\tcolor:#ffffff;\n}\n.material-bar .navbar-item{\n\tcolor:#ffffff;\n}","lang":"es","runJS":"console.log(\"Callback\");","templates":{"header":"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='table'>\r\n\t<tr>\r\n\t\t<td>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<span class=\"glyphicon glyphicon-triangle-left\"><\/span>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<td style='width:100%'>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<% if(this.logo!=undefined){ %>\r\n\t\t\t\t<img src='<% this.logo %>' class='appLogo'>\r\n\t\t\t<% }else{ %>\r\n\t\t\t\t<% this.title %>\r\n\t\t\t<% } %>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<% for(var item in this.headerItems){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='<% this.headerItems[item].func %>'><span id='updateIcon' class=\"glyphicon glyphicon-<% this.headerItems[item].icon %>\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% if(this.menu.length > 0){ %>\r\n\t\t<td>\r\n\t\t\t<a class=\"navbar-item\" onclick='toggleMenu();'><span class=\"glyphicon glyphicon-option-vertical\"><\/span><\/a>\r\n\t\t<\/td>\r\n\t\t<% } %>\r\n\t<\/tr>\r\n<\/table>\r\n"},"download_images":[],"based":"base","onRememberLoaded":"console.log('onRememberLoaded triggered');","title":"Forqu\u00edmica","model":"login","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[{"title":"Iniciar sesion","onclick":"a4pp_login_form();"},{"title":"Restrarse","onclick":"a4pp_register_form();"}],"headerItems":[],"async":false,"xpath":"","hidden":0,"url":"http:\/\/cloud51.cloudcrm.tech\/appAuth.php?hash=1ba1a43a66ee8bf65b2fcd5a1d35c4f1&app=auto79","appHeader2":"#80ffff","appTitle":"Forqu\u00edmica","logged":false,"errmsg":"","download_url":"http:\/\/cloud51.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=auto79","update_url":"http:\/\/cloud51.cloudcrm.tech\/appAuth.php?ss=bnVsbA==&hash=46ad73c39e4bcc964556bddd1709700d&app=auto79","md5":"c23f0fa62a0822957b5c411165a3dc55"};