
/* Executed on the press of one of the events, it's parameter is the event id */
function press_event(event_id){
	var btn = document.getElementById("evnt-" + event_id);

	if(btn.classList.contains("btn-success")){
		untrigger_event(event_id);
	}
	if(btn.classList.contains("btn-danger")){
		trigger_event(event_id);
	}
}

function trigger_event(event_id){
	jQuery.getJSON(request_base+"api.php?action=4&event=" + event_id,
		function(result){});
	return;
}

function untrigger_event(event_id){
	if(confirm("You are attempting to reset an event! It may be executed " +
		"automatically again! Please don't do this if you don't know what it means!")){
	
		jQuery.getJSON(request_base+"api.php?action=5&event=" + event_id,
			function(result){});
	
	}
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
        function(result){});
	return;


}

function send_control_update(control, value){

	jQuery.getJSON(request_base+"api.php?action=19&control=" + control+
		"&value="+value,
		function(result){});
	return;

}
