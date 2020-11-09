<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

if(!empty($_POST)){
    
    define('MSG01','入力必須');
    define('MSG02','Emailの形式ではありません');
    define('MSG03','パスワード(再入力)があっていません');
    define('MSG04','半角英数字のみ');
    
    $err_msg = array();
    
    if(empty($_POST['email'])){
        $err_msg['email'] = MSG01;
    }
    if(empty($_POST['pass'])){
        $err_msg['pass'] = MSG01;
    }
    if(empty($_POST['pass_retype'])){
        $err_msg['pass_retype'] = MSG01;
    }
    
    if(empty($err_msg)){
        
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $pass_re = $_POST['pass_retype'];
        
        if(!preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $email)){
            $err_msg['email'] = MSG02;
        }
        if($pass !== $pass_re){
            $err_msg['pass'] = MSG03;
        }
        
        if(empty($err_msg)){
            
            if(!preg_match("/^[a-zA-Z0-9]+$/",$pass)){
                $err_msg['pass'] = MSG04;
            }
            if(empty($err_msg)){
                
                $dsn = 'mysql:dbname=goodbook;host=localhost;charset=utf8';
                $user = 'root';
                $password = 'root';
                $options =array(
                    
                    PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY=>true,
                    );
                
                    $dbh = new PDO($dsn, $user, $password, $options);
                    
                    $stmt = $dbh->prepare('INSERT INTO users (email, pass, login_time) VALUES (:email, :pass, :login_time)');
                    
                    $stmt->execute(array(':email'=>$email, ':pass'=>$pass, 'login_time'=>date('Y-m-d H:i:s')));
                    
                    header('Location:login.php');
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>Facebook - Registration</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/reset.css">
</head>

<body>
    <div class="home">
        <div class="center">
            <div class="left">
                <div class="logo">
                    <img class="icon" src="img/Facebook-Logo1.png">
                </div>
                <div class="massage">
                    <h2 class="massage1">
                        Connect with friends and the world <br>
                        around you on Facebook.
                    </h2>
                </div>
            </div>
            <div class="formentire">
                <div class="form">
                    <form method="post">
                        <div>
                            <div class="emaildiv">
                                <input class="email" type="text" name="email" id="email" placeholder="Email" autofocus="1" value="<?php if(!empty($_POST['email'])){
                                    echo $_POST['email'];
                            }?>">
                                <div class="help-block"></div>
                                <span class="err_msg"><?php if(!empty($err_msg['email'])){
                                    echo $err_msg['email'];
                            }?></span>
                            </div>
                            <div class="passworddiv">
                                <input class="password" type="password" name="pass" placeholder="Password" value="<?php if(!empty($_POST['pass'])){
                                    echo $_POST['pass'];
                            }?>">
                                <div class="help-block"></div>
                                <span class="err_msg"><?php if(!empty($err_msg['pass'])){
                                    echo $err_msg['pass'];
                            }?></span>
                            </div>
                            <div class="password_retypediv">
                                <input class="password_retype" type="password" name="pass_retype" placeholder="Password retype" value="<?php if(!empty($_POST['pass_retype'])){
                                    echo $_POST['pass_retype'];
                            }?>">
                                <div class="help-block"></div>
                                <span class="err_msg"><?php if(!empty($err_msg['pass_retype'])){
                                    echo $err_msg['pass_retype'];
                            }?></span>
                            </div>
                        </div>
                        <div class="singupdiv">
                            <input class="singup" value="Sing Up" name="singup" type="submit" style="cursor:pointer" onclick="location.href='login.html'">
                        </div>
                        <div class="boder1">
                            <p class="box"></p>
                        </div>
                        <div class="login_pagediv">
                            <a href="login.php" class="login_page">Login Page</a>
                        </div>
                    </form>
                </div>
                <div class="createPagediv">
                    <a href="" class="createPage">Create a Page</a> for a celebrity, band or business.
                </div>
            </div>
        </div>
    </div>
    <footer class="foo">
        <div class="foodiv">
            <ul class="language">
                <li>English(US)</li>
                <li class="interval"><a href="">日本語</a></li>
                <li class="interval"><a href="">Português (Brasil)</a></li>
                <li class="interval"><a href="">中文(简体)</a></li>
                <li class="interval"><a href="">Tiếng Việt</a></li>
                <li class="interval"><a href="">Español</a></li>
                <li class="interval"><a href="">Bahasa Indonesia</a></li>
                <li class="interval"><a href="">한국어</a></li>
                <li class="interval"><a href="">Français (France)</a></li>
                <li class="interval"><a href="">Deutsch</a></li>
                <li class="interval"><a href="">Italiano</a></li>
            </ul>
            <div class="boder2">
                <p class="box"></p>
            </div>
            <div class="listdiv">
                <ul class="list">
                    <li class="interval"><a href="">Sign Up</a></li>
                    <li class="interval"><a href="">Log In</a></li>
                    <li class="interval"><a href="">Messenger</a></li>
                    <li class="interval"><a href="">Facebook Lite</a></li>
                    <li class="interval"><a href="">Watch</a></li>
                    <li class="interval"><a href="">People</a></li>
                    <li class="interval"><a href="">Pages</a></li>
                    <li class="interval"><a href="">Page Categories</a></li>
                    <li class="interval"><a href="">Places</a></li>
                    <li class="interval"><a href="">Games</a></li>
                    <li class="interval"><a href="">Locations</a></li>
                    <li class="interval"><a href="">Marketplace</a></li>
                    <li class="interval"><a href="">Facebook Pay</a></li>
                    <li class="interval"><a href="">Groups</a></li>
                    <li class="interval"><a href="">Oculus</a></li>
                    <li class="interval"><a href="">Portal</a></li>
                    <li class="interval"><a href="">Instagram</a></li>
                    <li class="interval"><a href="">Local</a></li>
                    <li class="interval"><a href="">Fundraisers</a></li>
                    <li class="interval"><a href="">Services</a></li>
                    <li class="interval"><a href="">Voting Information Center</a></li>
                    <li class="interval"><a href="">About</a></li>
                    <li class="interval"><a href="">Create Ad</a></li>
                    <li class="interval"><a href="">Create Page</a></li>
                    <li class="interval"><a href="">Developers</a></li>
                    <li class="interval"><a href="">Careers</a></li>
                    <li class="interval"><a href="">Privacy</a></li>
                    <li class="interval"><a href="">Cookies</a></li>
                    <li class="interval"><a href="">Ad Choices</a></li>
                    <li class="interval"><a href="">Terms</a></li>
                    <li class="interval"><a href="">Help</a></li>
                </ul>
            </div>
            <div class="spandiv">
                <span class="span">goodbook © 2020</span>
            </div>
            <div class="portfolio-top">
                <p><a href="../Portfolio.php" class="portfolio">portfolio top</a></p>
            </div>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="main.js"></script>
</body>

</html>
