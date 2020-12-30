<?php


//================================
// log
//================================

// errorlevel
error_reporting(E_ALL);
//ログを取るか
ini_set('log_errors', 'On');
// logの出力ファイルを指定
ini_set('error_log', 'php.log');


//================================
// デバッグ
//================================

//デバッグフラグ
$debug_flg = true;
//デバッグログ関数
function debug($str)
{
    global $debug_flg;
    if (!empty($debug_flg)) {
        error_log('debug：' . $str);
    }
}

//================================
// session準備・session有効期限を延ばす
//================================

//sessionfileの置き場を変更する（/var/tmp/以下に置くと30日は削除されない）
session_save_path("/var/tmp/");
//ガーベージコレクションが削除するセッションの有効期限を設定（30日以上経っているものに対してだけ１００分の１の確率で削除）
ini_set('session.gc_maxlifetime', 60 * 60 * 24 * 30);
//ブラウザを閉じても削除されないようにクッキー自体の有効期限を延ばす
ini_set('session.cookie_lifetime ', 60 * 60 * 24 * 30);
//セッションを使う
session_start();
//現在のセッションIDを新しく生成したものと置き換える（なりすましのセキュリティ対策）
session_regenerate_id();


//================================
// 画面表示処理開始ログ吐き出し関数
//================================
function debugLogStart()
{
    debug('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 画面表示処理開始');
    // session idの表示
    debug('session ID：' . session_id());
    // print_rで$_SESSIONの中身を表示
    debug('session variable：' . print_r($_SESSION, true));
    // time関数で現在のタイムスタンプで表示
    debug('現在日時タイムスタンプ：' . time());
    // login_date=現在のタイムスタンプ,login_limit=残りのloginしておける時間
    if (!empty($_SESSION['login_date']) && !empty($_SESSION['login_limit'])) {
        // 上の二つに値が合った場合，loginしておける期日=(login_date+login_limit)を表示
        debug('ログイン期限日時タイムスタンプ：' . ($_SESSION['login_date'] + $_SESSION['login_limit']));
    }
}


//================================
//定数
//================================

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
define('MSG10', 'Not in the form of phone num');
define('MSG11', 'Not in the form of zip code');


//================================
// validation 関数
//================================

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
        $sql = "SELECT count(*) FROM users WHERE email = :email AND delete_flg = 0";
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
// validation password最大文字数check
function validMaxLen($str, $key, $max = 255)
{
    if (mb_strlen($str) > $max) {
        global $err_msg;
        $err_msg[$key] = MSG06;
    }
}
//電話番号形式チェック
function validTel($str, $key)
{
    if (!preg_match("/0\d{1,4}\d{1,4}\d{4}/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG10;
    }
}
//郵便番号形式チェック
function validZip($str, $key)
{
    if (!preg_match("/^\d{7}$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG11;
    }
}
//半角数字チェック
function validNumber($str, $key)
{
    if (!preg_match("/^[0-9]+$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG11;
    }
}


//================================
// data base
//================================

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
function login($email, $pass, $dbh, $pass_save, $key1, $key2)
{
    $sql = "SELECT pass,id FROM users WHERE email = :email AND delete_flg = 0 ";
    $data = array(':email' => $email);
    $stmt = queryPost($dbh, $sql, $data);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    debug('クエリ結果の中身：' . print_r($result, true));
    if (!empty($result) && password_verify($pass, array_shift($result))) {
        debug('パスワードがマッチしました。');

        //ログイン有効期限（デフォルトを１時間とする）
        $sesLimit = 60 * 60;
        // 最終ログイン日時を現在日時に
        $_SESSION['login_date'] = time(); //time関数は1970年1月1日 00:00:00 を0として、1秒経過するごとに1ずつ増加させた値が入る

        // ログイン保持にチェックがある場合
        if ($pass_save) {
            debug('ログイン保持にチェックがあります。');
            // ログイン有効期限を30日にしてセット
            $_SESSION['login_limit'] = $sesLimit * 24 * 30;
        } else {
            debug('ログイン保持にチェックはありません。');
            // 次回からログイン保持しないので、ログイン有効期限を1時間後にセット
            $_SESSION['login_limit'] = $sesLimit;
        }
        // ユーザーIDを格納
        $_SESSION['user_id'] = $result['id'];
        // 変数$_SESSIONの中身を表示
        debug('Contents of session variables：' . print_r($_SESSION, true));
        debug('Move to Homepage');
        header("Location:homepage.php");
    } else {
        global $err_msg;
        $err_msg[$key1] = MSG07;
        $err_msg[$key2] = MSG07;
    }
}

// user登録関数
function signUp($email, $pass, $dbh, $key)
{
    $sql = 'INSERT INTO users (email, pass, login_time) VALUES (:email, :pass, :login_time)';
    $data = array(
        ':email' => $email,
        ':pass' => password_hash($pass, PASSWORD_DEFAULT),
        'login_time' => date('Y-m-d H:i:s')
    );
    $stmt = queryPost($dbh, $sql, $data);

    // singup後すぐにhomepageへ遷移する処理
    if ($stmt) {
        // session time default 1時間
        $sesLimit = 60 * 60;
        // 最終login日時を現在の時間に設定
        $_SESSION["login_data"] = time();
        $_SESSION["login_limit"] = $sesLimit;
        // user_idを格納
        $_SESSION["user_id"] = $dbh->lastInsertId();
        debug('Contents of session variables：' . print_r($_SESSION, true));
        header('Location:homepage.php');
    } else {
        error_log("The query failed");
        $err_msg[$key] = MSG09;
    }
}

// withdraw関数
function withdraw($key)
{
    // DBへ接続
    $dbh = dbConnect();
    // SQL文作成
    $sql = 'UPDATE users SET  delete_flg = 1 WHERE id = :us_id';
    // データ流し込み
    $data = array(':us_id' => $_SESSION['user_id']);
    // クエリ実行
    $stmt = queryPost($dbh, $sql, $data);

    // クエリ実行成功の場合
    if ($stmt) {
        //セッション削除
        session_destroy();
        debug('セッション変数の中身：' . print_r($_SESSION, true));
        debug('トップページへ遷移します。');
        header("Location:login.php");
    } else {
        debug('クエリが失敗しました。');
        $err_msg[$key] = MSG09;
    }
}

// edit plofile関数
function editProfile($username, $tel, $zip, $addr, $age, $email, $dbFormData, $key)
{
    // DBへ接続
    $dbh = dbConnect();
    // SQL文作成
    $sql = 'UPDATE users  SET username = :u_name, tel = :tel, zip = :zip, addr = :addr, age = :age, email = :email WHERE id = :u_id';
    $data = array(':u_name' => $username, ':tel' => $tel, ':zip' => $zip, ':addr' => $addr, ':age' => $age, ':email' => $email, ':u_id' => $dbFormData['id']);
    // クエリ実行
    $stmt = queryPost($dbh, $sql, $data);

    // クエリ成功の場合
    if ($stmt) {
        debug('クエリ成功。');
        debug('マイページへ遷移します。');
        header("Location:mypage.php"); //マイページへ
    } else {
        debug('クエリに失敗しました。');
        $err_msg[$key] = MSG09;
    }
}

// user情報を取得
function getUser($u_id)
{
    debug('ユーザー情報を取得します。');
    //例外処理
    try {
        // DBへ接続
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'SELECT * FROM users  WHERE id = :u_id';
        $data = array(':u_id' => $u_id);
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data);

        // クエリ成功の場合
        if ($stmt) {
            debug('クエリ成功。');
        } else {
            debug('クエリに失敗しました。');
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
    }
    // クエリ結果のデータを返却
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// フォーム入力保持
function getFormData($str)
{
    global $dbFormData;
    // ユーザーデータがある場合
    if (!empty($dbFormData)) {
        //フォームのエラーがある場合
        if (!empty($err_msg[$str])) {
            //POSTにデータがある場合
            if (isset($_POST[$str])) { //金額や郵便番号などのフォームで数字や数値の0が入っている場合もあるので、issetを使うこと
                return $_POST[$str];
            } else {
                //ない場合（フォームにエラーがある＝POSTされてるハズなので、まずありえないが）はDBの情報を表示
                return $dbFormData[$str];
            }
        } else {
            //POSTにデータがあり、DBの情報と違う場合（このフォームも変更していてエラーはないが、他のフォームでひっかかっている状態）
            if (isset($_POST[$str]) && $_POST[$str] !== $dbFormData[$str]) {
                return $_POST[$str];
            } else { //そもそも変更していない
                return $dbFormData[$str];
            }
        }
    } else {
        if (isset($_POST[$str])) {
            return $_POST[$str];
        }
    }
}

//================================
// ログイン認証・自動ログアウト
//================================

function auth()
{
    // ログインしている場合
    if (!empty($_SESSION['login_date'])) {
        debug('ログイン済みユーザーです。');

        // 現在日時が最終ログイン日時＋有効期限を超えていた場合
        if (($_SESSION['login_date'] + $_SESSION['login_limit']) < time()) {
            debug('ログイン有効期限オーバーです。');

            // セッションを削除（ログアウトする）
            session_destroy();
            // ログインページへ
            header("Location:login.php");
        } else {
            debug('ログイン有効期限以内です。');
            //最終ログイン日時を現在日時に更新
            $_SESSION['login_date'] = time();

            //現在実行中のスクリプトファイル名がlogin.phpの場合
            //$_SERVER['PHP_SELF']はドメインからのパスを返すため、今回だと[/goodbook/login.php]が返ってくるので、
            //さらにbasename関数を使うことでファイル名だけを取り出せる
            if (basename($_SERVER['PHP_SELF']) === 'login.php') {
                debug('Move to Homepage');
                header("Location:homepage.php");
            }
        }
    } else {
        debug('未ログインユーザーです。');
        if (basename($_SERVER['PHP_SELF']) !== 'login.php') {
            header("Location:login.php"); //ログインページへ
        }
    }
}

//================================
// other
//================================

function showVariable($var)
{
    echo "<pre>";
    echo var_dump($var);
    echo "<pre>";
}
