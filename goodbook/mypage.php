<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 my page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

// $p_id = (!empty($_GET['p_id'])) ? $_GET['p_id'] : '';

//================================
// POST送信時処理
//================================
// edit profile
//================================
if (!empty($_POST["profileChenge"])) {
    editprofile("common");
}
if (!empty($_POST["myBioSubmit"])) {
    editMyBio();
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
$dbPostData = getPost($_SESSION["user_id"]);
// user data 取得
$dbFormData = getUser($_SESSION['user_id']);
// friends info
$dbUserData = getUserData($_SESSION["user_id"]);

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
    <div class="mypage_main">
        <article>
            <div class="main_top_content_overall">
                <div class="main_top_content">
                    <div class="main_top_content main_top_cover_photo_div">
                        <div class="main_top_cover_photo" style="background-image: url(<?php echo sanitize($dbFormData["backgroundimg"]); ?>);">
                            <div class="cover_photo_change_button">
                                <label for="">
                                    <input type="button" name="cover_photo_change" value="Change Cover Photo" class="coverPhotoChange">
                                </label>
                            </div>
                            <div class="myIcon_img_div">
                                <?php if (empty($dbFormData["profpic"])) { ?>
                                    <div class="myIcon_img">
                                        <i class="fas fa-user-circle fa-4x" style="font-size: 162px;"></i>
                                    </div>
                                <?php } else { ?>
                                    <img class="myIcon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>">
                                <?php } ?>
                                <div class="thumbnailCover thumbnailCover--sample1">
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_top_content main_top_content_user_name_div">
                    <div class="main_top_content main_top_content_user_name">
                        <div class="bioinfo">
                            <h1 class="username"><?php userInfoIndicate($dbFormData, "username"); ?></h1>
                            <?php if (empty($dbFormData["myBio"])) { ?>
                                <div class="bioUser">Add Bio</div>
                                <div class="bioUser_textarea display_none">
                                    <form action="" method="post">
                                        <textarea class="textarea_bio" name="myBio" id="js-count" cols="30" rows="3"></textarea>
                                        <p class="counter-text"><span id="js-count-view">0</span>/255</p>
                                        <div class="bioUser_submit_btn">
                                            <input class="bio_btn bio_cancel" type="button" value="Cancel">
                                            <input class="bio_btn bio_save" type="submit" value="Save" name="myBioSubmit">
                                    </form>
                                </div>
                            <?php } else { ?>
                                <div class="myBio"><?php echo $dbFormData["myBio"]; ?></div>
                                <div class="bioUser">Bio Edit</div>
                                <div class="bioUser_textarea display_none">
                                    <form action="" method="post">
                                        <textarea class="textarea_bio" name="myBio" id="js-count" cols="30" rows="3"><?php echo $dbFormData["myBio"] ?></textarea>
                                        <p class="counter-text"><span id="js-count-view">0</span>/255</p>
                                        <div class="bioUser_submit_btn">
                                            <input class="bio_btn bio_cancel" type="button" value="Cancel">
                                            <input class="bio_btn bio_save" type="submit" value="Save" name="myBioSubmit">
                                    </form>
                                </div>
                            <?php } ?>
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
                                <p>EditProfile</p>
                            </div>
                            <div class="info_list"><i class="fas fa-eye"></i></div>
                            <div class="info_list"><i class="fas fa-search"></i></div>
                            <div class="info_list"><i class="fas fa-ellipsis-h"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <article class="mypage_beneath">
        <div class="main_lower_part">
            <div class="main_lower_inside">
                friends List
                <div class="slider">
                    <i class="fas fa-chevron-left slider__nav slider__prev js-slider-prev" aria-hidden="true"></i>
                    <i class="fas fa-chevron-right slider__nav slider__next js-slider-next" aria-hidden="true"></i>
                    <ul class="slider__container">
                        <?php foreach ($dbUserData['data'] as $key => $val) : ?>
                            <a href="userDetail.php<?php echo "?u_id=" . $val["id"] ?>">
                                <li class="slider__item slider__item"><img src="<?php echo showImg($val["profpic"]) ?>" alt=""></li>
                            </a>
                        <?php endforeach; ?>
                    </ul>
                </div>
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
                                        <?php if (empty($dbFormData["profpic"])) { ?>
                                            <div class="icon_img">
                                                <i class="fas fa-user-circle fa-3x"></i>
                                            </div>
                                        <?php } else { ?>
                                            <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>">
                                        <?php } ?>
                                        <h3 class="">What's on your mind,<?php echo $dbFormData["username"] ?></h3>
                                    </div>
                                </div>
                                <div class="mypage_border"></div>
                                <div class="share_list_wrapper">
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
                        <?php require("post.php"); ?>
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
                                <h1>Edit Profile</h1>
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
                                    <span class="editProfileElement">name</span>
                                    <input class="modalwindow_myprof" name="username" type="text" value="<?php echo getFormData("username"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php echo getErrMsg("username"); ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("tel"); ?>">
                                    <span class="editProfileElement">tel<span> Please enter without hyphens</span></span>
                                    <input class="modalwindow_myprof" name="tel" type="tel" value="<?php echo getFormData("tel"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php echo getErrMsg("tel"); ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("zip"); ?>">
                                    <span class="editProfileElement">zip code<span> Please enter without hyphens</span></span>
                                    <input class="modalwindow_myprof" name="zip" type="text" value="<?php echo getFormData("zip"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php echo getErrMsg("zip"); ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("addr"); ?>">
                                    <span class="editProfileElement">address</span>
                                    <input class="modalwindow_myprof" name="addr" type="text" value="<?php echo getFormData("addr"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php echo getErrMsg("addr"); ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("age"); ?>">
                                    <span class="editProfileElement">age</span>
                                    <input class="modalwindow_myprof" name="age" type="number" value="<?php echo getFormData("age"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php echo getErrMsg("age"); ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("email"); ?>">
                                    <span class="editProfileElement">Email</span>
                                    <input class="modalwindow_myprof" name="email" type="email" value="<?php echo getFormData("email"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php echo getErrMsg("email"); ?>
                                </div>
                                <label class="<?php if (!empty($err_msg['area_id'])) echo 'err'; ?>">
                                    <span class="editProfileElement">Area<span class="label-require"></span></span>
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
                                    <input class="modalwindow_submit" type="submit" value="change" name="profileChenge">
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
                        <form action="" method="post" class="edit_form" enctype="multipart/form-data">
                            <div class="modalwindow_form_title">
                                <div class="edit_title">
                                    <h1>Edit Icon</h1>
                                </div>
                                <div class="x-circle2">
                                    <i class="far fa-times-circle fa-2x"></i>
                                </div>
                            </div>
                            <div class="mypage_border"></div>
                            <div>
                                <div class="imgDrop-container">
                                    <label class="area-drop <?php getErrMsglabel("profpic") ?>">
                                        <input type="hidden" name="MAX_FILE_SIZE" value="3145728">
                                        <input type="file" name="profpic" class="input-file" style="display:none;">
                                        <img src="<?php echo getFormData('profpic'); ?>" alt="" class="prev-img" style="<?php if (empty(getFormData('profpic'))) echo 'display:none;' ?> margin:10px 0px 0px ">
                                        <div class="imgUpIcon">
                                            <i class="far fa-images fa-lg"></i>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <label>
                                <input class="modalwindow_submit" type="submit" name="uploadIconImg" value="upload">
                            </label>
                        </form>
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
                        <form action="" method="post" class="edit_form" enctype="multipart/form-data">
                            <div class="modalwindow_form_title">
                                <div class="edit_title">
                                    <h1>Change Cover Photo</h1>
                                </div>
                                <div class="x-circle3">
                                    <i class="far fa-times-circle fa-2x"></i>
                                </div>
                            </div>
                            <div class="mypage_border"></div>
                            <div style=>
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
                                <input class="modalwindow_submit" type="submit" name="uploadBackgroundImg" value="upload">
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </article>
    <?php require("jssrc.php"); ?>
</body>

</html>