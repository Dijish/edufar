<?php
include 'config/ef_db_config.php';

$u_id=$request->id;
$u_token=$request->token;
$s_id = $request->s_id;

$response['result']='error';

// Check Token for Security purpose
$token_query=  mysqli_query($con,"Select u_id from ef_users where u_id='$u_id' AND u_token='$u_token';");
if($token_row = mysqli_fetch_array($token_query)){
    // Insert Student
    $delete_query=  mysqli_query($con,"DELETE FROM `ef_students` WHERE `s_id` = '$s_id';");
    if($delete_query){
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