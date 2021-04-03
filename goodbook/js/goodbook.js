// =========================
// jquery 読み込み
// =========================
var $ = require("jQuery");

// =========================
// login&signup form action
// =========================
$(function () {
	const MSG_EMAIL_TYPE = "Not in the form of email";
	const MSG_PHONE_TYPE = "Not in the form of a phone number";
	const MSG_EMPTY = "Input Required";
	const MSG_PASSWORD_MIN = "Please enter at least 6 characters";
	const MSG_COLLATION = "pass and repass are different";

	$(".email").keyup(function () {
		var form_g = $(this).closest(".emaildiv");

		if ($(this).val().length === 0) {
			form_g.removeClass("has-success").addClass("has-error");
			form_g.find(".help-block").text(MSG_EMPTY);
		} else if (
			$(this).val().length > 50 ||
			!$(this)
				.val()
				.match(
					/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/
				)
		) {
			form_g.removeClass("has-success").addClass("has-error");
			form_g.find(".help-block").text(MSG_EMAIL_TYPE);
		} else {
			form_g.removeClass("has-error").addClass("has-success");
			form_g.find(".help-block").text("");
		}
	});

	$(".password").keyup(function () {
		var form_g = $(this).closest(".passworddiv");

		if ($(this).val().length === 0) {
			form_g.removeClass("has-success").addClass("has-error");
			form_g.find(".help-block").text(MSG_EMPTY);
		} else if ($(this).val().length < 6) {
			form_g.removeClass("has-success").addClass("has-error");
			form_g.find(".help-block").text(MSG_PASSWORD_MIN);
		} else {
			form_g.removeClass("has-error").addClass("has-success");
			form_g.find(".help-block").text("");
		}
	});

	$(".password_retype").keyup(function () {
		var form_g = $(this).closest(".password_retypediv");

		if ($(this).val().length === 0) {
			form_g.removeClass("has-success").addClass("has-error");
			form_g.find(".help-block").text(MSG_EMPTY);
		} else if ($(this).val().length < 6) {
			form_g.removeClass("has-success").addClass("has-error");
			form_g.find(".help-block").text(MSG_PASSWORD_MIN);
		} else {
			form_g.removeClass("has-error").addClass("has-success");
			form_g.find(".help-block").text("");
		}
	});
});

// =========================
// main_left_menuの表示，非表示
// =========================
$(function () {
	$(".js-menu__item__link_open").each(function () {
		$(this).on("click", function () {
			$("+.submenu", this).slideToggle();
			$("i", this).toggleClass("fas fa-arrow-circle-down fa-2x");
			$("i", this).toggleClass("fas fa-arrow-circle-up fa-2x");
			$(this).toggleClass("Retentioncolor_blue");
			if ($("span", this).text() === "close") {
				$("span", this).text("more");
			} else {
				$("span", this).text("close");
			}
			return false;
		});
	});
});

// ====================
// Account page
// ====================
// Bio input form 表示、非表示
$(function () {
	$(".bioUser").on("click", function () {
		$(".bioUser").toggleClass("display_none");
		$(".bioUser_textarea").toggleClass("display_none");
		$(".myBio").toggleClass("display_none");
	});
});
$(function () {
	$(".bio_cancel").on("click", function () {
		$(".bioUser").toggleClass("display_none");
		$(".bioUser_textarea").toggleClass("display_none");
		$(".myBio").toggleClass("display_none");
	});
});

// ====================
// accountMenu
// ====================
// accountMenuの表示，非表示ボタン
$(function () {
	$(".accountMenu_button").on("click", function () {
		$(".accountMenu").toggle();
	});
});
// ===========================================
// モーダルウィンドウの表示，非表示ボタン
// ===========================================
$(function () {
	$(".edit").on("click", function () {
		$(".modalwindow_screen_overall_1").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".myIcon_img_div").on("click", function () {
		$(".modalwindow_screen_overall_2").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".coverPhotoChange").on("click", function () {
		$(".modalwindow_screen_overall_3").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".main_center_comment2").on("click", function () {
		$(".modalwindow_screen_overall_4").toggle();
		$("body").toggleClass("fixed");
	});
});
// Xボタン
$(function () {
	$(".x-circle1").on("click", function () {
		$(".modalwindow_screen_overall_1").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".x-circle2").on("click", function () {
		$(".modalwindow_screen_overall_2").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".x-circle3").on("click", function () {
		$(".modalwindow_screen_overall_3").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".x-circle4").on("click", function () {
		$(".modalwindow_screen_overall_4").toggle();
		$("body").toggleClass("fixed");
	});
});
//ボタンの色保持
$(function () {
	$(".accountMenu_button").on("click", function () {
		$(this).toggleClass("Retentioncolor_blue");
	});
});

// ダークモード切り替え
$(function () {
	$(".darkMode").click(function () {
		if ($("p", this).text() === "dark mode off") {
			$("p", this).text("dark mode on");
		} else {
			$("p", this).text("dark mode off");
		}
		$(".header").toggleClass("shadow");
		$(".header_center_icon").toggleClass("darkColor2");
		$("body").toggleClass("darkColor2");
		$(".icon_button").toggleClass("darkColor1");
		$(".main_left_icon").toggleClass("darkColor2");
		$(".js-menu__item__link_open").toggleClass("darkColor2");
		$(".header").toggleClass("lightBackColor2");
		$(".header_right_icon").toggleClass("darkColor1");
		$(".main").toggleClass("lightBackColor1");
		$(".main_center_element").toggleClass("lightBackColor2 shadow");
		$(".main_center_icon").toggleClass("darkColor2");
		$("a").toggleClass("darkColor2");
		$("a:active").toggleClass("darkColor2");
		$("a:focus").toggleClass("darkColor2");
		$(".logout").toggleClass("darkColor2");
		$(".logout:active").toggleClass("darkColor2");
		$(".logout:focus").toggleClass("darkColor2");
		$(".accountMenu").toggleClass("lightBackColor2 darkColor2 shadow");
		$(".withdraw_main").toggleClass("lightBackColor1");
		$(".withdraw_page_width").toggleClass("lightBackColor2 darkColor2 shadow");
		$(".withdraw_window input").toggleClass("shadow");
		$(".main_center_comment2").toggleClass("lightColor2");
		$(".submenuName").toggleClass("lightColor2");
		$(".main_top_content_overall").toggleClass("lightBackColor2");
		$(".my_profile").toggleClass("lightBackColor2 shadow");
		$(".share_post").toggleClass("lightBackColor2 shadow");
		$(".modalwindow_form").toggleClass("lightBackColor2 shadow");
		$(".mypage_beneath").toggleClass("lightBackColor1");
		$(".editProfileElement").toggleClass("darkColor2");
		$(".imgUpIcon").toggleClass("darkColor2");
		$(".posttextarea").toggleClass("lightBackColor2 darkColor2");
		$(".html_backgroundColor").toggleClass("lightBackColor1");
	});
});

$(function () {
	// var $ftr = $("#footer");
	// if (window.innerHeight > $ftr.offset().top + $ftr.outerHeight()) {
	// 	$ftr.attr({
	// 		style:
	// 			"position:fixed; top:" +
	// 			(window.innerHeight - $ftr.outerHeight()) +
	// 			"px;",
	// 	});
	// }
	// メッセージ表示
	var $jsShowMsg = $("#js-show-msg");
	var msg = $jsShowMsg.text();
	if (msg.replace(/^[\s　]+|[\s　]+$/g, "").length) {
		$jsShowMsg.slideToggle("slow");
		setTimeout(function () {
			$jsShowMsg.slideToggle("slow");
		}, 5000);
	}
});
$(function () {
	// テキストエリアカウント
	var $countUp = $("#js-count"),
		$countView = $("#js-count-view");
	$countUp.on("keyup", function (e) {
		$countView.html($(this).val().length);
	});
});

$(function () {
	// 画像ライブプレビュー
	var $dropArea = $(".area-drop");
	var $fileInput = $(".input-file");
	$dropArea.on("dragover", function (e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).css("border", "3px #ccc dashed");
	});
	$dropArea.on("dragleave", function (e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).css("border", "none");
	});
	$fileInput.on("change", function (e) {
		$dropArea.css("border", "none");
		var file = this.files[0], // 2. files配列にファイルが入っています
			$img = $(this).siblings(".prev-img"), // 3. jQueryのsiblingsメソッドで兄弟のimgを取得
			fileReader = new FileReader(); // 4. ファイルを読み込むFileReaderオブジェクト

		// 5. 読み込みが完了した際のイベントハンドラ。imgのsrcにデータをセット
		fileReader.onload = function (event) {
			// 読み込んだデータをimgに設定
			$img.attr("src", event.target.result).show();
		};

		// 6. 画像読み込み
		fileReader.readAsDataURL(file);
	});
});

// ~~~~~~~~~~~~~~
// friend 登録機能
// ~~~~~~~~~~~~~~
var $like, $FriendId;
$like = $(".js-click-like") || null; //nullというのはnull値という値で、「変数の中身は空ですよ」と明示するためにつかう値
console.log($like.data("friendid"));
$FriendId = $like.data("friendid") || null;
// 数値の0はfalseと判定されてしまう。friend_idが0の場合もありえるので、0もtrueとする場合にはundefinedとnullを判定する
if ($FriendId !== undefined && $FriendId !== null) {
	$like.on("click", function () {
		var $this = $(this);
		$.ajax({
			type: "POST",
			url: "ajaxFriends.php",
			data: {
				friendId: $FriendId,
			},
		})
			.done(function (data) {
				console.log("Ajax Success");
				// クラス属性をtoggleでつけ外しする
				$this.toggleClass("active");
			})
			.fail(function (msg) {
				console.log("Ajax Error");
			});
	});
}

// ~~~~~~~~~~~~~~
// good 登録機能
// ~~~~~~~~~~~~~~
var $goodList;
$goodList = $(".js-click-good") || null; //nullというのはnull値という値で、「変数の中身は空ですよ」と明示するためにつかう値
console.log($goodList);

const goodList = document.querySelectorAll(".js-click-good");
console.log(goodList, "get good list?");

goodList.forEach((good) => {
	console.log(good);
	const postId = good.getAttribute("data-postid");
	const thisGood = good.getAttribute("fa-thumbs-up");
	good.addEventListener("click", () => {
		if (postId !== undefined && postId !== null) {
			console.log(postId);
			// var $this = $(this);
			$.ajax({
				type: "POST",
				url: "ajaxGoodButton.php",
				data: {
					postId: postId,
				},
			})
				.done(function (data) {
					console.log("Ajax Success");
					// クラス属性をtoggleでつけ外しする
					// $(".good").on("click", function () {
					// var $this = $(this);
					// $(".good_subject").toggleClass("good_color");
					// $(".fa-thumbs-up").toggleClass("good_color");
					// $(".fa-thumbs-up").toggleClass("is-active");
					// });
				})
				.fail(function (msg) {
					console.log("Ajax Error");
				});
		}
	});
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// formが全て入力されるまでinputを無効化
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(function () {
	$(".js-form-validate-login").on("keyup", function () {
		if ($(".email").val() && $(".password").val()) {
			$(".js-disabled-submit").prop("disabled", false);
		} else {
			$(".js-disabled-submit").prop("disabled", true);
		}
	});
});
$(function () {
	$(".js-form-validate-signup").on("keyup", function () {
		if (
			$(".email").val() &&
			$(".password").val() &&
			$(".password_retype").val()
		) {
			$(".js-disabled-submit").prop("disabled", false);
		} else {
			$(".js-disabled-submit").prop("disabled", true);
		}
	});
});

/* ~~~~~~~~~~~~~~ */
/* dropdownmenu */
/* ~~~~~~~~~~~~~~ */
$(function () {
	$(".ellipsis").hover(
		function () {
			$("ul.sub:not(:animated)", this).slideDown();
		},
		function () {
			$("ul.sub", this).slideUp();
		}
	);
});

var slider = (function () {
	var currentItemNum = 1; //デフォルトの位置設定
	var $slideContainer = $(".slider__container"); //格納しているタグを指定
	var slideItemNum = $(".slider__item").length; //アイテムの数を数えて変数へ代入
	var slideItemWidth = $(".slider__item").innerWidth(); //アイテムのwidthを変数へ代入
	var slideContainerWidth = slideItemWidth * slideItemNum; //アイテムの合計のwidthを変数へ代入
	var DURATION = 500; //アニメーションの時間を代入

	return {
		slidePrev: function () {
			//現在のアイテム番号が1より小さい場合はこの処理をしない
			if (currentItemNum > 1) {
				//アイテムを動かす
				$slideContainer.animate(
					//左へ一つのアイテムのwidth分動かす
					{ left: "+=" + slideItemWidth + "px" },
					//時間指定
					DURATION
				);
				// 現在のアイテム番号から1マイナスする
				currentItemNum--;
			}
		},
		slideNext: function () {
			//現在のアイテム番号が合計のアイテム番号より小さい場合はこの処理をしない
			if (currentItemNum < slideItemNum) {
				//アイテムを動かす
				$slideContainer.animate(
					//右へ一つのアイテムのwidth分動かす
					{ left: "-=" + slideItemWidth + "px" },
					//時間指定
					DURATION
				);
				// 現在のアイテム番号から1プラスする
				currentItemNum++;
			}
		},
		init: function () {
			$slideContainer.attr("style", "width:" + slideContainerWidth + "px");
			var that = this;
			$(".js-slider-next").click(function () {
				that.slideNext();
			});
			$(".js-slider-prev").click(function () {
				that.slidePrev();
			});
		},
	};
})();
slider.init();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~
// post button animation
// ~~~~~~~~~~~~~~~~~~~~~~~~~~
$(".good").on("click", function () {
	var $this = $(this);
	$this.toggleClass("good_color");
	$(this).children("div").toggleClass("good_color");
	// $(this).children("i").toggleClass("is-active");
});
$(".color_remove").on("click", function () {
	var $this = $(this);
	$this.toggleClass("good_color");
	$(this).children("div").toggleClass("good_color");
	// $(this).children("i").toggleClass("is-active");
});

$(".comment").on("click", function () {
	var $this = $(this);
	$this.toggleClass("comment_color");
	$(this).children("div").toggleClass("comment_color");
	// $(this).children("i").toggleClass("is-active");
});
$(".share").on("click", function () {
	var $this = $(this);
	$this.toggleClass("share_color");
	$(this).children("div").toggleClass("share_color");
	// $(this).children("i").toggleClass("is-active");
});
