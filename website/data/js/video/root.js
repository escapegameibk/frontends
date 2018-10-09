var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';

console.debug("Using " + request_base + " as request base");

function update(){
	jQuery.getJSON(request_base + "api.php?action=13&monitor=" + monitor_id,
	function(data) {
		if(data["URL"] != document.getElementById('video_main').src){
			console.log("Received URL doesn't match current one");
			console.log(document.getElementById('video_main').src 
				+ " <--> " + data["URL"]);
			document.getElementById('video_main').src = data["URL"];
		}
		if(data["URL"] == null){

		}
		
		if(document.getElementById('video_main').ended){
			document.getElementById('video_main').play();
		}
		
	}).fail(function() {
			console.log("Failed to get video URL!");
	});
}

setInterval(update,500);

function on_finish(){
	jQuery.getJSON(request_base + "api.php?action=14&monitor=" + monitor_id,
	function(data) {
		return;
	}).always(function() {
		update();
	});
}
