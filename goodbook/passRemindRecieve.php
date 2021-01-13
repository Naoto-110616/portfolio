<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　passRemindSendpage　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

auth();

debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "email auth";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php"); ?>
    <div class="overall">
        <section class="passRemind_main">
            <div class="padding-top">
                <div class="passRemind_window inside">
                    <div class="form-container">
                        <form action="passEdit.php" class="form">
                            <p class="passEditMassge">ご指定のメールアドレスお送りした【パスワード再発行認証メール】内にある「認証キー」をご入力ください。</p>
                            <label>
                                認証キー
                                <input class="editPassform" type="text" name="email">
                            </label>
                            <input type="submit" class="editPassButton" value="send">
                        </form>
                    </div>
                </div>
            </div>
            <div class="toMypage">
                <a href="passRemindSend.php">&lt; To Resend password reissue email</a>
            </div>
        </section>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/homepage.js"></script>
</body>

</html>