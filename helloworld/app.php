<?php

	$application->createTemplate("hello", "<h1>Hello <% this.title %>!</h1>");
	
	$application->setTemplate("iconview");
	
	$usuarios = aCRM::q("SELECT * FROM branches WHERE status = 'A'");
	
	foreach($usuarios As $usu){
		$application->a($usu->name)
			->setTemplate("hello");
	}
