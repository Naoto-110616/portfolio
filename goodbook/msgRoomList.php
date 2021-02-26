<?php
//共通変数・関数ファイルを読込み
require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 msg room list　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

// user data 取得
$dbFormData = getUser($_SESSION["user_id"]);
$receiveMsgRoom = getReceiveMsgRoomInfo($dbFormData["id"]);
$sendMsgRoom = getSendMsgRoomInfo($dbFormData["id"]);
?>

<?php
$siteTitle = 'msg room';
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
                            <h1>msg room</h1>
                        </div>
                        <?php if (!empty($receiveMsgRoom["data"])) { ?>
                            <?php foreach ($receiveMsgRoom["data"] as $key => $val) : ?>
                                <a href="msg.php?m_id=<?php echo $val["b_id"] ?>">
                                    <div class="msgRoom">
                                        <div class="msgShelf">
                                            <img src="<?php echo $val["profpic"]; ?>" alt="<?php echo $val["username"] ?>">
                                            <p><?php echo $val["username"]; ?></p>
                                        </div>
                                    </div>
                                </a>
                            <?php
                            endforeach;
                        } elseif (!empty($sendMsgRoom["data"])) {
                            foreach ($sendMsgRoom["data"] as $key => $val) : ?>
                                <a href="msg.php?m_id=<?php echo $val["b_id"] ?>">
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
                                        <p>msg roomはありません、誰かにmsgを送りましょう。</p>
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