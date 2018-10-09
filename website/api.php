<?php

/* API for the controller software at the escape game ibk
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

include("global.php");

// check for variables
if(!isset($_POST['action']) && !isset($_GET['action'])){
        http_response_code(417);
        die(-1);
}

header('Content-Type: application/json');

$output = json_encode($_GET);

// Open a socket on the default location
$sock = fsockopen("unix://".$socketpath);
if(!$sock){

        logger("UNABLE TO OPEN SOCKET!".$errno." ".$errstr);
        http_response_code(503);
        die(-2);
}

fwrite($sock,$output);

echo stream_get_contents($sock);

fclose($sock);

