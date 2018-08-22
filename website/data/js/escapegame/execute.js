
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

