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
$u_id = (!empty($_GET['u_id'])) ? $_GET['u_id'] : '';
$friendsList = getfriendsList($u_id);
// myinfo取得
$dbFormData = getUser($_SESSION["user_id"]);
debug(print_r($friendsList, true));
?>

<?php
$siteTitle = 'frineds list';
require('goodbook_head.php');
?>

<body>
    <?php require("goodbook_header.php") ?>
    <div>
        <article>
            <div class="main">
                <div class="main_friendlist">
                    <div class="main_friendlist_wrapper">
                        <div>
                            <h1>friends List</h1>
                        </div>
                        <?php if (!empty($friendsList["data"])) {
                            foreach ($friendsList["data"] as $key => $val) :
                                if ($val["f_id"] == $_SESSION["user_id"]) { ?>
                                    <a href="mypage.php">
                                    <?php } else { ?>
                                        <a href="userDetail.php?u_id=<?php echo $val["f_id"] ?>">
                                        <?php } ?>
                                        <div class="msgRoom">
                                            <div class="msgShelf">
                                                <img src="<?php echo $val["profpic"]; ?>" alt="<?php echo $val["username"] ?>">
                                                <div class="msgRoomList_userInfo">
                                                    <p><?php echo $val["username"]; ?></p>
                                                    <p><?php echo $val["myBio"]; ?></p>
                                                </div>
                                            </div>
                                        </div>
                                        </a>
                                    <?php endforeach;
                            } elseif ($_SESSION["user_id"] == $u_id) { ?>
                                    <div class="msgRoom">
                                        <div class="createMsg">
                                            <a href="friends.php">
                                                <p>友達がいません、誰かをフォローしましょう。</p>
                                            </a>
                                        </div>
                                    </div>
                                <?php } else { ?>
                                    <div class="msgRoom">
                                        <div class="createMsg">
                                            <a href="userDetail.php<?php echo "?u_id=" . $u_id; ?>">
                                                <p>このユーザーは誰もフォローしていません。</p>
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