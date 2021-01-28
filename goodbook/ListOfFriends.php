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
$currentPageNum = (!empty($_GET['p'])) ? $_GET['p'] : 1; //デフォルトは１ページめ
// パラメータに不正な値が入っているかチェック
if (!is_int((int)$currentPageNum)) {
    error_log('エラー発生:指定ページに不正な値が入りました');
    header("Location:index.php"); //トップページへ
}
// 表示件数
$listSpan = 20;
// 現在の表示レコード先頭を算出
$currentMinNum = (($currentPageNum - 1) * $listSpan); //1ページ目なら(1-1)*20 = 0 、 ２ページ目なら(2-1)*20 = 20
// DBから商品データを取得
$dbUserData = getUserList($currentMinNum);
// DBからカテゴリデータを取得
$dbAreaData = getArea();
debug('現在のページ：' . $currentPageNum);
debug('フォーム用DBデータ：' . print_r($dbFormData, true));
debug('カテゴリデータ：' . print_r($dbCategoryData, true));

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
            <section class="orverall" style="background-color:#191919;">
                <div id="sidebar">
                    <form action="">
                        <h1 class="title">Area</h1>
                        <div class="selectbox">
                            <span class="icn_select"></span>
                            <select name="category">
                                <option value="0">Please select</option>
                                <?php foreach ($dbAreaData as $key => $val) { ?>
                                    <option value="<?php echo $val['id'] ?>">
                                        <?php echo $val['name']; ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <h1 class="title">Display order</h1>
                        <div class="selectbox">
                            <span class="icn_select"></span>
                            <select name="sort">
                                <option value="1">金額が安い順</option>
                                <option value="2">金額が高い順</option>
                            </select>
                        </div>
                        <input type="submit" value="serch" style="border-radius: 5px;">
                    </form>
                </div>
                <!-- Main -->
                <section id="main">
                    <div class="search-title">
                        <div class="search-left">
                            <span class="total-num"><?php echo sanitize($dbUserData['total']); ?></span>件のuserが見つかりました
                        </div>
                        <div class="search-right">
                            <span class="num"><?php echo $currentMinNum + 1; ?></span> - <span class="num"><?php echo $currentMinNum + $listSpan; ?></span>件 / <span class="num"><?php echo sanitize($dbUserData['total']); ?></span>件中
                        </div>
                    </div>
                    <div class="panel-list">
                        <?php foreach ($dbUserData['data'] as $key => $val) : ?>
                            <a href="productDetail.php" p_id="<?php echo $val['id']; ?>" class="panel">
                                <div class="panel-head">
                                    <img src="<?php echo sanitize($dbFormData['profpic']); ?>" alt="<?php echo sanitize($dbFormData['username']); ?>">
                                </div>
                                <div class="panel-body">
                                    <p class="panel-title"><span class="price"><?php echo sanitize($dbFormData['username']); ?></span></p>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    </div>
                    <div class="pagination">
                        <ul class="pagination-list">
                            <?php
                            $pageColNum = 5;
                            $totalPageNum = $dbUserData['total_page'];
                            // 現在のページが、総ページ数と同じ　かつ　総ページ数が表示項目数以上なら、左にリンク４個出す
                            if ($currentPageNum == $totalPageNum && $totalPageNum >= $pageColNum) {
                                $minPageNum = $currentPageNum - 4;
                                $maxPageNum = $currentPageNum;
                                // 現在のページが、総ページ数の１ページ前なら、左にリンク３個、右に１個出す
                            } elseif ($currentPageNum == ($totalPageNum - 1) && $totalPageNum >= $pageColNum) {
                                $minPageNum = $currentPageNum - 3;
                                $maxPageNum = $currentPageNum + 1;
                                // 現ページが2の場合は左にリンク１個、右にリンク３個だす。
                            } elseif ($currentPageNum == 2 && $totalPageNum >= $pageColNum) {
                                $minPageNum = $currentPageNum - 1;
                                $maxPageNum = $currentPageNum + 3;
                                // 現ページが1の場合は左に何も出さない。右に５個出す。
                            } elseif ($currentPageNum == 1 && $totalPageNum >= $pageColNum) {
                                $minPageNum = $currentPageNum;
                                $maxPageNum = 5;
                                // 総ページ数が表示項目数より少ない場合は、総ページ数をループのMax、ループのMinを１に設定
                            } elseif ($totalPageNum < $pageColNum) {
                                $minPageNum = 1;
                                $maxPageNum = $totalPageNum;
                                // それ以外は左に２個出す。
                            } else {
                                $minPageNum = $currentPageNum - 2;
                                $maxPageNum = $currentPageNum + 2;
                            }
                            ?>
                            <?php if ($currentPageNum != 1) : ?>
                                <li class="list-item"><a href="?p=1">&lt;</a></li>
                            <?php endif; ?>
                            <?php for ($i = $minPageNum; $i <= $maxPageNum; $i++) : ?>
                                <li class="list-item <?php if ($currentPageNum == $i) echo 'active'; ?>"><a href="?p=<?php echo $i; ?>"><?php echo $i; ?></a></li>
                            <?php endfor; ?>
                            <?php if ($currentPageNum != $maxPageNum) : ?>
                                <li class="list-item"><a href="?p=<?php echo $maxPageNum; ?>">&gt;</a></li>
                            <?php endif; ?>
                        </ul>
                    </div>

                </section>
            </section>
        </div>
    </article>
    <?php
    require("jssrc.php");
    ?>