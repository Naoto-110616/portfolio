<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

session_start();

if (empty($_SESSION['login'])) {
    header("Location:login.php");
}

?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>goodbook</title>
    <link rel="stylesheet" href="css/style_homepage.css">
    <link rel="stylesheet" href="css/reset.css">
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
</head>

<body>
    <?php if (!empty($_SESSION['login'])) {
    ;
}?>

    <header class="header">
        <div class="head_left">
            <div class="icon_div">
                <img class="icon" src="img/Facebook-Logo1.png">
            </div>
            <div class="serch_div">
                <label>
                    <input type="serch" class="serch" placeholder="goodbook search">
                </label>
            </div>
        </div>
        <div class="ul_div">
            <ul class="header_ul">
                <li class="header_icon"><i class="fas fa-home fa-2x"></i></li>
                <li class="header_icon"><i class=" fas fa-user-friends fa-2x"></i></li>
                <li class="header_icon"><i class=" fas fa-tv fa-2x"></i></li>
                <li class="header_icon"><i class=" fas fa-users fa-2x"></i></li>
                <li class="header_icon"><i class=" fas fa-dice-d6 fa-2x"></i></li>
            </ul>
        </div>
        <div class="head_right">
            <span class="header_right_icon"><i class="fas fa-user-circle fa-2x"></i></span>
            <span class="header_right_icon"><i class="fas fa-plus-circle fa-2x"></i></span>
            <span class="header_right_icon"><i class="fas fa-comment-medical fa-2x"></i></span>
            <span class="header_right_icon"><i class="fas fa-bell fa-2x"></i></span>
            <span class="header_right_icon"><i class="fas fa-caret-down fa-2x"></i></span>
        </div>
    </header>

</body>

</html>