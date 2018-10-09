<?php
include "global.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Escape Game</title>
		<meta charset="UTF-8" />
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
	margin: 0px;
	border: 0px;
	width: 100vw;
	height: 100vh;
	background: #000000;
	text-color: #FFFFFF;
}
.video_container{
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: auto;
	height: 100vh;
	width: 100vw;
	margin: 0px;
}
video{
	overflow: auto;
	width: 100%;
	height: 100%;
}
		</style>
	</head>
	<body>
		<div class="video_container">
			<video id="video_main" autoplay src="<?php echo $outsourcing; ?>/video/test.mp4" onended="on_finish();">
				ERROR! PLEASE NOTIFY OPERATOR!
			</video>
		</div>

		<script src="<?php echo $outsourcing; ?>/js/jquery/jquery-3.3.1.min.js"></script>
		<script>
var monitor_id = <?php

if(isset($_GET['monitor_id'])){
	echo $_GET['monitor_id'];
}else{
	echo 0;
}
?>;
		</script>
		<script src="<?php echo $outsourcing; ?>/js/video/root.js"></script>
	</body>
</html>
