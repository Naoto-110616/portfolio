// main_leftのmenuの表示，非表示
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
    // cssでテキスト上に背景色をon/off
    $(".header_center_icon").toggleClass("darkColor2");
    $(".serch").toggleClass("lightBackColor1");
    $(".serch").toggleClass("darkColor2");
    $("serch::placeholder").toggleClass("darkColor2");
    $("body").toggleClass("darkColor2");
    $(".icon_button").toggleClass("darkColor1");
    $("i").toggleClass("darkColor1");
    $(".header").toggleClass("lightBackColor2");
    $(".main").toggleClass("lightBackColor1");
    $(".main_center_element").toggleClass("lightBackColor2");
    $(".icon_name").toggleClass("darkColor1");
    $("a").toggleClass("darkColor2");
    $("a:active").toggleClass("darkColor2");
    $("a:focus").toggleClass("darkColor2");
    $(".accountMenu").toggleClass("lightBackColor2");
    $(".accountMenu").toggleClass("darkColor2");
  });
});