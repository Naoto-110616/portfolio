<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

define('MSG01', 'Input Required');
define('MSG02', 'Not in the form of email');
define('MSG03', 'password (retype) does not match');
define('MSG04', 'Half-width alphanumeric characters only');
define('MSG05', '6 characters or more');
define('MSG06', 'This email is already registered');
define('MSG07', 'An error has occurred, Please try again after a while');

$err_msg = array();
$dbh;

function validRequired($str, $key)
{
    if (empty($str)) {
        global $err_msg;
        $err_msg[$key] = MSG01;
    }
}
function validEmail($str, $key)
{
    if (!preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG02;
    }
}
function validMatch($str1, $str2, $key)
{
    if ($str1 !== $str2) {
        global $err_msg;
        $err_msg[$key] = MSG03;
    }
}
function validHalf($str, $key)
{
    if (!preg_match("/^[a-zA-Z0-9]+$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG04;
    }
}
function validMinLen($str, $key, $min = 6)
{
    if (mb_strlen($str) < $min) {
        global $err_msg;
        $err_msg[$key] = MSG05;
    }
}
function validEmailDup($email, $key)
{
    global $err_msg;
    try {
        $dbh = dbConnect();
        $sql = "SELECT count(*) FROM users WHERE email = :email";
        $data = array(":email" => $email);
        $stmt = queryPost($dbh, $sql, $data);
        $restult = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!empty(array_shift($restult))) {
            $err_msg[$key] = MSG06;
        }
    } catch (Exception $e) {
        error_log("error:" . $e->getMessage());
        $err_msg[$key] = MSG07;
    }
}
function queryPost($dbh, $sql, $data)
{
    $stmt = $dbh->prepare($sql);
    $stmt->execute($data);
    return $stmt;
}
function dbConnect()
{
    $dsn = 'mysql:dbname=goodbook;host=localhost;charset=utf8';
    $user = 'root';
    $password = 'root';
    $options = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
    );
    $dbh = new PDO($dsn, $user, $password, $options);
    return $dbh;
}
function signUp($email, $pass, $dbh)
{
    $stmt = $dbh->prepare('INSERT INTO users (email, pass, login_time) VALUES (:email, :pass, :login_time)');

    $stmt->execute(array(':email' => $email, ':pass' => $pass, 'login_time' => date('Y-m-d H:i:s')));

    header('Location:login.php');
}

if (!empty($_POST)) {

    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $pass_retype = $_POST['pass_retype'];

    validRequired($email, "email");
    validRequired($pass, "pass");
    validRequired($pass_retype, "pass_retype");

    if (empty($err_msg)) {

        validEmail($email, "email");
        validEmailDup($email, "email");
        validHalf($pass, "pass");
        validMinLen($pass, "pass");
    }
    if (empty($err_msg)) {

        validMatch($pass, $pass_retype, "pass");
    }
    if (empty($err_msg)) {

        dbConnect();
        signUp($email, $pass, $dbh);
    }
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>goodbook - Sing up</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/reset.css">
</head>

<body>
    <div class="home">
        <div class="center">
            <div class="left">
                <div class="logo">
                    <img class="icon" src="img/Facebook-Logo1.png">
                </div>
                <div class="massage">
                    <h2 class="massage1">
                        Connect with friends and the world <br>
                        around you on Facebook.
                    </h2>
                </div>
            </div>
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
                        <div class="passworddiv">
                            <label for="password" class="<?php if (!empty($err_msg['pass'])) echo 'err'; ?>">
                                <input class="password" type="password" name="pass" id="password" placeholder="Password" value="<?php if (!empty($_POST['pass'])) echo $_POST['pass']; ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php if (!empty($err_msg['pass'])) echo $err_msg['pass']; ?>
                            </span>
                        </div>
                        <div class="password_retypediv">
                            <label for="password_retype" class="<?php if (!empty($err_msg['pass_retype'])) echo 'err'; ?>">
                                <input class="password_retype" type="password" name="pass_retype" id="password_retype" placeholder="Password retype" value="<?php if (!empty($_POST['pass_retype'])) echo $_POST['pass_retype']; ?>">
                            </label>
                            <div class="help-block"></div>
                            <span class="err_msg"><?php if (!empty($err_msg['pass_retype'])) echo $err_msg['pass_retype']; ?>
                            </span>
                        </div>
                        <div class="singupdiv">
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
    <footer class="foo">
        <div class="foodiv">
            <ul class="language">
                <li>English(US)</li>
                <li class="interval"><a href="">日本語</a></li>
                <li class="interval"><a href="">Português (Brasil)</a></li>
                <li class="interval"><a href="">中文(简体)</a></li>
                <li class="interval"><a href="">Tiếng Việt</a></li>
                <li class="interval"><a href="">Español</a></li>
                <li class="interval"><a href="">Bahasa Indonesia</a></li>
                <li class="interval"><a href="">한국어</a></li>
                <li class="interval"><a href="">Français (France)</a></li>
                <li class="interval"><a href="">Deutsch</a></li>
                <li class="interval"><a href="">Italiano</a></li>
            </ul>
            <div class="boder2">
                <p class="box"></p>
            </div>
            <div class="listdiv">
                <ul class="list">
                    <li class="interval"><a href="">Sign Up</a></li>
                    <li class="interval"><a href="">Log In</a></li>
                    <li class="interval"><a href="">Messenger</a></li>
                    <li class="interval"><a href="">Facebook Lite</a></li>
                    <li class="interval"><a href="">Watch</a></li>
                    <li class="interval"><a href="">People</a></li>
                    <li class="interval"><a href="">Pages</a></li>
                    <li class="interval"><a href="">Page Categories</a></li>
                    <li class="interval"><a href="">Places</a></li>
                    <li class="interval"><a href="">Games</a></li>
                    <li class="interval"><a href="">Locations</a></li>
                    <li class="interval"><a href="">Marketplace</a></li>
                    <li class="interval"><a href="">Facebook Pay</a></li>
                    <li class="interval"><a href="">Groups</a></li>
                    <li class="interval"><a href="">Oculus</a></li>
                    <li class="interval"><a href="">Portal</a></li>
                    <li class="interval"><a href="">Instagram</a></li>
                    <li class="interval"><a href="">Local</a></li>
                    <li class="interval"><a href="">Fundraisers</a></li>
                    <li class="interval"><a href="">Services</a></li>
                    <li class="interval"><a href="">Voting Information Center</a></li>
                    <li class="interval"><a href="">About</a></li>
                    <li class="interval"><a href="">Create Ad</a></li>
                    <li class="interval"><a href="">Create Page</a></li>
                    <li class="interval"><a href="">Developers</a></li>
                    <li class="interval"><a href="">Careers</a></li>
                    <li class="interval"><a href="">Privacy</a></li>
                    <li class="interval"><a href="">Cookies</a></li>
                    <li class="interval"><a href="">Ad Choices</a></li>
                    <li class="interval"><a href="">Terms</a></li>
                    <li class="interval"><a href="">Help</a></li>
                </ul>
            </div>
            <div class="spandiv">
                <span class="span">goodbook © 2020</span>
            </div>
            <div class="portfolio-top">
                <p><a href="../Portfolio.html" class="portfolio">portfolio top</a></p>
            </div>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>