var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

/* Last linecount is the up to now presented amount of lines, lastlen is the
 * current log file size. */
var last_linecount = 0, last_len = 0;

function update(){
	jQuery.getJSON(request_base + "api.php?action=15",
	function(data) {
		if(data != last_len){
			last_len = data;
			console.log("Updateing log to newly " + data + 
				" bytes!");
			update_lines();
		}
	
	}).fail(function() {
			console.log("Failed to get new log line count!");
	});
}

update();

setInterval(update,1000);

function update_lines(){

	jQuery.getJSON(request_base + "api.php?action=16",
	function(data) {
		
		var ansi_up = new AnsiUp;
		var splitted = data.split("\n");

		if(splitted.length < last_linecount || last_linecount == 0){
			/* Reset */
			document.getElementById('log').innerHTML = '';
		}

		for(var i = last_linecount; i < splitted.length; i++){
			
			document.getElementById('log').innerHTML += 
				ansi_up.ansi_to_html(splitted[i]) + "\r\n";
			last_linecount ++;

		}

		window.scrollTo(0,document.body.scrollHeight);
		
	
	}).fail(function() {
		console.log("Failed to get log content!");
		last_len = 0;
	});
	

}
