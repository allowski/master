<div class="container">
<h4><% this.title %></h4>
<div class='table-responsive'>
<table class='table table-bordered table-striped'>
	<tr>
	<% for(var property in this.table[0]){ %>
		<th><% property %></th>
	<% } %>
	</tr>
<% for(var i=0; i<this.table.length;i++){ %>
	<tr>
	<% for(var property in this.table[i]){ %>
		<td><% this.table[i][property] %></td>
	<% } %>
	</tr>
<% } %>
</table>
</div>
</div>