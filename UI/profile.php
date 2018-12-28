<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
    crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="style.css">
  <title>Profile</title>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="Home.html">BeerGame</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">

      </ul>
      <ul class="nav navbar-nav navbar-right">
        <a href="profile.php"><img src="./img/beer.jpg" />&nbsp;</a>
        <a class="nav-link" href="profile.php">Your Name</a>
        <a class="nav-link" href="#">Logout <span class="sr-only">(current)</span></a>
      </ul>
    </div>
  </nav>
</nav>
<div id="content1" class="content">
  <div class="inner">
      <table class="tb1">
      <tr>
          <th><img src="./img/beer.jpg" ></th>
          <td colspan="2"><input type="file" name="photo"></td>
          
        </tr>
        <tr>
          <th>Name</th>
          <td>123</td>
          <td> 
            <?php  echo "<a href='editProfile.php'>修改</a>" ?>
          </td>
        </tr>
        <tr>
          <th>Password</th>
          <td>123</td>
          <td>
              <?php  echo "<a href='editProfile.php'>修改</a>" ?>
          </td>
        </tr>
        <tr>
                <td colspan="3"><button type="submit" name="submit">Click</button></td>
        </tr>
    </table>
  </div>
</div>


</body>

</html>

