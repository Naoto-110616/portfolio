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
				// $(this).toggleClass("darkColor2");
				$("span", this).text("more");
			} else {
				// $(this).removeClass("darkColor2");
				$("span", this).text("close");
			}
			return false;
		});
	});
});

// ====================
// accountMenu
// ====================
// accountMenuの表示，非表示ボタン
$(function () {
	$(".accountMenu_button").click(function () {
		$(".accountMenu").toggle();
	});
});
// ===========================================
// モーダルウィンドウの表示，非表示ボタン
// ===========================================
$(function () {
	$(".edit").click(function () {
		$(".modalwindow_screen_overall_1").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".myIcon_img_div").click(function () {
		$(".modalwindow_screen_overall_2").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".coverPhotoChange").click(function () {
		$(".modalwindow_screen_overall_3").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".main_center_comment2").click(function () {
		$(".modalwindow_screen_overall_4").toggle();
		$("body").toggleClass("fixed");
	});
});
// Xボタン
$(function () {
	$(".x-circle1").click(function () {
		$(".modalwindow_screen_overall_1").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".x-circle2").click(function () {
		$(".modalwindow_screen_overall_2").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".x-circle3").click(function () {
		$(".modalwindow_screen_overall_3").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".x-circle4").click(function () {
		$(".modalwindow_screen_overall_4").toggle();
		$("body").toggleClass("fixed");
	});
});
//ボタンの色保持
$(function () {
	$(".accountMenu_button").click(function () {
		$(this).toggleClass("Retentioncolor_blue");
	});
});

// 要改善　ボタン切り分け
// // good button
// $(function () {
// 	$(".good").click(function () {
// 		$(".good_subject").toggleClass("Retentioncolor_blue");
// 		$(".fa-thumbs-up").toggleClass("Retentioncolor_blue");
// 	});
// });
// // share button
// $(function () {
// 	$(".share").click(function () {
// 		$(".share_subject").toggleClass("Retentioncolor_blue");
// 		$(".fa-reply").toggleClass("Retentioncolor_blue");
// 	});
// });

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
// $(function () {
// 	//scrollHeightは要素のスクロールビューの高さを取得するもの
// 	$("#js-scroll-bottom").animate(
// 		{ scrollTop: $("#js-scroll-bottom")[0].scrollHeight },
// 		"fast"
// 	);
// });

// ~~~~~~~~~~~~~~
// friend 登録機能
// ~~~~~~~~~~~~~~
var $like, $FriendId;
$like = $(".js-click-like") || null; //nullというのはnull値という値で、「変数の中身は空ですよ」と明示するためにつかう値
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

/* ~~~~~~~~~~~~~~ */
/* slider */
/* ~~~~~~~~~~~~~~ */
// var currentItemNum = 1;
// var $slideContainer = $(".slider__container");
// var slideItemNum = $(".slider__item").length;
// var slideItemWidth = $(".slider__item").innerWidth();
// var slideContainerWidth = slideItemWidth * slideItemNum;
// var DURATION = 500;

// $slideContainer.attr("style", "width:" + slideContainerWidth + "px");

// $(".js-slider-next").on("click", function () {
// 	if (currentItemNum < slideItemNum) {
// 		$slideContainer.animate({ left: "-=" + slideItemWidth + "px" }, DURATION);
// 		currentItemNum++;
// 	}
// });
// $(".js-slider-prev").on("click", function () {
// 	if (currentItemNum > 1) {
// 		$slideContainer.animate({ left: "+=" + slideItemWidth + "px" }, DURATION);
// 		currentItemNum--;
// 	}
// });

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
