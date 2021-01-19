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

$dbFormData = getUser($_SESSION['user_id']);
debug('取得したユーザー情報：' . print_r($dbFormData, true));

//================================
// 画面処理
//================================

// 画面表示用データ取得
//================================
// GETデータを格納
$p_id = (!empty($_GET['p_id'])) ? $_GET['p_id'] : '';
// DBから商品データを取得
$dbFormData = (!empty($p_id)) ? getPost($_SESSION['user_id'], $p_id) : '';
// 新規登録画面か編集画面か判別用フラグ
$edit_flg = (empty($dbFormData)) ? false : true;
// DBからカテゴリデータを取得
$dbCategoryData = getCategory();
debug('商品ID：' . $p_id);
debug('フォーム用DBデータ：' . print_r($dbFormData, true));
debug('カテゴリデータ：' . print_r($dbCategoryData, true));

// パラメータ改ざんチェック
//================================
// GETパラメータはあるが、改ざんされている（URLをいじくった）場合、正しい商品データが取れないのでマイページへ遷移させる
if (!empty($p_id) && empty($dbFormData)) {
    debug('GETパラメータの商品IDが違います。homepageへ遷移します。');
    header("Location:mypage.php");
}

// POST送信時処理
//================================
if (!empty($_POST)) {
    debug('POST送信があります。');
    debug('POST情報：' . print_r($_POST, true));
    debug('FILE情報：' . print_r($_FILES, true));

    //画像をアップロードし、パスを格納
    $profPic = (!empty($_FILES['profPic'])) ? uploadImg($_FILES['profPic'], 'profPic') : '';
    // 画像をPOSTしてない（登録していない）が既にDBに登録されている場合、DBのパスを入れる（POSTには反映されないので）
    $profPic = (empty($profPic) && !empty($dbFormData['profPic'])) ? $dbFormData['profPic'] : $profPic;

    // 更新の場合はDBの情報と入力情報が異なる場合にバリデーションを行う
    if (empty($dbFormData)) {
        debug("test");
        if (!empty($err_msg)) {
            debug("test");
            debug('バリデーションOKです。');
            uploadIcon($edit_flg, $profPic, $p_id);
        }
    }
}
$dbFormData = getUser($_SESSION['user_id']);
debug('取得したユーザー情報：' . print_r($dbFormData, true));

// 画面表示用データ取得
//================================
// カレントページのGETパラメータを取得
$currentPageNum = (!empty($_GET['p'])) ? $_GET['p'] : 1; //デフォルトは１ページめ
// パラメータに不正な値が入っているかチェック
if (!is_int((int)$currentPageNum)) {
    error_log('エラー発生:指定ページに不正な値が入りました');
    header("Location:mypage.php");
}
// 表示件数
$listSpan = 20;
// 現在の表示レコード先頭を算出
$currentMinNum = (($currentPageNum - 1) * $listSpan); //1ページ目なら(1-1)*20 = 0 、 ２ページ目なら(2-1)*20 = 20
// DBから商品データを取得
$dbProductData = getPostList($currentMinNum);
// DBからカテゴリデータを取得
$dbCategoryData = getCategory();
debug('現在のページ：' . $currentPageNum);
// debug('フォーム用DBデータ：' . print_r($dbFormData, true));
//debug('カテゴリデータ：'.print_r($dbCategoryData,true));

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
                        <div class="myIcon_img_div">
                            <img class="myIcon_img" src="<?php echo sanitize($dbFormData['profPic']); ?>" alt="">
                        </div>
                        <div class="usernamediv">
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
        <article class="modalwindow">
            <div class="modalwindow_screen_overall">
                <div class="modalwindow_form_div">
                    <div class="modalwindow_form">
                        <div class="modalwindow_form_title">
                            <form action="" method="post" class="edit_profile_form" enctype="multipart/form-data">
                                <div class="modalwindow_form_title">
                                    <div class="edit_title">
                                        <h1>edit Icon</h1>
                                    </div>
                                    <div class="x-circle">
                                        <i class="far fa-times-circle fa-2x"></i>
                                    </div>
                                </div>
                                <div class="mypage_border"></div>
                                <div style="overflow: hidden;">
                                    <div class="imgDrop-container">
                                        <label class="area-drop <?php getErrMsglabel("profPic") ?>">
                                            <input type="hidden" name="MAX_FILE_SIZE" value="3145728">
                                            <input type="file" name="profPic" class="input-file" style="display:none;">
                                            <img src="<?php echo getFormData('profPic'); ?>" alt="" class="prev-img" style="<?php if (empty(getFormData('profPic'))) echo 'display:none;' ?> margin:10px 0px 0px ">
                                            <div class="imgUpIcon">
                                                <i class="far fa-images fa-lg"></i>
                                            </div>
                                        </label>
                                        <div class="area-msg">
                                            <?php;getErrMsg("profPic");?>
                                        </div>
                                    </div>
                                </div>
                                <label>
                                    <input type="submit" value="<?php echo (!$edit_flg) ? 'post' : 'edit'; ?>">
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