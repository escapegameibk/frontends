var debug = true;
var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';
var timer_duration = 0;

if(debug){
        console.debug("Using " + request_base + " as base for requests.");
}

/* get the nescessary information and add it to it's place*/
jQuery.getJSON(request_base+"api.php?action=1", function(result){
        
        document.getElementById('name').innerHTML = result["game"];
        timer_duration = result["duration"];

});

/* get a count of all elements */
jQuery.getJSON(request_base+"api.php?action=3", function(result){
        
        console.debug("Received list of " + result.length + 
                " elements to trigger");

	result.forEach(function(element,index) {
                console.debug("Adding element number " + index + ": " +
                        element['name'] );
		document.getElementById('elements').innerHTML += 
		        "<p><button class=\"event btn btn-dark\" id=\"" + 
                        index + "\" href=\"#"+element['name']+"\">" + 
                        element["name"] + "</button></p>";
	});
});

function update_escape(){
        
        jQuery.getJSON(request_base+"api.php?action=2", function(result){
                if(result['start_time'] != 0){
                        document.getElementbyId('countdown').innerHTML = 
                                "READY";
                }else{
                        var counter = timer_duration + (result['start_time'] - 
                                (Date.now()/1000));
                        
                }
                document.getElementById('name').innerHTML = result["game"];

        });
}
update_escape();
