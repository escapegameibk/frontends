<?php
include "global.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Escape Game System LOG</title>
		<meta charset="UTF-8"/>
		<meta name="author" content="tyrolyean" />
		<!-- Did I ever mention how awful css is? The blocks below
		     remove any margin, set the windows to full screen size, and
		     center it horizontally, as well as vertically -->
		<style>
html{
	margin: 0;
	min-height: 100%;
}

body{
	background: #000000;
	color: #FFFFFF;
	margin: 0px;
	padding: 0px;
}

		</style>
	</head>
	<body>
		<div id="log">
			<h1>Loading...</h1>
			

		</div>

		<script src="<?php echo $outsourcing; ?>/js/jquery/jquery-3.3.1.min.js"></script>
		<script src="<?php echo $outsourcing; ?>/js/log/ansi_up.js"></script>
		<script src="<?php echo $outsourcing; ?>/js/log/root.js"></script>
	</body>
</html>
