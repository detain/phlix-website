// ============================================================
// MAIN.JS — Saturday Cartoons V18
// Doodle Land: Nav toggle + Bouncy doodle interactions
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

  // Add bouncy effect on CTA buttons
  var ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) rotate(-3deg)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Feature cards playful tilt on mousemove
  var cards = document.querySelectorAll('.feature-card');
  if (cards.length) {
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 25;
        var rotateY = (centerX - x) / 25;
        card.style.transform =
          'perspective(1000px) rotateX(' +
          rotateX +
          'deg) rotateY(' +
          rotateY +
          'deg) translateY(-8px) rotate(-1deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // Add wobble to hero eyebrow on scroll
  var heroEyebrow = document.querySelector('.hero-eyebrow');
  if (heroEyebrow) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < 100) {
        heroEyebrow.style.transform = 'translateY(0) rotate(0deg)';
      } else {
        var wobble = Math.sin(scrolled / 50) * 3;
        heroEyebrow.style.transform =
          'translateY(' + scrolled * 0.1 + 'px) rotate(' + wobble + 'deg)';
      }
    });
  }
})();
