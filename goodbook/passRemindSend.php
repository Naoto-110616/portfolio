<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　パスワード再発行メール送信ページ　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証はなし（ログインできない人が使う画面なので）
// DBからユーザーデータを取得
$dbFormData = getUser($_SESSION['user_id']);

//================================
// 画面処理
//================================
//post送信されていた場合
if (!empty($_POST)) {
    debug('POST送信があります。');
    debug('POST情報：' . print_r($_POST, true));

    //変数にPOST情報代入
    $email = $_POST['email'];

    //未入力チェック
    validRequired($email, 'email');

    if (empty($err_msg)) {
        debug('未入力チェックOK。');

        //emailの形式チェック
        validEmail($email, 'email');
        //emailの最大文字数チェック
        validMaxLen($email, 'email');

        if (empty($err_msg)) {
            debug('バリデーションOK。');

            //例外処理
            try {
                // DBへ接続
                $dbh = dbConnect();
                passRemindSend($dbh, $email);
            } catch (Exception $e) {
                error_log('エラー発生:' . $e->getMessage());
                $err_msg['common'] = MSG09;
            }
        }
    }
}
?>

<?php
$siteTitle = "Send password email";
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
                            <p class="passEditMassge">ご指定のメールアドレス宛にパスワード再発行用のURLと認証キーをお送り致します。</p>
                            <label for="email" class="<?php echo getErrMsglabel("email"); ?>">
                                Email
                                <input class="editPassform" type="text" name="email" value="<?php echo getFormData('email'); ?>">
                            </label>
                            <div class="area-msg">
                                <?php
                                echo getErrMsg('email');
                                ?>
                            </div>
                            <input type="submit" class="editPassButton" value="send">
                        </form>
                    </div>
                </div>
            </div>
            <div class="toMypage">
                <a href="mypage.php">&lt; <?php notLoggedMsg("To mypage", "To login page"); ?></a>
            </div>
        </section>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/homepage.js"></script>
</body>

</html>