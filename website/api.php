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

$action = 0;
if(isset($_POST['action'])){
        $action = $_POST['action'];
}else{
        $action = $_GET['action'];
}

$debug = false;

if(!$debug){
        header('Content-Type: application/json');
}

if($debug){
        fwrite($sock,json_encode(["action" => 1]));
        logger(fread($sock,2048));
}

if($action == 4 || $action == 5){
        $event_id = 0;
        if(isset($_POST['event'])){
                $event_id = $_POST['event'];
        }else{
                $event_id = $_GET['event'];
        }
       
        $output = json_encode(["action" => $action, "event" => $event_id]);

}elseif($action == 11){
        
	$lang_id= 0;
        if(isset($_POST['lang'])){
                $lang_id = $_POST['lang'];
        }else{
                $lang_id = $_GET['lang'];
        }
       
        $output = json_encode(["action" => $action, "lang" => $lang_id]);
        
}elseif($action == 9){

        $event_id = 0;
        if(isset($_POST['event_id'])){
                $event_id = $_POST['event_id'];
        }else{
                $event_id = $_GET['event_id'];
        }
        
	$hint_id = 0;
        if(isset($_POST['hint_id'])){
                $hint_id = $_POST['hint_id'];
        }else{
                $hint_id = $_GET['hint_id'];
        }

        $output = json_encode(["action" => $action, "event_id" => $event_id,
		"hint_id" => $hint_id]);

}else{

        $output = json_encode(["action" => $action]);
}

// Open a socket on the default location
$sock = fsockopen("unix://".$socketpath);
if(!$sock){

        logger("UNABLE TO OPEN SOCKET!".$errno." ".$errstr);
        http_response_code(503);
        die(-2);
}

fwrite($sock,$output);
if($action != 4){
        echo fread($sock,20480);
}
fclose($sock);

