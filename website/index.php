<?php
include "global.php";
?>
<!DOCTYPE html>
<html lang="en-US">
        <head>
                <title>Escape Game Innsbruck</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <?php echo generate_links(); ?>
                <link rel="stylesheet" href="<?php echo $outsourcing; ?>/css/custom/index.css">
        </head>
        <body>
                <script src="<?php echo $outsourcing; ?>/js/bootstrap/bootstrap.min.js"></script>
		<script src="<?php echo $outsourcing; ?>/js/jquery/jquery-3.3.1.min.js"></script>
                <nav class="navbar navbar-dark bg-dark sticky-top">
                        <a href="/"><img class="navbar-brand navbar-brnd" src="<?php echo $outsourcing;?>/image/logo-white.svg" height="50vh"></a>
			<h1 id="countdown" class="countdown nav-item">00:00</h2>
                </nav>
                        
                <h1 class="name" id="name">Loading...</h1>
                </br>
		<div id="status" class="container"></div>
                <script src="<?php echo $outsourcing; ?>/js/escapegame/info.js"></script>
                <script src="<?php echo $outsourcing; ?>/js/escapegame/status.js"></script>
                <script src="<?php echo $outsourcing; ?>/js/escapegame/execute.js"></script>
                <script src="<?php echo $outsourcing; ?>/js/escapegame/root.js"></script>
                <?php echo generate_footer(); ?>
        </body>
</html> 
