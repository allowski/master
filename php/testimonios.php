<?php

	$application->debug = true;

	$application->setTemplate('iconview');

	if($_POST['apx']=="send_data"){

		$img = str_replace(strtolower("DATA:IMAGE/JPEG;BASE64,"), "", $_POST['data']['pic']);

		$nm = tempnam("/tmp/", "xQS").".jpg";

		file_put_contents($nm, base64_decode($img));

		$i = 0;

		$sql = "INSERT INTO testimonios SET ";
		
		$cols = aCRM::getColumns("testimonios");
		
		$insert = array();

		$_POST['data']['user'] = $application->appUser->id;
		$_POST['data']['owner'] = $application->appUser->owner;

		foreach($_POST['data'] As $k => $v){
			
			$insert[] = "`{$k}` = '{$v}'";

		}
		
		$sql.= implode(", ", $insert);

		aCRM::q($sql);
		
		$resp = new stdClass;
		
		$resp->status = "OK";
		
		$resp->id = DB::lastInsertId(); 
		
		die(json_encode($resp));

	}

	$html = <<<HTML
<div class="container"> 		
<form method="POST" class="row" id='frm'>
	<input type="hidden" name="id" value="0">
	<div class="col-md-12"><h5 class="text-center">Datos del cliente</h5></div>
	<div class="col-md-8">
	<label>Nombre</label>
	<input type="text" name="cliente_nombre" id="nombre" class="form-control" required>
	</div>
	<div class="col-md-4">
	<label>Telefono</label>
	<input type="text" name="cliente_telefono" id="telefono" class="form-control"  required>
	</div>
	<div class="col-md-4">
	<label>Estancia/Localidad</label>
	<input type="text" name="cliente_localidad" id="estancia_localidad" class="form-control"  required>
	</div>
	<div class="col-md-4">
	<label>Ciudad</label>
	<input type="text" name="cliente_ciudad" id="ciudad" class="form-control"  required>
	</div>
	<div class="col-md-4">
	<label>Departamento</label>
	<input type="text" name="cliente_departamento" id="departamento" class="form-control"  required>
	</div>
	<div class="col-md-6">
	<label>Cultivo</label>
	<input type="text" name="cliente_cultivo" id="cultivo" class="form-control"  required>
	</div>
	<div class="col-md-6">
	<label>Zafra</label>
	<input type="text" name="cliente_zafra" id="zafra" class="form-control"  required>
	</div>
	<hr>
	<div class="col-md-12">
	<label>Testimonio</label>
	<input type="text" name="cliente_testimonio" id="testimonio" class="form-control"  required>
	</div>
	<hr>
	<div class="col-md-12"><h5 class="text-center">Resultados Diagro</h5></div>
	<div class="clearfix"></div>
	<div class="col-md-3">
		<label>Producto</label>
		<input type="text" name="producto" id="producto_diagro" class="form-control">
	</div>
	<div class="col-md-3">
		<label>Area (Hectareas)</label>
		<input type="number" name="area" id="area_diagro" class="form-control">
	</div>
	<div class="col-md-4">
		<label>Productividad bolsas/ha</label>
		<input type="number" name="productividad" id="bolsas_ha_diagro" class="form-control">
	</div>
	<div class="col-md-2">
		<label>Kg/ha</label>
		<input type="number" name="kg" id="kg_ha_diagro" class="form-control">
	</div>
	<hr>
	<div class="col-md-12"><h5  class="text-center">Resultados Competencia</h5></div>
	<div class="clearfix"></div>
	<div class="col-md-3">
		<label>Producto</label>
		<input type="text" name="competencia_producto" id="producto_competencia" class="form-control">
	</div>
	<div class="col-md-3">
		<label>Area (Hectareas)</label>
		<input type="number" name="competencia_area" id="area_competencia" class="form-control">
	</div>
	<div class="col-md-4">
		<label>Productividad bolsas/ha</label>
		<input type="number" name="competencia_productividad" id="bolsas_ha_competencia" class="form-control">
	</div>
	
	<div class="col-md-2">
		<label>Kg/ha</label>
		<input type="number" name="competencia_kg" id="kg_ha_competencia" class="form-control">
		<input type="hidden" class="form-control" name="pic">
	</div>
	<div class="clearfix"></div>
	<div class="col-sm-4">
	<h5>Foto</h5>
	<img id="theImg" src='img/fallback.png' style="width:356px;height:256px;margin:10px;" class="img img-rounded">
	</div>
	<div class="col-sm-8">
		<div style="padding:30px">
	    <input type='hidden' name='divulgar_imagen' value='n'>
	    <h3 id="autorizado" class='text-center'>Autoriza divulgar su imagen?</h3>
	    <div id="si_o_no">
	    <button class='btn btn-success btn-lg' onclick='divulgar("s");return false;'>Acepto</button>	    
	    <button class='btn btn-danger btn-lg pull-right' onclick='divulgar("n");return false;'>No acepto</button></div>
	</div></div>
	<div class="clearfix"></div>
	<div class='col-xs-12'>
		<div class='panel-footer'>
			<div class='row'>
<div class="col-xs-4"><a class='btn btn-success btn-lg btn-block' onclick="take_photo();return false;">Foto</a></div>
	<div class="col-xs-4"><button class='btn btn-primary btn-lg btn-block' onclick="save_entry();return false;">Guardar</button></div>
<div class="col-xs-4"><a class='btn btn-warning btn-lg btn-block' onclick="send_entry(window.currentEntry);return false;">Enviar</a></div>
</div>
</div>
</div>
</form>
</div>
<% if(window.currentEntry>0){edit_entry_in_form(window.currentEntry);} %>
HTML;

	$application->createTemplate('testimonio', $html);

$fallback = $application->addImage('content/16/app/fallback.png');

$htmle = <<<HTML
<style>.te{-webkit-transition:0.5s all;}.te.removed{-webkit-transform:scale(0.0);}.t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}</style>
<div class="container">
<div class='row'>
	<% for(var i = 1;i<count_entries();i++){ %>
	<div class='col-md-3 col-xs-6 te'>
	<div class='well well-sm' style='margin-bottom:5px;<% (get_entry(i).id!=0) ? "background:red;" : "" %>'>
	<img src="<% get_entry(i).pic || '{$fallback}' %>" style='max-width:100%;'>
	<div class='t'><% get_entry(i).nombre || "(Sin nombre)" %></div>
	<div class='row'>
		<div class='col-xs-6'><a  onclick='window.currentEntry = <% i %>;a4pp({"title":"Editar","model":"template","template":"testimonio"});' class='btn btn-primary btn-block'>Editar</a>
		</div>
		<div class='col-xs-6'><a onclick='user_delete_entry(<% i %>);' class='btn btn-danger btn-block'>Descartar</a>
		</div>
	</div>
</div>
</div>

	<% } %>

	<div class='col-md-3 col-xs-6 te'>
	<div class='panel-footer' style='margin-bottom:5px;'>
	<img src="<% '{$fallback}' %>" style='max-width:100%;'>
	<div class='t'><% "Nuevo testimonio" %></div>
	<a  onclick='triggerGoTo("1");' class='btn btn-primary btn-block'>Crear nuevo</a>
		</div>
	</div>
</div>

</div>
</div>
HTML;

	$application->createTemplate('entries', $htmle);

	$application->a("Listar clientes", TPL_MODEL,  $application->addImage("content/16/app/users.png"))->attr("template", "entries")->attr("glyphicon", "list")->attr("beforeRender")->color="#666";

	$application->a("Nuevo testimonio", TPL_MODEL,  $application->addImage("content/16/app/add-user.png"))->attr("template", "testimonio")
	->attr("beforeRender", "window.currentEntry = 0;")->attr("glyphicon", "plus")->color="#666";

	$application->a("Get GPS", TPL_MODEL)
		->setTemplate("listview")
		->attr("beforeRender", 'getpos(); return false;');
