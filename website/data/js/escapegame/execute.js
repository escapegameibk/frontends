
function trigger_event(event_id){
	jQuery.getJSON(request_base+"api.php?action=4&event=" + event_id,
		function(result){});
	return;
}

function execute_hint(event_id, hint_id){

	
        jQuery.getJSON(request_base+"api.php?action=9&event_id=" + event_id+
	"&hint_id="+hint_id,
                function(result){});
	return;
}

function update_language(){

	var selector = document.getElementById("language");
	var lang_id = selector.options[selector.selectedIndex].value;
	console.log("Upating language to " + lang_id );

	jQuery.getJSON(request_base+"api.php?action=11&lang=" + lang_id,
        function(result){}).always(function() {
		window.location.reload(false); 
		
	});
	return;


}

