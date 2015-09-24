<?php
	require_once("../../agrocrm.php");
?>
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0">
		<title>...</title>
		<link rel="stylesheet" type="text/css" href="css/roboto/roboto.css?md=%time%">
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css?md=%time%">
		<link rel="stylesheet" type="text/css" href="css/circles.css?md=%time%">
		<link rel="stylesheet" type="text/css" href="css/a4pp.css?md=%time%">
		<link rel="stylesheet" type="text/css" href="css/custom.css?md=%time%">
		<link rel="stylesheet" type="text/css" href="css/custom-app.css?md=%time%">
	</head>
	<body>

		<div id="login-form" class="hidden">
			<ul class="nav nav-tabs nav-justified">
				<li class="active"><a href="#login"><?= i("Entrar", "Iniciar ", "Sign in") ?></a></li>
				<li><a onclick="a4pp_register_form();return false;" href="#"><?= i("Cadastro", "Registrarse", "Sign up") ?></a></li>
			</ul>
			<form class="form-signin" onsubmit="a4pp_login(this); return false;">
				<div class="form-form">
			        <h2 class="form-signin-heading"></h2>
			        <input type="hidden" name="action" value="login">
			        <label for="inputEmail" class="sr-only"><?= i("Email", "Email", "Email") ?></label>
			        <input type="email" id="inputEmail" name="user_email" class="form-control" placeholder="<?= i("Email address", "Email", "Email") ?>" required="" autofocus="">
			        <label for="inputPassword" class="sr-only">Password</label>
			        <input type="password" id="inputPassword" name="user_password" class="form-control" placeholder="<?= i("Senha", "Contraseña", "Password") ?>" required="">
			        <button class="btn btn-lg btn-primary btn-block" type="submit"><?= i("Entrar","Entrar","Sign in") ?></button>
			    </div>
		      </form>
		</div>

		<div id="register-form" class="hidden">
			<ul class="nav nav-tabs nav-justified">
				<li><a href="#login" onclick="a4pp_login_form();return false;" href="#"><?= i("Entrar", "Iniciar ", "Sign in") ?></a></li>
				<li class="active"><a href="#"><?= i("Cadastro", "Registrarse", "Sign up") ?></a></li>
			</ul>
			<form class="form-signin" onsubmit="a4pp_register(this); return false;">
				<div class="form-form">
			        <h2 class="form-signin-heading"></h2>
			        <input type="hidden" name="action" value="register">
			         <label for="inputName" class="sr-only"><?= i("Nome", "Nombre", "Name") ?></label>
			        <input type="name" id="inputName" name="user_name" class="form-control" placeholder="<?= i("Nome", "Nombre", "Name") ?>" required="" autofocus="">
			         <label for="inputSName" class="sr-only"><?= i("Sobrenome", "Apellidos", "Surname") ?></label>
			        <input type="name" id="inputSName" name="user_surname" class="form-control" placeholder="<?= i("Sobrenome", "Apellidos", "Surnames") ?>" required="">
			        <label for="inputEmail" class="sr-only"><?= i("Email", "Email", "Email") ?></label>
			        <input type="email" id="inputEmail" name="user_email" class="form-control" placeholder="<?= i("Email address", "Email", "Email") ?>" required="">
			        <label for="inputPassword" class="sr-only">Password</label>
			        <input type="password" id="inputPassword" name="user_password" class="form-control" placeholder="<?= i("Senha", "Contraseña", "Password") ?>" required="">
			        <button class="btn btn-lg btn-primary btn-block" type="submit"><?= i("Entrar","Entrar","Sign in") ?></button>
			    </div>
		      </form>
		</div>

		<div id="viewport">
			<div class="material-bar">
				<div class="container" id="navbar">
					<!-- 
					
					-->
				</div>
			</div>
			<div class="content">
				<div class='dropdown' id="dMenu">
					<ul class='dropdown-menu open' style="right:0;left:auto;top:0px;">
					</ul>
				</div>
			</div>
		</div>

		<!-- scripts -->
		<script src="cordova.js"></script>
        <script src="barcodescanner.js"></script>
		<script src="js/fastclick.js?md=%time%"></script>
		<script src="datos.js?md=%time%" type="text/javascript"></script>
		<script src="js/apis.js?md=%time%"></script>
		<script src="js/a4pp.js?md=%time%"></script>
		<script src="js/app.js?md=%time%"></script>
		<script src="js/watch.js"></script>
        <script src="js/remember.js"></script>
		<script src="js/jquery.min.js?md=%time%"></script>
		<script src="js/bootstrap.min.js?md=%time%"></script>
<?php $f = "/var/www/apps/".$_GET['app']."/app.js"; if(is_file($f)){  ?>
		<script src="js/custom-app.js"></script>
<?php }else{ ?>
		<!-- File: <?= $f ?> = <?= var_dump(file_exists($f)) ?> --> 
<?php } ?>
		<?php if($_GET['debug']==1){ ?>
		<script src="http://jsconsole.com/remote.js?93743205-D0A2-457B-8791-7835C2991AB3"></script>	
		<?php } ?>
        <script src="js/socket.io-1.3.5.js"></script>
        <script src="js/socket.io.app.js"></script>
        <script>
			register_client("cloud.cloudcrm.tech:8080");
        </script>
	</body>
</html>
