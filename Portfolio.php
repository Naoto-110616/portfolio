<?php require("home_head.php"); ?>

<body>
  <header>
    <h1><a href="Portfolio.php">Portfolio</a></h1>
  </header>
  <main>
    <div class="content-wrapper">
      <article class="experience">
        <h2 class="Experience">Experience</h2>
        <section class="elec-power">
          <table class="table" border="1">
            <thead class="thead">
              <tr>
                <th>案件</th>
                <th>期間</th>
                <th>ツール</th>
                <th>担当フェーズ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="skillsheet/skillsheet.php">Skillsheet</a>
                </td>
                <td>8時間</td>
                <td>
                  <div>HTML/CSS</div>
                  <div>PHP</div>
                </td>
                <td>自習</td>
              </tr>
              <td>
                <a href="practice/practice_homepage.php">practice</a>
              </td>
              <td>3時間</td>
              <td>
                <div>HTML/CSS</div>
              </td>
              <td>自習</td>
              </tr>
              <tr>
                <td>
                  <a href="goodbook/login.php">goodbook</a>
                </td>
                <td>5ヶ月</td>
                <td>
                  <div>HTML/CSS</div>
                  <div>Sass</div>
                  <div>javascript</div>
                  <div>jQuaery</div>
                  <div>PHP</div>
                  <div>node.js</div>
                  <div>gulp</div>
                  <div>npm</div>
                </td>
                <td>模写</td>
              </tr>
              <tr>
                <td>自習</td>
                <td>6ヶ月</td>
                <td>
                  <div>HTML/CSS</div>
                  <div>Sass</div>
                  <div>javascript</div>
                  <div>jQuaery</div>
                  <div>PHP</div>
                  <div>node.js</div>
                  <div>gulp</div>
                  <div>npm</div>
                  <div>WordPress</div>
                </td>
                <td>模写</td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
      <h2>Works</h2>
      <section class="item">
        <div class="icon">
          <a href="goodbook/login.php">
            <h3>goodbook</h3>
            <img src="goodbook/img/Facebook-Logo1.png" alt="goodbook_icon" class="good" />
          </a>
        </div>
        <div>
          ※アイコン押下でホームページへ遷移
        </div>
        <div>
          <h3>概要</h3>
          <p>
            HTML,CSS,jQuaery,PHPのサンプルです．facebookのレイアウトを模写しました.
          </p>
        </div>
        <div>
          <h3>目的</h3>
          <p>CRUDを使うシステムを作ることで、標準的なwebシステムを作る力があるとアピールするために実装しました。</p>
        </div>
        <div>
          <h3>機能詳細</h3>
          <p>
            -ログイン
            -ログアウト
            -アカウント作成
            -アカウント削除
            -マイページ
            -写真投稿
            -チャット
            etc.</p>
        </div>
        <h3>Skills</h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Sass</li>
          <li>javascript</li>
          <li>jQuery</li>
          <li>PHP</li>
          <li>node.js</li>
          <li>npm</li>
          <li>gulp</li>
        </ul>
        <h3>Github Repo</h3>
        <div class="github_urldiv">
          <a href="https://github.com/Naoto-110616/portfolio">https://github.com/Naoto-110616/portfolio</a>
        </div>
      </section>
      </section>
      <section class="item">
        <div class="icon">
          <a href="practice/practice_homepage.php">
            <h3>practice</h3>
            <img src="practice/practice1/img/22177000005.jpg" alt="" class="practice_top_img" />
          </a>
        </div>
        <h3>Skills</h3>
        <ul>
          <li>CSS(transform)</li>
        </ul>
        <h3>Github Repo</h3>
        <div class="github_urldiv">
          <a href="https://github.com/Naoto-110616/portfolio">https://github.com/Naoto-110616/portfolio/tree/master/practice</a>
        </div>
      </section>
      <section class="item">
        <a href="skillsheet/skillsheet.php">
          <h3>skillsheet</h3>
        </a>
        <p>HTML,CSSで自身のスキルシートをまとめました．</p>
        <h3>Skills</h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
        </ul>
        <h3>Github Repo</h3>
        <div class="github_urldiv">
          <a href="https://github.com/Naoto-110616/portfolio/tree/master/skillsheet">https://github.com/Naoto-110616/portfolio/tree/master/skillsheet
          </a>
        </div>
      </section>
    </div>
  </main>
  <?php
  $href = "Portfolio.php";
  require("home_footer.php");
  ?>
</body>

</html>