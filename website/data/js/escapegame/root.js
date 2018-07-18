var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

var timer_length = 0, timer_status = 0;

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
			
			timer_length = Number(result['duration']);

		});
	}else{ /* The most basic information should be present. continue */
		update_changeables();


	}
}


function update_changeables(){
	
	if(document.getElementById('events').innerHTML == ''){
		jQuery.getJSON(request_base+"api.php?action=3", 
			if(document.getElementById('events').innerHTML != ''){
				/* Too slow */
				return;
			}
			
			for(var i = 0; i < result.length; i++){
				
				/* Add all events to the div*/

				var ev = result[i];

				document.getElementById('events').innerHTML += 
					"<button class=\"evnt btn btn-dark\""+
					"id=\"evnt-" + i + "\" onclick=\""+
					"trigger_event()\">" + ev + "</button>";

			}

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
			
			timer_status = result['start_time'];
		});
		
	}

}

function update_dependencies(){
	if(document.getElementById('dependencies').innerHTML == ''){
		jQuery.getJSON(request_base+"api.php?action=6", 
			function(result){

			if(document.getElementById('dependencies').innerHTML != ''){
				/* Too slow */
				return;
			}
			
			for(var i = 0; i < result.length; i++){
				
				/* Add all events to the div*/

				var dp = result[i];

				document.getElementById('dependencies').innerHTML += 
					"<button class=\"dep btn btn-dark\""+
					"id=\"dep-" + i + "\">" + dp + "</button>";

			}

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

function trigger_event(event_id){

        jQuery.getJSON(request_base+"api.php?action=4&event=" + event_id,
                function(result){});

}

setInterval(update_escape,500);
