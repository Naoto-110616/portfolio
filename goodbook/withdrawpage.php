<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　withdraw page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

require("auth.php");

//================================
// 画面処理
//================================
// post送信されていた場合
if (!empty($_POST)) {
    debug('POST送信があります。');
    //例外処理
    try {
        withdraw("err");
    } catch (Exception $e) {
        error_log('error:' . $e->getMessage());
        $err_msg["err"] = MSG09;
    }
}
debug('画面表示処理終了 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
?>

<?php
$siteTitle = "withdraw";
require("goodbook_head.php");
?>

<body>
    <?php require("goodbook_header.php"); ?>
    <div class="overall">
        <article class="withdraw_main">
            <section class="withdraw_window">
                <div class="withdraw_page_padding">
                    <div class="withdraw_page_width">
                        <div class="withdraw_page_inside_padding">
                            <div class="withdraw_window_title">
                                <h2>アカウントを完全に削除</h2>
                                <div class="withdraw_border"></div>
                            </div>
                            <div class="padding_inside">
                                <div class="withdraw_comment">
                                    <p>Facebookアカウントを完全に削除したい場合は、Facebookにお知らせください。削除プロセスが開始すると、アカウントの再開や、これまでに追加したコンテンツや情報は一切取得できなくなります。
                                    </p>
                                </div>
                                <div class="withdraw_border"></div>
                                <div class="withdraw_content">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="withdraw_icon"><i id="withdraw_icon" class="far fa-comments fa-lg"></i></div>
                                                    <div class="content_comment">
                                                        <p class="subject"> 利用解除なら、引き続きMessengerを利用できます</p>
                                                        <p class="comment">Facebookアカウントを削除すると、Messengerとそのメッセージも同時に削除されるため、ご注意ください。</p>
                                                    </div>
                                                </td>
                                                <td class="account_cancellation_button">
                                                    <label for="">
                                                        <input type="button" class="account_cancellation" value="Account cancellation"></input>
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="withdraw_content">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="withdraw_icon"><i　id="withdraw_icon" class="fas fa-download fa-lg"></i></div>
                                                    <div class="content_comment">
                                                        <p class="subject"> Facebookデータをダウンロード</p>
                                                        <p class="comment">あなたは1件の投稿などの情報をFacebookにアップロードしています。アカウントと一緒に完全に削除される前に、このコンテンツをダウンロードできます。</p>
                                                    </div>
                                                </td>
                                                <td class=" download_information_button">
                                                    <label for="">
                                                        <input type="button" class="download_information" value="Download information"></input>
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="button_div">
                                <form action="" method="post">
                                    <div class="withdraw_beneath">
                                        <div class="cancel_button">
                                            <label for="cancel">
                                                <input type="button" onclick="location.href='homepage.php'" value="cancel"></input>
                                            </label>
                                        </div>
                                        <div class="withdraw_button">
                                            <label for="withdraw">
                                                <input type="submit" name="withdraw" value="account withdraw"></input>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <?php
            if (!empty($err_msg['err'])) echo $err_msg['err'];
            ?>
        </article>
    </div>
    <footer id="footer">
        <div>

        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="js/homepage.js"></script>
</body>

</html>