<?php


//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 user detail page　');
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
$dbPostData = getPost($u_id);
$dbFormData = getUser($_SESSION['user_id']);
// パラメータに不正な値が入っているかチェック
if (empty($viewData)) {
    error_log('エラー発生:指定ページに不正な値が入りました');
    header("Location:homepage.php"); //トップページへ
}
// post送信されていた場合
if (!empty($_POST['createMsgRoom'])) {
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
                                <img class="myIcon_img" src="<?php echo sanitize($viewData["profpic"]) ?>">
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
                            <a href="postList.php">
                                <div class="info_list"><span>Posts</span></div>
                            </a>
                            <div class="info_list"><span>Data</span></div>
                            <a href="friendsList.php<?php echo "?u_id=" . $viewData["id"] ?>">
                                <div class="info_list"><span>Friends</span></div>
                            </a>
                            <div class="info_list"><span>Photos</span></div>
                        </nav>
                        <div class="main_top_content main_top_content_user_detail_info_list2">
                            <span class="friendMsg js-click-like <?php if (isLike($_SESSION['user_id'], $viewData['id'])) echo 'active'; ?>" aria-hidden="true" data-friendid="<?php echo sanitize($viewData['id']); ?>">Follow</span>
                            <form action="" method="post">
                                <div class="message">
                                    <i class="far fa-comment-dots fa-lg js-click-create-msg-room"></i>
                                    <input type="submit" value="message" name="createMsgRoom" class="" style="background:none; border:none; outline:none; font-size:16px">
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
                                    <h2>User Profile</h2>
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
                                    <p><?php userInfoIndicate($viewData, "area"); ?></p>
                                </div>
                            </div>
                        </div>
                        <div class="myPost">
                            <div class="share_post">
                                <div class="share_post_inside">
                                    <div class="share_post_content">
                                        <div class="share_feelings">
                                            <h3 class="">Posts</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php require("post.php"); ?>
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