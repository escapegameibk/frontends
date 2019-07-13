
function timer_update(){

	var timer = document.getElementById("countdown");

	if(Number(timer_start) == 0){
		timer.innerHTML = "READY";
	}else{
		var value = 0;
		if(Number(timer_end) == 0){
			value =  game_duration + (timer_start - (Date.now() / 
				1000));
			
		}else{
			value =  game_duration + (timer_start - (timer_end));
		}
		value = Math.round(value);
		var timer_should = ((value < 0) ? '-' : '');
		timer_should += get_clock(new Date(Math.abs(value * 1000)));

		if(timer.innerHTML != timer_should){
			timer.innerHTML = timer_should;
		}
		
	}

	return;
}

function get_clock(time) {
	var hour = time.getUTCHours();
	var minute = time.getUTCMinutes();
	var second = time.getUTCSeconds();
	var temp = '';
	temp += ((hour < 10) ? '0' : '') + hour;
	temp += ((minute < 10) ? ':0' : ':') + minute;
	temp += ((second < 10) ? ':0' : ':') + second;
	return temp;
}


var events_load_lock = false;

function attempt_load_events(){

	if(events_loaded){
		return;
	}
	jQuery.getJSON(request_base + "api.php?action=3",
	function(event_names){

		if(events_load_lock){
			return;
		}

		events_load_lock = true;

		var stat = document.getElementById("status");
		
		if(stat.innerHTML != ""){
			return;
		}

		for(var i = 0; i < event_names.length; i++){
			stat.innerHTML += "<div id=\"row-" + i + "\"></div>";
			
			var row = document.getElementById("row-" + i);
			row.classList.add("row");
			row.innerHTML += "<div id=\"evcl-" + i + "\"></div>";
			
			var evcl = document.getElementById("evcl-" + i);
			evcl.classList.add("col-sm");
			evcl.innerHTML += "<button id=\"evnt-" + i + 
			"\" + onclick=\"press_event(" + i + ")\"></button>";
			
			var evnt = document.getElementById("evnt-" + i);
			evnt.classList.add("btn");
			evnt.classList.add("btn-dark");
			evnt.classList.add("evnt");

			evnt.innerHTML = event_names[i];

			console.log("Loading event " + i + " " + 
				event_names[i]);

		}
		
		console.log("Loaded a total of " + event_names.length + 
			" events!");

		events_loaded = true;
		events_load_lock = false;
		return;
	}).always(function() {
		initialize();
	});
	return;
}

var lang = -1;

function update_states(){

jQuery.getJSON(request_base + "api.php?action=2",
function(states){

	/* Update timer timestamps */
	timer_start = states["start_time"];
	timer_end = states["end_time"];
	
	/* If allowed update alarm status */	
	if(alarm_enabled){
		alarm_on = states["alarm"];
	}
	
	if(multilanguage){
		var lang_new = states["lang"];
	
		if(lang != lang_new && lang != -1){
			window.location.reload(false);
		}
		if(lang == -1){

			document.getElementById("language").selectedIndex = 
				lang_new;
		}
	
		lang = lang_new;
		
		
	}

	var event_states = states["events"];

	/* Update event states */
	for(var i = 0; i < event_states.length; i++){
		var evnt = document.getElementById("evnt-" + i);
		evnt.classList.remove("btn-dark");
		evnt.classList.remove("btn-success");
		evnt.classList.remove("btn-danger");
		evnt.classList.remove("btn-warning");
		evnt.classList.remove("btn-outline-success");
		if(event_reset >= 0){
			switch(event_states[i]){
				default:
				case event_reset:
					evnt.classList.add("btn-danger");
					break;
				case event_executeing:
					evnt.classList.add("btn-warning");
					break;
				case event_executed:
					evnt.classList.add("btn-success");
					break;
				case event_forcefully_executed:
					evnt.classList.add("btn-outline-success");
					break;
			}

		}else{
			if(event_states[i] == 0){
				evnt.classList.add("btn-danger");
			}else{
				evnt.classList.add("btn-success");
			}

		}
	}

});



return;	
}

function load_finals(){

	finals_loaded = true;

	/* Append a hr to all event-rows, appart from the last one */
	var rows = document.getElementById("status").children;
	
	for(var i = 0; i < rows.length - 1; i++){
		rows[i].classList.add("row-delimiter");
	}
	console.log("Finals loaded. Resuming normal operation");
	
	initialize();

	return;
}

var hints_load_lock = false;
function attempt_load_hints(){

	
	jQuery.getJSON(request_base + "api.php?action=8",
	function(hints){
		
		if(hints_loaded || hints_load_lock){
			return;
		}
		hints_load_lock = true;

		for(var evnt_i = 0; evnt_i < hints.length; evnt_i++){
			
			var hints_evnt = hints[evnt_i];
			var evnt_row = document.getElementById("row-" + evnt_i);
			
			evnt_row.innerHTML += "<div id=\"hntcl-" + evnt_i + 
				"\"></div>";
			var hntcl = document.getElementById("hntcl-" + evnt_i);
			hntcl.classList.add("col");
			
			/* Add all buttons to the hint column */
			for(var hnt_i = 0; hnt_i < hints_evnt.length; hnt_i++){
				hntcl.innerHTML += "<button id=\"hnt-" + evnt_i+ 
				"-" + hnt_i + "\" + onclick=\"execute_hint(" + 
				evnt_i + ", " + hnt_i + ")\"></button>";

				var hint = document.getElementById("hnt-" + 
					evnt_i + "-" +hnt_i);
				hint.classList.add("btn");
				hint.classList.add("hnt");
				hint.classList.add("dark");
				if(!(typeof hints_evnt[hnt_i]["content"] != 'undefined' && !hints_evnt[hnt_i]["content"])){
					hint.title =  hints_evnt[hnt_i]["content"];
				}
				hint.innerHTML = hints_evnt[hnt_i]["name"];
				console.log("Loading hint for event " + evnt_i +
				" " + hnt_i);
			}


		}
		/* Create a row at the bottom which shows the current hint 
		 * count
		 */
		var cntrl = document.getElementById("control");
		cntrl.innerHTML += "<div id=\"hint_row\"></div>";
		var hntrw = document.getElementById("hint_row");
		hntrw.classList.add("row");
		hntrw.innerHTML += "<h4>Amount of hints: </h4><h4 id=\"hnt-amnt\">LOADING...</h4>";
		
		hints_loaded = true;
		hints_load_lock = false;

	}).always(function() {
		initialize();
	});
}

var dependencies_load_lock = false;
function attempt_load_dependencies(){

	jQuery.getJSON(request_base + "api.php?action=6",
	function(dependencies){

		if(dependencies_loaded || dependencies_load_lock){
			return;
		}

		dependencies_load_lock = true;
		console.log("Loafing a total of "+dependencies.length+
		" dependencies");

		for(var i = 0; i < dependencies.length; i++){
			var dp = dependencies[i];

			var evnt_id = dp["event_id"];

			var row = document.getElementById("row-" + evnt_id);
			
			/* Create the column if it doesn't already exist */
			if(document.getElementById("depcl-" + evnt_id) == null){
				
				row.innerHTML += "<div id=\"depcl-" + evnt_id 
				+ "\"></div>";
			
				var cl = document.getElementById("depcl-" 
					+ evnt_id);
				cl.classList.add("col-sm");
			}

			var cl = document.getElementById("depcl-" + evnt_id);

			cl.innerHTML += "<button id=\"dep-" + i + 
			"\"></button>";

			var dep = document.getElementById("dep-" + i);
			dep.classList.add("btn");
			dep.classList.add("dep");
			dep.classList.add("btn-dark");
			dep.innerHTML = dp["name"];

		}

		dependencies_loaded = true;	
		dependencies_load_lock = false;
		return;
	
	}).always(function() {
		initialize();
	});

}

var dependency_high_color = "#28A745";
var dependency_low_color = "#DC3545";


function update_dependencies(){

	jQuery.getJSON(request_base + "api.php?action=7",
	function(dependencies){
	
		for(var i = 0; i < dependencies.length; i++){
			var dep = document.getElementById("dep-" + i);
			dep.classList.remove("btn-dark");
	
			var back = "linear-gradient(to right, "+
			dependency_low_color+" "+(100-dependencies[i]*100)+"%, "
			+dependency_high_color+" "+(100-dependencies[i]*100)+
			"%)";
			
			dep.border = "none";
			dep.style.background = back;
			dep.style.color = "white";
		}
	
	});
}

function update_hints(){

	jQuery.getJSON(request_base + "api.php?action=12",
	function(hnt_info){
		if(document.getElementById("hnt-amnt").innerHTML != 
			hnt_info["hint_count"]){
			document.getElementById("hnt-amnt").innerHTML = 
				hnt_info["hint_count"];

		}
		
		
		var hnt_states = hnt_info["hint_states"];
		for(var evnt = 0; evnt < hnt_states.length; evnt++){
			var evnt_hnts = hnt_states[evnt];
			for(var hnt = 0; hnt < evnt_hnts.length; hnt++){
				var exec = evnt_hnts[hnt];
				var hint = document.getElementById("hnt-" + evnt
					+ "-" + hnt);
			
				hint.classList.remove("btn-dark");
				hint.classList.remove("btn-info");
				hint.classList.remove("btn-primary");
				if(exec){
					hint.classList.add("btn-info");
				}else{
					hint.classList.add("btn-primary");

				}
			}
		}
	});
}
