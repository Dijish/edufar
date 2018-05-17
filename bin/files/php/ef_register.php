<?php
include 'config/ef_db_config.php';

$name = $request->name;
$phone = $request->phone;
$email = $request->email;
$password = md5($request->password);

// Check for duplicate account
$phone_query=  mysqli_query($con,"Select u_id from ef_users where u_phone='$phone'");
$email_query=  mysqli_query($con,"Select u_id from ef_users where u_email='$email'");
$response['result']='error';
$error=0;
if($row = mysqli_fetch_array($phone_query)){
    $response['status']='Phone Already Exist';
    $error++;
}else{
    if($row = mysqli_fetch_array($email_query)){
        $response['status']='Email Already Exist';
        $error++;
    }
}

if($error==0){
    // Insert parent
    $query=  mysqli_query($con,"INSERT INTO `ef_users` (`u_id`, `u_type`,`u_name`, `u_phone`,`u_email`, `u_password`) VALUES (NULL,'PARENT', '$name', '$phone', '$email', '$password');");

    if($query){
        $response['result']='sucess';
        $response['status']='';
    }else{
        $response['status']='Unknown';
    }
}

echo json_encode($response);

?>