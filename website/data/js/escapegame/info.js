
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
		document.title = game_name;

		if(!(typeof info["hints"] != 'undefined' && !info["hints"])){
			hints_enabled = true;
		}
		
		console.log("Hints are enabled: " + hints_enabled);
		
		if(typeof info["colors"] != 'undefined'){
			console.log("Colors are defined. attempting to load...");
			load_colors(info["colors"]);
			console.log("Applied color scheme");
		}


		if(!(typeof info["alarm"] != 'undefined' && !info["alarm"])){
			alarm_enabled = true;
			console.log("The alarm is enabled.");
			load_alarm();
		}
		
		if(typeof info["langs"] != 'undefined' && info["langs"] != null){
			console.log("Languages are defined: " + info["langs"]);
			load_langs(info["langs"]);
		}
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

function load_colors(colors){
	
	if(typeof colors["nav"] != 'undefined'){
		console.log("changeing navbar color to value: " + colors["nav"]);
		var nav = document.getElementById("nav");
		nav.classList.remove("bg-dark");
		nav.classList.remove("navbar-dark");
		nav.style.background = colors["nav"];
		
	}
	
	if(typeof colors["footer"] != 'undefined'){
		console.log("changeing footer color to value: " + colors["footer"]);
		var foot = document.getElementById("footer");
		foot.classList.remove("bg-dark");
		foot.style.background = colors["footer"];
		
	}
	
	if(typeof colors["countdown"] != 'undefined'){
		console.log("changeing countdown color to value: " + colors["countdown"]);
		var cnt = document.getElementById("countdown");
		cnt.style.color = colors["countdown"];
		
	}

	if(typeof colors["body"] != 'undefined'){
		console.log("changeing body color to value: " + colors["body"]);
		document.body.style.background = colors["body"];
		
	}
	
	if(typeof colors["alarm"] != 'undefined'){
		console.log("changeing alarm color to value: " + colors["alarm"]);
		alarm_color = colors["alarm"];
		
	}

	return;

}

function load_langs(langs){
	
	multilanguage = true;

	var cntrl = document.getElementById("control");
	cntrl.innerHTML += "<div id=\"lang_row\"></div>";

	var langrow = document.getElementById("lang_row");
	langrow.classList.add("row");
	
	langrow.innerHTML += "<select id=\"language\"></select>";
	
	var selector = document.getElementById("language");
	for(var i = 0; i < langs.length; i++){
		var option = document.createElement("option");
		option.text = langs[i];
		option.value = i;
		selector.add(option);
	}

	langrow.innerHTML += "<button id=\"update_lang\" onclick=\"update_language()\"></button>";
	var btn = document.getElementById("update_lang");
	btn.classList.add("btn");
	btn.classList.add("btn-primary");
	
	btn.classList.add("lang_update");
	
	btn.innerHTML = "Update";

	return;
}
