var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

var timer_duration = 0, timer_start = 0, timer_end = 0;

var events_loaded = false, events_received = false;

var dependencies_loaded = false, dependencies_received = false;

var hints_loaded = false;
var hints_enabled = false;

/* Update as available. Initialize where nescessary. Called continuously*/
function update_escape(){
	// Attempt to get info if not existant
	if(document.getElementById('name').innerHTML == "Loading..."){
		jQuery.getJSON(request_base+"api.php?action=1", 
			function(result){
			
			var version = result['version'];

			document.getElementById('footer-text').innerHTML = 
				version[0] + '.' + version[1] + '.' + 
				version[2];
			document.getElementById('name').innerHTML = 
				result['game'];
			
			timer_duration = Number(result['duration']);
			hints_enabled = !(typeof result["hints"] == "undefined" || !result["hints"]);
typeof maybeObject != "undefined"
		});
	}else{ /* The most basic information should be present. continue */
		update_changeables();
		update_timer();
		update_dependencies();
		update_hints();
	}
}


function update_changeables(){
	
	if(!events_loaded){
		jQuery.getJSON(request_base+"api.php?action=3",
			function(result){ 

			if(events_received){
				/* Too slow */
				return;
			}
			events_received = true;
			
			for(var i = 0; i < result.length; i++){
				
				/* Add all events to the div*/

				var ev = result[i];

				document.getElementById('status').innerHTML += 
					"<div class=\"row\" id=\"rw-" + i +"\"><div"
					+ " class=\"col\"><button class=\"evnt btn btn-dark\""+
					"id=\"evnt-" + i + "\" onclick=\""+
					"trigger_event(" + i + ")\">" + 
					ev + "</button></div><div class=\"col\" id=\"dps-" + i + "\"></div></div><hr/>";

			}
			events_loaded = true;

		});
		
	}else{
		jQuery.getJSON(request_base+"api.php?action=2", 
			function(result){
			var events = result['events'];

			for(var i = 0; i < events.length; i++){
				
				/* Add all events to the div*/

				var ev = events[i];
				var button = document.getElementById('evnt-' 
					+ i);

				button.classList.remove("btn-danger");
				button.classList.remove("btn-success");
				button.classList.remove("btn-dark");
				
				if(Number(ev) == 0){
					button.classList.add("btn-danger");

				}else{
					button.classList.add("btn-success");
					
				}

			}
			
			timer_start = result['start_time'];
			timer_end = result['end_time'];
		});
		
	}

}

function update_dependencies(){
	if(!dependencies_loaded){
		jQuery.getJSON(request_base+"api.php?action=6", 
			function(result){

			if(!events_loaded){
				/* Too fast */
				return;
			}

			if(dependencies_received){
				/* Too slow */
				return;
			}
			dependencies_received = true;
			
			for(var i = 0; i < result.length; i++){
				
				/* Add all events to the div*/

				var dp = result[i];
				console.log("Adding dependency " + i);
				document.getElementById('dps-' + dp["event_id"]).innerHTML += 
					"<button class=\"dep btn btn-dark\""+
					"id=\"dep-" + i + "\">" + dp["name"] + "</button>";

			}
			dependencies_loaded = true;

		});
		
	}else{
		jQuery.getJSON(request_base+"api.php?action=7", 
			function(result){

			for(var i = 0; i < result.length; i++){
				
				/* Add all events to the div*/

				var dp = result[i];
				var button = document.getElementById('dep-' 
					+ i);

				button.classList.remove("btn-danger");
				button.classList.remove("btn-success");
				button.classList.remove("btn-dark");
				
				if(Number(dp) == 0){
					button.classList.add("btn-danger");

				}else{
					button.classList.add("btn-success");
					
				}

			}
			
		});
		
	}

	
}

function update_hints(){

	if(!hints_enabled){
		return;
	}

	if(!dependencies_loaded){
		jQuery.getJSON(request_base+"api.php?action=8", 
			function(result){
			
			if(!events_loaded){
				/* Too fast */
				return;
			}

			if(hints_loaded){
				/* Too slow */
				return;
			}
			
			for(var i = 0; i < result.length; i++){
				
				var event_hints = result[i];
				
				if(event_hints.length == 0){
					continue;
				}

				console.log("Adding hint " + i);
				document.getElementById('rw-' + i ).innerHTML += 
					"<div class=\"col\" id=\"hntev-" + i +"\"></div>";
				
				
				for(var ii = 0; ii < event_hints.length; ii++){
					var hnt = event_hints[ii];

					document.getElementById('hntev-' + i ).innerHTML += 
						"<button class=\"dep btn btn-primary\""+
						"onclick=\"execute_hint(" + i  
						+ "," + ii + ")\">" + hnt["name"] + "</button>";
						
						dependencies_loaded = true;

				}

			}

		});
		
	}		
	
}

function execute_hint(event_id, hint_id){

	
        jQuery.getJSON(request_base+"api.php?action=9&event_id=" + event_id+
	"&hint_id="+hint_id,
                function(result){});
	return true;
}

function update_timer(){

	if(Number(timer_start) == 0){
	        document.getElementById('countdown').innerHTML = 
	                "READY";
	}else{

	        var counter = 0;
		if(Number(timer_end) == 0){
			 counter = timer_duration + (timer_start - 
				(Date.now()/1000));
		}else{
			 counter = timer_duration + (timer_start - 
				timer_end);

		}

	
	        if(counter < 0){
	                document.getElementById('countdown').innerHTML = 
	                        "-"+Math.floor(counter / -60) + ":" + 
	                        ("0" + -(Math.floor(counter % 60))).slice(-2);
	        }else{
	                document.getElementById('countdown').innerHTML = 
	                        Math.floor(counter / 60) + ":" + 
	                        ("0" + Math.floor(counter % 
	                        60)).slice(-2);
	        }
	        
	}
}

function trigger_event(event_id){

        jQuery.getJSON(request_base+"api.php?action=4&event=" + event_id,
                function(result){});

}

setInterval(update_escape,500);
