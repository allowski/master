<?php

	$application->createTemplate("metas", <<<TPL
<div class="container">
	<div class="text-center">
		<h3>Meta Global</h3>
		<div class="percentage lg p50" id="miPer">50%</div>	
	</div>
	<h5>Meta Global</h5>
	<div class='row'>
		<% for(var i=0; i<5; i++){ %>
		<div class='col-xs-6'>
			<h5>
				<div class="percentage sm p<% i*5 %> pull-left" id="miPer"><% i*9 %>%</div>	
				<span>Producto <% i %></span>
			</h5>
		</div>
		<% } %>
	</div>
</div>
TPL
);
	

	$application->setTemplate("metas");
