<header class="header">
    <div class="head_left">
        <nav>
            <div class="icon_div">
                <a href="login.php"><img class="icon" src="img/Facebook-Logo1.png" alt="goodbook_icon"></a>
            </div>
        </nav>
        <div class="serch_div">
            <label class="serch">
                <input type="serch" class="serch" placeholder=" goodbook search">
            </label>
        </div>
    </div>
    <div class="head_center">

        <a class="to_homepage chenge_color" href="homepage.php">
            <div class="header_center_icon">
                <i class="fas fa-home fa-2x <?php buttonColor($siteTitle, "homepage"); ?>"></i>
            </div>
        </a>

        <a class="to_friendsList chenge_color" href="friendsList.php<?php echo "?u_id=" . $_SESSION["user_id"] ?>">
            <div class="header_center_icon">
                <i class=" fas fa-user-friends fa-2x <?php buttonColor($siteTitle, "frineds list"); ?>"></i>
            </div>
        </a>

        <div class="header_center_icon chenge_color"><i class="fas fa-tv fa-2x"></i></div>

        <a class="to_friends chenge_color" href="friends.php">
            <div class="header_center_icon ">
                <i class="left_icon far fa-user fa-2x <?php buttonColor($siteTitle, "friends") ?>"></i>
            </div>
        </a>

        <div class="header_center_icon chenge_color"><i class="fas fa-dice-d6 fa-2x"></i></div>

    </div>
    <div class="head_right">
        <div class="header_right_icon"><a class="account_menu_a to_mypage" href="mypage.php">
                <?php if (empty($dbFormData["profpic"])) { ?>
                    <div class="myicon">
                        <i class="fas fa-user-circle fa-2x"></i>
                    </div>
                <?php } else { ?>
                    <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>" style="width: 30px; height: 30px;">
                <?php } ?>
            </a></div>
        <div class="header_right_icon"><i class="fas fa-plus-circle fa-2x"></i></div>
        <div class="header_right_icon">
            <a href="msgRoomList.php"><i class="far fa-comment-dots fa-2x <?php buttonColor($siteTitle, "msg room") ?>"></i></a>
        </div>
        <div class="header_right_icon"><i class="fas fa-bell fa-2x"></i></div>
        <div class="header_right_icon">
            <div class="accountMenu_button">
                <i class="fas fa-caret-down fa-2x"></i>
            </div>
            <div class="accountMenu">
                <div class="myprofile">
                    <a class="account_menu_a to_mypage" href="mypage.php">
                        <?php if (empty($dbFormData["profpic"])) { ?>
                            <div class="myicon">
                                <i class="fas fa-user-circle fa-4x"></i>
                            </div>
                        <?php } else { ?>
                            <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>" style="margin-top: 6px; margin-left: 8px;">
                        <?php } ?>
                        <div class=" myInfo">
                            <p><?php userInfoIndicate($dbFormData, "username"); ?></p>
                            <p> <?php notLoggedMsg("View my profile", "Please login"); ?></p>
                            <p><?php echo print_r($title, true); ?></p>
                        </div>
                    </a>
                </div>
                <div class="accountMenuBorder"></div>
                <div class="feedback">
                    <div class="feedbackIcon">
                        <i class="far fa-comment-alt fa-2x"></i>
                    </div>
                    <div class="feedback_comment">
                        <p>Send feedback</p>
                        <p>View my profile</p>
                    </div>
                </div>
                <div class="accountMenuBorder"></div>
                <div>
                    <div class="Menu_element setting">
                        <div class="Menu_elementIcon">
                            <i class="fas fa-cog fa-2x"></i>
                        </div>
                        <div class="Menu_element_comment">
                            <p>setting</p>
                        </div>
                    </div>
                    <div class="Menu_element help_support">
                        <a class="account_menu_a to_withdrawpage" href="withdrawpage.php">
                            <div class="Menu_elementIcon">
                                <i class="far fa-question-circle fa-2x"></i>
                            </div>
                            <div class="Menu_element_comment">
                                <p>withdraw</p>
                            </div>
                        </a>
                    </div>
                    <div class="Menu_element darkMode">
                        <div class="Menu_elementIcon">
                            <i class="fas fa-adjust fa-2x"></i>
                        </div>
                        <div class="Menu_element_comment">
                            <p>dark mode off</p>
                        </div>
                    </div>
                    <a class="logout" href="logout.php">
                        <div class="Menu_element logout">
                            <div class="Menu_elementIcon">
                                <i class="fas fa-door-open fa-2x"></i>
                            </div>
                            <div class="Menu_element_comment">
                                <p><?php notLoggedMsg("logout", "login") ?></p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
<p id="js-show-msg" style="display:none;" class="msg-slide">
    <?php
    echo getSessionFlash('msg_success');
    ?>
</p>