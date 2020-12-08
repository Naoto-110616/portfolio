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