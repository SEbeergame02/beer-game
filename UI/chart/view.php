<?php
require ("??.php");
?>
<html>
<body>
<?php
if (!isset($_SESSION['loginID'])) {
    
} else {
	echo 'welcome '.$_SESSION['loginID'].'<br>';
    echo "<form action='Control.php' method='post'>
            <input type='submit' name='act' value='logout'/>
			</form>
    ";
}
echo "<form action='??.php' method='post'>
        <input type='submit' value='New name='act' id='new'/>
    </form>
    <br>";
for ($i = 1; $i <= checkTeam(); $i++) {
	echo"<form action='??.php' method='post'>
        Team $i:
        <input type='button' value='Factory' name='act'/>
        <input type='button' value='Distrubutor' name='act'/>
        <input type='button' value='saler' name='act'/>
        <input type='button' value='Retailer' name='act'/>
	</form>";
}
?>
</body>
</html>