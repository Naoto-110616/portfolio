<?php require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 msg page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

//================================
// 画面処理
//================================
$partnerUserId = '';
$partnerUserInfo = '';
$myUserInfo = '';
// 画面表示用データ取得
//================================
// GETパラメータを取得
$m_id = (!empty($_GET['m_id'])) ? $_GET['m_id'] : '';
// DBから掲示板とメッセージデータを取得
$viewData = getMsgsAndBord($m_id);
debug('取得したDBデータ：' . print_r($viewData, true));
// パラメータに不正な値が入っているかチェック
if (empty($viewData)) {
    error_log('エラー発生:指定ページに不正な値が入りました');
    header("Location:mypage.php"); //マイページへ
}
// viewDataから相手のユーザーIDを取り出す
$dealUserIds[] = $viewData[0]['send_user'];
$dealUserIds[] = $viewData[0]['receive_user'];
if (($key = array_search($_SESSION['user_id'], $dealUserIds)) !== false) {
    unset($dealUserIds[$key]);
}
debug(print_r($dealUserIds, true));
$partnerUserId = array_shift($dealUserIds);
debug('取得した相手のユーザーID：' . $partnerUserId);
// DBから取引相手のユーザー情報を取得
if (isset($partnerUserId)) {
    $partnerUserInfo = getUser($partnerUserId);
}
// 相手のユーザー情報が取れたかチェック
if (empty($partnerUserInfo)) {
    error_log('エラー発生:相手のユーザー情報が取得できませんでした');
    header("Location:mypage.php"); //マイページへ
}
// DBから自分のユーザー情報を取得
$myUserInfo = getUser($_SESSION['user_id']);
debug('取得したユーザデータ：' . print_r($partnerUserInfo, true));
// 自分のユーザー情報が取れたかチェック
if (empty($myUserInfo)) {
    error_log('エラー発生:自分のユーザー情報が取得できませんでした');
    header("Location:mypage.php"); //マイページへ
}
createMsg($m_id, $partnerUserId);
$dbFormData = getUser($_SESSION['user_id']);
debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

?>

<?php
$siteTitle = 'msg';
require('goodbook_head.php');
?>

<body class="page-msg page-1colum">
    <!-- メニュー -->
    <?php
    require('goodbook_header.php');
    ?>
    <!-- メインコンテンツ -->
    <div id="contents" class="site-width">
        <!-- Main -->
        <section id="main">
            <div class="msg-info">
                <div class="avatar-img">
                    <a href="userDetail.php<?php echo (!empty(appendGetParam())) ? appendGetParam() . '&u_id=' . $partnerUserInfo['id'] : '?u_id=' . $partnerUserInfo['id']; ?>" class="">
                        <img src="<?php echo showImg(sanitize($partnerUserInfo['profpic'])); ?>" alt="" class="avatar"><br>
                    </a>
                </div>
                <div class="avatar-info">
                    <?php echo sanitize($partnerUserInfo['username']) . ' ' . sanitize($partnerUserInfo['age']) . '歳' ?><br>
                    〒<?php echo sanitize($partnerUserInfo['zip']); ?><br>
                    <?php echo sanitize($partnerUserInfo['addr']); ?><br>
                    TEL：<?php echo sanitize($partnerUserInfo['tel']); ?>
                </div>
            </div>
            <div class="area-bord" id="js-scroll-bottom">
                <?php
                if (!empty($viewData[0]["msg"])) {
                    foreach ($viewData as $key => $val) {
                        if (!empty($val['from_user']) && $val['from_user'] == $partnerUserId) {
                ?>
                            <div class="msg-cnt msg-left">
                                <div class="avatar">
                                    <img src="<?php echo sanitize(showImg($partnerUserInfo['profpic'])); ?>" alt="" class="avatar">
                                    <div class="date_send"><?php echo createTime($val['send_date']); ?></div>
                                </div>
                                <p class="msg-inrTxt">
                                    <span class="triangle"></span>
                                    <?php echo sanitize($val['msg']); ?>
                                </p>
                            </div>
                        <?php
                        } else {
                        ?>
                            <div class="msg-cnt msg-right">
                                <p class="msg-inrTxt">
                                    <span class="triangle"></span>
                                    <?php echo sanitize($val['msg']); ?>
                                </p>
                                <div class="avatar">
                                    <img src="<?php echo sanitize(showImg($myUserInfo['profpic'])); ?>" alt="" class="avatar">
                                    <div class="date_send"><?php echo createTime($val['send_date']); ?></div>
                                </div>
                            </div>
                    <?php
                        }
                    }
                } else { ?>
                    <p style="text-align:center;line-height:20;">メッセージ投稿はまだありません</p>
                <?php } ?>

            </div>
            <div class="area-send-msg">
                <form action="" method="post">
                    <textarea name="msg" cols="30" rows="3"></textarea>
                    <input type="submit" value="send" class="btn-send">
                </form>
            </div>
        </section>
        <div style="margin: 10px 0px;">
            <a href="msgRoomList.php">
                <p>&lt; to msg room list page</p>
            </a>
        </div>

    </div>

    <?php
    require("jssrc.php");
    ?>

    </div>

</body>