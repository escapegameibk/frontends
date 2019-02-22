<?php

/* API for the escape game system's host
 * Copyright © 2018 tyrolyean

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

$socketpath = "/var/run/escape/socket";

header('Content-Type: application/json');

// check for variables
if(!isset($_POST['action']) && !isset($_GET['action'])){
        http_response_code(412);
        die("{\"error\" : \"no action\"}");
}


$output = json_encode($_GET);

// Open a socket on the default location
$sock = fsockopen("unix://".$socketpath);

if(!$sock){

	/* Unavailable */
        http_response_code(503);
        die("{\"error\" : \"unavailable\"}");
}

fwrite($sock,$output);

echo stream_get_contents($sock);

fclose($sock);

