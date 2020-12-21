<?php


// -----------------------------------
// log
// -----------------------------------

// errorlevel
error_reporting(E_ALL);
//ログを取るか
ini_set('log_errors', 'On');
// logの出力ファイルを指定
ini_set('error_log', 'php.log');


// -----------------------------------
//定数
// -----------------------------------

// errormessageを定数に設定
define('MSG01', 'Input Required');
define('MSG02', 'Not in the form of email');
define('MSG03', 'password (retype) does not match');
define('MSG04', 'Half-width alphanumeric characters only');
define('MSG05', 'Please enter at least 6 characters');
define('MSG06', 'Please enter within 255 characters');
define('MSG07', 'mail or password does not match');
define('MSG08', 'This email is already registered');
define('MSG09', 'An error has occurred, Please try again after a while');


// -----------------------------------
// validation function
// -----------------------------------

// errormessage格納用の配列
$err_msg = array();

// validation 未入力check
function validRequired($str, $key)
{
    if (empty($str)) {
        global $err_msg;
        $err_msg[$key] = MSG01;
    }
}
// validation email形式check
function validEmail($str, $key)
{
    if (!preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG02;
    }
}
// validation email重複check
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
            $err_msg[$key] = MSG08;
        }
    } catch (Exception $e) {
        error_log("error:" . $e->getMessage());
        $err_msg[$key] = MSG09;
    }
}
// validation password同値check
function validMatch($str1, $str2, $key)
{
    if ($str1 !== $str2) {
        global $err_msg;
        $err_msg[$key] = MSG03;
    }
}
// validation 半角check
function validHalf($str, $key)
{
    if (!preg_match("/^[a-zA-Z0-9]+$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG04;
    }
}
// validation password最小文字数check
function validMinLen($str, $key, $min = 6)
{
    if (mb_strlen($str) < $min) {
        global $err_msg;
        $err_msg[$key] = MSG05;
    }
}
function validMaxLen($str, $key, $max = 255)
{
    if (mb_strlen($str) > $max) {
        global $err_msg;
        $err_msg[$key] = MSG06;
    }
}


// -----------------------------------
// data base
// -----------------------------------

// db接続関数
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

// SQL実行関数
function queryPost($dbh, $sql, $data)
{
    $stmt = $dbh->prepare($sql);
    $stmt->execute($data);
    return $stmt;
}
// login 関数
function login($email, $pass, $dbh, $key1, $key2)
{
    $stmt = $dbh->prepare('SELECT * FROM users WHERE email = :email AND pass = :pass');

    $stmt->execute(array(':email' => $email, ':pass' => $pass));

    $result = 0;

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!empty($result)) {
        session_start();

        $_SESSION['login'] = true;

        header("Location:homepage.php");
    } else {
        global $err_msg;
        $err_msg[$key1] = MSG07;
        $err_msg[$key2] = MSG07;
    }
}
// user登録関数
function signUp($email, $pass, $dbh)
{
    $stmt = $dbh->prepare('INSERT INTO users (email, pass, login_time) VALUES (:email, :pass, :login_time)');

    $stmt->execute(array(':email' => $email, ':pass' => password_hash($pass, PASSWORD_DEFAULT), 'login_time' => date('Y-m-d H:i:s')));

    header('Location:login.php');
}
