<?php

	$application->createTemplate("ponto", <<<TPL
<div class="col-md-4 col-md-offset-4 col-xs-8 col-xs-offset-2">
	<a href='#' onclick='register_position(); return false;'>
		<img src="http://placehold.it/512x512&text=marcar" class='img-circle'>
	</a>
</div>
TPL
);

	if($_POST['apx']=="upload"){
		
		$application->data_recv = $_POST;
		
		foreach($_POST["data"] As $k){
			
			$application->sql = "INSERT INTO user_geo (latitude, longitude, altitude, user, coords) VALUES({$k['latitude']},{$k['longitude']},'{$k['altitude']}','{$application->appUser->id}', 'POINT({$k['latitude']} {$k['longitude']},0)');";
			
			$application->sql = "INSERT INTO user_geo set `user`= {$application->appUser->id}, latitude = {$k['latitude']}, longitude={$k['longitude']}, coords = POINT({$k['latitude']}, {$k['longitude']});";
			
			aCRM::q($application->sql);
			
		}
		
	}

	$application->setTemplate("ponto");
