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
                    <input type="serch" class="serch" placeholder=" goodbook search">
                </label>
            </div>
        </div>
        <div class="head_center">
            <span class="header_center_icon"><i class="fas fa-home fa-2x"></i></span>
            <span class="header_center_icon"><i class="fas fa-user-friends fa-2x"></i></span>
            <span class="header_center_icon"><i class="fas fa-tv fa-2x"></i></span>
            <span class="header_center_icon"><i class="fas fa-users fa-2x"></i></span>
            <span class="header_center_icon"><i class="fas fa-dice-d6 fa-2x"></i></span>
        </div>
        <div class="head_right">
            <span class="header_right_icon"><i class="fas fa-user-circle fa-2x"></i></span>
            <span class="header_right_icon"><i class="fas fa-plus-circle fa-2x"></i></span>
            <span class="header_right_icon"><i class="far fa-comment-dots fa-2x"></i></i></span>
            <span class="header_right_icon"><i class="fas fa-bell fa-2x"></i></span>
            <span class="header_right_icon"><i class="fas fa-caret-down fa-2x"></i></span>
        </div>
    </header>
    <div class="body">
        <div id="wrapper">
            <div id="contents">
                <ul>
                    <li>
                        <div><i class="fas fa-user-circle fa-2x"></i></div>
                        <div>name</div>
                    </li>
                    <li>
                        <div><i class="fas fa-heartbeat fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="far fa-user fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-users fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-video fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="far fa-calendar-alt fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="far fa-clock fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-tag fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fab fa-font-awesome-flag fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-briefcase fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-wallet fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-comment-dots fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="far fa-comment-dots fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-cube fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="far fa-star fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-gamepad fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-bullhorn fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-signal fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-ad fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-ticket-alt fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-users fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="far fa-sun fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fab fa-gratipay fa-2x"></i></div>
                        <div></div>
                    </li>
                    <li>
                        <div><i class="fas fa-solar-panel fa-2x"></i></div>
                        <div></div>
                    </li>
                </ul>
            </div>
        </div>
        <div></div>
        <div></div>
    </div>

</body>

</html>