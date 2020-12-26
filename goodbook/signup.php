<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug("「 signup");
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

if (!empty($_POST)) {
    debug('POST送信があります。');

    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $pass_retype = $_POST['pass_retype'];

    validEmail($email, "email");
    validMaxLen($email, "email");
    validEmailDup($email, "email");

    validHalf($pass, "pass");
    validMaxLen($pass, "pass");
    validMinLen($pass, "pass");

    validMaxLen($pass_retype, "pass_retype");
    validMinLen($pass_retype, "pass_retype");

    validRequired($email, "email");
    validRequired($pass, "pass");
    validRequired($pass_retype, "pass_retype");

    if (empty($err_msg)) {

        validMatch($pass, $pass_retype, "pass");
    }
    if (empty($err_msg)) {
        debug('バリデーョンOKです。');

        try {
            $dbh = dbConnect();
            signUp($email, $pass, $dbh);
        } catch (Exception $e) {
            error_log("error" . $e->getMessage());
            $err_msg["mail"] = MSG09;
        }
    } else {
        debug('バリデーョンNGです。');
    }
}
debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>goodbook - Sing up</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div class="home">
        <div class="center">
            <?php require("logo_title.php") ?>
            <div class="formentire">
                <section class="form">
                    <form method="post">
                        <div class="emaildiv" action='login.php'>
                            <label for="email" class="<?php if (!empty($err_msg['email'])) echo 'err'; ?>">
                                <input class="email" type="text" name="email" id="email" placeholder="Email" autofocus="1" value="<?php if (!empty($_POST['email'])) echo $_POST['email']; ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php if (!empty($err_msg['email'])) echo $err_msg['email']; ?>
                            </span>
                        </div>
                        <div class="signupinput passworddiv">
                            <label for="password" class="<?php if (!empty($err_msg['pass'])) echo 'err'; ?>">
                                <input class="password" type="password" name="pass" id="password" placeholder="Password" value="<?php if (!empty($_POST['pass'])) echo $_POST['pass']; ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php if (!empty($err_msg['pass'])) echo $err_msg['pass']; ?>
                            </span>
                        </div>
                        <div class="signupinput password_retypediv">
                            <label for="password_retype" class="<?php if (!empty($err_msg['pass_retype'])) echo 'err'; ?>">
                                <input class="password_retype" type="password" name="pass_retype" id="password_retype" placeholder="Password retype" value="<?php if (!empty($_POST['pass_retype'])) echo $_POST['pass_retype']; ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php if (!empty($err_msg['pass_retype'])) echo $err_msg['pass_retype']; ?>
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
    <?php require("login&signup_footer.php") ?>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>