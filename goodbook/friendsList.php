<?php
//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 friends list　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

// user data 取得
$dbFormData = getUser($_SESSION["user_id"]);
$friendsList = getfriendsList($dbFormData["id"]);
?>

<?php
$siteTitle = 'Frineds List';
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
                            <h1>friends List</h1>
                        </div>
                        <?php if (!empty($friendsList["data"])) { ?>
                            <?php foreach ($friendsList["data"] as $key => $val) : ?>
                                <a href="userDetail.php?u_id=<?php echo $val["f_id"] ?>">
                                    <div class="msgRoom">
                                        <div class="msgShelf">
                                            <img src="<?php echo $val["profpic"]; ?>" alt="<?php echo $val["username"] ?>">
                                            <p><?php echo $val["username"]; ?></p>
                                        </div>
                                    </div>
                                </a>
                            <?php
                            endforeach;
                        } else {
                            ?>
                            <div class="msgRoom">
                                <div class="createMsg">
                                    <a href="friends.php">
                                        <p>友達がいません、誰かにfriend requestを送りましょう。</p>
                                    </a>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </article>
    </div>
    <?php require("jssrc.php"); ?>
</body>