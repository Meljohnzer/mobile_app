<?php
session_start();
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');
?>
<?php
include('conDB.php');
include('check.php');

$user_data = check_login($connect_db);
$postID = $Decode_React_APP_Data['postID'];
$id = $_SESSION['id'];

$select = "SELECT * FROM bookmark WHERE postID = '$postID' AND userID = '$id'";
$exec = mysqli_query($connect_db,$select);
//$row =mysqli_fetch_assoc($exec);
if(!mysqli_num_rows($exec)){
 $query ="INSERT INTO bookmark (postID,userID) VALUES ('$postID','$id')";
 $result = mysqli_query($connect_db,$query);
 if($result){
  echo json_encode("Saved Successfully");
 }else{
  echo json_encode("Unkown Error");
 }
}else{
    echo json_encode("Already Save");
}




  
?>