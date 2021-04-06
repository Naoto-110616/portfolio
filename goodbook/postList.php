<?php
//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 post list　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();
$f_id = (!empty($_GET["f_id"])) ? $_GET["f_id"] : "";
$u_id = (!empty($_GET["u_id"])) ? $_GET["u_id"] : "";
// user data 取得
if (empty($f_id)) {
    $dbPostData = getPost($u_id);
} else {
    $dbPostData = getPost($f_id);
}
$dbFormData = getUser($_SESSION["user_id"]);
?>

<?php
$siteTitle = 'post list';
require('goodbook_head.php');
?>

<body>
    <?php require("goodbook_header.php") ?>
    <div>
        <article>
            <div class="main">
                <div class="main_postlist">
                    <div class="main_postlist_wrapper">
                        <div>
                            <h1>posts</h1>
                        </div>
                        <?php if (!empty($dbPostData["data"])) {
                            require("post.php");
                        } else { ?>
                            <div class="msgRoom">
                                <div class="createMsg">
                                    <a href="homepage.php">
                                        <p>postはありません。</p>
                                    </a>
                                </div>
                            </div>
                        <?php }
                        ?>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <?php require("jssrc.php"); ?>
</body>