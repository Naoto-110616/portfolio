<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　passRemindSendpage　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

auth();

//================================
// 画面処理
//================================
// post送信されていた場合

debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "Send password reissue email";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php"); ?>
    <div class="overall">
        <section class="passRemind_main">
            <div class="padding-top">
                <div class="passRemind_window inside">
                    <div class="form-container">
                        <form action="passRemindRecieve.php" class="form">
                            <p class="passEditMassge">ご指定のメールアドレス宛にパスワード再発行用のURLと認証キーをお送り致します。</p>
                            <label>
                                Email
                                <input class="editPassform" type="text" name="email">
                            </label>
                            <input type="submit" class="editPassButton" value="send">
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