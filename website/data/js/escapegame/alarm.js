
var alarm_original_body_color;
var color_toggle = false;
var alarm_on = false;
var alarm_color = "red";

function update_alarm(){
	
	if(alarm_on || color_toggle){
		
		if(color_toggle){
			document.body.style.background = alarm_original_body_color;
		}else{
			alarm_original_body_color = document.body.style.background;
			document.body.style.background = alarm_color;
		}

		color_toggle = !color_toggle;

	}
	
	return;
}

function load_alarm(){
	var cntrl = document.getElementById("control");
	cntrl.innerHTML += "<div id=\"alarm_row\"></div>";

	var alarmrow = document.getElementById("alarm_row");
	alarmrow.classList.add("row");
	alarmrow.innerHTML = "<button id=\"rel_alarm\" onclick=\"release_alarm()\"></button>";

	var alarm_release = document.getElementById("rel_alarm");
	alarm_release.classList.add("btn");
	alarm_release.classList.add("btn-block");
	alarm_release.classList.add("btn-lg");
	alarm_release.classList.add("btn-warning");
	alarm_release.innerHTML = "Release Alarm";

	return;
}

function release_alarm(){
	
        jQuery.getJSON(request_base+"api.php?action=10",
                function(result){});
	return;

}
