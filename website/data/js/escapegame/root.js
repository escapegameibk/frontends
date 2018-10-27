/*
 * General stuff and global variable definitions
 */

var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

var hints_enabled = false;
var alarm_enabled = false;

var game_duration = 0;
var timer_start = 0, timer_end = 0;

var events_loaded = false;
var finals_loaded = false;
var general_loaded = false;
var hints_loaded = false;
var dependencies_loaded = false;

var multilanguage = false;
jQuery.ajaxSetup({ cache: false });

initialize();


/* Function to initialize all structures, load all states and stuff.
 * each function put into here needs to call this function as callback.
 */

function initialize(){

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


	setInterval(update,500);
	update();
}

/* Function to keep page content up-to-date. Called in a given interval 
 */

function update(){
	
	update_states();
	timer_update();
	update_dependencies();
	if(hints_enabled){
		update_hints();
	}
	if(alarm_enabled){
		update_alarm();
	}


	return;
}

