var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

var timer_duration = 0, timer_start = 0, timer_end = 0;

var dependencies_loaded = false;

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

		});
	}else{ /* The most basic information should be present. continue */
		update_changeables();
		update_timer();
		update_dependencies();

	}
}


function update_changeables(){
	
	if(document.getElementById('status').innerHTML == ''){
		jQuery.getJSON(request_base+"api.php?action=3",
			function(result){ 

			if(document.getElementById('status').innerHTML != ''){
				/* Too slow */
				return;
			}
			
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

			if(dependencies_loaded){
				/* Too slow */
				return;
			}
			
			for(var i = 0; i < result.length; i++){
				
				/* Add all events to the div*/

				var dp = result[i];
				console.log("Adding dependency " + i);
				document.getElementById('dps-' + dp["event_id"]).innerHTML += 
					"<button class=\"dep btn btn-dark\""+
					"id=\"dep-" + i + "\">" + dp["name"] + "</button>";
					dependencies_loaded = true;

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
