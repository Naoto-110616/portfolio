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
    <?php if (!empty($_SESSION['login'])) {;
    } ?>

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
            <div id="main_left_wrapper">
                <div id="contents">
                    <ul>
                        <li class="main_left_icon">
                            <div><i class="fas fa-user-circle fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">name</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-heartbeat fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">covid19 Information Center</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-user fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">Find a friend</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-users fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">group</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-video fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">video</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-calendar-alt fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">event</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="far fa-clock fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">memories</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fas fa-tag fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">saved</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="fab fa-font-awesome-flag fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">page</span></div>
                        </li>
                        <ul class="menu">
                            <li class="menu__item">
                                <a class="main_left_icon menu__item__link js-menu__item__link_open" href="">
                                    <div><i class="fas fa-arrow-circle-down fa-2x"></i></div>
                                    <div class="icon_name_div"><span class="icon_name">more</span></div>
                                </a>
                                <ul class="submenu">
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-briefcase fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">job offer</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-wallet fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">pay</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-comment-dots fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">massenger</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="far fa-comment-dots fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">massenger kids</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-cube fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">Oculus</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="far fa-star fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">favorite</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-gamepad fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">game</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-bullhorn fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">advertising center</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-signal fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">advertising manage</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-ad fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">advertising activity</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-ticket-alt fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">curpon</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-users fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">List of friends</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-cloud-sun fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">wether</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fab fa-gratipay fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">donation campaign</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="fas fa-solar-panel fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">Configuration</span></div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                </div>
            </div>
            </ul>
            <div class="main_center">
                <div class="main_center_position">
                    <div class="main_center_element main_center_element1">
                        <div class="main_icon">
                            <span class="main_center_icon"><i class="fas fa-plus-circle fa-2x"></i></span>
                        </div>
                        <div class="main_center_comment1">
                            <p class="comment_make_stories">Create stories</p>
                            <p>Share photos, videos and messages</p>
                        </div>
                    </div>
                    <div class="main_center_element main_center_element2">
                        <div class="main_center_element2_share1">
                            <div class="main_icon">
                                <span class="main_center_icon"><i class="fas fa-user-circle fa-2x"></i></span>
                            </div>
                            <div class="main_center_comment2">
                                <p class="comment_make_stories">Let's share your feelings</p>
                            </div>
                        </div>
                        <div class="border"></div>
                        <div class="main_center_element2_share2">
                            <div class="live_video">
                                <span class="main_center_icon main_live_video_icon"><i class="fas fa-video fa-lg"></i></span>
                                <p class="live_video_subject">LiveVideo</p>
                            </div>
                            <div class="video">
                                <span class="main_center_icon main_video_icon"><i class="far fa-images fa-lg"></i></span>
                                <p class="video_subject">Picture&Video</p>
                            </div>
                            <div class="activity">
                                <span class="main_center_icon main_activity_icon"><i class="far fa-smile-wink fa-lg"></i></span>
                                <p class="activity_subject">Activity</p>
                            </div>
                        </div>
                    </div>
                    <div class="main_center_element main_center_element3">
                        <div class="icon_img_div">
                            <img class="icon_img" src="img/A1OgtUoT7SL._AC_SL1500_.jpg" alt="">
                            <div class="user_name_div">
                                <p>utada hikaru</p>
                                <p class="time_line">12hour before</p>
                            </div>
                        </div>
                        <div>
                            <img class="main_center_img" src="img/Time.jpg" alt="">
                        </div>
                    </div>
                    <section class="themas">
                        <div class=>
                        </div>
                    </section>
                </div>
            </div>
            <div class="main_right">
                <div class="ad_div">
                    <div class="ad_title">
                        <p>Advertising</p>
                    </div>
                    <div class="ad_subject">
                        <img class="ad_img" src="img/81kDFHRqmYL._AC_SL1500_.jpg" alt="">
                        <div class="ad_subtitle">
                            <p class="ad_album_name">First Love</p>
                            <p class="ad_album_year">1999</p>
                        </div>
                    </div>
                    <div class="ad_subject">
                        <img class="ad_img" src="img/A1OgtUoT7SL._AC_SL1500_.jpg" alt="">
                        <div class="ad_subtitle">
                            <p class="ad_album_name">初恋</p>
                            <p class="ad_album_year">2018</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/homepage.js"></script>
</body>

</html>