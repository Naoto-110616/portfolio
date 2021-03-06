<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug("「 signup page");
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

// signUp(isset($email), isset($pass), isset($pass_re), "email");
signUp($email, $pass, $pass_re, "email");


debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "sign up";
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
                                <input class="email js-form-validate-signup" type="text" name="email" id="email" placeholder="Email" autofocus="1" value="<?php echo getFormData("email"); ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("email"); ?>
                            </span>
                        </div>
                        <div class="signupinput passworddiv">
                            <label for="password" class="<?php echo getErrMsglabel("pass"); ?>">
                                <input class="password js-form-validate-signup" type="password" name="pass" id="password" placeholder="Password" value="<?php echo getFormData("pass"); ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("pass");  ?>
                            </span>
                        </div>
                        <div class="signupinput password_retypediv">
                            <label for="password_retype" class="<?php echo getErrMsglabel("pass_re"); ?>">
                                <input class="password_retype js-form-validate-signup" type="password" name="pass_re" id="password_retype" placeholder="Password retype" value="<?php echo getFormData("pass_re"); ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php echo getErrMsg("pass_re");  ?>
                            </span>
                        </div>
                        <div class="signupinput singupdiv">
                            <input class="singup js-disabled-submit" value="Sing Up" name="singup" type="submit" disabled="disabled">
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
    require("jssrc.php");
    ?>
</body>

</html>