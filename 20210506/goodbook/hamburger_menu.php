<nav>
    <section class="js-toggle-sp-menu-target hamberger_menu" id="main_left_wrapper">
        <div id="contents">
            <ul>
                <a href="mypage.php">
                    <li class="main_left_icon">
                        <?php if (empty($dbFormData["profpic"])) { ?>
                            <img class="icon_img" src="./img/not_set_icon.png">
                            <div class="icon_name_div"><span class="icon_name"><?php echo sanitize($dbFormData["username"]); ?></span></span></div>
                        <?php } else { ?>
                            <img class="icon_img" src="<?php echo sanitize($dbFormData["profpic"]) ?>">
                            <div class="icon_name_div"><span class="icon_name"><?php echo sanitize($dbFormData["username"]); ?></span></div>
                        <?php } ?>
                    </li>
                </a>
                <li class="main_left_icon">
                    <div><i class="left_icon fas fa-heartbeat fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">covid19 Information Center</span></div>
                </li>
                <a href="friends.php">
                    <li class="main_left_icon">
                        <div><i class="left_icon far fa-user fa-2x"></i></div>
                        <div class="icon_name_div"><span class="icon_name">Find a friend</span></div>
                    </li>
                </a>
                <li class="main_left_icon">
                    <div><i class="left_icon fas fa-users fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">group</span></div>
                </li>
                <li class="main_left_icon">
                    <div><i class="left_icon fas fa-video fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">video</span></div>
                </li>
                <li class="main_left_icon">
                    <div><i class="left_icon far fa-calendar-alt fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">event</span></div>
                </li>
                <li class="main_left_icon">
                    <div><i class="left_icon far fa-clock fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">memories</span></div>
                </li>
                <li class="main_left_icon">
                    <div><i class="left_icon fas fa-tag fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">saved</span></div>
                </li>
                <li class="main_left_icon">
                    <div><i class="left_icon fab fa-font-awesome-flag fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">page</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-briefcase fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">job offer</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-wallet fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">pay</span></div>
                </li>
                <a href="msgRoomList.php">
                    <li class="main_left_icon submenu__item">
                        <div><i class="left_icon fas fa-comment-dots fa-2x"></i></div>
                        <div class="icon_name_div"><span class="icon_name">massenger</span></div>
                    </li>
                </a>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon far fa-comment-dots fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">massenger kids</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-cube fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">Oculus</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon far fa-star fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">favorite</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-gamepad fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">game</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-bullhorn fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">advertising center</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-signal fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">advertising manage</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-ad fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">advertising activity</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-ticket-alt fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">curpon</span></div>
                </li>
                <a href="friendsList.php<?php echo "?u_id=" . $_SESSION["user_id"] ?>">
                    <li class="main_left_icon submenu__item">
                        <div><i class="fas fa-user-friends fa-2x"></i></div>
                        <div class="icon_name_div"><span class="icon_name">List of friends</span></div>
                    </li>
                </a>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-cloud-sun fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">wether</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fab fa-gratipay fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">donation campaign</span></div>
                </li>
                <li class="main_left_icon submenu__item">
                    <div><i class="left_icon fas fa-solar-panel fa-2x"></i></div>
                    <div class="icon_name_div"><span class="icon_name">Configuration</span></div>
                </li>
        </div>
    </section>
</nav>