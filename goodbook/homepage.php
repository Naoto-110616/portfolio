<?php

error_reporting(E_ALL); //E_STRICTレベル以外のエラーを報告する
ini_set('display_errors','On'); //画面にエラーを表示させるか

session_start();

//ログインしてなければ、login画面へ戻す
if(empty($_SESSION['login'])) header("Location:login.php");

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>goodbook</title>
    <link rel="stylesheet" href="css/style_homepage.css">
    <link rel="stylesheet" href="css/reset.css">
</head>

<body>

    <?php if(!empty($_SESSION['login'])){ ?>


    <div class="head_left">
        <div class="icon_div">
            <img class="icon" src="img/Facebook-Logo1.png">
        </div>
        <div class="serch_div">
            <label>
                <input type="serch" class="serch">
            </label>
        </div>
    </div>
    <div class="ul_div">
        <ul class="ul">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>

    <?php }else{ ?>

    <p>ログインしていないと見れません。</p>

    <?php } ?>
</body>

</html>
