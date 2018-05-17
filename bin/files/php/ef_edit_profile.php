<?php
include 'config/ef_db_config.php';

$id=$request->id;
$name = $request->name;
$password = md5($request->password);

$check_query = mysqli_query($con,"Select * from ef_users where `u_id` = '$id' AND `u_password`='$password'");

if($row=mysqli_fetch_array($check_query)){
    $query = mysqli_query($con,"UPDATE `ef_users` SET `u_name` = '$name' WHERE `u_id` = '$id' AND `u_password`='$password';");
    if($query){
        $response['result']='sucess';
        $response['status']='';
    }else{
        $response['result']='error';
        $response['status']='';
    }
}else{
    $response['result']='error';
    $response['status']='Incorrect Password'; 
}




echo json_encode($response);
?>
