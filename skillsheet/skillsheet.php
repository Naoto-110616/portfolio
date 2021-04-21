<?php
$pseudonym = "おおかわなおと";
$name = "大川尚斗";
$addr = "大阪市平野区長吉出戸2-1-8-804";
$nearStation = "長原";
$sex = "男";
$programmingLanguage = array("HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL", "WordPress", "Node.js", "SCSS", "gulp", "npm", "OOCSS", "BEM", "SMACSS", "FLOCSS", "Bootstrap", "fuelPHP");
// 生年月日からタイムスタンプを取得
$birthday = ("1999-6-16");
$birthdayTimeStamp = strtotime($birthday);
$birth_year = (int)date("Y", $birthdayTimeStamp);
$birth_month = (int)date("m", $birthdayTimeStamp);
$birth_day = (int)date("d", $birthdayTimeStamp);
// 現在の年月日を取得
$now_year = (int)date("Y");
$now_month = (int)date("m");
$now_day = (int)date("d");
// 年齢を計算
$age = $now_year - $birth_year;
// 「月」「日」で年齢を調整
if ($birth_month === $now_month) {
    if ($now_day < $birth_day) {
        $age--;
    }
} elseif ($now_month < $birth_month) {
    $age--;
}

?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>SkillSheet</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="../dist/css/reset.css">
    <link rel="stylesheet" href="../dist/css/portfolio_style.css">
</head>

<body>
    <header>
        <h1><a href="skillsheet.php">SkillSheet</a></h1>
    </header>
    <main>
        <div class="content-wrapper">
            <article class="experience">
                <section class="elec-power">
                    <table class="table2" border="1">
                        <tbody>
                            <tr>
                                <td class="color">ふりがな</td>
                                <td><?php echo $pseudonym; ?></td>
                                <td class="color">生年月日</td>
                                <td><?php echo $birthday; ?></td>
                                <td class="color">年齢</td>
                                <td><?php echo $age ?></td>
                            </tr>
                            <tr>
                                <td class="color">氏名</td>
                                <td><?php echo $name; ?></td>
                                <td class="color">経験年数</td>
                                <td>6ヶ月</td>
                                <td class="color">最寄駅</td>
                                <td>
                                    <div class="lang"><?php echo $nearStation; ?></div>
                                </td>
                            </tr>
                            <tr>
                                <td class="color">現住所</td>
                                <td><?php echo $addr; ?></td>
                                <td class="color">性別</td>
                                <td><?php echo $sex; ?></td>
                                <td class="color">職種</td>
                                <td>ITエンジニア</td>
                            </tr>
                            <tr>
                                <td class="color">学歴</td>
                                <td colspan="3">放送芸術学院専門学校 メディアクリエイト科 TV番組制作コース 卒業</td>
                                <td class="color">通勤可能時間</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section class="elec-power">
                    <table class="table2" border="1">
                        <thead>
                            <tr>
                                <th colspan="7" class="color">職務実績</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table_of_contents">
                                <td class="color">順番</td>
                                <td colspan="2" class="color">期間</td>
                                <td class="color">業務名/業種</td>
                                <td class="color"> </td>
                                <td class="color">言語/DB/ツール</td>
                                <td class="color">
                                    <div>職位</div>
                                    <div>(メンバー数)</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="color">1</td>
                                <td>
                                    <div>2018/12</div>
                                    <div>-</div>
                                    <div>2020/3</div>
                                </td>
                                <td>1年3ヶ月</td>
                                <td class="sentence">TV番組制作会社(準社員)<br>

                                    【業務内容】<br>
                                    ロケ準備業務:朝の情報番組「よーいどん」内の「隣の人間国宝さん」のロケに伴う全ての準備<br>
                                    台本作成に伴う情報収集：放送許可の取得やデータ収集<br>
                                    撮影した映像の処理に伴う事務：ダビングしたあとデータ化し、PCに取り込む。<br>
                                    編集しやすいように環境設定<br>
                                    特番に伴う、街頭アンケートや書類作成、取材業務<br>
                                    出演者の身の回りのケア業務<br>

                                    【取り組み・実績】<br>
                                    放送日が決まっているので、納期を必ず守らなければならず、また制作にかかわるメンバーが<br>
                                    非常に多いので、１つでも工程が遅れると全てに影響します。ですので時間の管理、<br>
                                    タスクの管理と処理、期日までの進捗管理徹底して行うよう心がけました。<br>

                                    その結果、働いていた期間1度も遅刻がなく、タスクに関して納期を過ぎたこと、忘れたこと、<br>
                                    タスクが漏れたことも1度もございませんでした。</td>
                                <td>-</td>
                                <td>-</td>
                                <td>5名</td>
                            </tr>
                            <tr>
                                <td class="color">2</td>
                                <td>
                                    <div>2020/2</div>
                                    <div>-</div>
                                    <div>2020/5</div>
                                </td>
                                <td>3カ月</td>
                                <td class="sentence">【オンライン学習ツールにて言語の勉強】<br>
                                    友人がjavaエンジニアとして4年の経験者ですので、分からない事は聞きながら、<br>
                                    自宅でプログラム言語について習得しております。<br>

                                    【学習内容】<br>
                                    シフトシステムという会社の「1週間で身につくjava言語の基礎」<br>
                                    SQL書き方ドリルにて練習<br>
                                    研修ツール、「ドットインストール」を毎日</td>
                                <td>Windows10</td>
                                <td>
                                    <div>java</div>
                                    <div>SQL</div>
                                </td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td class="color">3</td>
                                <td>
                                    <div>2020/7</div>
                                    <div>-</div>
                                    <div>2020/12</div>
                                </td>
                                <td>6カ月</td>
                                <td class="sentence">
                                    株式会社ダスキン（派遣）<br>
                                    【業務内容】<br>
                                    ミスタードーナツ店舗、事業部、工場のインフラ監視、お客様へ<br>
                                    機器の接続確認及び、説明、壊れた機器の交換手配。<br>

                                    【取り組み・実績】<br>
                                    対応は全て電話でのみの対応になるので、お客様へ具体的に理解しやすく<br>
                                    説明することを心がけました。<br>
                                    障害が起きない限りは、業務が無いのでIT言語の勉強をしていました。</td>
                                <td>-</td>
                                <td>-</td>
                                <td>8名</td>
                            </tr>
                            <tr>
                                <td class="color">4</td>
                                <td>
                                    <div>2020/7</div>
                                    <div>-</div>
                                    <div>現在</div>
                                </td>
                                <td>-</td>
                                <td class="sentence">【オンライン学習ツールにて言語の勉強】<br>
                                    現在は平日、休日5時間の学習をしております。<br>

                                    【学習内容】<br>
                                    ゼロワンという会社のオンライン教材「ウェブカツ」<br>
                                    udemyの動画教材<br>
                                    <?php
                                    $count = count($programmingLanguage);
                                    for ($i = 0; $i < $count; ++$i) {
                                        echo $programmingLanguage[$i] . "." . "<br>";
                                    }
                                    ?>の練習<br></td>
                                <td>
                                    <div>Mac</div>
                                </td>
                                <td>
                                    <?php
                                    $count = count($programmingLanguage);
                                    for ($i = 0; $i < $count; ++$i) {
                                        echo "<div>" . $programmingLanguage[$i] . '</div>';
                                    }
                                    ?>
                                </td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td class="sentence" colspan="7">【人物面】<br>
                                    ・とても真面目で、仕事に対して非常に根気強く向き合う人間です。真冬に朝まで街頭アンケートもしておりました。<br>
                                    　取材やアンケート、許可取得でも様々な方との折衝業務もこなしてきましたのでコミュニケーション能力もとても高く、<br>
                                    <?php echo $age; ?>歳とは思えないほど社会人としてのマナーや話し方がしっかり備わっております。<br>

                                    ・またかなり勤勉で、毎日ひたすら分からないことを調べたり聞いたりと、コツコツ努力することもできております。<br>

                                    【将来のエンジニア像】<br>
                                    技術を得て、自分に与えられたタスクをこなし、その後、会社の利益になり、プロジェクトを責任持って、動かせる人間になりたい。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </article>
        </div>
    </main>
    <?php
    $href = "../Portfolio.php";
    require("../home_footer.php");
    ?>
</body>

</html>