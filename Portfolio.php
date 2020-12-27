<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>Portfolio</title>
  <link rel="stylesheet" href="css/style.css">
</head>

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
                <th>言語</th>
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
                </td>
                <td>模写</td>
              </tr>
              <tr>
                <td>
                  <a href="goodbook/login.php">goodbook</a>
                </td>
                <td>2ヶ月</td>
                <td>
                  <div>HTML/CSS</div>
                  <div>javascript</div>
                  <div>jQuaery</div>
                  <div>PHP</div>
                </td>
                <td>模写</td>
              </tr>
              <tr>
                <td>自習</td>
                <td>5ヶ月</td>
                <td>
                  <div>HTML/CSS</div>
                  <div>PHP</div>
                  <div>javascript</div>
                  <div>jQuaery</div>
                  <div>SQL</div>
                  <div>Github</div>
                </td>
                <td>模写</td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
      <h2>Wolks</h2>
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
      <section class="item">
        <div class="icon">
          <a href="goodbook/login.php">
            <h3>goodbook</h3>
            <img src="goodbook/img/Facebook-Logo1.png" alt="goodbook_icon" />
          </a>
        </div>
        <p>
          HTML,CSS,jQuaery,PHPのサンプルです．facebookのレイアウトを模写しました.
        </p>
        <h3>Skills</h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>jQuery</li>
          <li>PHP</li>
        </ul>
        <h3>Github Repo</h3>
        <div class="github_urldiv">
          <a href="https://github.com/Naoto-110616/portfolio">https://github.com/Naoto-110616/portfolio</a>
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