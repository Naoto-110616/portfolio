<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　cange password page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

//================================
// 画面処理
//================================
// DBからユーザーデータを取得
$userData = getUser($_SESSION['user_id']);
debug('取得したユーザー情報：' . print_r($userData, true));

//post送信されていた場合
if (!empty($_POST)) {
    debug('POST送信があります。');
    debug('POST情報：' . print_r($_POST, true));

    //変数にユーザー情報を代入
    $pass_old = $_POST['pass_old'];
    $pass_new = $_POST['pass_new'];
    $pass_new_re = $_POST['pass_new_re'];

    //未入力チェック
    validRequired($pass_old, 'pass_old');
    validRequired($pass_new, 'pass_new');
    validRequired($pass_new_re, 'pass_new_re');

    if (empty($err_msg)) {
        debug('input check OK.');

        //古いパスワードのチェック
        validPass($pass_old, 'pass_old');
        //新しいパスワードのチェック
        validPass($pass_new, 'pass_new');
        //古いパスワードとDBパスワードを照合（DBに入っているデータと同じであれば、半角英数字チェックや最大文字チェックは行わなくても問題ない）
        dbPassMatch($pass_old, $userData, "pass", "pass_old");
        //新しいパスワードと古いパスワードが同じかチェック
        passNewOldMatch($pass_old, $pass_new, "pass_new");
        //パスワードとパスワード再入力が合っているかチェック（ログイン画面では最大、最小チェックもしていたがパスワードの方でチェックしているので実は必要ない）
        validMatch($pass_new, $pass_new_re, 'pass_new_re');

        if (empty($err_msg)) {
            debug('バリデーションOK。');

            //例外処理
            try {
                // DBへ接続
                $dbh = dbConnect();
                chengePass($dbh, $userData, $pass_new);
            } catch (Exception $e) {
                error_log('エラー発生:' . $e->getMessage());
                $err_msg['common'] = MSG09;
            }
        }
    }
}
?>
<?php
$siteTitle = "password edit";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php"); ?>
    <div class="overall">
        <section class="passRemind_main">
            <div class="padding-top">
                <div class="passRemind_window inside">
                    <div class="form-container">
                        <form action="" method="post" class="form">
                            <div class="area-msg">
                                <?php
                                echo getErrMsg('common');
                                ?>
                            </div>
                            <label class="<?php echo getErrMsglabel("pass_old"); ?>">
                                Old Password
                                <input class="editPassform" type="password" name="pass_old" value="<?php echo getFormData('pass_old'); ?>">
                            </label>
                            <div class="area-msg">
                                <?php
                                echo getErrMsg('pass_old');
                                ?>
                            </div>
                            <label class="<?php echo getErrMsglabel("pass_new"); ?>">
                                New Password
                                <input class="editPassform" type="password" name="pass_new" value="<?php echo getFormData('pass_new'); ?>">
                            </label>
                            <div class="area-msg">
                                <?php
                                echo getErrMsg('pass_new');
                                ?>
                            </div>
                            <label class="<?php echo getErrMsglabel("pass_new_re"); ?>">
                                New Password（retype）
                                <input class="editPassform" type="password" name="pass_new_re" value="<?php echo getFormData('pass_new_re'); ?>">
                            </label>
                            <div class="area-msg">
                                <?php
                                echo getErrMsg('pass_new_re');
                                ?>
                            </div>
                            <div class="btn-container">
                                <input type="submit" class="editPassButton" value="Change">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="toMypage">
                <a href="mypage.php">&lt; To mypage</a>
            </div>
        </section>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/homepage.js"></script>
</body>

</html>