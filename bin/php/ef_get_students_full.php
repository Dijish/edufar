<?php
include 'config/ef_db_config.php';

$id = $request->id;

$get_query=mysqli_query($con,"SELECT * FROM `ef_students` WHERE `s_guardian`='$id' ORDER BY `s_updated_date` DESC");

$response["studentList"] = array();
while($row= mysqli_fetch_array($get_query)){
	$product['id']=$row['s_id'];
	$product['name']=$row['s_name'];
    $product['standard']=$row['s_standard'];
    $product['school']=$row['s_school'];
    $product['meedium']=$row['s_meedium'];
	array_push($response["studentList"], $product);
}
echo json_encode($response["studentList"]);
?>