// ============================================================
// MAIN.JS — Saturday Cartoons V19
// Comic Pop: Nav toggle + Comic pop animations
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

  // Add pop effect on CTA buttons (scale up then down)
  var ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) rotate(-3deg) scale(1.05)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Feature cards tilt on mousemove
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
          'deg) translateY(-8px) rotate(-0.5deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // Hero eyebrow wobble on scroll
  var heroEyebrow = document.querySelector('.hero-eyebrow');
  if (heroEyebrow) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < 100) {
        heroEyebrow.style.transform = 'translateY(0) rotate(0deg)';
      } else {
        var wobble = Math.sin(scrolled / 50) * 3;
        heroEyebrow.style.transform =
          'translateY(' + scrolled * 0.05 + 'px) rotate(' + wobble + 'deg)';
      }
    });
  }

  // Add "POW" effect on download button click
  var downloadBtns = document.querySelectorAll('a[href*="download"]');
  downloadBtns.forEach(function (btn) {
    btn.addEventListener('click', function (_e) {
      var rect = btn.getBoundingClientRect();
      var pow = document.createElement('span');
      pow.textContent = 'ZOOM!';
      pow.style.cssText =
        'position:fixed;' +
        'left:' +
        rect.left +
        'px;' +
        'top:' +
        rect.top +
        'px;' +
        'font-family: var(--font-headline);' +
        'font-size: 1.5rem;' +
        'color: var(--color-comic-red);' +
        'pointer-events: none;' +
        'z-index: 9999;' +
        'animation: pow-fade 0.6s ease-out forwards;';
      document.body.appendChild(pow);
      setTimeout(function () {
        pow.remove();
      }, 600);
    });
  });

  // CSS for pow animation
  var style = document.createElement('style');
  style.textContent =
    '@keyframes pow-fade {' +
    '0% { opacity: 1; transform: scale(0.5) rotate(-10deg); }' +
    '50% { opacity: 1; transform: scale(1.5) rotate(5deg); }' +
    '100% { opacity: 0; transform: scale(2) rotate(0deg); }' +
    '}';
  document.head.appendChild(style);
})();
