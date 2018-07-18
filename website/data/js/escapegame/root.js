var debug = true;
var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';
var timer_duration = 0;

if(debug){
        console.debug("Using " + request_base + " as base for requests.");
}


/* get all events and display them */
function set_stuff(){

	/* get the nescessary information and add it to it's place*/
	jQuery.getJSON(request_base+"api.php?action=1", function(result){
	        
	        document.getElementById('name').innerHTML = result["game"];
	        console.log("game is called " + result["game"]);
	        timer_duration = result["duration"];
	        var fancy_version = " V" + result['version'][0] + "." + 
	                result['version'][1] + "." + result['version'][2];
	        document.getElementById('footer-text').innerHTML += fancy_version;
	
	});
	jQuery.getJSON(request_base+"api.php?action=3", function(result){
	        
	        console.debug("Received list of " + result.length + 
	                " elements to trigger");
	
		result.forEach(function(element,index) {
	                console.debug("Adding element number " + index + ": " +
	                        element );
			document.getElementById('elements').innerHTML += 
			        "<p><button class=\"event btn btn-dark\" id=\"element-"
	                        + index + "\" href=\"#"+element+
	                        "\" onclick=\"trigger_event(" + index + ")\" >" + 
	                        element + "</button></p>";
		});
	});
}

function update_escape(){

	/* If the host hasn't replied yet, retry contacting it and getting all
	 * nescessary event names. */
        
	if(document.getElementById('name').innerHTML == "Loading..."){
		set_stuff();
	}else{

	        jQuery.getJSON(request_base+"api.php?action=2", function(result){
	                
	                console.log("start time is " + result['start_time']);
	                
	                if(Number(result['start_time']) == 0){
	                        document.getElementById('countdown').innerHTML = 
	                                "READY";
	                }else{
	                        var counter = timer_duration + (result['start_time'] - 
	                                (Date.now()/1000));
	
	                        if(counter < 0){
	                                document.getElementById('countdown').innerHTML = 
	                                        "-"+Math.floor(counter / 60) + ":" + 
	                                        ("0" + Math.floor(counter % 0)).slice(-2);
	                        }else{
	                                document.getElementById('countdown').innerHTML = 
	                                        Math.floor(counter / 60) + ":" + 
	                                        ("0" + Math.floor(counter % 
	                                        60)).slice(-2);
	                        }
	                        
	                }
	                
	                result['events'].forEach(function(element,index){
	                        
	                        /* It's spelt like this for a reason, although i can't
	                         * remember which one.
	                         */ 
	                        var elemnt = 
	                                document.getElementById("element-" + index);
	                        /* Clear element from button classes */
	                        elemnt.classList.remove("btn-danger");
	                        elemnt.classList.remove("btn-success");
	                        elemnt.classList.remove("btn-dark");
	                                
	                        if(Number(element) == 0){
	                                elemnt.classList.add("btn-danger");
	                        }else{
	                                elemnt.classList.add("btn-success");
	                                
	                        }
	                });
	
	        });
	}

}

function trigger_event(event_id){

        jQuery.getJSON(request_base+"api.php?action=4&event=" + event_id, 
                function(result){});

}

function enable_dependencies(){
	
	jQuery.getJSON(request_base+"api.php?action=6", function(result){
	        
	        console.debug("Received list of " + result.length + 
	                " dependencies");
	
		result.forEach(function(element,index) {
	                console.debug("Adding dependency number " + index + ": " +
	                        element );
			document.getElementById('dependencies').innerHTML += 
			        "<p><button class=\"dependency btn btn-dark\" id=\"dependency-"
	                        + index + "\" href=\"#"+element+
	                        "\">" + 
	                        element['name'] + "</button></p>";
		});
	});

	setInterval(update_dependencies,500);
	
	
}

function update_dependencies(){
	jQuery.getJSON(request_base+"api.php?action=7", function(result){
	        result.forEach(function(element,index){
	                        
	                /* It's spelt like this for a reason, although i can't
	                 * remember which one.
	                 */ 
	                var depend = 
	                        document.getElementById("dependency-" + index);
	                /* Clear element from button classes */
	                depend.classList.remove("btn-danger");
	                depend.classList.remove("btn-success");
	                depend.classList.remove("btn-dark");
	                        
	                if(Number(element) == 0){
	                        depemd.classList.add("btn-danger");
	                }else{
	                        depend.classList.add("btn-success");
	                        
	                }
	        });
			

	});
}

enable_dependencies();
setInterval(update_escape,500);
