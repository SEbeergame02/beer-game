<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Login</title>
<link rel="stylesheet" href="css/style.css" />
</head>
<body>
<?php
	require('dbconfig.php');
    if (isset($_POST['loginID'])){
		
		$loginID = stripslashes($_REQUEST['loginID']); // removes backslashes
		$loginID = mysqli_real_escape_string($db,$loginID); //escapes special characters in a string
		$pwd = stripslashes($_REQUEST['pwd']);
		$pwd = mysqli_real_escape_string($db,$pwd);
		
        $query = "SELECT * FROM `user` WHERE loginID='$loginID' and pwd='$pwd'";
		$result = mysqli_query($db,$query) or die(mysql_error());
		$rows = mysqli_num_rows($result);
        if($rows==1){
			$_SESSION['loginID'] = $loginID;
			header("Location: index.php"); // Redirect user to index.php
            }else{
				echo "<div class='form'><h3>loginID/pwd is incorrect.</h3><br/>Click here to <a href='login.php'>Login</a></div>";
				}
    }else{
?>
<div class="form">
<h1>LogIn</h1>
<form action="" method="post" name="login">
<input type="text" name="loginID" placeholder="LoginID" required />
<input type="pwd" name="pwd" placeholder="Password" required /><br>
<input name="submit" type="submit" value="Login" />
</form>
<p>Not registered yet? <a href='registration.php'>Register Here</a></p>
<?php } ?>


</body>
</html>