<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 my page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

$p_id = (!empty($_GET['p_id'])) ? $_GET['p_id'] : '';

//================================
// POST送信時処理
//================================
// edit profile
//================================
if (!empty($_POST["profileChenge"])) {
    editprofile("common");
}
//================================
// 画面処理
//================================
// upload img
//================================
if (!empty($_POST["uploadIconImg"])) {
    debug("uploadIconImgが押されました");
    if (!empty($_POST)) {
        debug('FILE情報：' . print_r($_FILES, true));
        //画像をアップロードし、パスを格納
        $profpic = (!empty($_FILES['profpic'])) ? uploadImg($_FILES['profpic'], 'profpic') : '';
        // 画像をPOSTしてない（登録していない）が既にDBに登録されている場合、DBのパスを入れる（POSTには反映されないので）
        $profpic = (empty($profpic) && !empty($dbFormData['profpic'])) ? $dbFormData['profpic'] : $profpic;
    }
}
if (!empty($_POST["uploadBackgroundImg"])) {
    debug("uploadBackgroundImgが押されました");
    if (!empty($_POST)) {
        debug('FILE情報：' . print_r($_FILES, true));
        //画像をアップロードし、パスを格納
        $backgroundimg = (!empty($_FILES['backgroundimg'])) ? uploadImg($_FILES['backgroundimg'], 'backgroundimg') : '';
        // 画像をPOSTしてない（登録していない）が既にDBに登録されている場合、DBのパスを入れる（POSTには反映されないので）
        $backgroundimg = (empty($backgroundimg) && !empty($dbFormData['backgroundimg'])) ? $dbFormData['backgroundimg'] : $backgroundimg;
    }
}

if (!empty($_POST["uploadIconImg"] || $_POST["uploadBackgroundImg"])) {
    debug('バリデーションOKです。');
    saveImgToDb($profpic, $backgroundimg);
}

// select box用の変数
// Area data 取得
$dbAreaData = getArea();
// user post data 取得
$dbPostData = getMyPostList($_SESSION["user_id"]);
// user data 取得
$dbFormData = getUser($_SESSION['user_id']);

debug('取得したユーザー情報：' . print_r($dbFormData, true));


debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');


?>

<?php
$siteTitle = 'mypage';
require('goodbook_head.php');
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.7/css/swiper.min.css" />


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
                        <div class="main_top_cover_photo" style="background-image: url(<?php echo sanitize($dbFormData["backgroundimg"]); ?>);">
                            <div class="cover_photo_change_button">
                                <label for="">
                                    <input type="button" name="cover_photo_change" value="change cover photo" class="coverPhotoChange">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_top_content main_top_content_user_name_div">
                    <div class="main_top_content main_top_content_user_name">
                        <div class="myIcon_img_div">
                            <?php if (empty($dbFormData["profpic"])) { ?>
                                <div class="myIcon_img">
                                    <i class="fas fa-user-circle fa-4x"></i>
                                </div>
                            <?php } else { ?>
                                <img class="myIcon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>">
                            <?php } ?>
                        </div>
                        <div class="usernamediv">
                            <h1><?php userInfoIndicate($dbFormData, "username"); ?></h1>
                        </div>
                    </div>
                </div>
                <div class="mypage_border"></div>
                <div class="main_top_content main_top_content_user_info">
                    <div class="main_top_content main_top_content_user_info_inside">
                        <nav class="main_top_content main_top_content_user_info_list1">
                            <div class="info_list"><span>Posts</span></div>
                            <a href="msgRoomList.php">
                                <div class="info_list"><span>Msg</span></div>
                            </a>
                            <a href="friendsList.php<?php echo "?u_id=" . $_SESSION["user_id"] ?>">
                                <div class="info_list"><span>Friends</span></div>
                            </a>
                            <div class="info_list"><span>Photos</span></div>
                            <div class="info_list"><a href="passSetting.php"><span>Password</span></a></div>
                        </nav>
                        <div class="main_top_content main_top_content_user_info_list2">
                            <div class="edit">
                                <i class="fas fa-pen"></i>
                                <span>Editprofile</span>
                            </div>
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
                    <section class="themes">
                        <!-- スライダー全体を括るメインコンテナ -->
                        <div class="swiper-container">
                            <!-- 全スライドをまとめるラッパー -->
                            <div class="swiper-wrapper">
                                <!-- 各スライド -->
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                                <div class="swiper-slide panel"></div>
                            </div>
                        </div>
                    </section>
                    <div class="content_flex">
                        <div class="my_profile">
                            <div class="myprofile_inside">
                                <div class="myprofile_title">
                                    <h2>myprofile</h2>
                                </div>
                                <div class="mypage_border"></div>
                                <div class="profile_list">
                                    <p class="status">Name</p>
                                    <p><?php userInfoIndicate($dbFormData, "username"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">Tel</p>
                                    <p><?php userInfoIndicate($dbFormData, "tel"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">Zip code</p>
                                    <p><?php userInfoIndicate($dbFormData, "zip"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">Addr</p>
                                    <p><?php userInfoIndicate($dbFormData, "addr"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">Age</p>
                                    <p><?php userInfoIndicate($dbFormData, "age"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">Email</p>
                                    <p><?php userInfoIndicate($dbFormData, "email"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p class="status">Area</p>
                                    <p><?php userInfoIndicate($dbFormData, "area"); ?></p>
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
                                            <h3 class="">What's on your mind,<?php echo $dbFormData["username"] ?></h3>
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
                            <?php
                            endforeach;
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article class="modalwindow">
            <div class="modalwindow_screen_overall_1">
                <div class="modalwindow_form_div">
                    <div class="modalwindow_form">
                        <div class="inside">
                            <div class="modalwindow_form_title">
                                <div class="edit_title">
                                    <h1>edit profile</h1>
                                </div>
                                <div class="x-circle1">
                                    <i class="far fa-times-circle fa-2x"></i>
                                </div>
                            </div>
                            <div class="mypage_border"></div>
                            <div class="edit_form_div">
                                <form action="" method="post" class="edit_form">
                                    <div class="area-msg">
                                        <?php echo getErrMsg("common"); ?>
                                    </div>
                                    <label class="<?php echo getErrMsglabel("username"); ?>">
                                        name
                                        <input name="username" type="text" value="<?php echo getFormData("username"); ?>">
                                    </label>
                                    <div class="area-msg">
                                        <?php echo getErrMsg("username"); ?>
                                    </div>
                                    <label class="<?php echo getErrMsglabel("tel"); ?>">
                                        tel<span> Please enter without hyphens</span>
                                        <input name="tel" type="text" value="<?php echo getFormData("tel"); ?>">
                                    </label>
                                    <div class="area-msg">
                                        <?php echo getErrMsg("tel"); ?>
                                    </div>
                                    <label class="<?php echo getErrMsglabel("zip"); ?>">
                                        zip code<span> Please enter without hyphens</span>
                                        <input name="zip" type="text" value="<?php echo getFormData("zip"); ?>">
                                    </label>
                                    <div class="area-msg">
                                        <?php echo getErrMsg("zip"); ?>
                                    </div>
                                    <label class="<?php echo getErrMsglabel("addr"); ?>">
                                        address
                                        <input name="addr" type="text" value="<?php echo getFormData("addr"); ?>">
                                    </label>
                                    <div class="area-msg">
                                        <?php echo getErrMsg("addr"); ?>
                                    </div>
                                    <label class="<?php echo getErrMsglabel("age"); ?>">
                                        age
                                        <input name="age" type="number" value="<?php echo getFormData("age"); ?>">
                                    </label>
                                    <div class="area-msg">
                                        <?php echo getErrMsg("age"); ?>
                                    </div>
                                    <label class="<?php echo getErrMsglabel("email"); ?>">
                                        Email
                                        <input name="email" type="text" value="<?php echo getFormData("email"); ?>">
                                    </label>
                                    <div class="area-msg">
                                        <?php echo getErrMsg("email"); ?>
                                    </div>
                                    <label class="<?php if (!empty($err_msg['area_id'])) echo 'err'; ?>">
                                        Area<span class="label-require"></span>
                                        <select name="area_id" id="" class="areaBox">
                                            <option value="0" <?php if (getFormData('area_id') == 0) echo 'selected'; ?>>Please select</option>
                                            <?php foreach ($dbAreaData as $key => $val) { ?>
                                                <option value="<?php echo $val['a_id'] ?>" <?php if (getFormData('area_id') == $val['a_id']) echo 'selected'; ?>>
                                                    <?php echo $val["area"]; ?>
                                                </option>
                                            <?php } ?>
                                        </select>
                                    </label>
                                    <div class="area-msg">
                                        <?php if (!empty($err_msg['area_id'])) echo $err_msg['area_id']; ?>
                                    </div>
                                    <div class="area-msg">
                                        <?php echo getErrMsg("Area"); ?>
                                    </div>
                                    <label>
                                        <input type="submit" value="change" name="profileChenge">
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article class="modalwindow">
            <div class="modalwindow_screen_overall_2">
                <div class="modalwindow_form_div">
                    <div class="modalwindow_form">
                        <div class="inside">
                            <div class="modalwindow_form_title">
                                <form action="" method="post" class="edit_form" enctype="multipart/form-data">
                                    <div class="modalwindow_form_title">
                                        <div class="edit_title">
                                            <h1>edit Icon</h1>
                                        </div>
                                        <div class="x-circle2">
                                            <i class="far fa-times-circle fa-2x"></i>
                                        </div>
                                    </div>
                                    <div class="mypage_border"></div>
                                    <div style="overflow: hidden;">
                                        <div class="imgDrop-container">
                                            <label class="area-drop <?php getErrMsglabel("profpic") ?>">
                                                <input type="hidden" name="MAX_FILE_SIZE" value="3145728">
                                                <input type="file" name="profpic" class="input-file" style="display:none;">
                                                <img src="<?php echo getFormData('profpic'); ?>" alt="" class="prev-img" style="<?php if (empty(getFormData('profpic'))) echo 'display:none;' ?> margin:10px 0px 0px ">
                                                <div class="imgUpIcon">
                                                    <i class="far fa-images fa-lg"></i>
                                                </div>
                                            </label>
                                            <div class="area-msg">
                                                <?php;getErrMsg("profpic");?>
                                            </div>
                                        </div>
                                    </div>
                                    <label>
                                        <input type="submit" value="<?php echo (!$edit_flg) ? 'post' : 'edit'; ?>" name="uploadIconImg">
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <article class="modalwindow">
        <div class="modalwindow_screen_overall_3">
            <div class="modalwindow_form_div">
                <div class="modalwindow_form">
                    <div class="inside">
                        <div class="modalwindow_form_title">
                            <form action="" method="post" class="edit_form" enctype="multipart/form-data">
                                <div class="modalwindow_form_title">
                                    <div class="edit_title">
                                        <h1>edit background img</h1>
                                    </div>
                                    <div class="x-circle3">
                                        <i class="far fa-times-circle fa-2x"></i>
                                    </div>
                                </div>
                                <div class="mypage_border"></div>
                                <div style="overflow: hidden;">
                                    <div class="imgDrop-container">
                                        <label class="area-drop <?php getErrMsglabel("backgroundimg") ?>">
                                            <input type="hidden" name="MAX_FILE_SIZE" value="3145728">
                                            <input type="file" name="backgroundimg" class="input-file" style="display:none;">
                                            <img src="<?php echo getFormData('backgroundimg'); ?>" alt="" class="prev-img" style="<?php if (empty(getFormData('backgroundimg'))) echo 'display:none;' ?> margin:10px 0px 0px ">
                                            <div class="imgUpIcon">
                                                <i class="far fa-images fa-lg"></i>
                                            </div>
                                        </label>
                                        <div class="area-msg">
                                            <?php;getErrMsg("backgroundimg");?>
                                        </div>
                                    </div>
                                </div>
                                <label>
                                    <input type="submit" value="<?php echo (!$edit_flg) ? 'post' : 'edit'; ?>" name="uploadBackgroundImg">
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
    <?php require("jssrc.php"); ?>
</body>

</html>