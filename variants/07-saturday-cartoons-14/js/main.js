// ============================================================
// MAIN.JS — Saturday Cartoons V14
// Doodle Sketch: Nav toggle + Bouncy interactions
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

  // Bouncy CTA buttons on hover
  var ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px) rotate(-2deg)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Feature cards subtle wobble effect
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
          'deg) translateY(-8px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // Add playful squiggle animation to hero decoration
  var heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      var deco = heroSection.querySelector('::after');
    });
  }
})();
