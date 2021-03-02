<?php
//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 post list　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

// user data 取得
$dbFormData = getUser($_SESSION["user_id"]);
$dbPostData = getMyPostList($_SESSION["user_id"]);
debug(print_r($dbPostData, true));
?>

<?php
$siteTitle = 'post list';
require('goodbook_head.php');
?>

<body>
    <?php require("goodbook_header.php") ?>
    <div>
        <article>
            <div class="main">
                <div class="inside_padding" style="padding: 2% 17%;">
                    <div style="width: 900px; margin: 0 auto; font-size: 17px;">
                        <div>
                            <h1>My posts</h1>
                        </div>
                        <?php if (!empty($dbPostData["data"])) {
                            krsort($dbPostData["data"]);
                            foreach ($dbPostData['data'] as $key => $val) :
                        ?>
                                <div class="myPost">
                                    <section class="main_center_element3">
                                        <div class="icon_img_div">
                                            <a href="mypage.php">
                                                <?php if (empty($dbFormData["profpic"])) { ?>
                                                    <div class="icon_img">
                                                        <i class="fas fa-user-circle fa-3x"></i>
                                                    </div>
                                                <?php } else { ?>
                                                    <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>">
                                                <?php } ?>
                                            </a>
                                            <div class="user_name_div">
                                                <div>
                                                    <p><?php echo userInfoIndicate($dbFormData, "username"); ?></p>
                                                    <p class="time_line"><?php echo mt_rand(1, 24); ?>hour ago</p>
                                                </div>
                                            </div>
                                            <div class="info_list ellipsis"><i class="fas fa-ellipsis-h"></i></div>
                                            <div class="accountMenu">
                                                <div class="myprofile">
                                                    <a class="account_menu_a to_mypage" href="mypage.php">
                                                        <?php if (empty($dbFormData["profpic"])) { ?>
                                                            <div class="myicon">
                                                                <i class="fas fa-user-circle fa-4x"></i>
                                                            </div>
                                                        <?php } else { ?>
                                                            <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>" style="margin-top: 6px; margin-left: 8px;">
                                                        <?php } ?>
                                                        <div class=" myInfo">
                                                            <p><?php userInfoIndicate($dbFormData, "username"); ?></p>
                                                            <p> <?php notLoggedMsg("View my profile", "Please login"); ?></p>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="accountMenuBorder"></div>
                                                <div class="feedback">
                                                    <div class="feedbackIcon">
                                                        <i class="far fa-comment-alt fa-2x"></i>
                                                    </div>
                                                    <div class="feedback_comment">
                                                        <p>Send feedback</p>
                                                        <p>View my profile</p>
                                                    </div>
                                                </div>
                                                <div class="accountMenuBorder"></div>
                                                <div>
                                                    <div class="Menu_element setting">
                                                        <div class="Menu_elementIcon">
                                                            <i class="fas fa-cog fa-2x"></i>
                                                        </div>
                                                        <div class="Menu_element_comment">
                                                            <p>setting</p>
                                                        </div>
                                                    </div>
                                                    <div class="Menu_element help_support">
                                                        <a class="account_menu_a to_withdrawpage" href="withdrawpage.php">
                                                            <div class="Menu_elementIcon">
                                                                <i class="far fa-question-circle fa-2x"></i>
                                                            </div>
                                                            <div class="Menu_element_comment">
                                                                <p>withdraw</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="Menu_element darkMode">
                                                        <div class="Menu_elementIcon">
                                                            <i class="fas fa-adjust fa-2x"></i>
                                                        </div>
                                                        <div class="Menu_element_comment">
                                                            <p>dark mode off</p>
                                                        </div>
                                                    </div>
                                                    <a class="logout" href="logout.php">
                                                        <div class="Menu_element logout">
                                                            <div class="Menu_elementIcon">
                                                                <i class="fas fa-door-open fa-2x"></i>
                                                            </div>
                                                            <div class="Menu_element_comment">
                                                                <p><?php notLoggedMsg("logout", "login") ?></p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="main_center_comment"><?php echo sanitize($val["comment"]); ?></p>
                                        </div>
                                        <div class="main_center_mv_div">
                                            <img class="main_center_img" src="<?php echo sanitize($val['pic1']); ?>" alt="">
                                        </div>
                                        <div class="main_center_icon_bottom_div">
                                            <div class="main_center_icon_bottom">
                                                <div class="main_center_icon_button_div">
                                                    <img class="main_center_icon_button" src="img/homepage_img/download-2.svg" alt="good_button">
                                                </div>
                                                <div class="main_center_icon_button_div">
                                                    <img class="main_center_icon_button" src="img/homepage_img/download-1.svg" alt="love_button">
                                                </div>
                                                <div class="main_center_icon_button_div">
                                                    <img class="main_center_icon_button" src="img/homepage_img/download.svg" alt="face_button">
                                                </div>
                                                <div class="main_center_icon_button_div">
                                                    <p><?php echo mt_rand(0, 1000); ?></p>
                                                </div>
                                            </div>
                                            <div class="main_center_comment_share_div">
                                                <p>shere <?php echo mt_rand(0, 100); ?></p>
                                            </div>
                                            <div class="border"></div>
                                            <div class="main_center_element2_share2">
                                                <div class="main_center_element2_icon_div">
                                                    <div class="main_center_icon main_live_video_icon">
                                                        <i class="far fa-thumbs-up fa-lg"></i>
                                                    </div>
                                                    <p class="icon_button good_subject">good</p>
                                                </div>
                                                <div class="main_center_element2_icon_div">
                                                    <div class="main_center_icon main_video_icon">
                                                        <i class="far fa-comment fa-lg"></i>
                                                    </div>
                                                    <p class="icon_button comment_subject">comment</p>
                                                </div>
                                                <div class="main_center_element2_icon_div">
                                                    <div class="main_center_icon main_activity_icon">
                                                        <i class="fas fa-reply fa-lg"></i>
                                                    </div>
                                                    <p class="icon_button share_subject">share</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            <?php
                            endforeach;
                        } else {
                            ?>
                            <div class="msgRoom">
                                <div class="createMsg">
                                    <a href="homepage.php">
                                        <p>postはありません、投稿しましょう。</p>
                                    </a>
                                </div>
                            </div>
                        <?php }
                        ?>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <?php require("jssrc.php"); ?>
</body>