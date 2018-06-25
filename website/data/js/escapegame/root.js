var debug = true;
var request_base = location.protocol + "//" + window.location.hostname +
        (location.port ? ':'+location.port: '') + '/';
if(debug){
        console.debug("Using " + request_base + " as base for requests.");
}
/* get the game name */
jQuery.getJSON(request_base+"api.php?action=1", function(result){
        document.getElementById('name').innerHTML = result["game"];
});

