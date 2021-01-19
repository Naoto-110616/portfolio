<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 Password reissue authentication key input page ');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証はなし（ログインできない人が使う画面なので）

// DBからユーザーデータを取得
$dbFormData = getUser($_SESSION['user_id']);

//SESSIONに認証キーがあるか確認、なければリダイレクト
if (empty($_SESSION['auth_key'])) {
    header("Location:passRemindSend.php"); //認証キー送信ページへ
}

//post送信されていた場合
if (!empty($_POST)) {
    debug('POST送信があります。');
    debug('POST情報：' . print_r($_POST, true));

    //変数に認証キーを代入
    $auth_key = $_POST['token'];

    //未入力チェック
    validRequired($auth_key, 'token');

    if (empty($err_msg)) {
        debug('未入力チェックOK。');

        //固定長チェック
        validLength($auth_key, 'token');
        //半角チェック
        validHalf($auth_key, 'token');

        if (empty($err_msg)) {
            debug('バリデーションOK。');

            validAuthKeyMuth($auth_key);
            validAuthKeyExpired();

            if (empty($err_msg)) {
                debug('認証OK。');

                $pass = makeRandKey(); //パスワード生成

                passRemindRecieve($pass);
            }
        }
    }
}
?>

<?php
$siteTitle = "email auth";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php"); ?>
    <p id="js-show-msg" style="display:none; padding-top: 64px;" class="msg-slide">
        <?php echo getSessionFlash('msg_success'); ?>
    </p>

    <div class="overall">
        <section class="passRemind_main">
            <div class="padding-top">
                <div class="passRemind_window inside">
                    <div class="form-container">
                        <form action="" method="post" class="form">
                            <p class="passEditMassge">ご指定のメールアドレスお送りした【パスワード再発行認証メール】内にある「認証キー」をご入力ください。</p>
                            <label for="email" class="<?php echo getErrMsglabel("token"); ?>">
                                認証キー
                                <input class="editPassform" type="text" name="token">
                            </label>
                            <div class="area-msg">
                                <?php
                                echo getErrMsg('token');
                                ?>
                            </div>
                            <input type="submit" class="editPassButton" value="send">
                        </form>
                    </div>
                </div>
            </div>
            <div class="toMypage">
                <a href="passRemindSend.php">&lt; To Resend password reissue email </a>
            </div>
        </section>
    </div>
    <?php
    require("jsSrc.php");
    ?>
</body>

</html>