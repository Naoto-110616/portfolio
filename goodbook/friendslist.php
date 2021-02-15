<?php

//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 list of ftiends page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();
// DBからユーザーデータを取得
$dbFormData = getUser($_SESSION['user_id']);
debug('取得したユーザー情報：' . print_r($dbFormData, true));

//================================
// 画面処理
//================================
// 画面表示用データ取得
//================================
// カレントページのGETパラメータを取得
$currentPageNum = (!empty($_GET['p'])) ? $_GET['p'] : 1; //デフォルトは１ページ目
// パラメータに不正な値が入っているかチェック
if (!is_int((int)$currentPageNum)) {
    error_log('エラー発生:指定ページに不正な値が入りました');
    header("Location:friendslist.php"); //トップページへ
}
// 表示件数
$listSpan = 20;
// 現在の表示レコード先頭を算出
$currentMinNum = (($currentPageNum - 1) * $listSpan); //1ページ目なら(1-1)*20 = 0 、 ２ページ目なら(2-1)*20 = 20
// DBからusersデータを取得
$dbUserData = getUserList($currentMinNum);
$dbAreaData = getArea();
debug('現在のページ：' . $currentPageNum);
debug('フォーム用DBデータ：' . print_r($dbFormData, true));
debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>


<?php
$siteTitle = "list of friends";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php") ?>
    <p id="js-show-msg" style="display:none;" class="msg-slide">
        <?php
        echo getSessionFlash('msg_success');
        ?>
    </p>
    <article class="main">
        <div class="listOfFriendsInside">
            <section class="orverall">
                <div id="sidebar">
                    <form action="">
                        <h1 class="title">Area</h1>
                        <!-- <h1 class="title"><?php showVariable($dbUserData['data']); ?></h1> -->
                        <div class="selectbox">
                            <span class="icn_select"></span>
                            <select name="area_id">
                                <option value="0">Please select</option>
                                <?php foreach ($dbAreaData as $key => $val) { ?>
                                    <option value="<?php echo $val['id'] ?>">
                                        <?php echo $val['name']; ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="sort">
                            <input type="submit" value="serch">
                        </div>
                    </form>
                </div>
                <!-- Main -->
                <section id="main">
                    <div class="search-title">
                        <div class="search-left">
                            <span class="total-num"><?php echo ($dbUserData) ? sanitize($dbUserData['total']) : "0"; ?></span>件のuserが見つかりました
                        </div>
                        <div class="search-right">
                            <span class="num"><?php echo $currentMinNum + 1; ?></span> - <span class="num"><?php echo $currentMinNum + $listSpan; ?></span>件 / <span class="num"><?php echo sanitize($dbUserData['total']); ?></span>件中
                        </div>
                    </div>
                    <div class="panel-list">
                        <?php foreach ($dbUserData['data'] as $key => $val) : ?>
                            <a href="userDetail.php?u_id=<?php echo $val['id'] . '&p=' . $currentPageNum; ?>" class="panel">
                                <div class="panel-head">
                                    <img src="<?php echo sanitize($val['profpic']); ?>" alt="<?php echo sanitize($val['username']); ?>">
                                </div>
                                <div class="panel-body">
                                    <p class="panel-title"><span class="username"><?php echo sanitize($val['username']); ?></span></p>
                                    <p class="panel-title"><span class="areaname"><?php echo sanitize($val['name']); ?></span></p>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    </div>
                    <?php pagination($currentPageNum, $dbUserData['total_page']); ?>
                </section>
            </section>
        </div>
    </article>
    <?php
    require("jssrc.php");
    ?>