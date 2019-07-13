
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
		
		/* Add version info to footer for debug ease */
		document.getElementById("footer-text").innerHTML =
			version_array_to_string(version);

		/* Set the game name */
		var game_name = info["game"];
		console.log("The game's name is set to " + game_name);
		document.getElementById("name").innerHTML = game_name;
		document.title = game_name;
		
		if(typeof info["hints"] == 'undefined' || !info["hints"]){
			hints_enabled = false;
		}else{
			hints_enabled = true;
		}
		
		console.log("Hints are enabled: " + hints_enabled);
		
		if(typeof info["colors"] != 'undefined'){
			console.log("Colors are defined. attempting to load...");
			load_colors(info["colors"]);
			console.log("Applied color scheme");
		}

		if(!(typeof info["alarm"] == 'undefined' || !info["alarm"])){
			alarm_enabled = true;
			console.log("The alarm is enabled.");
			load_alarm();
		}
		
		if(typeof info["langs"] != 'undefined' && info["langs"] != null){
			console.log("Languages are defined: " + info["langs"]);
			load_langs(info["langs"]);
		}
		
		if(typeof info["controls"] != 'undefined'){
			console.log("Controls are defined. attempting to load...");
			load_controls(info["controls"]);
			console.log("Controls displayed!");
		}

		if(typeof info["event_states"] != 'undefined'){
			console.log("Game is capable of distincting event "+
				"execution stages");
			var event_states = info["event_states"];
			event_reset = event_states['reset'];
			event_executeing = event_states['executeing'];
			event_executed = event_states['triggered'];
			event_forcefully_executed = 
				event_states['forcefully_triggered'];
		}else{
			/* If the value of event_reset is negative the frontend
			 * will quite simply just make a boolean evaluation */
			event_reset = -1;
		}
		
		game_duration = Number(info["duration"]);
		console.log("Game duration set to " + game_duration);


		general_loaded = true;
		load_general_lock = false;
		
		return;

	}).always(function() {
		initialize();
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
	
	if(typeof colors["logo"] != 'undefined'){
		console.log("changeing logo to value: " + colors["logo"]);
		document.getElementById('logo').src = colors["logo"];
		
	}
	
	if(typeof colors["fluid"] != 'undefined'){
		console.log("changeing fluidity of body: " + colors["fluid"]);
		document.getElementById('status').classList.remove(
			"container-fluid", "container");
		document.getElementById('control').classList.remove(
			"container-fluid", "container");

		if(colors["fluid"]){
			document.getElementById('status').classList.add(
				"container-fluid", "container_fluid_cust");
			document.getElementById('control').classList.add(
				"container-fluid", "container_fluid_cust");

		}else{
			document.getElementById('status').classList.add(
				"container");
			document.getElementById('control').classList.add(
				"container");

		}
		
	}

	return;

}

function load_langs(langs){
	
	multilanguage = true;

	var cntrl = document.getElementById("control");
	cntrl.innerHTML += "<div id=\"lang_row\"></div>";

	var langrow = document.getElementById("lang_row");
	langrow.classList.add("row");
	langrow.classList.add("form-group");	
	langrow.innerHTML += "<select id=\"language\"></select>";
	
	var selector = document.getElementById("language");
	selector.classList.add("form-control");	
	selector.classList.add("lang_select");	
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

function change_control(e){
	console.log("Changed control "+e+" to " +
		document.getElementById("control_"+e).value );
	send_control_update(e, document.getElementById("control_"+e).value);

}

function load_controls(controls){
	
	console.log("Loading " + controls.length + " controls");

	for(var i = 0; i < controls.length; i++){
		var control = controls[i];

		if(control["type"] == "linear"){

			var row = document.createElement("div");
			row.classList.add("container");
			
			var group = document.createElement("div");
			group.classList.add("form-group");

			var lab = document.createElement("label");
			lab.setAttribute("for", "control_" + i);

			lab.innerHTML = "<h3><b>"+control["name"]+"</b></h3>";

			group.appendChild(lab);
			row.appendChild(group);
			document.getElementById("control").appendChild(row);
			
			group.innerHTML += "<input id=\"control_"+i
				+"\" onchange=\"change_control("
				+i+")\"></input>";

			var slider = document.getElementById("control_"+i);
			slider.id = "control_"+i;
			slider.type = "range";
			slider.min = control["min"];
			slider.max = control["max"];
			slider.value = control["initial"];
			slider.step = control["step"];
			slider.classList.add("control_linear");
			slider.classList.add("form-control");

			


		}else{
			console.log("Unknown control type specified!"+
				" Ignoreing");
		}

	}

	return;
}
