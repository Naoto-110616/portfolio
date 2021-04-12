<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　home page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

auth();

//================================
// 画面処理
//================================
// POST送信時処理
//================================
if ($_POST["postButton"]) {
    debug("postButtonが押されました");
    if (!empty($_POST)) {
        debug('POST送信があります。');
        debug('POST情報：' . print_r($_POST, true));
        debug('FILE情報：' . print_r($_FILES, true));

        //変数にユーザー情報を代入
        $comment = $_POST['comment'];
        //画像をアップロードし、パスを格納
        $pic1 = (!empty($_FILES['pic1'])) ? uploadImg($_FILES['pic1'], 'pic1') : '';

        validRequired($comment, 'comment');
        // 更新の場合はDBの情報と入力情報が異なる場合にバリデーションを行う
        if (empty($dbFormData)) {
            validMaxLen($comment, 'comment', 255);
        } else {
            if ($dbFormData['comment'] !== $comment) {
                //最大文字数チェック
                validMaxLen($comment, 'comment', 255);
            }
        }
        if (empty($err_msg)) {
            debug('バリデーションOKです。');
            createOrEditPost($edit_flg, $comment, $pic1, $p_id);
        }
    }
}

// 画面表示用データ取得
//================================
// DBからpostデータを取得
$dbPostData = getPost($u_id);
$dbFormData = getUser($_SESSION['user_id']);
debug('取得したユーザー情報：' . print_r($dbFormData, true));
debug('取得したユーザー情報：' . print_r($dbPostData, true));

debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "homepage";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php") ?>
    <article class="main">
        <div class="main_div">
            <nav>
                <section id="main_left_wrapper">
                    <div id="contents">
                        <ul>
                            <a href="mypage.php">
                                <li class="main_left_icon my_profile_left_menu">
                                    <?php if (empty($dbFormData["profpic"])) { ?>
                                        <img class="icon_img" src="./img/not_set_icon.png">
                                        <div class="icon_name_div"><span class="icon_name"><?php echo sanitize($dbFormData["username"]); ?></span></div>
                                    <?php } else { ?>
                                        <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>">
                                        <div class="icon_name_div"><span class="icon_name"><?php echo sanitize($dbFormData["username"]); ?></span></div>
                                    <?php } ?>
                                </li>
                            </a>
                            <li class="main_left_icon">
                                <div><i class="left_icon fas fa-heartbeat fa-2x"></i></div>
                                <div class="icon_name_div"><span class="icon_name">covid19 Information Center</span></div>
                            </li>
                            <a href="friends.php">
                                <li class="main_left_icon">
                                    <div><i class="left_icon far fa-user fa-2x"></i></div>
                                    <div class="icon_name_div"><span class="icon_name">Find a friend</span></div>
                                </li>
                            </a>
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
                                <li class="menu_item">
                                    <div class="main_left_icon menu__item__link js-menu__item__link_open">
                                        <div><i class="fas fa-arrow-circle-down fa-2x"></i></div>
                                        <div class="icon_name_div"><span class="icon_name">more</span></div>
                                    </div>
                                    <ul class="left_submenu">
                                        <li class="main_left_icon submenu__item">
                                            <div><i class="left_icon fas fa-briefcase fa-2x"></i></div>
                                            <div class="icon_name_div"><span class="icon_name">job offer</span></div>
                                        </li>
                                        <li class="main_left_icon submenu__item">
                                            <div><i class="left_icon fas fa-wallet fa-2x"></i></div>
                                            <div class="icon_name_div"><span class="icon_name">pay</span></div>
                                        </li>
                                        <a href="msgRoomList.php">
                                            <li class="main_left_icon submenu__item">
                                                <div><i class="left_icon fas fa-comment-dots fa-2x"></i></div>
                                                <div class="icon_name_div"><span class="icon_name">massenger</span></div>
                                            </li>
                                        </a>
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
                                        <a href="friendsList.php<?php echo "?u_id=" . $_SESSION["user_id"] ?>">
                                            <li class="main_left_icon submenu__item">
                                                <div><i class="fas fa-user-friends fa-2x"></i></div>
                                                <div class="icon_name_div"><span class="icon_name">List of friends</span></div>
                                            </li>
                                        </a>
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
                        </ul>
                    </div>
                </section>
            </nav>
            <div class="main_center">
                <div class="main_center_position">
                    <section class="main_center_element main_center_element1">
                        <div class="main_icon">
                            <span class="main_center_icon"><i class="fas fa-plus-circle fa-2x"></i></span>
                        </div>
                        <div class="main_center_comment1">
                            <p class="comment_make_stories1">Create a story</p>
                            <p>Share photos, videos and messages</p>
                        </div>
                    </section>
                    <section class="main_center_element main_center_element2">
                        <div class="main_center_element2_share1">
                            <div class="main_icon2">
                                <a href="mypage.php">
                                    <?php if (empty($dbFormData["profpic"])) { ?>
                                        <span class="main_center_icon">
                                            <img class="icon_img" src="./img/not_set_icon.png">
                                        </span>
                                    <?php } else { ?>
                                        <span class="main_center_icon">
                                            <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>">
                                        </span>
                                    <?php } ?>
                                </a>
                                <div class="main_center_comment2">
                                    <h3>What's on your mind, <?php echo $dbFormData["username"]; ?>?</h3>
                                </div>
                            </div>
                        </div>
                        <div class="border"></div>
                        <div class="main_center_element2_share2">
                            <div class="main_center_element2_icon_div">
                                <i class="fas fa-video fa-lg btn_action"></i>
                                <p class="icon_button live_video_subject">LiveVideo</p>
                            </div>
                            <div class="main_center_element2_icon_div">
                                <i class="far fa-images fa-lg btn_action"></i>
                                <p class="icon_button video_subject">Picture&Video</p>
                            </div>
                            <div class="main_center_element2_icon_div">
                                <i class="far fa-smile-wink fa-lg btn_action"></i>
                                <p class="icon_button activity_subject">Activity</p>
                            </div>
                        </div>
                        <?php require("post.php"); ?>
                </div>
            </div>
            <div class="main_right">
                <div class="ad_div">
                    <div class="ad_title">
                        <p>Advertising</p>
                    </div>
                    <section class="ad_subject">
                        <div class="ad_img_div">
                            <a href="https://www.google.com/search?rlz=1C5CHFA_enJP900JP900&sxsrf=ALeKk03ZpY1gsFNg6wqYADde3Y9WmOWwmA:1608209392169&q=%E5%AE%87%E5%A4%9A%E7%94%B0%E3%83%92%E3%82%AB%E3%83%AB+First+Love&stick=H4sIAAAAAAAAAONgFuLUz9U3MMw2LsxS4oIwky2rCrWEfEuLM5Mdi0oyi0tC8h1zkkpzF7HKPl3X_nTJrOdTNjxunvS4afXj5tUKbplFxSUKPvllqTtYGQFDmp0DUAAAAA&sa=X&ved=2ahUKEwifqK3shtXtAhWRGqYKHd2zA4MQxA0wHXoECBEQBw&biw=1680&bih=939">
                                <img class="ad_img" src="img/homepage_img/81kDFHRqmYL._AC_SL1500_.jpg" alt="utadahikaru_FirstLove_album">
                            </a>
                        </div>
                        <div class="ad_subtitle">
                            <h3 class="ad_album_name">First Love</h3>
                            <h3 class="ad_album_year">1999</h3>
                        </div>
                    </section>
                    <section class="ad_subject">
                        <div class="ad_img_div">
                            <a href="https://www.google.com/search?sa=X&rlz=1C5CHFA_enJP900JP900&biw=1680&bih=939&sxsrf=ALeKk01ra0Rl6IMM_evvpYkyOo8ImhmLGg:1608209396637&q=%E5%AE%87%E5%A4%9A%E7%94%B0%E3%83%92%E3%82%AB%E3%83%AB+%E5%88%9D%E6%81%8B&stick=H4sIAAAAAAAAAAFPALD_CAMSCS9tLzAxazNxaiINL2cvMTFmNXRnZ195cyoSTXVzaWNBcnRpc3RUb0FsYnVtogUZ5a6H5aSa55Sw44OS44Kr44OrIOWIneaBi7gFAbhKTfxPAAAA&npsic=0&ved=2ahUKEwjD8b3uhtXtAhXhwosBHfVgD9UQ-BYwGXoECAYQPw&tbs=kac:1,kac_so:0">
                                <img class="ad_img" src="img/homepage_img/A1OgtUoT7SL._AC_SL1500_.jpg" alt="utadahikaru_初恋_album">
                            </a>
                        </div>
                        <div class="ad_subtitle">
                            <h3 class="ad_album_name">初恋</h3>
                            <h3 class="ad_album_year">2018</h3>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </article>
    <article class="modalwindow">
        <div class="modalwindow_screen_overall_4">
            <div class="modalwindow_form_div">
                <div class="modalwindow_form">
                    <div class="inside">
                        <form action="" method="post" class="edit_form" enctype="multipart/form-data">
                            <div class="modalwindow_form_title">
                                <div class="edit_title">
                                    <h1>create a post</h1>
                                </div>
                                <div class="x-circle4">
                                    <i class="far fa-times-circle fa-2x"></i>
                                </div>
                            </div>
                            <div class="mypage_border"></div>
                            <div class="edit_form_div">
                            </div>
                            <label class="<?php echo getErrMsglabel("comment"); ?>">
                                <textarea class="posttextarea" name="comment" id="js-count" cols="30" rows="4" placeholder="comment"><?php echo getFormData('comment'); ?></textarea>
                            </label>
                            <p class="counter-text"><span id="js-count-view">0</span>/255</p>
                            <div class="area-msg">
                                <?php
                                echo getErrMsg("comment");
                                ?>
                            </div>
                            <div>
                                <div class="imgDrop-container">
                                    <label class="area-drop <?php getErrMsglabel("pic1") ?>">
                                        <input type="hidden" name="MAX_FILE_SIZE" value="3145728">
                                        <input type="file" name="pic1" class="input-file" style="display:none;">
                                        <img src="<?php echo getFormData('pic1'); ?>" alt="" class="prev-img" style="<?php if (empty(getFormData('pic1'))) echo 'display:none;' ?> margin:10px 0px 0px ">
                                        <div class="imgUpIcon">
                                            <i class="far fa-images fa-lg"></i>
                                        </div>
                                    </label>
                                    <div class="area-msg">
                                        <?php;
                                    getErrMsg("pic1");
                                    ?>
                                    </div>
                                </div>
                            </div>
                            <label>
                                <input class="modalwindow_submit" type="submit" value="<?php echo (!$edit_flg) ? 'post' : 'edit'; ?>" name="postButton">
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </article>
    <?php
    require("jssrc.php");
    ?>
</body>

</html>