<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug("「 signup page");
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

if (!empty($_POST)) {
    debug('POST送信があります。');

    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $pass_re = $_POST['pass_re'];

    validRequired($email, "email");
    validRequired($pass, "pass");
    validRequired($pass_re, "pass_re");

    if (empty($err_msg)) {
        debug('未入力チェックOK。');

        validEmail($email, "email");
        validMaxLen($email, "email");
        validEmailDup($email, "email");

        validPass($pass, "pass");
        validPass($pass_re, "pass_re");

        if (empty($err_msg)) {

            validMatch($pass, $pass_re, "pass");

            if (empty($err_msg)) {
                debug('バリデーョンOKです。');

                try {
                    signUp($email, $pass, "email");
                } catch (Exception $e) {
                    error_log("error" . $e->getMessage());
                    $err_msg[$key] = MSG09;
                }
            } else {
                debug('バリデーョンNGです。');
            }
        }
    }
}


debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "Sign up";
require("head.php");
?>

<body>
    <div class="home">
        <div class="center">
            <?php require("logo_title.php") ?>
            <div class="formentire">
                <section class="form">
                    <form method="post">
                        <div class="emaildiv" action='login.php'>
                            <label for="email" class="<?php echo getErrMsglabel("email"); ?>">
                                <input class="email" type="text" name="email" id="email" placeholder="Email" autofocus="1" value="<?php getFormData("email"); ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("email"); ?>
                            </span>
                        </div>
                        <div class="signupinput passworddiv">
                            <label for="password" class="<?php echo getErrMsglabel("pass"); ?>">
                                <input class="password" type="password" name="pass" id="password" placeholder="Password" value="<?php getFormData("pass"); ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("pass");  ?>
                            </span>
                        </div>
                        <div class="signupinput password_retypediv">
                            <label for="password_retype" class="<?php echo getErrMsglabel("pass_re"); ?>">
                                <input class="password_retype" type="password" name="pass_re" id="password_retype" placeholder="Password retype" value="<?php getFormData("pass_re"); ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("pass_re");  ?>
                            </span>
                        </div>
                        <div class="signupinput singupdiv">
                            <input class="singup" value="Sing Up" name="singup" type="submit">
                        </div>
                        <div class="boder1">
                            <p class="box"></p>
                        </div>
                        <div class="loginPagediv">
                            <a href="login.php" class="loginPage">Login Page</a>
                        </div>
                    </form>
                </section>
                <div class="createPagediv">
                    <a href="" class="createPage">Create a Page</a> for a celebrity, band or business.
                </div>
            </div>
        </div>
    </div>
    <?php
    require("login&signup_footer.php");
    require("jsSrc.php");
    ?>
</body>

</html>