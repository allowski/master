var appo = {"id":1,"path":"\/var\/www\/apps\/testimonios","domain":"","version":null,"a4pp_dir":"\/var\/www\/apps\/","disableLog":false,"space":"apps\/testimonios","appHeader":"#06F","appHeaderColor":"#FFF","appVersion":1,"appName":"Custom App","appDomain":"app.example.com","appUser":null,"addCss":"\n.material-bar,.navbar.navbar-inverse{\n\tbackground:#06F;\n\tbackground: #ff3019;\n\tbackground: -moz-linear-gradient(top, #06F 0%, #06F 100%);\n\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#06F), color-stop(100%,#06F));\n\tbackground: -webkit-linear-gradient(top, #06F 0%,#06F 100%);\n\tbackground: -o-linear-gradient(top, #06F 0%,#06F 100%);\n\tbackground: linear-gradient(to bottom, #06F 0%,#06F 100%);\n\tcolor:#FFF;\n}\n.material-bar .navbar-item{\n\tcolor:#FFF;\n}","lang":"es","runJS":"console.log(\"Callback\");","templates":{"header":"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='table'>\r\n\t<tr>\r\n\t\t<td>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<span class=\"glyphicon glyphicon-triangle-left\"><\/span>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<td style='width:100%'>\r\n\t\t<a onclick='goBack();' class=\"navbar-item\">\r\n\t\t\t<% if(this.logo!=undefined){ %>\r\n\t\t\t\t<img src='<% this.logo %>' class='appLogo'>\r\n\t\t\t<% }else{ %>\r\n\t\t\t\t<% this.title %>\r\n\t\t\t<% } %>\r\n\t\t<\/a>\r\n\t\t<\/td>\r\n\t\t<% if(this.logged===true){ %>\r\n\t\t\t<td>\r\n\t\t\t\t<a class=\"navbar-item\" onclick='a4pp_update();'><span id='updateIcon' class=\"glyphicon glyphicon-refresh\"><\/span><\/a>\r\n\t\t\t<\/td>\r\n\t\t<% } %>\r\n\t\t<% if(this.menu.length > 0){ %>\r\n\t\t<td>\r\n\t\t\t<a class=\"navbar-item\" onclick='toggleMenu();'><span class=\"glyphicon glyphicon-option-vertical\"><\/span><\/a>\r\n\t\t<\/td>\r\n\t\t<% } %>\r\n\t<\/tr>\r\n<\/table>\r\n"},"title":"Testimonios","model":"login","items":null,"details":"","icon":null,"callback":null,"glyphicon":"none","color":"silver","menu":[],"async":false,"xpath":"","appHeader2":"#06F","appTitle":"Testimonios","logged":false,"errmsg":""};