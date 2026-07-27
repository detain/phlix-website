/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* main.js — Cyber Tokyo site JS */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Mobile nav toggle ── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open', !expanded);
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll reveals (reduced-motion safe) ── */
  if (!reducedMotion.matches) {
    var revealEls = document.querySelectorAll('.feature-card, .client-card, .feature-detail');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      revealEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
        revealObserver.observe(el);
      });
    }
  }

  /* ── Glitch hover on feature card icons ── */
  if (!reducedMotion.matches) {
    var glitchCards = document.querySelectorAll('.feature-card');
    glitchCards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        var icon = card.querySelector('.feature-icon');
        if (icon) {
          icon.style.animation = 'none';
          icon.offsetHeight; /* force reflow */
          icon.style.animation = 'glitch-shift 200ms steps(2, end)';
        }
      });
      card.addEventListener('mouseleave', function () {
        var icon = card.querySelector('.feature-icon');
        if (icon) {
          icon.style.animation = '';
        }
      });
    });
  }

  /* ── Easter Egg 1: Logo click counter ── */
  (function () {
    var logo = document.querySelector('.nav-logo');
    var clickCount = 0;
    var lastClickTime = 0;

    if (!logo) return;

    logo.addEventListener('click', function (_e) {
      var now = Date.now();
      if (now - lastClickTime > 800) {
        clickCount = 0;
      }
      lastClickTime = now;
      clickCount++;

      if (clickCount >= 5) {
        clickCount = 0;
        showEasterEgg('neon-spiral');
      }
    });
  })();

  /* ── Easter Egg 2: Typed word detection ── */
  (function () {
    var typedBuffer = '';
    var targetWord = 'neon';
    var lastKeyTime = 0;
    var timeout = 1000;

    document.addEventListener('keydown', function (e) {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) return;

      var now = Date.now();
      if (now - lastKeyTime > timeout) {
        typedBuffer = '';
      }
      lastKeyTime = now;

      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        typedBuffer += e.key.toLowerCase();
        if (typedBuffer.length > targetWord.length) {
          typedBuffer = typedBuffer.slice(-targetWord.length);
        }
        if (typedBuffer === targetWord) {
          showEasterEgg('neon-flash');
          typedBuffer = '';
        }
      }

      if (e.key === 'Escape') {
        typedBuffer = '';
      }
    });
  })();

  /* ── Easter Egg 3: Konami Code ── */
  (function () {
    var konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'KeyB',
      'KeyA',
    ];
    var konamiIndex = 0;
    var lastKonamiTime = 0;
    var timeout = 1000;

    document.addEventListener('keydown', function (e) {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) return;

      var now = Date.now();
      if (now - lastKonamiTime > timeout) {
        konamiIndex = 0;
      }
      lastKonamiTime = now;

      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          showEasterEgg('konami-activated');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  })();

  /* ── Easter egg display ── */
  function showEasterEgg(type) {
    var existing = document.querySelector('.easter-egg-flash');
    if (existing) existing.remove();

    var flash = document.createElement('div');
    flash.className = 'easter-egg-flash';
    flash.setAttribute('aria-hidden', 'true');

    var style = document.createElement('style');
    if (type === 'neon-spiral') {
      flash.textContent = '信号 — SIGNAL FOUND';
      style.textContent =
        '.easter-egg-flash { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-display); font-size: clamp(2rem, 8vw, 5rem); color: var(--color-primary); text-shadow: var(--shadow-neon-sakura); z-index: 9999; animation: easter-flash 1.5s ease-out forwards; pointer-events: none; } @keyframes easter-flash { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } 20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); } 40% { transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-20px); } }';
    } else if (type === 'neon-flash') {
      flash.textContent = 'ネオン — NEON';
      style.textContent =
        '.easter-egg-flash { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-display); font-size: clamp(2rem, 8vw, 5rem); color: var(--color-secondary); text-shadow: var(--shadow-neon-green); z-index: 9999; animation: easter-flash 1s ease-out forwards; pointer-events: none; } @keyframes easter-flash { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } 30% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%); } }';
    } else if (type === 'konami-activated') {
      flash.textContent = 'コード完了 — ACCESS GRANTED';
      style.textContent =
        '.easter-egg-flash { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-display); font-size: clamp(1.5rem, 6vw, 4rem); color: var(--color-tertiary); text-shadow: var(--shadow-neon-mandarin); z-index: 9999; animation: easter-flash 2s ease-out forwards; pointer-events: none; } @keyframes easter-flash { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(-5deg); } 30% { opacity: 1; transform: translate(-50%, -50%) scale(1.05) rotate(0deg); } 50% { transform: translate(-50%, -50%) scale(1) rotate(0deg); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1) rotate(3deg) translateY(-30px); } }';
    }

    document.head.appendChild(style);
    document.body.appendChild(flash);

    setTimeout(
      function () {
        if (flash.parentNode) flash.remove();
        if (style.parentNode) style.remove();
      },
      type === 'konami-activated' ? 2000 : 1500,
    );
  }

  /* ── Mascot: Pixel the Koi Fish ── */
  (function () {
    var pagesWithMascot = ['./', 'download.html', 'clients.html', 'features.html'];
    var currentPage = window.location.pathname.split('/').pop() || './';
    if (!pagesWithMascot.includes(currentPage)) return;

    var mascotDismissed = localStorage.getItem('pixel-dismissed') === 'true';
    if (mascotDismissed) return;

    var _isMobile = window.innerWidth < 768;
    var reduced = reducedMotion.matches;

    var mascot = document.createElement('div');
    mascot.className = 'mascot-pixel';
    mascot.setAttribute('aria-hidden', 'true');
    mascot.innerHTML =
      '<div class="pixel-body"><div class="pixel-eye"></div></div><div class="pixel-tail"></div>';
    document.body.appendChild(mascot);

    var style = document.createElement('style');
    style.textContent = [
      '.mascot-pixel { position: fixed; bottom: 24px; right: 24px; width: 48px; height: 32px; z-index: 90; cursor: pointer; transition: transform 0.3s ease; }',
      '.mascot-pixel:hover { transform: scale(1.1); }',
      '.pixel-body { position: absolute; left: 0; top: 4px; width: 32px; height: 20px; background: var(--color-primary); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; box-shadow: 0 0 12px var(--color-primary); animation: pixel-swim 3s ease-in-out infinite; }',
      '.pixel-eye { position: absolute; right: 6px; top: 5px; width: 6px; height: 6px; background: var(--color-bg); border-radius: 50%; }',
      '.pixel-tail { position: absolute; right: 0; top: 8px; width: 16px; height: 12px; background: var(--color-secondary); clip-path: polygon(0% 50%, 100% 0%, 100% 100%); box-shadow: 0 0 8px var(--color-secondary); animation: tail-wag 0.4s ease-in-out infinite alternate; }',
      '@keyframes pixel-swim { 0%, 100% { transform: translateX(0) rotate(0deg); } 25% { transform: translateX(4px) rotate(2deg); } 75% { transform: translateX(-4px) rotate(-2deg); } }',
      '@keyframes tail-wag { from { transform: scaleX(1) skewY(0deg); } to { transform: scaleX(0.8) skewY(3deg); } }',
      '.mascot-pixel.dismissed { display: none; }',
      '.mascot-dismiss { position: absolute; top: -8px; right: -8px; width: 20px; height: 20px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 50%; font-size: 10px; line-height: 18px; text-align: center; color: var(--color-neutral); cursor: pointer; }',
      '.mascot-tip { position: absolute; bottom: 100%; right: 0; margin-bottom: 8px; background: var(--color-surface); border: 1px solid var(--color-primary); border-radius: var(--radius-sm); padding: 6px 10px; font-size: 12px; color: var(--color-text); white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s ease; max-width: 200px; white-space: normal; text-align: left; }',
      '.mascot-pixel:hover .mascot-tip { opacity: 1; }',
      '@media (max-width: 768px) { .mascot-pixel { bottom: 16px; right: 16px; } .mascot-tip { display: none; } }',
    ].join(' ');
    document.head.appendChild(style);

    if (!reduced) {
      (function () {
        var posX = 0,
          posY = 0;
        var velX = 1,
          velY = 0.5;
        var _centerX = window.innerWidth - 80;
        var _centerY = window.innerHeight - 80;
        var pixelEl = mascot;

        function animatePixel() {
          posX += velX;
          posY += velY;

          if (posX > 20 || posX < -20) velX *= -1;
          if (posY > 15 || posY < -15) velY *= -1;

          pixelEl.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';

          requestAnimationFrame(animatePixel);
        }
        animatePixel();
      })();
    }

    var tips = [
      { where: 'home:#neon-opening', say: 'Signal acquired. The city is live.' },
      { where: 'home:#signal-strength', say: 'Every signal tells a story.' },
      { where: 'features:.feature-grid', say: 'These are the channels.' },
      { where: 'download:#server', say: "One command and you're the first node." },
      { where: 'clients:.client-grid', say: 'Five screens, one library.' },
    ];

    var tip = document.createElement('div');
    tip.className = 'mascot-tip';
    tip.textContent = tips[0].say;
    mascot.appendChild(tip);

    /* ── Context-sensitive tip switching via IntersectionObserver ── */
    if ('IntersectionObserver' in window && !reduced) {
      tips.forEach(function (tipEntry) {
        var parts = tipEntry.where.match(/^([^:]+):(.+)$/);
        if (!parts) return;
        var tipPage = parts[1];
        var tipSelector = parts[2];
        /* Only observe tips relevant to the current page */
        var pageMap = {
          home: './',
          features: 'features.html',
          download: 'download.html',
          clients: 'clients.html',
        };
        if (pageMap[tipPage] !== currentPage) return;
        var targetEl = document.querySelector(tipSelector);
        if (!targetEl) return;
        var obs = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                tip.textContent = tipEntry.say;
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 },
        );
        obs.observe(targetEl);
      });
    }

    mascot.addEventListener('click', function () {
      mascot.querySelector('.pixel-body').style.animation = 'none';
      mascot.offsetHeight;
      mascot.querySelector('.pixel-body').style.animation = 'pixel-spin 0.5s ease-out';
    });

    var dismissBtn = document.createElement('div');
    dismissBtn.className = 'mascot-dismiss';
    dismissBtn.textContent = '×';
    dismissBtn.title = 'Dismiss Pixel';
    dismissBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      localStorage.setItem('pixel-dismissed', 'true');
      mascot.classList.add('dismissed');
    });
    mascot.appendChild(dismissBtn);

    var spinStyle = document.createElement('style');
    spinStyle.textContent = '@keyframes pixel-spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(spinStyle);
  })();

  /* ── Seasonal color activation (live-js) ── */
  (function () {
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var dateStr = (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    var variants = [
      {
        name: 'Sakura Season',
        active: '03-20..04-15',
        primary: '#FF69B4',
        secondary: '#FF00AA',
        surface: '#110A18',
      },
      {
        name: 'Obon Night',
        active: '08-13..08-16',
        primary: '#FF6600',
        secondary: '#FFB300',
        surface: '#140A04',
      },
      {
        name: 'New Year',
        active: '12-29..01-03',
        primary: '#FFD700',
        secondary: '#00FF41',
        tertiary: '#FF00AA',
      },
    ];

    variants.forEach(function (v) {
      var parts = v.active.split('..');
      var start = parts[0];
      var end = parts[1];

      var inRange;
      if (start <= end) {
        inRange = dateStr >= start && dateStr <= end;
      } else {
        inRange = dateStr >= start || dateStr <= end;
      }

      if (inRange) {
        document.documentElement.style.setProperty('--color-primary', v.primary);
        if (v.secondary)
          document.documentElement.style.setProperty('--color-secondary', v.secondary);
        if (v.surface) document.documentElement.style.setProperty('--color-surface', v.surface);
        return;
      }
    });
  })();
})();
