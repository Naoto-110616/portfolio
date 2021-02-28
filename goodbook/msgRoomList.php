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

debug("receiveMsgRoom" . print_r($receiveMsgRoom, true));
debug("sendmsg" . print_r($sendMsgRoom, true));
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
                        <?php if (!empty($receiveMsgRoom)) {
                            foreach ($receiveMsgRoom as $key => $val) :
                                $msg = end($val['msg']); ?>
                                <a href="msg.php?m_id=<?php echo $val["b_id"] ?>">
                                    <div class="msgRoom">
                                        <div class="msgShelf">
                                            <img src="<?php echo $val["profpic"]; ?>" alt="<?php echo $val["username"] ?>">
                                            <div class="latestMessage">
                                                <p><?php echo $val["username"]; ?></p>
                                                <?php if (!empty($msg["msg"])) { ?>
                                                    <p><?php echo mb_substr(sanitize($msg['msg']), 0, 40); ?>...</p>
                                                <?php } else { ?>
                                                    <p>No message yet</p>
                                                <?php } ?>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            <?php
                            endforeach;
                        }
                        if (!empty($sendMsgRoom)) {
                            foreach ($sendMsgRoom as $key => $val) :
                                $msg = end($val['msg']); ?>
                                <a href="msg.php?m_id=<?php echo $val["b_id"] ?>">
                                    <div class="msgRoom">
                                        <div class="msgShelf">
                                            <img src="<?php echo $val["profpic"]; ?>" alt="<?php echo $val["username"] ?>">
                                            <div class="latestMessage">
                                                <p><?php echo $val["username"]; ?></p>
                                                <?php if (!empty($msg["msg"])) { ?>
                                                    <p><?php echo mb_substr(sanitize($msg['msg']), 0, 40); ?>...</p>
                                                <?php } else { ?>
                                                    <p>No message yet</p>
                                                <?php } ?>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            <?php
                            endforeach;
                        }
                        if (empty($receiveMsgRoom) && empty($sendMsgRoom)) {
                            ?>
                            <div class="msgRoom">
                                <div class="createMsg">
                                    <a href="friends.php">
                                        <p>msg roomはありません、誰かにmsgを送りましょう。</p>
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