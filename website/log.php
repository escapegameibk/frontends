<?php
include "global.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Escape Game System LOG</title>
		<meta charset="UTF-8"/>
		<meta name="author" content="tyrolyean" />
		
		<?php echo generate_links(); ?>
		<link rel="stylesheet" href="<?php echo $outsourcing; ?>/fonts/hack/hack.css">
		
		<!-- Did I ever mention how awful css is? The blocks below
		     remove any margin, set the windows to full screen size, and
		     center it horizontally, as well as vertically -->
		<style>
html{
	margin: 0;
	min-height: 100%;
}

body{
	margin: 0px;
	padding: 0px;
}
#log{
	font-family: hack;
}
		</style>

	</head>
	<body>
		<div class="container-fluid">
			<div class="card">
				<div class="card-header">
					<h1>Escape Game System log</h1>
				</div>
				<div class="car-body bg-dark text-white">
				<pre id="log" class="bg-dark text-white">
					<h1>Loading...</h1>

				</pre>
					

				</div>
			</div>
		</div>
		<script src="<?php echo $outsourcing; ?>/js/jquery/jquery-3.3.1.min.js"></script>
                <script src="<?php echo $outsourcing; ?>/js/bootstrap/bootstrap.min.js"></script>
		<script src="<?php echo $outsourcing; ?>/js/log/ansi_up.js"></script>
		<script src="<?php echo $outsourcing; ?>/js/log/root.js"></script>
	</body>
</html>
