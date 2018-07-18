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
                <nav class="navbar navbar-light bg-light sticky-top">
                        <a href="/"><img class="navbar-brand navbar-brnd" src="<?php echo $outsourcing;?>/image/logo.svg" height="50vh"></a>
                        <span id="countdown" class="countdown navbar-text">00:00</span>
                </nav>
                        
                <h1 class="name" id="name">Loading...</h1>
                </br>
                <div class="events" id="events"></div>
		<div class="dependencies" id="dependencies"></div>
		<button class="btn btn-dark" onclick="toggle_dependencies()">
			show dependencies
		</button>
                <script src="<?php echo $outsourcing; ?>/js/escapegame/root.js"></script>
                <?php echo generate_footer(); ?>
        </body>
</html> 
