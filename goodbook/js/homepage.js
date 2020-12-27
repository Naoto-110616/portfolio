// main_left_menuの表示，非表示
$(function(){
    $('.js-menu__item__link_open').each(function(){
        $(this).on('click',function(){
            $("+.submenu",this).slideToggle();
            $("i",this).toggleClass("fas fa-arrow-circle-down fa-2x");
            $("i",this).toggleClass("fas fa-arrow-circle-up fa-2x");
            if ($("span",this).text() === 'close') {
                $("span",this).text("more");
              } else {
                $("span",this).text("close");
              }
            return false;
        });
    });
});

// // footer位置保持
// $(function() {
//   var $ftr = $('#footer');
//   if (window.innerHeight > $ftr.offset().top + $ftr.outerHeight()) {
//     $ftr.attr({
//       'style': 'position:fixed; top:' + (window.innerHeight - $ftr.outerHeight()) + 'px;'
//     });
//   }
// });

// ====================
// accountMenu
// ====================
// accountMenuの表示，非表示
$(function () {
  $('.accountMenu_button').click(function () {
      $('.accountMenu').toggle();
  });
});

//ボタンの色保持
$(function() {
  $(".accountMenu_button").click(function() {
    // cssでテキスト上に背景色をon/off
    $(this).toggleClass("Retentioncolor_blue");
  });
});

// ダークモード切り替え
$(function() {
  $(".darkMode").click(function() {
    if ($("p",this).text() === 'dark mode off') {
      $("p",this).text("dark mode on");
    } else {
      $("p",this).text("dark mode off");
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
    $(".withdraw_window").toggleClass("lightBackColor1");
    $(".withdraw_page_width").toggleClass("lightBackColor2 darkColor2 shadow");
    $(".withdraw_window input").toggleClass("shadow");
  });
});