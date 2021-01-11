// main_left_menuの表示，非表示
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

// profile editモーダルウィンドウの表示，非表示ボタン

$(function () {
	$(".edit").click(function () {
		$(".profile_edit_screen_overall").toggle();
		$("body").toggleClass("fixed");
	});
});
$(function () {
	$(".fa-times-circle").click(function () {
		$(".profile_edit_screen_overall").toggle();
		$("body").toggleClass("fixed");
	});
});

//ボタンの色保持
$(function () {
	$(".accountMenu_button").click(function () {
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
	});
});
