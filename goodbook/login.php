<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　login page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

auth();

login($email, $pass, $pass_save, "email");

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
            <div class="title">
                <h1>goodbook</h1>
            </div>
            <div class="formentire">
                <form method="post" class="form">
                    <div class="logininput emaildiv">
                        <label for="email" class="<?php echo getErrMsglabel("email"); ?>">
                            <input class="email js-form-validate-login js-auto-input-email" type="text" name="email" id="email" placeholder="Email" autofocus="1" value="<?php echo getFormData("email"); ?>">
                        </label>
                        <div class="help-block"></div>
                        <span class="err_msg"><?php echo getErrMsg("email") ?>
                        </span>
                    </div>
                    <div class="logininput passworddiv">
                        <label for="password" class="<?php echo getErrMsglabel("pass"); ?>">
                            <input class="password js-form-validate-login js-auto-input-pass" type="password" name="pass" id="password" placeholder="Password" value="<?php echo getFormData("pass"); ?>">
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
                            <input class="login js-disabled-submit" type="submit" value="Login" name='login' id="login">
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
                <div class="createPagediv">
                    <a href="" class="createPage">Create a Page</a> for a celebrity, band or business.
                    <form method="post">
                        <input type="button" class="button-auto-login js-auto-login" value="auto login">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="portfolio-top-sp">
        <p><a href="../Portfolio.php" class="portfolio">portfolio top</a></p>
    </div>
    <?php
    require("login&signup_footer.php");
    require("jssrc.php");
    ?>
</body>

</html>