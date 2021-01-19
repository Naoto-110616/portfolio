<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 my page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

//================================
// 画面処理
//================================

//================================
// edit profile
//================================
// DBからユーザーデータを取得
$dbFormData = getUser($_SESSION['user_id']);

debug('取得したユーザー情報：' . print_r($dbFormData, true));
// post送信されていた場合
if (!empty($_POST)) {
    debug('POST送信があります。');
    debug('POST情報：' . print_r($_POST, true));

    //変数にユーザー情報を代入
    $username = $_POST['username'];
    $tel = $_POST['tel'];
    $zip = (!empty($_POST['zip'])) ? $_POST['zip'] : 0; //後続のバリデーションにひっかかるため、空で送信されてきたら0を入れる
    $addr = $_POST['addr'];
    $age = $_POST['age'];
    $email = $_POST['email'];

    validRequired($username, "username");
    validRequired($tel, "tel");
    validRequired($zip, "zip");
    validRequired($addr, "addr");
    validRequired($age, "age");
    validRequired($email, 'email');

    if (empty($err_msg)) {
        debug('input check OK.');

        //DBの情報と入力情報が異なる場合にバリデーションを行う
        if ($dbFormData['username'] !== $username) {
            //名前の最大文字数チェック
            validMaxLen($username, 'username');
        }
        if ($dbFormData['tel'] !== $tel) {
            //TEL形式チェック
            validTel($tel, 'tel');
        }
        if ($dbFormData['addr'] !== $addr) {
            //住所の最大文字数チェック
            validMaxLen($addr, 'addr');
        }
        if ((int)$dbFormData['zip'] !== $zip) { //DBデータをint型にキャスト（型変換）して比較
            //郵便番号形式チェック
            validZip($zip, 'zip');
        }
        if ($dbFormData['age'] !== $age) {
            //年齢の最大文字数チェック
            validMaxLen($age, 'age');
            //年齢の半角数字チェック
            validNumber($age, 'age');
        }
        if ($dbFormData['email'] !== $email) {
            //emailの最大文字数チェック
            validMaxLen($email, 'email');
            if (empty($err_msg['email'])) {
                //emailの重複チェック
                validEmailDup($email, "email");
            }
            //emailの形式チェック
            validEmail($email, 'email');
        }

        if (empty($err_msg)) {
            debug('バリデーションOKです。');

            // editprofile機能
            editProfile($username, $tel, $zip, $addr, $age, $email, $dbFormData, "common");
        }
    }
}
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
                        <div class="main_top_cover_photo">
                            <div class="cover_photo_change_button">
                                <label for="">
                                    <input type="button" name="cover_photo_change" value="change cover photo">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_top_content main_top_content_user_name_div">
                    <div class="main_top_content main_top_content_user_name">
                        <div>
                            <i class="fas fa-user-circle fa-2x"></i>
                        </div>
                        <div>
                            <h1><?php userInfoIndicate($dbFormData, "username") ?></h1>
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
                            <div class="info_list"><a href="passSetting.php"><span>password</span></a></div>
                        </nav>
                        <div class="main_top_content main_top_content_user_info_list2">
                            <div class="edit">
                                <i class="fas fa-pen"></i>
                                <span>editprofile</span>
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
                                    <p>name</p>
                                    <p><?php userInfoIndicate($dbFormData, "username"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p>tel</p>
                                    <p><?php userInfoIndicate($dbFormData, "tel"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p>zip code</p>
                                    <p><?php userInfoIndicate($dbFormData, "zip"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p>addr</p>
                                    <p><?php userInfoIndicate($dbFormData, "addr"); ?></p>
                                </div>
                                <div class="profile_list">
                                    <p>age</p>
                                    <p><?php userInfoIndicate($dbFormData, "age"); ?></p>
                                </div>
                                <div class="profile_list" id="email">
                                    <p>email</p>
                                    <p><?php userInfoIndicate($dbFormData, "email"); ?></p>
                                </div>
                            </div>
                        </div>
                        <div class="share_post">
                            <div class="share_post_inside">
                                <div class="share_post_content">
                                    <div class="share_icon_div">
                                        <i class="fas fa-user-circle fa-2x"></i>
                                    </div>
                                    <div class="share_feelings">
                                        <h3 class="">Let's share your feelings</h3>
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
                    </div>
                </div>
            </div>
        </article>
        <article class="modalwindow">
            <div class="modalwindow_screen_overall">
                <div class="modalwindow_form_div">
                    <div class="modalwindow_form">
                        <div class="modalwindow_form_title">
                            <div class="edit_title">
                                <h1>edit profile</h1>
                            </div>
                            <div class="x-circle">
                                <i class="far fa-times-circle fa-2x"></i>
                            </div>
                        </div>
                        <div class="mypage_border"></div>
                        <div class="edit_profile_form_div">
                            <form action="" method="post" class="edit_profile_form">
                                <div class="area-msg">
                                    <?php
                                    echo getErrMsg("common");
                                    ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("username"); ?>">
                                    name
                                    <input name="username" type="text" value="<?php echo getFormData("username"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    echo getErrMsg("username");
                                    ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("tel"); ?>">
                                    tel<span> Please enter without hyphens</span>
                                    <input name="tel" type="text" value="<?php echo getFormData("tel"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    echo getErrMsg("tel");
                                    ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("zip"); ?>">
                                    zip code<span> Please enter without hyphens</span>
                                    <input name="zip" type="text" value="<?php echo getFormData("zip"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    echo getErrMsg("zip");
                                    ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("addr"); ?>">
                                    address
                                    <input name="addr" type="text" value="<?php echo getFormData("addr"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    echo getErrMsg("addr");
                                    ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("age"); ?>">
                                    age
                                    <input name="age" type="number" value="<?php echo getFormData("age"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    echo getErrMsg("age");
                                    ?>
                                </div>
                                <label class="<?php echo getErrMsglabel("email"); ?>">
                                    Email
                                    <input name="email" type="text" value="<?php echo getFormData("email"); ?>">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    echo getErrMsg("email");
                                    ?>
                                </div>
                                <label>
                                    <input type="submit" value="change">
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <?php
    require("jsSrc.php");
    ?>
</body>

</html>