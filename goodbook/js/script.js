(function () {
  /**
   * グループスライド
   */
  const $groupRow = document.querySelector('.group-wrapper');
  $groupRow.addEventListener('click', toggle);
  function toggle() {
    const $groupDetailList = document.querySelectorAll('.group-detail');
    $groupDetailList.forEach(function (el) {
      el.classList.toggle('close');
    });
    const $openIcon = document.querySelector('.js-open-icon');
    $openIcon.classList.toggle('disp-none');
    const $closeIcon = document.querySelector('.js-close-icon');
    $closeIcon.classList.toggle('disp-none');
  }

  /**
   * ヘッダースライド
   */
  const $header = document.querySelector('.header');
  let currentPos = 0;
  window.addEventListener('scroll', function () {
    const scrollTop = document.scrollingElement.scrollTop;
    if (currentPos > scrollTop) {
      $header.classList.remove('hide');
    } else if (scrollTop >= 120) {
      $header.classList.add('hide');
    } else {
      $header.classList.remove('hide');
    }
    currentPos = scrollTop;
  });
})();
