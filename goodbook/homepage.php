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
    <main class="main">
        <div class="main_div">
            <div id="wrapper">
                <div id="contents">
                    <ul>
                        <li class="main_left_icon">
                            <div><i class="fas fa-user-circle fa-2x"></i></div>
                            <div><span>name</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-heartbeat fa-2x"></i></div>
                            <div><span>covid19 Information Center</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-user fa-2x"></i></div>
                            <div><span>Find a friend</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-users fa-2x"></i></div>
                            <div><span>group</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-video fa-2x"></i></div>
                            <div><span>video</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-calendar-alt fa-2x"></i></div>
                            <div><span>event</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-clock fa-2x"></i></div>
                            <div><span>memories</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-tag fa-2x"></i></div>
                            <div><span>saved</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fab fa-font-awesome-flag fa-2x"></i></div>
                            <div><span>page</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-briefcase fa-2x"></i></div>
                            <div><span>jpb offer</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-wallet fa-2x"></i></div>
                            <div><span>pay</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-comment-dots fa-2x"></i></div>
                            <div><span>massenger</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-comment-dots fa-2x"></i></div>
                            <div><span>massenger kids</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-cube fa-2x"></i></div>
                            <div><span>Oculus</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-star fa-2x"></i></div>
                            <div><span>favorite</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-gamepad fa-2x"></i></div>
                            <div><span>game</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-bullhorn fa-2x"></i></div>
                            <div><span>advertising center</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-signal fa-2x"></i></div>
                            <div><span>advertising manage</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-ad fa-2x"></i></div>
                            <div><span>advertising activity</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-ticket-alt fa-2x"></i></div>
                            <div><span>curpon</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-users fa-2x"></i></div>
                            <div><span>List of friends</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-cloud-sun fa-2x"></i></div>
                            <div><span>wether</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fab fa-gratipay fa-2x"></i></div>
                            <div><span>donation campaign</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-solar-panel fa-2x"></i></div>
                            <div><span>Configuration</span></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main_center">
                <div>
                    <div>

                    </div>
                </div>
            </div>
            <div class="main_right">
                <div></div>
            </div>
        </div>
    </main>
</body>

</html>