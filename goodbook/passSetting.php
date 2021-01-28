<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　passSettingpage　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

auth();

//================================
// 画面処理
//================================
// DBからユーザーデータを取得
$dbFormData = getUser($_SESSION['user_id']);

debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "password Setting";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php"); ?>
    <div class="overall">
        <section class="passRemind_main">
            <div class="padding-top">
                <div class="passRemind_window inside">
                    <div class="form-container">
                        <div class="passSetting">
                            <div class="passEdit">
                                <a href="passEdit.php">Change Password</a>
                            </div>
                            <div class="passEdit">
                                <a href="passRemindSend.php">Remind Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="toMypage">
                <a href="mypage.php">&lt; To mypage</a>
            </div>
        </section>
    </div>
    <?php require("jssrc.php"); ?>
</body>

</html>