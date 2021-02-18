<?php


//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 show user page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();


//================================
// 画面処理
//================================
// 画面表示用データ取得
//================================
// userIDのGETパラメータを取得
$u_id = (!empty($_GET['u_id'])) ? $_GET['u_id'] : '';
// DBからuserデータを取得
$viewData = getUserOne($u_id);
$dbPostData = getMyPostList($u_id);
$dbFormData = getUser($_SESSION['user_id']);
// パラメータに不正な値が入っているかチェック
if (empty($viewData)) {
    error_log('エラー発生:指定ページに不正な値が入りました');
    header("Location:homepage.php"); //トップページへ
}

// // post送信されていた場合
if (!empty($_POST['submit'])) {
    createMsgRoom($viewData);
}

debug('取得したユーザー情報：' . print_r($viewData, true));
debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

?>
<?php
$siteTitle = 'user detail';
require('goodbook_head.php');
?>

<body>
    <?php require("goodbook_header.php") ?>
    <p id="js-show-msg" style="display:none;" class="msg-slide">
        <?php
        echo getSessionFlash('msg_success');
        ?>
    </p>
    <div class="mypage_main">
        <article>
            <div class="main_top_content_overall">
                <div class="main_top_content">
                    <div class="main_top_content main_top_cover_photo_div">
                        <div class="main_top_cover_photo" style="background-image: url(<?php echo sanitize($viewData["backgroundimg"]); ?>);">
                            <div class="cover_photo_change_button">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_top_content main_top_content_user_name_div">
                    <div class="main_top_content main_top_content_user_name">
                        <div class="myIcon_img_div">
                            <?php if (empty($viewData["profpic"])) { ?>
                                <div class="myIcon_img">
                                    <i class="fas fa-user-circle fa-4x"></i>
                                </div>
                            <?php } else { ?>
                                <img class="myIcon_img" src="<?php echo sanitize($viewData["profpic"]) ?>" style="margin-top: 6px; margin-left: 8px;">
                            <?php } ?>
                        </div>
                        <div class="usernamediv">
                            <h1><?php userInfoIndicate($viewData, "username"); ?></h1>
                        </div>
                    </div>
                </div>
                <div class="mypage_border"></div>
                <div class="main_top_content main_top_content_user_info">
                    <div class="main_top_content main_top_content_user_info_inside">
                        <nav class="main_top_content main_top_content_user_info_list1">
                            <div class="info_list"><span>post</span></div>
                            <div class="info_list"><span>data</span></div>
                            <div class="info_list"><span>friends</span></div>
                            <div class="info_list"><span>photos</span></div>
                        </nav>
                        <div class="main_top_content main_top_content_user_info_list2">
                            <form action="" method="post">
                                <div class="edit">
                                    <i class="far fa-comment-dots fa-lg"></i>
                                    <input type="submit" value="message" name="submit" class="" style="background:none; border:none; outline:none; font-size:16px">
                                </div>
                            </form>
                            <div class="info_list"><i class="fas fa-eye"></i></div>
                            <div class="info_list"><i class="fas fa-search"></i></div>
                            <div class="info_list"><i class="fas fa-ellipsis-h"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article>
            <div class="main_lower_part">
                <div class="main_lower_inside">
                    <div class="content_flex">
                        <div class="my_profile">
                            <div class="myprofile_inside">
                                <div class="myprofile_title">
                                    <h2>myprofile</h2>
                                </div>
                                <div class="mypage_border"></div>
                                <div class="profile_list">
                                    <p class="status">name</p>
                                    <p><?php userInfoIndicate($viewData, "username"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">tel</p>
                                    <p><?php userInfoIndicate($viewData, "tel"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">zip code</p>
                                    <p><?php userInfoIndicate($viewData, "zip"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">addr</p>
                                    <p><?php userInfoIndicate($viewData, "addr"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">age</p>
                                    <p><?php userInfoIndicate($viewData, "age"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">email</p>
                                    <p><?php userInfoIndicate($viewData, "email"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">area</p>
                                    <p><?php echo $viewData["area"]; ?></p>
                                </div>
                            </div>
                        </div>
                        <div class="myPost">
                            <div class="share_post">
                                <div class="share_post_inside">
                                    <div class="share_post_content">
                                        <div class="share_icon_div">
                                            <i class="fas fa-user-circle fa-2x"></i>
                                        </div>
                                        <div class="share_feelings">
                                            <h3 class="">Let's share your feeling</h3>
                                        </div>
                                    </div>
                                    <div class="mypage_border"></div>
                                    <div class="share_list">
                                        <div class="share_list">
                                            <div class="">
                                                <i class="fas fa-video fa-lg"></i>
                                            </div>
                                            <p class="">LiveVideo</p>
                                        </div>
                                        <div class="share_list">
                                            <div class="">
                                                <i class="far fa-images fa-lg"></i>
                                            </div>
                                            <p class="">Picture&Video</p>
                                        </div>
                                        <div class="share_list">
                                            <div class="">
                                                <i class="far fa-smile-wink fa-lg"></i>
                                            </div>
                                            <p class="">Activity</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php
                            krsort($dbPostData["data"]);
                            foreach ($dbPostData['data'] as $key => $val) :
                            ?>
                                <section class="main_center_element3">
                                    <div class="icon_img_div">
                                        <a href="mypage.php">
                                            <?php if (empty($viewData["profpic"])) { ?>
                                                <div class="icon_img">
                                                    <i class="fas fa-user-circle fa-3x"></i>
                                                </div>
                                            <?php } else { ?>
                                                <img class="icon_img" src="<?php echo sanitize($viewData["profpic"]) ?>">
                                            <?php } ?>
                                        </a>
                                        <div class="user_name_div">
                                            <div>
                                                <p><?php echo userInfoIndicate($viewData, "username"); ?></p>
                                                <p class="time_line"><?php echo mt_rand(1, 24); ?>hour ago</p>
                                            </div>
                                        </div>
                                        <div class="info_list ellipsis"><i class="fas fa-ellipsis-h"></i></div>
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
                            <?php
                            endforeach;
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <?php
    require("jssrc.php");
    ?>
</body>

</html>