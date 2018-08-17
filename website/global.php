<?php
/* A website for the escape game innsbruck
 * Copyright © 2018 tyrolyean
 * 
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

$outsourcing="/data";

function generate_links(){

        global $outsourcing;
        return "
                <link rel=\"stylesheet\" href=\"".$outsourcing."/css/bootstrap/bootstrap.min.css\">
                <link rel=\"stylesheet\" href=\"".$outsourcing."/css/custom/footer.css\">
                <link rel=\"stylesheet\" href=\"".$outsourcing."/css/custom/navbar.css\">
";

}

function generate_footer(){


        return "
                 <footer class=\"footer footer-static bg-dar bg-dark\">
                        <div class=\"inner\">
                                <span id=\"footer-text\" > INTERNAL USAGE GRANTED</span>
                        </div>
                </footer>
";
}


$socketpath = "/var/run/escape/socket";

$DEBUG = true;
$lang = "en";



// echos a message with a specific prefix
function logger($msg){
        global $DEBUG;
        if($DEBUG){

                printf("[%f] %s\n",microtime(true), $msg);
                flush();
        }
        return;
}

