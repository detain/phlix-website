// ============================================================
// MAIN.JS — Saturday Cartoons V12
// Comic Book Blast: Nav toggle + Comic interactions
// ============================================================
(function () {
  'use strict';

  // Nav toggle
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (btn && menu) {
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
  }

  // Add comic "POW" effect on CTA buttons
  var ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px) rotate(-2deg)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Feature cards subtle tilt on mousemove
  var cards = document.querySelectorAll('.feature-card');
  if (cards.length) {
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 20;
        var rotateY = (centerX - x) / 20;
        card.style.transform =
          'perspective(1000px) rotateX(' +
          rotateX +
          'deg) rotateY(' +
          rotateY +
          'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }
})();
