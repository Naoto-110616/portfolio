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
                <a href="login.php"><img class="icon" src="img/Facebook-Logo1.png"></a>
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
                            <div><i class="left_icon fas fa-user-circle fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">name</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon fas fa-heartbeat fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">covid19 Information Center</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon far fa-user fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">Find a friend</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon fas fa-users fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">group</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon fas fa-video fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">video</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon far fa-calendar-alt fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">event</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon far fa-clock fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">memories</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon fas fa-tag fa-2x"></i></div>
                            <div class="icon_name_div"><span class="icon_name">saved</span></div>
                        </li>
                        <li class="main_left_icon">
                            <div><i class="left_icon fab fa-font-awesome-flag fa-2x"></i></div>
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
                                        <div><i class="left_icon fas fa-briefcase fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">job offer</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-wallet fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">pay</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-comment-dots fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">massenger</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon far fa-comment-dots fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">massenger kids</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-cube fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">Oculus</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon far fa-star fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">favorite</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-gamepad fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">game</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-bullhorn fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">advertising center</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-signal fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">advertising manage</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-ad fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">advertising activity</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-ticket-alt fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">curpon</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-users fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">List of friends</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-cloud-sun fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">wether</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fab fa-gratipay fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">donation campaign</span></div>
                                    </li>
                                    <li class="main_left_icon submenu__item">
                                        <div><i class="left_icon fas fa-solar-panel fa-2x"></i></div>
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
                            <p class="comment_make_stories1">Create stories</p>
                            <p>Share photos, videos and messages</p>
                        </div>
                    </div>
                    <div class="main_center_element main_center_element2">
                        <div class="main_center_element2_share1">
                            <div class="main_icon2">
                                <span class="main_center_icon"><i class="fas fa-user-circle fa-2x"></i></span>
                                <div class="main_center_comment2">
                                    <p class="comment_make_stories">Let's share your feelings</p>
                                </div>
                            </div>
                        </div>
                        <div class="border"></div>
                        <div class="main_center_element2_share2">
                            <div class="main_center_element2_icon_div">
                                <span class="main_center_icon main_live_video_icon"><i class="fas fa-video fa-lg"></i></span>
                                <p class="icon_button live_video_subject">LiveVideo</p>
                            </div>
                            <div class="main_center_element2_icon_div">
                                <span class="main_center_icon main_video_icon"><i class="far fa-images fa-lg"></i></span>
                                <p class="icon_button video_subject">Picture&Video</p>
                            </div>
                            <div class="main_center_element2_icon_div">
                                <span class="main_center_icon main_activity_icon"><i class="far fa-smile-wink fa-lg"></i></span>
                                <p class="icon_button activity_subject">Activity</p>
                            </div>
                        </div>
                    </div>
                    <div class="main_center_element main_center_element3">
                        <div class="icon_img_div">
                            <img class="icon_img" src="img/homepage_img/A1OgtUoT7SL._AC_SL1500_.jpg" alt="">
                            <div class="user_name_div">
                                <p>utada hikaru</p>
                                <p class="time_line">12hour ago</p>
                            </div>
                        </div>
                        <div>
                            <p class="main_center_comment">ロックダウン中のロンドンで自宅のリビングと作業部屋だけで撮った「Time」のMVやっと<br>
                                公開です！みんな(と言ってもスタッフは2.5人)で直前にテスト受けて。初日は男性スタッフも一人いたんだけど二日目は彼が来れなくなって、私を含む女性３人だけで撤収までがんばった</p>
                        </div>
                        <div class="main_center_mv_div">
                            <iframe class="main_center_mv" src="https://www.youtube.com/embed/1ksh8x9bIPI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="main_center_icon_bottom_div">
                            <div class="main_center_icon_bottom">
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-2.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-1.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <p>143</p>
                                </div>
                            </div>
                            <div class="main_center_comment_share_div">
                                <p>comment</p>
                            </div>
                            <div class="border"></div>
                            <div class="main_center_element2_share2">
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_live_video_icon"><i class="far fa-thumbs-up fa-lg"></i></span>
                                    <p class="icon_button good_subject">good</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_video_icon"><i class="far fa-comment fa-lg"></i></span>
                                    <p class="icon_button comment_subject">comment</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_activity_icon"><i class="fas fa-reply fa-lg"></i></span>
                                    <p class="icon_button share_subject">share</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main_center_element main_center_element3">
                        <div class="icon_img_div">
                            <img class="icon_img" src="img/homepage_img/A1OgtUoT7SL._AC_SL1500_.jpg" alt="">
                            <div class="user_name_div">
                                <p>utada hikaru</p>
                                <p class="time_line">22hour ago</p>
                            </div>
                        </div>
                        <div>
                            <p class="main_center_comment">The music video reveal for "Time" is scheduled at 9 PM (Japan time) on July 28! The premiere will take place on YouTube... so stay tuned!! </p>
                        </div>
                        <div class="main_center_mv_div">
                            <a href="https://www.utadahikaru.jp/"><img class="main_center_img" src="img/homepage_img/Time.jpg" alt=""></a>
                        </div>
                        <div class="main_center_icon_bottom_div">
                            <div class="main_center_icon_bottom">
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-2.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-1.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <p>123</p>
                                </div>
                            </div>
                            <div class="main_center_comment_share_div">
                                <p>comment</p>
                            </div>
                            <div class="border"></div>
                            <div class="main_center_element2_share2">
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_live_video_icon"><i class="far fa-thumbs-up fa-lg"></i></span>
                                    <p class="icon_button good_subject">good</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_video_icon"><i class="far fa-comment fa-lg"></i></span>
                                    <p class="icon_button comment_subject">comment</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_activity_icon"><i class="fas fa-reply fa-lg"></i></span>
                                    <p class="icon_button share_subject">share</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main_center_element main_center_element3">
                        <div class="icon_img_div">
                            <img class="icon_img" src="img/homepage_img/unnamed.jpg" alt="">
                            <div class="user_name_div">
                                <p>ChilledCow</p>
                                <p class="time_line">1day ago</p>
                            </div>
                        </div>
                        <div>
                            <p class="main_center_comment">Thank you for listening, I hope you will have a good time here:)</p>
                        </div>
                        <div class="main_center_mv_div">
                            <iframe class="main_center_mv" src="https://www.youtube.com/embed/5qap5aO4i9A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="main_center_icon_bottom_div">
                            <div class="main_center_icon_bottom">
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-2.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-1.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <p>13</p>
                                </div>
                            </div>
                            <div class="main_center_comment_share_div">
                                <p>comment</p>
                            </div>
                            <div class="border"></div>
                            <div class="main_center_element2_share2">
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_live_video_icon"><i class="far fa-thumbs-up fa-lg"></i></span>
                                    <p class="icon_button good_subject">good</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_video_icon"><i class="far fa-comment fa-lg"></i></span>
                                    <p class="icon_button comment_subject">comment</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_activity_icon"><i class="fas fa-reply fa-lg"></i></span>
                                    <p class="icon_button share_subject">share</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main_center_element main_center_element3">
                        <div class="icon_img_div">
                            <img class="icon_img" src="img/homepage_img/27750828_1871209329618352_2558236254488818924_n.jpg" alt="">
                            <div class="user_name_div">
                                <p>Amazon</p>
                                <p class="time_line">3day ago</p>
                            </div>
                        </div>
                        <div>
                            <p class="main_center_comment">
                                【Amazon 年末の贈り物セール】
                                12月14日まで開催中❗️中小企業の販売商品も多数登場🎁
                                「中小企業を応援 ホリデーギフト特集」では、400社以上の販売事業者様より、クリスマス🎄や年末年始🎍などホリデーシーズンのギフトをご紹介しています。</p>
                        </div>
                        <div class="main_center_img_div">
                            <a href="https://www.amazon.co.jp/"><img class="main_center_img" src="img/homepage_img/safe_image.jpeg" alt=""></a>
                        </div>
                        <div class="main_center_icon_bottom_div">
                            <div class="main_center_icon_bottom">
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-2.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download-1.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <img class="main_center_icon_button" src="img/homepage_img/download.svg" alt="">
                                </div>
                                <div class="main_center_icon_button_div">
                                    <p>123</p>
                                </div>
                            </div>
                            <div class="main_center_comment_share_div">
                                <p>comment</p>
                            </div>
                            <div class="border"></div>
                            <div class="main_center_element2_share2">
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_live_video_icon"><i class="far fa-thumbs-up fa-lg"></i></span>
                                    <p class="icon_button good_subject">good</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_video_icon"><i class="far fa-comment fa-lg"></i></span>
                                    <p class="icon_button comment_subject">comment</p>
                                </div>
                                <div class="main_center_element2_icon_div">
                                    <span class="main_center_icon main_activity_icon"><i class="fas fa-reply fa-lg"></i></span>
                                    <p class="icon_button share_subject">share</p>
                                </div>
                            </div>
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
                        <div class="ad_img_div">
                            <a href="https://www.google.com/search?rlz=1C5CHFA_enJP900JP900&sxsrf=ALeKk03ZpY1gsFNg6wqYADde3Y9WmOWwmA:1608209392169&q=%E5%AE%87%E5%A4%9A%E7%94%B0%E3%83%92%E3%82%AB%E3%83%AB+First+Love&stick=H4sIAAAAAAAAAONgFuLUz9U3MMw2LsxS4oIwky2rCrWEfEuLM5Mdi0oyi0tC8h1zkkpzF7HKPl3X_nTJrOdTNjxunvS4afXj5tUKbplFxSUKPvllqTtYGQFDmp0DUAAAAA&sa=X&ved=2ahUKEwifqK3shtXtAhWRGqYKHd2zA4MQxA0wHXoECBEQBw&biw=1680&bih=939"><img class="ad_img" src="img/homepage_img/81kDFHRqmYL._AC_SL1500_.jpg" alt=""></a>
                        </div>
                        <div class="ad_subtitle">
                            <p class="ad_album_name">First Love</p>
                            <p class="ad_album_year">1999</p>
                        </div>
                    </div>
                    <div class="ad_subject">
                        <div class="ad_img_div">
                            <a href="https://www.google.com/search?sa=X&rlz=1C5CHFA_enJP900JP900&biw=1680&bih=939&sxsrf=ALeKk01ra0Rl6IMM_evvpYkyOo8ImhmLGg:1608209396637&q=%E5%AE%87%E5%A4%9A%E7%94%B0%E3%83%92%E3%82%AB%E3%83%AB+%E5%88%9D%E6%81%8B&stick=H4sIAAAAAAAAAAFPALD_CAMSCS9tLzAxazNxaiINL2cvMTFmNXRnZ195cyoSTXVzaWNBcnRpc3RUb0FsYnVtogUZ5a6H5aSa55Sw44OS44Kr44OrIOWIneaBi7gFAbhKTfxPAAAA&npsic=0&ved=2ahUKEwjD8b3uhtXtAhXhwosBHfVgD9UQ-BYwGXoECAYQPw&tbs=kac:1,kac_so:0"><img class="ad_img" src="img/homepage_img/A1OgtUoT7SL._AC_SL1500_.jpg" alt=""></a>
                        </div>
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