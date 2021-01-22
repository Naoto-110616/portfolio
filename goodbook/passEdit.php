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
// chenge pass function
// chengePass(isset($userData), isset($pass_new));
chengePass($userData, $pass_new);
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
    <?php
    require("jsSrc.php");
    ?>
</body>

</html>