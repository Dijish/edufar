<?php
include 'config/ef_db_config.php';

$u_id=$request->id;
$u_token=$request->token;
$s_id=$request->s_id;
$s_name = $request->name;
$s_standard = $request->standard;
$s_school = $request->school;
$s_meedium = $request->meedium;

$response['result']='error';
date_default_timezone_set("Asia/Kolkata");
$today = date("Y-m-d H:i:s"); 

// Check Token for Security purpose
$token_query=  mysqli_query($con,"Select u_id from ef_users where u_id='$u_id' AND u_token='$u_token';");
if($token_row = mysqli_fetch_array($token_query)){
    // Edit Student
    $edit_query=  mysqli_query($con,"UPDATE `ef_students` SET `s_name` = '$s_name',`s_standard` = '$s_standard',`s_school` = '$s_school',`s_meedium` = '$s_meedium',`s_updated_date`='$today' WHERE `s_id` = '$s_id';");
    if($edit_query){
        $response['result']='sucess';
        $response['status']='';
    }else{
        $response['status']='Unknown';
    }
}else{
    $response['status']='Token Mismatch !'; 
}

echo json_encode($response);

?>