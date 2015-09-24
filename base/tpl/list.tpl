<div class="container">
	<div class='superior'>
		<% this.details %>
	</div>
	<ul class="model-list list <% if(this.extra!=undefined){ %> <% this.extra %> <% } %>">
		<% for(var i=0;i<this.items.length;i++){ %>
			<% if(this.items[i].model=='heading'){ %>
			<h4><% this.items[i].title %></h4>
			<% }else{ %>
			<li class='model-list-item' onclick='triggerGoTo("<% this.items[i].xpath %>");'>
				<% if(this.items[i].icon!=undefined){ %>
				<img src='<% this.items[i].icon %>' style='width:48px;'>
				<% } %> 
				<% if(this.items[i].glyphicon!="none"){ %>
				<div class='glyph' style='color:<% this.items[i].color %>'><span class='glyphicon glyphicon-<% this.items[i].glyphicon %>' style='width:48px;'></span></div>
				<% } %> 
				<% this.items[i].title %>
			</li>
			<% } %>
		<% } %>
	</ul> 
</div> 
