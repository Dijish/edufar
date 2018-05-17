<?php
include 'config/ef_db_config.php';

$user_name = $request->user_name;
$password=md5($request->password);

// Token is created for security purpose
$today=date('Y-m-d H:i:s');
$token=  md5($user_name.$today);

$login_query=  mysqli_query($con,"Select * from ef_users where (u_phone='$user_name' || u_email='$user_name')  && u_password='$password'");

// echo "Select * from ef_users where (u_phone='$user_name' || u_email='$user_name)  && u_password='$password'";

if($row = mysqli_fetch_array($login_query)){
    $u_id=$row['u_id'];
 
    $response['result']='sucess';
    $response['u_id']=$u_id;
    $response['u_name']=$row['u_name'];
    $response['u_token']=$token;
 
    // Update token for security
    $query1=mysqli_query($con,"UPDATE `ef_users` SET `u_token` = '$token' WHERE `u_id` = '$u_id';");

}else{
    $response['result']='error';
}

echo json_encode($response);

?>
 