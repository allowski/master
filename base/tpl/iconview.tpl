<div class="container">
	<div class='superior'>
		<% this.details %>
	</div>
	<div class="row model-icons icons <% if(this.extra!=undefined){ %> <% this.extra %> <% } %>">
		<% for(var i=0;i<this.items.length;i++){ %>
			<% if(this.items[i].model=='heading'){ %>
			<div class='col-xs-12'>
			<h4 class='visible-xs'><% this.items[i].title %></h4>
			<h2 class='hidden-xs text-center'><% this.items[i].title %></h2>
			</div>
			<% }else{ %>
			<div class="col-md-3 col-sm-4 col-xs-6">
			<div class='model-icons-item' onclick='triggerGoTo("<% this.items[i].xpath %>");'>
				<% if(this.items[i].icon!=undefined){ %>
				<img src='<% this.items[i].icon %>'>
				<% } %> 
				<% this.items[i].title %>
			</div>
			</div>
			<% } %>
		<% } %>
	</div> 
</div> 
