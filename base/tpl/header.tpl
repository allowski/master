<table border="0" cellpadding="0" cellspacing="0" class='table'>
	<tr>
		<td>
		<a onclick='goBack();' class="navbar-item">
			<span class="glyphicon glyphicon-triangle-left"></span>
		</a>
		</td>
		<td style='width:100%'>
		<a onclick='goBack();' class="navbar-item">
			<% if(this.logo!=undefined){ %>
				<img src='<% this.logo %>' class='appLogo'>
			<% }else{ %>
				<% this.title %>
			<% } %>
		</a>
		</td>
		<% if(this.logged===true){ %>
			<td>
				<a class="navbar-item" onclick='a4pp_update();'><span id='updateIcon' class="glyphicon glyphicon-refresh"></span></a>
			</td>
		<% } %>
		<% for(var item in this.headerItems){ %>
			<td>
				<a class="navbar-item" onclick='<% this.headerItems[item].func %>'><span id='updateIcon' class="glyphicon glyphicon-<% this.headerItems[item].icon %>"></span></a>
			</td>
		<% } %>
		<% if(this.menu.length > 0){ %>
		<td>
			<a class="navbar-item" onclick='toggleMenu();'><span class="glyphicon glyphicon-option-vertical"></span></a>
		</td>
		<% } %>
	</tr>
</table>
