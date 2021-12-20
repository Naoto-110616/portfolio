<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../dist/css/reset.css">
    <link rel="stylesheet" href="dist/css/top_page.css">
    <title>Choice Page</title>
</head>

<body>
    <main>
        <div class="page_title">
            <h1>CSS設計</h1>
        </div>
        <section class="section_practice">
            <a href="practice_oocss/index.html">
                <div class="practice_page_name">
                    <h2>OOCSS</h2>
                </div>
            </a>
            <a href="practice_bem/index.html">
                <div class="practice_page_name">
                    <h2>BEM</h2>
                </div>
            </a>
            <a href="practice_smacss/index.html">
                <div class="practice_page_name">
                    <h2>SMACSS</h2>
                </div>
            </a>
            <a href="practice_flocss/index.html">
                <div class="practice_page_name">
                    <h2>FLOCSS</h2>
                </div>
            </a>
        </section>
    </main>
    <?php
    $href = "../Portfolio.php";
    require("../home_footer.php"); ?>
</body>

</html>