$(function () {
  $(".button").prevAll().hide();
  $(".button").click(function () {
    if ($(this).prevAll().is(":hidden")) {
      $(this).prevAll().slideDown();
      $(this).text("close").addClass("close");
    } else {
      $(this).prevAll().slideUp();
      $(this).text("more").removeClass("close");
    }
  });
});
