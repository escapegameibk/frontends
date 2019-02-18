var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

var last_linecount = 0;

function update(){
	jQuery.getJSON(request_base + "api.php?action=15",
	function(data) {
		if(data != last_linecount){
			last_linecount = data;
			console.log("Updateing log to newly " + data + 
				" lines!");
			update_lines();
		}
	
	}).fail(function() {
			console.log("Failed to get new log line count!");
	});
}

setInterval(update,1000);

function update_lines(){

	jQuery.getJSON(request_base + "api.php?action=16",
	function(data) {
		
		document.getElementById('log').innerHTML = ''; 
		var ansi_up = new AnsiUp;
		data.split("\n").forEach(function(element) {
		
			document.getElementById('log').innerHTML += 
				ansi_up.ansi_to_html(element.replace('\t', 
				"        ")) + "<br/>";

		});

		window.scrollTo(0,document.body.scrollHeight);
		
	
	}).fail(function() {
		console.log("Failed to get log content!");
		last_linecout = 0;
	});
	

}
