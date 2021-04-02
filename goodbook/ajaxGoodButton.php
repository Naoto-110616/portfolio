<?php
//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　Ajax　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//================================
// Ajax処理
//================================

// postがあり、ユーザーIDがあり、ログインしている場合
debug(print_r($_POST, true));
if (isset($_POST['postId']) && isset($_SESSION['user_id']) && isLogin()) {
    debug('POST送信があります。');
    $p_id = $_POST['postId'];
    debug('postID：' . $p_id);
    //例外処理
    try {
        // DBへ接続
        $dbh = dbConnect();
        // レコードがあるか検索
        $sql = 'SELECT * FROM goodbutton WHERE post_id = :p_id AND user_id = :u_id';
        $data = array(':u_id' => $_SESSION['user_id'], ':p_id' => $p_id);
        // クエリ実行
        $stmt = queryPost($dbh, $sql, $data, "common");
        $resultCount = $stmt->rowCount();
        debug($resultCount);
        // レコードが１件でもある場合
        if (!empty($resultCount)) {
            // レコードを削除する
            $sql = 'DELETE FROM goodbutton WHERE post_id = :p_id AND user_id = :u_id';
            $data = array(':u_id' => $_SESSION['user_id'], ':p_id' => $p_id);
            // クエリ実行
            $stmt = queryPost($dbh, $sql, $data, "common");
        } else {
            // レコードを挿入する
            $sql = 'INSERT INTO goodbutton (post_id, user_id, create_date) VALUES (:p_id, :u_id, :date)';
            $data = array(':u_id' => $_SESSION['user_id'], ':p_id' => $p_id, ':date' => date('Y-m-d H:i:s'));
            // クエリ実行
            $stmt = queryPost($dbh, $sql, $data, "common");
        }
    } catch (Exception $e) {
        error_log('エラー発生:' . $e->getMessage());
    }
}
debug('Ajax処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
