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
    validRequired($email, "email");

    if (empty($err_msg)) {
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
            //emailの未入力チェック
            validRequired($email, 'email');
        }

        if (empty($err_msg)) {
            debug('バリデーションOKです。');

            //例外処理
            try {
                editProfile($username, $tel, $zip, $addr, $age, $email, $dbFormData, "common");
            } catch (Exception $e) {
                error_log('エラー発生:' . $e->getMessage());
                $err_msg['common'] = MSG07;
            }
        }
    }
}
debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = 'mypage';
require('goodbook_head.php');
?>

<body>
    <?php require("goodbook_header.php") ?>
    <div class="mypage_main">
        <article>
            <div class="main_top_content_overall">
                <div>
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
                                <h1>user name</h1>
                            </div>
                        </div>
                    </div>
                    <div class="mypage_border"></div>
                    <div class="main_top_content main_top_content_user_info">
                        <div class="main_top_content main_top_content_user_info_inside">
                            <div class="main_top_content main_top_content_user_info_list1">
                                <div class="info_list"><span>post</span></div>
                                <div class="info_list"><span>data</span></div>
                                <div class="info_list"><span>friends</span></div>
                                <div class="info_list"><span>photos</span></div>
                                <div class="info_list"><span>other</span></div>
                            </div>
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
            </div>
        </article>
        <article>
            <div class="main_lower_part">
                <div class="main_lower_inside">
                    <div class="my_profile">
                        <div class="myprofile_inside">
                            <div class="myprofile_title">
                                <h2>myprofile</h2>
                            </div>
                            <div class="mypage_border"></div>
                            <div class="profile_list">
                                <p>name</p>
                                <p><?php echo getFormData('username'); ?></p>
                            </div>
                            <div class="profile_list">
                                <p>tel</p>
                                <p><?php echo getFormData('tel'); ?></p>
                            </div>
                            <div class="profile_list">
                                <p>zip code</p>
                                <p><?php echo getFormData('zip'); ?></p>
                            </div>
                            <div class="profile_list">
                                <p>addr</p>
                                <p><?php echo getFormData('addr'); ?></p>
                            </div>
                            <div class="profile_list">
                                <p>age</p>
                                <p><?php echo getFormData('age'); ?></p>
                            </div>
                            <div class="profile_list">
                                <p>email</p>
                                <p><?php echo getFormData('email'); ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article class="profile_edit_modalwindow">
            <div class="profile_edit_screen_overall">
                <div class="profile_edit_form_div">
                    <div class="profile_edit_form">
                        <div class="profile_edit_form_title">
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
                                    if (!empty($err_msg['common'])) echo $err_msg['common'];
                                    ?>
                                </div>
                                <label class="<?php if (!empty($err_msg['username'])) echo 'err'; ?>">name
                                    <input name="username" type="text" value="">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    if (!empty($err_msg['username'])) echo $err_msg['username'];
                                    ?>
                                </div>
                                <label class="<?php if (!empty($err_msg['tel'])) echo 'err'; ?>">tel<span> Please enter without hyphens</span>
                                    <input name="tel" type="text" value="">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    if (!empty($err_msg['tel'])) echo $err_msg['tel'];
                                    ?>
                                </div>
                                <label class="<?php if (!empty($err_msg['zip'])) echo 'err'; ?>">zip code<span> Please enter without hyphens</span>
                                    <input name="zip" type="text" value="">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    if (!empty($err_msg['zip'])) echo $err_msg['zip'];
                                    ?>
                                </div>
                                <label class="<?php if (!empty($err_msg['addr'])) echo 'err'; ?>">address
                                    <input name="addr" type="text" value="">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    if (!empty($err_msg['addr'])) echo $err_msg['addr'];
                                    ?>
                                </div>
                                <label class="<?php if (!empty($err_msg['age'])) echo 'err'; ?>">age
                                    <input name="age" type="number" value="">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    if (!empty($err_msg['age'])) echo $err_msg['age'];
                                    ?>
                                </div>
                                <label class="<?php if (!empty($err_msg['email'])) echo 'err'; ?>">Email
                                    <input name="email" type="text" value="">
                                </label>
                                <div class="area-msg">
                                    <?php
                                    if (!empty($err_msg['email'])) echo $err_msg['email'];
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
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/homepage.js"></script>
</body>

</html>