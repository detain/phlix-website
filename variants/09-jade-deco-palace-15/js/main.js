// nav toggle for mobile menu
(function () {
  'use strict';

  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
})();
