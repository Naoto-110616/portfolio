<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　Password reissue email sending page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証はなし（ログインできない人が使う画面なので）

// DBからユーザーデータを取得
// $dbFormData = getUser(isset($_SESSION['user_id']));
$dbFormData = getUser($_SESSION['user_id']);
// send pass remind mail function
passRemindSend(isset($email));

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
    <?php
    require("jssrc.php");
    ?>
</body>

</html>