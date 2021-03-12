<?php
//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 post list　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

// user data 取得
$dbFormData = getUser($_SESSION["user_id"]);
$dbPostData = getPost($_SESSION["user_id"]);
debug(print_r($dbPostData, true));
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
                <div class="inside_padding" style="padding: 2% 17%;">
                    <div style="width: 900px; margin: 0 auto; font-size: 17px;">
                        <div>
                            <h1>My posts</h1>
                        </div>
                        <?php if (!empty($dbPostData["data"])) {
                            require("post.php");
                        } else { ?>
                            <div class="msgRoom">
                                <div class="createMsg">
                                    <a href="homepage.php">
                                        <p>postはありません、投稿しましょう。</p>
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