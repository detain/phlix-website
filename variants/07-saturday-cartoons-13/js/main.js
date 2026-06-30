// ============================================================
// MAIN.JS — Saturday Cartoons V13
// Confetti Carnival: Nav toggle + celebration interactions
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

  // Confetti pop effect on CTA buttons
  var ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px) rotate(-3deg) scale(1.05)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Feature cards pop effect on hover
  var cards = document.querySelectorAll('.feature-card');
  if (cards.length) {
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02) rotate(1deg)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    });
  }

  // Add subtle parallax to hero confetti on mousemove
  var hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      // Use CSS custom properties for subtle movement
      hero.style.setProperty('--mouse-x', x * 20 + 'px');
      hero.style.setProperty('--mouse-y', y * 20 + 'px');
    });
  }
})();
