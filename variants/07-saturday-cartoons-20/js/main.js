// ============================================================
// MAIN.JS — Saturday Cartoons V20
// Comic Kaboom: Nav toggle + comic burst effects
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

  // Add punch effect on CTA buttons
  var ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-6px) rotate(-3deg)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Feature cards 3D tilt on mousemove
  var cards = document.querySelectorAll('.feature-card');
  if (cards.length) {
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 30;
        var rotateY = (centerX - x) / 30;
        card.style.transform =
          'perspective(1000px) rotateX(' +
          rotateX +
          'deg) rotateY(' +
          rotateY +
          'deg) translateY(-10px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // Hero burst animation on scroll
  var heroBurst = document.querySelector('.hero-burst');
  if (heroBurst) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < 200) {
        var scale = 1 + scrolled / 1000;
        var opacity = Math.max(0, 0.9 - scrolled / 500);
        heroBurst.style.transform = 'rotate(15deg) scale(' + scale + ')';
        heroBurst.style.opacity = opacity;
      }
    });
  }
})();
