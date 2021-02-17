<?php require('function.php');

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「 msg page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

//ログイン認証
auth();

$u_id = (!empty($_GET['u_id'])) ? $_GET['u_id'] : '';
$viewData = getUserOne($u_id);
$dbFormData = getUser($_SESSION['user_id']);
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
                    <img src="<?php echo sanitize($viewData["profpic"]) ?>" alt="" class="avatar">
                </div>
                <div class="avatar-info">
                    <?php echo sanitize($viewData["username"]) ?><br>
                </div>
            </div>
            <div class="area-bord" id="js-scroll-bottom">
                <div class="msg-cnt msg-left">
                    <div class="avatar">
                        <img src="<?php echo sanitize($viewData["profpic"]) ?>" alt="" class="avatar">
                    </div>
                    <p class="msg-inrTxt">
                        <span class="triangle"></span>
                        サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
                    </p>
                </div>
                <div class="msg-cnt msg-right">
                    <div class="avatar">
                        <img src="<?php echo sanitize($dbFormData["profpic"]) ?>" alt="" class="avatar">
                    </div>
                    <p class="msg-inrTxt">
                        <span class="triangle"></span>
                        サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキ
                    </p>
                </div>
                <div class="msg-cnt msg-left">
                    <div class="avatar">
                        <img src="<?php echo sanitize($viewData["profpic"]) ?>" alt="" class="avatar">
                    </div>
                    <p class="msg-inrTxt">
                        <span class="triangle"></span>
                        サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサ
                    </p>
                </div>
                <div class="msg-cnt msg-right">
                    <div class="avatar">
                        <img src="<?php echo sanitize($dbFormData["profpic"]) ?>" alt="" class="avatar">
                    </div>
                    <p class="msg-inrTxt">
                        <span class="triangle"></span>
                        サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキ
                    </p>
                </div>
                <div class="msg-cnt msg-left">
                    <div class="avatar">
                        <img src="<?php echo sanitize($viewData["profpic"]) ?>" alt="" class="avatar">
                    </div>
                    <p class="msg-inrTxt">
                        <span class="triangle"></span>
                        サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサ
                    </p>
                </div>
                <div class="msg-cnt msg-right">
                    <div class="avatar">
                        <img src="<?php echo sanitize($dbFormData["profpic"]) ?>" alt="" class="avatar">
                    </div>
                    <p class="msg-inrTxt">
                        <span class="triangle"></span>
                        サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキ
                    </p>
                </div>
                <div class="msg-cnt msg-left">
                    <div class="avatar">
                        <img src="<?php echo sanitize($viewData["profpic"]) ?>" alt="" class="avatar">
                    </div>
                    <p class="msg-inrTxt">
                        <span class="triangle"></span>
                        サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサ
                    </p>
                </div>
            </div>
            <div class="area-send-msg">
                <textarea name="" id="" cols="30" rows="3"></textarea>
                <input type="submit" value="送信" class="btn btn-send">
            </div>
        </section>

        <script src="js/vendor/jquery-2.2.2.min.js"></script>

        <?php
        require("jssrc.php");
        ?>

    </div>

</body>