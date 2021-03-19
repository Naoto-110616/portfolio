</section>
<?php
krsort($dbPostData["data"]);
foreach ($dbPostData['data'] as $key => $val) :
?>
    <section class="main_center_element main_center_element3">
        <div class="icon_img_div">
            <?php if ($val["id"] === $_SESSION["user_id"]) { ?>
                <a href="mypage.php" class="panel">
                <?php } else { ?>
                    <a href="userDetail.php?u_id=<?php echo $val['id'] ?>">
                    <?php } ?>
                    <?php if (empty($val["profpic"])) { ?>
                        <div class="icon_img">
                            <i class="fas fa-user-circle fa-3x"></i>
                        </div>
                    <?php } else { ?>
                        <img class="icon_img" src="<?php echo sanitize($val["profpic"]) ?>">
                    <?php } ?>
                    </a>
                    <div class="user_name_div">
                        <p><?php echo sanitize($val["username"]); ?></p>
                        <p class="time_line"><?php $timestamp = strtotime($val["create_date"]); ?></p>
                        <p class="time_line"><?php echo createTime($val["create_date"]) ?></p>
                    </div>
                    <?php if ($val["id"] === $_SESSION["user_id"]) { ?>
                        <div class="info_list ellipsis"><i class="fas fa-ellipsis-h"></i>
                            <ul class="menu">
                                <ul class="sub">
                                    <li class="subMenu"><a href="#" class="submenuName">edit post</a></li>
                                    <li class="subMenu"><a href="deletePost.php<?php echo "?p_id=" . ($val["p_id"]) ?>" class="submenuName">delete post</a></li>
                                </ul>
                            </ul>
                        </div>
                    <?php } ?>
        </div>
        <div>
            <p class="main_center_comment"><?php echo sanitize($val["comment"]); ?></p>
        </div>
        <div class="main_center_mv_div">
            <img class="main_center_img" src="<?php echo sanitize($val['pic1']); ?>" alt="">
        </div>
        <div class="main_center_icon_bottom_div">
            <div class="main_center_icon_bottom">
                <div class="main_center_icon_button_div">
                    <img class="main_center_icon_button" src="img/homepage_img/download-2.svg" alt="good_button">
                </div>
                <div class="main_center_icon_button_div">
                    <img class="main_center_icon_button" src="img/homepage_img/download-1.svg" alt="love_button">
                </div>
                <div class="main_center_icon_button_div">
                    <img class="main_center_icon_button" src="img/homepage_img/download.svg" alt="face_button">
                </div>
                <div class="main_center_icon_button_div">
                    <p><?php echo mt_rand(0, 1000); ?></p>
                </div>
            </div>
            <div class="main_center_comment_share_div">
                <p>shere <?php echo mt_rand(0, 100); ?></p>
            </div>
            <div class="border"></div>
            <div class="main_center_element2_share2">
                <div class="main_center_element2_icon_div good">
                    <div class="main_center_icon main_live_video_icon">
                        <i class="far fa-thumbs-up fa-lg"></i>
                    </div>
                    <p class="icon_button good_subject">good</p>
                </div>
                <div class="main_center_element2_icon_div">
                    <div class="main_center_icon main_video_icon">
                        <i class="far fa-comment fa-lg"></i>
                    </div>
                    <p class="icon_button comment_subject">comment</p>
                </div>
                <div class="main_center_element2_icon_div share">
                    <div class="main_center_icon main_activity_icon">
                        <i class="fas fa-reply fa-lg"></i>
                    </div>
                    <p class="icon_button share_subject">share</p>
                </div>
            </div>
        </div>
    </section>
<?php endforeach;
if (!empty($dbPostData['data'])) { ?>
    <section class="main_center_element main_center_element4">
        <div class="main_center_comment3">
            <div class="main_center_element_pdiv">
                <p class="comment_make_stories1">That's all for posting</p>
            </div>
        </div>
    <?php } ?>
    </section>