<?php

	$application->setTemplate("personal");
	
	$application->createTemplate("personal", <<<TPL
<div class='container'>
	<div class='row'>
		<div class='col-xs-12'>
			<h3>Eventos</h3>
		</div>
		<% for(var k in remember.getItems('events')){ %>
		<div class='col-xs-12'>
		<div class='well' onclick='openEvent(<% k %>);'>
			<h5><% remember.getItem('events', k).title %></h5>
		</div>
		</div>
		<% } %>
		<div class='col-xs-12'>
			<h4>Criar novo evento</h4>
		</div>
		<div class='clearfix'></div>
		<div class='col-xs-8 col-xs-offset-1'>
			<input type='text' class='form-control input-lg' placeholder='digite o nome do evento..' id='newEventTitle'>
		</div>
		<div class='col-xs-2'>
			<button class='btn btn-default btn-lg btn-block btn-success' onclick='createNewEvent();'><span class='glyphicon glyphicon-ok'></span></button>
		</div>
	</div>
</div>
TPL
);

	$application->createTemplate("event", <<<TPL
<div class='container'>
	<h3 id='eventTitle'>EVENTO: <% this.dat.title %></h3>
	
	<% for(var s in getAll(this.id)){ %>
	<% if(remember.getItem('items', s).value == ""){ continue; } %>
	<div onclick="editItem(<% s %>);" class='item text-<% (remember.getItem('items', s).ES=="E") ? 'success' : 'danger' %>'>
		<h5><% remember.getItem('items', s).text %></h5>
		<h5><% remember.getItem('items', s).data %></h5>
		<h5>$ <% parseFloat(remember.getItem('items', s).value) %></h5>
	</div>
	<% } %>
	<div class='newItemForm hidde' id="newItemForm">
	<div class='row'>
		
		<div class='col-xs-12'>
			<legend>NOVO MOVIMENTO</legend>
			<label>ID</label>
			<input type='text' id='itemId' class='form-control'>
		</div>
		
		<div class='col-xs-12'>
			<label>Descricao</label>
			<input type='text' id='newItemTitle' class='form-control'>
		</div>
		
		<div class='col-sm-4'>
			<label>No. Nota</label>
			<input type='text' id='newItemNumber' class='form-control'>
		</div>
		
		<div class='col-sm-4'>
			<label>Valor</label>
			<input type='text' id='newItemValue' class='form-control'>
		</div>
		<div class='col-sm-4'>
			<label>Entrada/Saida</label>
			<select id='newItemES' class='form-control'>
				<option value='E'>Entrada</option>
				<option value='S'>Saida</option>
			</select>
		</div>
	</div>
</div>
<button id="nwRet" class='btn btn-success btn-lg img-circle hidden' onclick='close_window();' style='position:fixed;bottom:15px;left:15px;border-radius:50%;width:92px;height:92px;line-height:74px;font-size:32px;'><span class='glyphicon glyphicon-chevron-left'></span></button>
<button id="nwItm" class='btn btn-success btn-lg img-circle' onclick='newItemForm();' style='position:fixed;bottom:15px;right:15px;border-radius:50%;width:92px;height:92px;line-height:74px;font-size:32px;'><span class='glyphicon glyphicon-plus'></span></button>
<button id="nwItmOk" class='btn btn-success btn-lg img-circle hidden' onclick='newItemFormOK(<% this.id %>);' style='position:fixed;bottom:15px;right:15px;border-radius:50%;width:92px;height:92px;line-height:74px;font-size:32px;'><span class='glyphicon glyphicon-ok'></span></button>

TPL
);

	$application->a("Evento")->setTemplate("event");
