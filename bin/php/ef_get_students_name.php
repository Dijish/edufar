<?php
include 'config/ef_db_config.php';

$id = $request->id;

$get_query=mysqli_query($con,"SELECT `s_name` FROM `ef_students` WHERE `s_guardian`='$id' ORDER BY `s_updated_date` DESC");

$response["name"] = array();
while($row= mysqli_fetch_array($get_query)){
	array_push($response["name"], $row['s_name']);
}
echo json_encode($response["name"]);
?>