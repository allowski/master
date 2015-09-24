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
				<option value="1">Diagro</option>
				<option value="2">Competencia</option>
			</select>
			
			<label>Producto</label>
			<input type="text" id="producto" value="" class="form-control" list="productos">
			<datalist name="productos" id="productos">
				<option>POLUX FULL</option>
				<option>DINCOZEB</option>
			</datalist>
			<div class="row">
				<div class="col-xs-6">
					<label style="width:100%;">Unidad de medida</label>
					<input type="text" id="um" value="" class="form-control">
					<label>Dosis</label>
					<input type="number" style="text-align:right" id="dosis" onkeyup="toDbl(event, this);" value="" class="form-control">
				</div>
				<div class="col-xs-6">
					<label>Precio</label>
					<input type="number" style="text-align:right"  id="precio" value=""  onkeyup="toDbl(event, this);" class="form-control">
					<label>Aplicaciones</label>
					<input type="number" id="aplicaciones" value=""  class="form-control">
				</div>
			</div>
			<label>Precio por Tonelada</label>
			<input type="number" id="soja" value="300.00" class="form-control">
			<br>
			<div class="row">
				<div class="col-xs-6">
					<button class='btn btn-primary btn-lg btn-block' onclick='$("#createRow").click();'><span class='glyphicon glyphicon-plus'></span>AGREGAR</button>
					<button class='btn btn-warning btn-lg btn-block' style="margin-top:15px;" onclick='clearAll();'><span class='glyphicon glyphicon-ban'></span> LIMPIAR</button>
				</div>
				<div class="col-xs-6">
					<button class='btn btn-success btn-lg btn-block' onclick='salvar();'><span class='glyphicon glyphicon-ok'></span> GUARDAR</button>
					<button class='btn btn-danger btn-lg btn-block' style="margin-top:15px;" onclick='deletar();'><span class='glyphicon glyphicon-remove'></span>ELIMINAR</button>
				</div>
				<div class="col-xs-12">
					<button class='btn btn-primary btn-lg btn-block' style="margin-top:15px;" onclick='send_email();'><span class='glyphicon glyphicon-envelope'></span> MANDAR POR EMAIL</button>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-9">
		<input id="nome" class="form-control">
	</div>
	<div class="col-sm-9" id="tblHtml">
		<h5>Diagro</h5>
		<table class="table table-bordered" id="t1" style="width:100%;font-family:Arial;font-size:11px;" cellspacing="0" cellpadding="5" border="1"> 
			<tr>
				<th>Producto</th>
				<th>U. de medida</th>
				<th>Dosis</th>
				<th>Precio</th>
				<th>Aplicaciones</th>
				<th>U$/ha</th>
				<th>Sc/ha</th>
				<th>Kg/ha</th>
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
		<h5>Competencia</h5>
		<table class="table table-bordered" id="t2" style="width:100%;font-family:Arial;font-size:11px;" cellspacing="0" cellpadding="5" border="1">
			<tr>
				<th>Producto</th>
				<th>U. de medida</th>
				<th>Dosis</th>
				<th>Precio</th>
				<th>Aplicaciones</th>
				<th>U$/ha</th>
				<th>Sc/ha</th>
				<th>Kg/ha</th>
				<th>*</th>
			</tr>
			<tbody id="result2" style="color:#900;">
				
			</tbody>
			<tr>
				<th colspan='5' class="text-right">Costo/ha</th>
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
