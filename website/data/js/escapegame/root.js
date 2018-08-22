/*
 * General stuff and global variable definitions
 */

var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

var hints_enabled = false;

var game_duration = 0;
var timer_start = 0, timer_end = 0;

var events_loaded = false;
var finals_loaded = false;
var general_loaded = false;
var hints_loaded = false;
var dependencies_loaded = false;

function update(){
	
	/* Load data from the server */
	if(!general_loaded){
		attempt_load_general();
		return;
	}

	if(!events_loaded){
		attempt_load_events();
		return;
	}

	if(!dependencies_loaded){
		attempt_load_dependencies();
		return;	
	}
	
	if(hints_enabled && !hints_loaded){
		attempt_load_hints();
		return;
	}

	if(!finals_loaded){
		load_finals();
		return;
	}

	/* Finished loading. Now let's keep everything up to date */

	update_states();
	timer_update();
	update_dependencies();


	return;
}

setInterval(update,500);
