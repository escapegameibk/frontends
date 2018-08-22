
var load_general_lock = false;

function attempt_load_general(){
	
	jQuery.getJSON(request_base + "api.php?action=1",
	function(info){
		if(general_loaded || load_general_lock){
			return;
		}
		load_general_lock = true;

		var version = info["version"];
		console.log("Host version " + version_array_to_string(version));
		
		/* Add version info to footer*/
		document.getElementById("footer-text").innerHTML =
			version_array_to_string(version);

		var game_name = info["game"];
		console.log("The game's name is set to " + game_name);
		document.getElementById("name").innerHTML = game_name;

		if(!(typeof info["hints"] != 'undefined' && !info["hints"])){
			hints_enabled = true;
		}

		console.log("Hints are enabled: " + hints_enabled);

		/* Set the game name */
		
		game_duration = Number(info["duration"]);
		console.log("Game duration set to " + game_duration);

		general_loaded = true;
		load_general_lock = false;
		
		return;
	});

}

function version_array_to_string(version_arr){


	var version_str = "";

	for(var i = 0; i < version_arr.length; i++){
		version_str += version_arr[i];

		if(i != version_arr.length - 1){
			version_str += '.';
		}
	}
	return version_str;
}
