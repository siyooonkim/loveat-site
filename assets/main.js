/*
 * 출시 스위치 — App Store 공개 후 true 로 바꾸면 App Store 버튼이 실제 스토어로 이동해요.
 * false: 스토어 버튼을 누르면 이동하지 않고 "곧 출시돼요" 토스트만 보여요. (버튼 모양은 동일)
 * Google Play 는 Android 출시 전이라 스위치와 무관하게 토스트만 보여요. [TODO: 출시 후 URL 연결]
 */
var IS_RELEASED = false;
var APP_STORE_URL = 'https://apps.apple.com/kr/app/id6830739150';
var GOOGLE_PLAY_URL = ''; // TODO: Android 출시 후 입력

(function () {
  // 스토어 버튼
  var toast = document.getElementById('toast');
  var timer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  document.querySelectorAll('.js-store').forEach(function (a) {
    var url = a.getAttribute('data-store') === 'ios' ? APP_STORE_URL : GOOGLE_PLAY_URL;
    var live = IS_RELEASED && !!url;
    if (live) {
      a.href = url;
      return;
    }
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('곧 출시돼요');
    });
  });

  // FAQ 아코디언 — 디자인과 같이 한 번에 하나만 열려요
  var buttons = document.querySelectorAll('.faq-q');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      buttons.forEach(function (b) {
        var open = b === btn && willOpen;
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
        var panel = document.getElementById(b.getAttribute('aria-controls'));
        if (panel) panel.hidden = !open;
      });
    });
  });
})();
