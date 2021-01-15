<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　login page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

auth();

if (!empty($_POST)) {
    debug('POST送信があります。');

    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $pass_save = (!empty($_POST['pass_save'])) ? true : false;

    validRequired($email, "email");
    validRequired($pass, "pass");

    if (empty($err_msg)) {
        debug('未入力チェックOK。');

        validEmail($email, "email");
        validMaxLen($email, "email");
        validPass($pass, "pass");


        if (empty($err_msg)) {
            debug('バリデーションOKです。');

            try {
                login($email, $pass, $pass_save, "email", "pass");
            } catch (Exception $e) {
                error_log("error:" . $e->getMessage());
                $err_msg["email"] = MSG09;
            }
        } else {
            debug('バリデーョンNGです。');
        }
    }
}
debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "Login";
require("head.php");
?>

<body>
    <div class="home">
        <div class="center">
            <?php require("logo_title.php") ?>
            <div class="formentire">
                <div class="form">
                    <form method="post">
                        <div class="logininput emaildiv">
                            <label for="email" class="<?php echo getErrMsglabel("email"); ?>">
                                <input class="email" type="text" name="email" id="email" placeholder="Email" autofocus="1" value="<?php if (!empty($_POST['email'])) echo $_POST['email']; ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("email") ?>
                            </span>
                        </div>
                        <div class="logininput passworddiv">
                            <label for="password" class="<?php echo getErrMsglabel("pass"); ?>">
                                <input class="password" type="password" name="pass" id="password" placeholder="Password" value="<?php if (!empty($_POST['pass'])) echo $_POST['pass']; ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("pass"); ?>
                            </span>
                        </div>
                        <div class="logininput checkboxdiv">
                            <label>
                                <input type="checkbox" name="pass_save">Skip login next time
                            </label>
                        </div>
                        <div class="logininput logindiv">
                            <label for="login">
                                <input class="login " type="submit" value="Login" name='login' id="login">
                            </label>
                        </div>
                        <div class="forgotdiv">
                            <a href="passRemindSend.php" class="forgot">Forgot Password?</a>
                        </div>
                        <div class="boder1">
                            <p class="box"></p>
                        </div>
                        <div class="newAccountdiv">
                            <a href="signup.php" class="newAccountPage">Creat New Account</a>
                        </div>
                    </form>
                </div>
                <div class="createPagediv">
                    <a href="" class="createPage">Create a Page</a> for a celebrity, band or business.
                </div>
            </div>
        </div>
    </div>
    <?php require("login&signup_footer.php") ?>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>