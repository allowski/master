<?php

	$company = aCRM::$company;
	
	$user = aCRM::$user;
	
	$trans = array("Producto", 
		"Competencia", 
		"Precio", 
		"Aplicaciones",
		 'U. de medida',
		  'Dosis', 
		  'Precio',
		  'Aplicaciones',
		  'U$/ha',
		  'Sc/ha',
		  'Kg/ha',
		  'Costo/ha',
		  'Limpiar',
		  'Guardar',
		  'Eliminar',
		  'Enviar por email',
		  'Agregar',
		  'Precio tonelada'
	);
	
	$t = $array; 
	
	foreach($trans As $k => $v){
		$t[$v] = aCRM::getColumnName($v);
	}

	$application->createTemplate("tbl", <<<TPL
<div class="row">
	<style>
	.form-control{
		border:1px solid #ccc !important;
		text-indent:5px;
	}
	</style>
	<div class="col-sm-3">
		<div id="form" style="padding:8px">
			<select id="selFile" onmousedown="selectFile();" onchange="selectChange(this);"class="form-control"><option value='999'>- Nuevo archivo -</option></select>
			<hr>
			<select id="emp" class="form-control">
				<option value="1">{$company->name}</option>
				<option value="2">{$t['Competencia']}</option>
			</select>
			
			<label>{$t['Producto']}</label>
			<input type="text" id="producto" value="" class="form-control" list="productos">
			<div class="row">
				<div class="col-xs-6">
					<label style="width:100%;">{$t['U. de medida']}</label>
					<input type="text" id="um" value="" class="form-control">
					<label>{$t['Dosis']}</label>
					<input type="number" style="text-align:right" id="dosis" onkeyup="toDbl(event, this);" value="" class="form-control">
				</div>
				<div class="col-xs-6">
					<label>{$t['Precio']}</label>
					<input type="number" style="text-align:right"  id="precio" value=""  onkeyup="toDbl(event, this);" class="form-control">
					<label>{$t['Aplicaciones']}</label>
					<input type="number" id="aplicaciones" value=""  class="form-control">
				</div>
			</div>
			<label>{$t['Precio tonelada']}</label>
			<input type="number" id="soja" value="300.00" class="form-control">
			<input type="checkbox" id='addToTwo'>
			<br>
			<div class="row">
				<div class="col-xs-6">
					<button class='btn btn-primary btn-lg btn-block' onclick='$("#createRow").click();'><span class='glyphicon glyphicon-plus'></span> {$t['Agregar']}</button>
					<button class='btn btn-warning btn-lg btn-block' style="margin-top:15px;" onclick='clearAll();'><span class='glyphicon glyphicon-ban'></span> {$t['Limpiar']}</button>
				</div>
				<div class="col-xs-6">
					<button class='btn btn-success btn-lg btn-block' onclick='salvar();'><span class='glyphicon glyphicon-ok'></span> {$t['Guardar']}</button>
					<button class='btn btn-danger btn-lg btn-block' style="margin-top:15px;" onclick='deletar();'><span class='glyphicon glyphicon-remove'></span> {$t['Eliminar']}</button>
				</div>
				<div class="col-xs-12">
					<button class='btn btn-primary btn-lg btn-block' style="margin-top:15px;" onclick='send_email();'><span class='glyphicon glyphicon-envelope'></span> {$t['Enviar por email']}</button>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-9">
		<input id="nome" class="form-control">
	</div>
	<div class="col-sm-9" id="tblHtml">
		<h5>{$company->name}</h5>
		<table class="table table-bordered" id="t1" style="width:100%;font-family:Arial;font-size:11px;" cellspacing="0" cellpadding="5" border="1"> 
			<tr>
				<th>{$t['Producto']}</th>
				<th>{$t['U. de medida']}</th>
				<th>{$t['Dosis']}</th>
				<th>{$t['Precio']}</th>
				<th>{$t['Aplicaciones']}</th>
				<th>{$t['U$/ha']}</th>
				<th>{$t['Sc/ha']}</th>
				<th>{$t['Kg/ha']}</th>
				<th>*</th>
			</tr>
			<tbody id="result1" style="color:#090;">
				
			</tbody>
			<tr>
				<th colspan='5' class="text-right">Costo/ha</th>
				<th class="text-right" id="total">0</th>
				<th class="text-right" id="total2">0</th>
				<th class="text-right" id="total3">0</th><td></td>
			</tr>
		</table>
		<h5>{$t['Competencia']}</h5>
		<table class="table table-bordered" id="t2" style="width:100%;font-family:Arial;font-size:11px;" cellspacing="0" cellpadding="5" border="1">
			<tr>
				<th>{$t['Producto']}</th>
				<th>{$t['U. de medida']}</th>
				<th>{$t['Dosis']}</th>
				<th>{$t['Precio']}</th>
				<th>{$t['Aplicaciones']}</th>
				<th>{$t['U$/ha']}</th>
				<th>{$t['Sc/ha']}</th>
				<th>{$t['Kg/ha']}</th>
				<th>*</th>
			</tr>
			<tbody id="result2" style="color:#900;">
				
			</tbody>
			<tr>
				<th colspan='5' class="text-right">{$t['Costo/ha']}</th>
				<th class="text-right" id="total">0</th>
				<th class="text-right" id="total2">0</th>
				<th class="text-right" id="total3">0</th>
				<td></td>
			</tr>
		</table>
		
	</div>
	<button id="createRow" style='display:none;' onclick="addRow();">Add</button>
	<button id="sum" style='display:none;' onclick="autoSum();"></button>
</div>

TPL
);


	if($_POST['apx']=="send_email"){

			$para = $_POST['email'];
			$nome = $_POST['email'];
			$title = addslashes(strip_tags($_POST['title']));
			$html = addslashes($_POST['content']);
			send_mail($para, $nome, aCRM::$company->name." : {$title}", "<h1>{$title}</h1>{$html}".print_r(aCRM::$user, true));

			aCRM::q("INSERT INTO costo_beneficio SET 
				title = '{$title}',
				html = '{$html}',
				`owner` = '".aCRM::$company->id."',
				`user_creator` = '".aCRM::$user->id."';
			");
			
	}

	$application->setTemplate('tbl');//- 0 --
	$application->attr("afterRender", 'selectFile();');
