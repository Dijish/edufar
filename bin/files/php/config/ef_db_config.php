<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:accept, content-type');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$con=mysqli_connect('localhost','root','');
if(!$con){
    die('not connected');
}
mysqli_select_db($con,'edufar');

?>

