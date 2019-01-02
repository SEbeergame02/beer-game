<?php
require("userModel.php");

$user = $_POST['user'];
$pwd = $_POST['pwd'];
if (login($user, $pwd)==1) {
    header("Location: Home.html" );
} else {
    header("Location: login.php");
}
?>