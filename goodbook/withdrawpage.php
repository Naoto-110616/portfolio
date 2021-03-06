<?php

require("function.php");

debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debug('「　withdraw page　');
debug('「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「「');
debugLogStart();

auth();

//================================
// 画面処理
//================================

// DBからユーザーデータを取得
$dbFormData = getUser($_SESSION['user_id']);

withdraw("err");

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
                                    <p>goodbookアカウントを完全に削除したい場合は、goodbookにお知らせください。削除プロセスが開始すると、アカウントの再開や、これまでに追加したコンテンツや情報は一切取得できなくなります。
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
                                                        <p class="comment">goodbookアカウントを削除すると、Messengerとそのメッセージも同時に削除されるため、ご注意ください。</p>
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
                                                        <p class="subject"> goodbookデータをダウンロード</p>
                                                        <p class="comment">あなたは1件の投稿などの情報をgoodbookにアップロードしています。アカウントと一緒に完全に削除される前に、このコンテンツをダウンロードできます。</p>
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
            getErrMsg("err");
            ?>
        </article>
    </div>
    <?php
    require("jssrc.php");
    ?>
</body>

</html>