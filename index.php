<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>slider-drisnya</title>
    <script type = "text/JavaScript" src = "js-scripts/libs/slider.js?d=<?php
      echo date("dHis", filemtime('js-scripts/libs/slider.js'));
    ?>"></script>
    <script type = "text/JavaScript" src = "js-scripts/libs/touches.js?d=<?php
      echo date("dHis", filemtime('js-scripts/libs/touches.js'));
    ?>"></script>
    <script type = "text/JavaScript" src = "js-scripts/main.js?d=<?php
      echo date("dHis", filemtime('js-scripts/main.js'));
    ?>"></script>
    <link type="text/css" rel="StyleSheet" href="style/slider.css?d=<?php
			echo date("dHis", filemtime('style/main.css'));
		?>" />
  </head>
  <body>
    <h1>sda</h1>
    <p>asdasdas</p>

    <div id = "slider1"></div>
    <div id = "slider2">
      <img src = "img/1.jpg">
      <img src = "img/2.jpg">
      <img src = "img/3.jpg">
    </div>
    <div id = "slider3"></div>

  </body>
</html>
