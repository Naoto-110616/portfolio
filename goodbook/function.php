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
ini_set("display_errors", "0");

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
define('MSG12', 'The old password is wrong');
define('MSG13', 'Same as the old password');
define('MSG14', 'Please enter in letters');
define('MSG15', 'incorrect');
define('MSG16', 'Expired');
define('MSG17', 'Only half-width numbers can be used');
define('SUC01', 'Password changed');
define('SUC02', 'Profile chenged');
define('SUC03', 'sent an e-mail');
define('SUC04', 'registered');

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
        $stmt = queryPost($dbh, $sql, $data, "email");
        $restult = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!empty(array_shift($restult))) {
            global $err_msg;
            $err_msg[$key] = MSG08;
        }
    } catch (Exception $e) {
        error_log("error:" . $e->getMessage());
        global $err_msg;
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
        $err_msg[$key] = MSG17;
    }
}
//DBの情報と入力情報が異なる場合にバリデーションを行う
function dbPassMatch($pass_old, $userData, $key1, $key2)
{
    //古いパスワードとDBパスワードを照合（DBに入っているデータと同じであれば、半角英数字チェックや最大文字チェックは行わなくても問題ない）
    if (!password_verify($pass_old, $userData[$key1])) {
        global $err_msg;
        $err_msg[$key2] = MSG12;
    }
}
function passNewOldMatch($pass_old, $pass_new, $key)
{
    //新しいパスワードと古いパスワードが同じかチェック
    if ($pass_old === $pass_new) {
        global $err_msg;
        $err_msg[$key] = MSG13;
    }
}
//パスワードチェック
function validPass($str, $key)
{
    //半角英数字チェック
    validHalf($str, $key);
    //最大文字数チェック
    validMaxLen($str, $key);
    //最小文字数チェック
    validMinLen($str, $key);
}
//固定長チェック
function validLength($str, $key, $len = 8)
{
    if (mb_strlen($str) !== $len) {
        global $err_msg;
        $err_msg[$key] = $len . MSG14;
    }
}
// 認証キーの同値チェック
function validAuthKeyMuth($auth_key)
{
    if ($auth_key !== $_SESSION['auth_key']) {
        global $err_msg;
        $err_msg['token'] = MSG15;
    }
}
//selectboxチェック
function validSelect($str, $key)
{
    if (!preg_match("/^[0-9]+$/", $str)) {
        global $err_msg;
        $err_msg[$key] = MSG15;
    }
}
// 期限切れのバリデーション
function validAuthKeyExpired()
{
    if (time() > $_SESSION['auth_key_limit']) {
        global $err_msg;
        $err_msg['token'] = MSG16;
    }
}
//エラーメッセージ表示
function getErrMsg($key)
{
    global $err_msg;
    if (!empty($err_msg[$key])) {
        return $err_msg[$key];
    }
}
function getErrMsglabel($key)
{
    global $err_msg;
    if (!empty($err_msg[$key])) {
        return "err";
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
function queryPost($dbh, $sql, $data, $key)
{
    //クエリー作成
    $stmt = $dbh->prepare($sql);
    //プレースホルダに値をセットし、SQL文を実行
    if (!$stmt->execute($data)) {
        debug('クエリに失敗しました。');
        $err_msg[$key] = MSG09;
        return 0;
    }
    debug('クエリ成功。');
    return $stmt;
}

// login 関数
function login($email, $pass, $pass_save, $key)
{
    //例外処理
    try {
        // DBへ接続
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'SELECT pass,id  FROM users WHERE email = :email AND delete_flg = 0';
        $data = array(':email' => $email);
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "email");
        // クエリ結果の値を取得
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        debug('クエリ結果の中身：' . print_r($result, true));

        // パスワード照合
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

            debug('セッション変数の中身：' . print_r($_SESSION, true));
            debug('マイページへ遷移します。');
            header("Location:homepage.php"); //マイページへ
        } else {
            debug('パスワードがアンマッチです。');
            $err_msg[$key] = MSG09;
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
        $err_msg[$key] = MSG07;
    }
}


// logout関数
function logout()
{
    debug('ログアウトします。');
    // セッションを削除（ログアウトする）
    session_destroy();
    debug('ログインページへ遷移します。');
    // ログインページへ
    header("Location:login.php");
}

// user登録関数
function signUp($email, $pass, $key)
{

    try {
        $dbh = dbConnect();
        $sql = 'INSERT INTO users (email, pass, login_time) VALUES (:email, :pass, :login_time)';
        $data = array(
            ':email' => $email,
            ':pass' => password_hash($pass, PASSWORD_DEFAULT),
            'login_time' => date('Y-m-d H:i:s'),
        );
        $stmt = queryPost($dbh, $sql, $data, "email");
        // singup後すぐにhomepageへ遷移する処理
        if ($stmt) {
            // session time default 1時間
            $sesLimit = 60 * 60;
            // 最終login日時を現在の時間に設定
            $_SESSION["login_date"] = time();
            $_SESSION["login_limit"] = $sesLimit;
            // user_idを格納
            $_SESSION["user_id"] = $dbh->lastInsertId();
            debug('Contents of session variables：' . print_r($_SESSION, true));
            header('Location:homepage.php');
        }
    } catch (Exception $e) {
        error_log("error" . $e->getMessage());
        $err_msg[$key] = MSG09;
    }
}

// withdraw関数
function withdraw($key)
{
    // post送信されていた場合
    if (!empty($_POST)) {
        debug('POST送信があります。');
        //例外処理
        try {
            // DBへ接続
            $dbh = dbConnect();
            // SQL文作成
            $sql = 'UPDATE users SET  delete_flg = 1 WHERE id = :us_id';
            // データ流し込み
            $data = array(':us_id' => $_SESSION['user_id']);
            // クエリ実行
            $stmt = queryPost($dbh, $sql, $data, "err");

            // クエリ実行成功の場合
            if ($stmt) {
                //セッション削除
                session_destroy();
                debug('セッション変数の中身：' . print_r($_SESSION, true));
                debug('トップページへ遷移します。');
                header("Location:login.php");
            }
        } catch (Exception $e) {
            error_log('error:' . $e->getMessage());
            $err_msg[$key] = MSG09;
        }
    }
}
// edit profile関数
function editProfile($username, $tel, $zip, $addr, $age, $email, $dbFormData, $key)
{
    //例外処理
    try {
        // DBへ接続
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'UPDATE users  SET username = :u_name, tel = :tel, zip = :zip, addr = :addr, age = :age, email = :email WHERE id = :u_id';
        $data = array(':u_name' => $username, ':tel' => $tel, ':zip' => $zip, ':addr' => $addr, ':age' => $age, ':email' => $email, ':u_id' => $dbFormData['id']);
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "common");

        // クエリ成功の場合
        if ($stmt) {
            debug('クエリ成功。');
            $_SESSION['msg_success'] = SUC02;
            debug('マイページへ遷移します。');
            header("Location:mypage.php");
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
        $err_msg[$key] = MSG09;
    }
}


//================================
// password
//================================
// chenge pass 関数
function chengePass($userData, $pass_new)
{
    //例外処理
    try {
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'UPDATE users SET pass = :pass WHERE id = :id';
        $data = array(
            ':id' => $_SESSION['user_id'],
            ':pass' => password_hash($pass_new, PASSWORD_DEFAULT)
        );
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "common");

        // クエリ成功の場合
        if ($stmt) {
            $_SESSION['msg_success'] = SUC01;

            //メールを送信
            $username = ($userData['username']) ? $userData['username'] : '名無し';
            $from = 'info@goodbook.com';
            $to = $userData['email'];
            $subject = 'パスワード変更通知｜goodbook';
            //EOTはEndOfFileの略。ABCでもなんでもいい。先頭の<<<の後の文字列と合わせること。最後のEOTの前後に空白など何も入れてはいけない。
            //EOT内の半角空白も全てそのまま半角空白として扱われるのでインデントはしないこと
            $comment = <<<EOT
                    {$username}　さん
                    パスワードが変更されました。

                    ////////////////////////////////////////
                    goodbookカスタマーセンター
                    URL  http://goodbook.com
                    E-mail info@goodbook.com
                    ////////////////////////////////////////
                    EOT;
            sendMail($from, $to, $subject, $comment);

            header("Location:mypage.php"); //マイページへ
        }
        // chengePass($userData, $pass_new);
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
        $err_msg['common'] = MSG09;
    }
}
function passRemindSend($email)
{
    //例外処理
    try {
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'SELECT count(*) FROM users WHERE email = :email AND delete_flg = 0';
        $data = array(':email' => $email);
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "email");
        // クエリ結果の値を取得
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // EmailがDBに登録されている場合
        if ($stmt && array_shift($result)) {
            debug('クエリ成功。DB登録あり。');
            $_SESSION['msg_success'] = SUC03;

            $auth_key = makeRandKey(); //認証キー生成

            //メールを送信
            $from = 'info@goodbook.com';
            $to = $email;
            $subject = '【パスワード再発行認証】｜goodbook';
            //EOTはEndOfFileの略。ABCでもなんでもいい。先頭の<<<の後の文字列と合わせること。最後のEOTの前後に空白など何も入れてはいけない。
            //EOT内の半角空白も全てそのまま半角空白として扱われるのでインデントはしないこと
            $comment = <<<EOT
                本メールアドレス宛にパスワード再発行のご依頼がありました。
                下記のURLにて認証キーをご入力頂くとパスワードが再発行されます。

                パスワード再発行認証キー入力ページ：http://localhost/Github/portfolio/goodbook/passRemindRecieve.php
                認証キー：{$auth_key}
                ※認証キーの有効期限は30分となります

                認証キーを再発行されたい場合は下記ページより再度再発行をお願い致します。
                http://localhost/Github/portfolio/goodbook/passRemindSend.php

                ////////////////////////////////////////
                goodbookカスタマーセンター
                URL  http://goodbook.com/
                E-mail info@goodbook.com
                ////////////////////////////////////////
                EOT;
            sendMail($from, $to, $subject, $comment);

            //認証に必要な情報をセッションへ保存
            $_SESSION['auth_key'] = $auth_key;
            $_SESSION['auth_email'] = $email;
            $_SESSION['auth_key_limit'] = time() + (60 * 30); //現在時刻より30分後のUNIXタイムスタンプを入れる
            debug('セッション変数の中身：' . print_r($_SESSION, true));

            header("Location:passRemindRecieve.php"); //認証キー入力ページへ

        } else {
            debug('クエリに失敗したかDBに登録のないEmailが入力されました。');
            global $err_msg;
            $err_msg['email'] = MSG09;
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
        $err_msg['email'] = MSG09;
    }
}
function passRemindRecieve($pass)
{
    //例外処理
    try {
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'UPDATE users SET pass = :pass WHERE email = :email AND delete_flg = 0';
        $data = array(
            ':email' => $_SESSION['auth_email'],
            ':pass' => password_hash($pass, PASSWORD_DEFAULT)
        );
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "email");

        // クエリ成功の場合
        if ($stmt) {
            //メールを送信
            $from = 'info@goodbook.com';
            $to = $_SESSION['auth_email'];
            $subject = '【パスワード再発行完了】｜goodbook';
            //EOTはEndOfFileの略。ABCでもなんでもいい。先頭の<<<の後の文字列と合わせること。最後のEOTの前後に空白など何も入れてはいけない。
            //EOT内の半角空白も全てそのまま半角空白として扱われるのでインデントはしないこと
            $comment = <<<EOT
                    本メールアドレス宛にパスワードの再発行を致しました。
                    下記のURLにて再発行パスワードをご入力頂き、ログインください。

                    ログインページ：http://localhost/Github/portfolio/goodbook/login.php
                    再発行パスワード：{$pass}
                    ※ログイン後、パスワードのご変更をお願い致します

                    ////////////////////////////////////////
                    goodbookカスタマーセンター
                    URL  http://goodbook.com/
                    E-mail info@goodbook.com
                    ////////////////////////////////////////
                    EOT;
            sendMail($from, $to, $subject, $comment);

            //セッション削除
            session_unset();
            $_SESSION['msg_success'] = SUC03;
            debug('セッション変数の中身：' . print_r($_SESSION, true));

            header("Location:login.php"); //ログインページへ
        }
        // passRemindRecieve($pass);
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
        $err_msg['token'] = MSG09;
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
        $sql = 'SELECT * FROM users  WHERE id = :u_id AND delete_flg = 0';
        $data = array(':u_id' => $u_id);
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "common");
        if ($stmt) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
    }
}
// フォーム入力保持
function getFormData($str)
{
    global $dbFormData;
    if (!empty($dbFormData)) {
        if (!empty($err_msg[$str])) {
            if (isset($_POST[$str])) {
                return $_POST[$str];
            } else {
                return $dbFormData[$str];
            }
        } else {
            if (isset($_POST[$str]) && $_POST[$str] !== $dbFormData[$str]) {
                return $_POST[$str];
            } else {
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
function getProduct($u_id, $p_id)
{
    debug('商品情報を取得します。');
    debug('ユーザーID：' . $u_id);
    debug('商品ID：' . $p_id);
    //例外処理
    try {
        // DBへ接続
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'SELECT * FROM product WHERE user_id = :u_id AND id = :p_id AND delete_flg = 0';
        $data = array(':u_id' => $u_id, ':p_id' => $p_id);
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "product");

        if ($stmt) {
            // クエリ結果のデータを１レコード返却
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
    }
}
function getCategory()
{
    debug('カテゴリー情報を取得します。');
    //例外処理
    try {
        // DBへ接続
        $dbh = dbConnect();
        // SQL文作成
        $sql = 'SELECT * FROM category';
        $data = array();
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "category");

        if ($stmt) {
            // クエリ結果の全データを返却
            return $stmt->fetchAll();
        } else {
            return false;
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
    }
}
//================================
// メール送信
//================================
function sendMail($from, $to, $subject, $comment)
{
    if (!empty($to) && !empty($subject) && !empty($comment)) {
        //文字化けしないように設定（お決まりパターン）
        mb_language("Japanese"); //現在使っている言語を設定する
        mb_internal_encoding("UTF-8"); //内部の日本語をどうエンコーディング（機械が分かる言葉へ変換）するかを設定

        //メールを送信（送信結果はtrueかfalseで返ってくる）
        $result = mb_send_mail($to, $subject, $comment, "From: " . $from);
        //送信結果を判定
        if ($result) {
            debug('メールを送信しました。');
        } else {
            debug('【エラー発生】メールの送信に失敗しました。');
        }
    }
}

//================================
// 画面表示
//================================
// loginしている場合とそうでない場合での表示を変える
function notLoggedMsg($key1, $key2)
{
    // ログインしている場合
    if (!empty($_SESSION['login_date'])) {
        echo $key1;
    } else {
        echo $key2;
    }
}
// userinfo表示
function userInfoIndicate($dbFormData, $key)
{
    if (!empty($dbFormData[$key])) {
        echo $dbFormData[$key];
    } else {
        echo "Not entered";
    };
}

//================================
// other
//================================
//sessionを１回だけ取得できる
function getSessionFlash($key)
{
    if (!empty($_SESSION[$key])) {
        $data = $_SESSION[$key];
        $_SESSION[$key] = '';
        return $data;
    }
}
//認証キー生成
function makeRandKey($length = 8)
{
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
    $str = '';
    for ($i = 0; $i < $length; ++$i) {
        $str .= $chars[mt_rand(0, 61)];
    }
    return $str;
}
function showVariable($var)
{
    echo "<pre>";
    echo var_dump($var);
    echo "<pre>";
}
// 画像処理
function uploadImg($file, $key)
{
    debug('画像アップロード処理開始');
    debug('FILE情報：' . print_r($file, true));

    if (isset($file['error']) && is_int($file['error'])) {
        try {
            // バリデーション
            // $file['error'] の値を確認。配列内には「UPLOAD_ERR_OK」などの定数が入っている。
            //「UPLOAD_ERR_OK」などの定数はphpでファイルアップロード時に自動的に定義される。定数には値として0や1などの数値が入っている。
            switch ($file['error']) {
                case UPLOAD_ERR_OK: // OK
                    break;
                case UPLOAD_ERR_NO_FILE:   // ファイル未選択の場合
                    throw new RuntimeException('ファイルが選択されていません');
                case UPLOAD_ERR_INI_SIZE:  // php.ini定義の最大サイズが超過した場合
                case UPLOAD_ERR_FORM_SIZE: // フォーム定義の最大サイズ超過した場合
                    throw new RuntimeException('ファイルサイズが大きすぎます');
                default: // その他の場合
                    throw new RuntimeException('その他のエラーが発生しました');
            }

            // $file['mime']の値はブラウザ側で偽装可能なので、MIMEタイプを自前でチェックする
            // exif_imagetype関数は「IMAGETYPE_GIF」「IMAGETYPE_JPEG」などの定数を返す
            $type = @exif_imagetype($file['tmp_name']);
            if (!in_array($type, [IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_PNG], true)) { // 第三引数にはtrueを設定すると厳密にチェックしてくれるので必ずつける
                throw new RuntimeException('画像形式が未対応です');
            }

            // ファイルデータからSHA-1ハッシュを取ってファイル名を決定し、ファイルを保存する
            // ハッシュ化しておかないとアップロードされたファイル名そのままで保存してしまうと同じファイル名がアップロードされる可能性があり、
            // DBにパスを保存した場合、どっちの画像のパスなのか判断つかなくなってしまう
            // image_type_to_extension関数はファイルの拡張子を取得するもの
            $path = 'uploads/' . sha1_file($file['tmp_name']) . image_type_to_extension($type);

            if (!move_uploaded_file($file['tmp_name'], $path)) { //ファイルを移動する
                throw new RuntimeException('ファイル保存時にエラーが発生しました');
            }
            // 保存したファイルパスのパーミッション（権限）を変更する
            chmod($path, 0644);

            debug('ファイルは正常にアップロードされました');
            debug('ファイルパス：' . $path);
            return $path;
        } catch (RuntimeException $e) {

            debug($e->getMessage());
            global $err_msg;
            $err_msg[$key] = $e->getMessage();
        }
    }
}
