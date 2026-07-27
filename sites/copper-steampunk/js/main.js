/* ==========================================================================
   MAIN.JS — Copper Steampunk
   Nav toggle, reduced motion, scroll reveals, easter eggs,
   mascot Cogsworth, intensity toggle, seasonal activation.
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     SEASONAL ACTIVATION — live-js date gate
     --------------------------------------------------------------------- */
  (function seasonalActivation() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${month}-${day}`;

    const variants = [
      { name: 'midwinter', start: '12-01', end: '01-06' },
      { name: 'exhibition', start: '06-01', end: '06-30' },
      { name: 'halloween', start: '10-15', end: '10-31' },
    ];

    for (const v of variants) {
      // Active if today falls within [start, end] inclusive
      if (today >= v.start && today <= v.end) {
        document.documentElement.setAttribute('data-season', v.name);
        return;
      }
    }
  })();

  /* ---------------------------------------------------------------------
     INTENSITY TOGGLE — "Workshop lights down"
     --------------------------------------------------------------------- */
  (function intensityToggle() {
    const btn = document.getElementById('intensity-toggle');
    if (!btn) return;

    // Restore preference
    if (localStorage.getItem('phlix-intensity') === 'calm') {
      document.body.classList.add('intensity-calm');
      btn.setAttribute('aria-pressed', 'true');
    }

    btn.addEventListener('click', function () {
      const isCalm = document.body.classList.toggle('intensity-calm');
      btn.setAttribute('aria-pressed', String(isCalm));
      localStorage.setItem('phlix-intensity', isCalm ? 'calm' : 'full');
    });
  })();

  /* ---------------------------------------------------------------------
     MOBILE NAV TOGGLE
     --------------------------------------------------------------------- */
  (function mobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  })();

  /* ---------------------------------------------------------------------
     REDUCED MOTION — attach change listener (not just once at load)
     --------------------------------------------------------------------- */
  (function reducedMotion() {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    function apply(prefersReduced) {
      document.documentElement.classList.toggle('reduce-motion', prefersReduced);
    }

    apply(mq.matches);
    mq.addEventListener('change', function (e) {
      apply(e.matches);
    });
  })();

  /* ---------------------------------------------------------------------
     SCROLL REVEALS — IntersectionObserver fade-ins
     --------------------------------------------------------------------- */
  (function scrollReveals() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      el.classList.add('reveal-pending');
      observer.observe(el);
    });
  })();

  /* ---------------------------------------------------------------------
     EASTER EGG 1 — logo-clicks:5 → Cogsworth head rotation
     --------------------------------------------------------------------- */
  (function logoClicksEgg() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;

    let count = 0;
    let timer;

    logo.addEventListener('click', function (e) {
      // Don't fire on keyboard activation
      if (e.clientX === 0 && e.clientY === 0) return;

      count++;
      clearTimeout(timer);
      timer = setTimeout(function () {
        count = 0;
      }, 2000);

      if (count >= 5) {
        count = 0;
        triggerReward();
      }

      function triggerReward() {
        // Pulse the Cogsworth avatar if visible
        const avatar = document.querySelector('.cogsworth__avatar');
        if (avatar) {
          avatar.style.animation = 'cogsworth-head-spin 1.2s ease-in-out';
          setTimeout(function () {
            avatar.style.animation = '';
          }, 1200);
        }

        // Show reward toast
        showToast("Cogsworth approves. You've found the Engineer's Secret.");
      }
    });
  })();

  /* ---------------------------------------------------------------------
     EASTER EGG 2 — typed-word:catalogue
     --------------------------------------------------------------------- */
  (function catalogueEgg() {
    // Disabled while focus is in an input/textarea/contenteditable
    // Never calls preventDefault
    let typed = '';
    let timer;
    const TARGET = 'catalogue';

    document.addEventListener('keydown', function (e) {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable)
        return;

      if (e.key === 'Escape') {
        typed = '';
        removeGlow();
        return;
      }

      // Only letters
      if (!/^[a-zA-Z]$/.test(e.key)) return;

      typed += e.key.toLowerCase();
      if (typed.length > TARGET.length) {
        typed = typed.slice(-TARGET.length);
      }

      clearTimeout(timer);
      timer = setTimeout(function () {
        typed = '';
      }, 1500);

      if (typed === TARGET) {
        typed = '';
        triggerReward();
      }
    });

    function triggerReward() {
      // Amber tint + wordmark glow
      document.documentElement.classList.add('catalogue-active');
      showToast('The workshop recognizes you.');

      // Gauges briefly spin
      document.querySelectorAll('.gauge-spin').forEach(function (g) {
        g.style.animation = 'gauge-spin 1s ease-in-out';
        setTimeout(function () {
          g.style.animation = '';
        }, 1000);
      });

      setTimeout(removeGlow, 4000);
    }

    function removeGlow() {
      document.documentElement.classList.remove('catalogue-active');
    }
  })();

  /* ---------------------------------------------------------------------
     EASTER EGG 3 — hover-hold:2s on gauge illustrations
     --------------------------------------------------------------------- */
  (function hoverHoldEgg() {
    document.querySelectorAll('[data-gauge]').forEach(function (el) {
      let timer;

      el.addEventListener('mouseenter', function () {
        timer = setTimeout(function () {
          triggerReward(el);
        }, 2000);
      });

      el.addEventListener('mouseleave', function () {
        clearTimeout(timer);
      });
    });

    function triggerReward(el) {
      el.style.animation = 'gauge-activate 0.8s ease-out';
      setTimeout(function () {
        el.style.animation = '';
      }, 800);
    }
  })();

  /* ---------------------------------------------------------------------
     TOAST NOTIFICATIONS
     --------------------------------------------------------------------- */
  function showToast(message) {
    var existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    toast.style.cssText = [
      'position:fixed',
      'bottom:80px',
      'left:50%',
      'transform:translateX(-50%)',
      'background:var(--color-surface)',
      'border:1px solid var(--color-border)',
      'border-left:3px solid var(--color-primary)',
      'border-radius:var(--radius-md)',
      'padding:12px 24px',
      'font-family:var(--font-body)',
      'font-size:14px',
      'color:var(--color-text)',
      'box-shadow:var(--shadow-lg)',
      'z-index:200',
      'max-width:360px',
      'text-align:center',
      'animation:toast-in 300ms ease-out',
    ].join(';');

    document.body.appendChild(toast);

    // Inject keyframes if not present
    if (!document.getElementById('toast-keyframes')) {
      var style = document.createElement('style');
      style.id = 'toast-keyframes';
      style.textContent = [
        '@keyframes toast-in {',
        '  from { opacity:0; transform:translateX(-50%) translateY(10px); }',
        '  to   { opacity:1; transform:translateX(-50%) translateY(0); }',
        '}',
        '@keyframes toast-out {',
        '  from { opacity:1; transform:translateX(-50%) translateY(0); }',
        '  to   { opacity:0; transform:translateX(-50%) translateY(10px); }',
        '}',
        '@keyframes cogsworth-head-spin {',
        '  0%   { transform:rotate(0deg); }',
        '  50%  { transform:rotate(180deg); }',
        '  75%  { transform:rotate(360deg); }',
        '  100% { transform:rotate(360deg); }',
        '}',
        '@keyframes gauge-spin {',
        '  from { transform:rotate(0deg); }',
        '  to   { transform:rotate(360deg); }',
        '}',
        '@keyframes gauge-activate {',
        '  0%   { transform:rotate(0deg); }',
        '  30%  { transform:rotate(120deg); }',
        '  60%  { transform:rotate(80deg); }',
        '  100% { transform:rotate(90deg); }',
        '}',
        /* catalogue glow */
        '.catalogue-active .nav-logo { filter: drop-shadow(0 0 8px var(--color-primary)); }',
        'html.catalogue-active { filter: sepia(0.15) saturate(1.2); }',
      ].join('');
      document.head.appendChild(style);
    }

    setTimeout(function () {
      toast.style.animation = 'toast-out 300ms ease-in forwards';
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3500);
  }

  /* ---------------------------------------------------------------------
     COGSWORTH MASCOT
     --------------------------------------------------------------------- */
  (function cogsworthMascot() {
    // Only show on Home, Features, Download
    var validPages = ['index', 'features', 'download'];
    var page = document.body.dataset.page;
    if (!validPages.includes(page)) return;

    // Check dismissal
    if (localStorage.getItem('cogsworth-dismissed')) return;

    // SVG avatar inline
    var avatarHTML = [
      '<div class="cogsworth__wrapper">',
      '  <div class="cogsworth__tip" id="cogsworth-tip"></div>',
      '  <div class="cogsworth__avatar" aria-hidden="true" title="Cogsworth the clockwork owl">',
      '    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">',
      '      <!-- body -->',
      '      <ellipse cx="32" cy="38" rx="14" ry="18" fill="#7B4F2E" stroke="#C9A84C" stroke-width="1.5"/>',
      '      <!-- wing left -->',
      '      <path d="M18 34 Q10 30 12 44 Q16 48 20 42" fill="#8B6020" stroke="#C9A84C" stroke-width="1"/>',
      '      <!-- wing right -->',
      '      <path d="M46 34 Q54 30 52 44 Q48 48 44 42" fill="#8B6020" stroke="#C9A84C" stroke-width="1"/>',
      '      <!-- head -->',
      '      <circle cx="32" cy="20" r="14" fill="#B5651D" stroke="#C9A84C" stroke-width="1.5"/>',
      '      <!-- gear left eye -->',
      '      <circle cx="26" cy="18" r="5" fill="#C9A84C"/>',
      '      <circle cx="26" cy="18" r="2.5" fill="#1A1208"/>',
      '      <!-- gear right eye -->',
      '      <circle cx="38" cy="18" r="5" fill="#C9A84C"/>',
      '      <circle cx="38" cy="18" r="2.5" fill="#1A1208"/>',
      '      <!-- beak -->',
      '      <path d="M29 24 L32 28 L35 24 Z" fill="#D4860A" stroke="#C9A84C" stroke-width="0.5"/>',
      '      <!-- chest徽章 -->',
      '      <circle cx="32" cy="40" r="5" fill="#1A1208" stroke="#C9A84C" stroke-width="1"/>',
      '      <circle cx="32" cy="40" r="2" fill="#B5651D"/>',
      '      <!-- key slot on side -->',
      '      <rect x="44" y="35" width="4" height="8" rx="1" fill="#3D2B1A" stroke="#C9A84C" stroke-width="0.5"/>',
      '      <line x1="45" y1="37" x2="47" y2="37" stroke="#C9A84C" stroke-width="0.5"/>',
      '      <line x1="45" y1="39" x2="47" y2="39" stroke="#C9A84C" stroke-width="0.5"/>',
      '      <line x1="45" y1="41" x2="47" y2="41" stroke="#C9A84C" stroke-width="0.5"/>',
      '      <!-- ear vents -->',
      '      <circle cx="20" cy="12" r="2" fill="#3D2B1A" stroke="#C9A84C" stroke-width="0.5"/>',
      '      <circle cx="44" cy="12" r="2" fill="#3D2B1A" stroke="#C9A84C" stroke-width="0.5"/>',
      '    </svg>',
      '  </div>',
      '  <button class="cogsworth__dismiss" id="cogsworth-dismiss" aria-label="Dismiss Cogsworth">',
      '    ✕',
      '  </button>',
      '</div>',
    ].join('');

    var container = document.createElement('div');
    container.className = 'cogsworth';
    container.innerHTML = avatarHTML;
    document.body.appendChild(container);

    var tip = document.getElementById('cogsworth-tip');
    var dismissBtn = document.getElementById('cogsworth-dismiss');

    // Tips from kit spec
    var tips = [
      { where: 'home:#hero', say: 'Boiler at pressure. Ready to proceed?' },
      {
        where: 'index:.grid-2',
        say: 'Each mechanism serves a purpose — precision engineering at every turn.',
      },
      {
        where: 'features:#syncplay',
        say: 'The weighted mean keeps every household locked to the same frame.',
      },
      { where: 'download:#server', say: 'One command, and the engine awakens.' },
    ];

    var matchedTip = null;
    var hash = window.location.hash;
    for (var i = 0; i < tips.length; i++) {
      if (hash && tips[i].where.includes(hash)) {
        matchedTip = tips[i].say;
        break;
      }
    }
    if (!matchedTip) {
      // Fallback to first relevant tip
      for (var j = 0; j < tips.length; j++) {
        if (tips[j].where.startsWith(page + ':')) {
          matchedTip = tips[j].say;
          break;
        }
      }
    }

    if (matchedTip && tip) {
      tip.textContent = matchedTip;
    } else if (tip) {
      tip.textContent = 'Welcome to the workshop, Engineer.';
    }

    // Dismiss
    dismissBtn.addEventListener('click', function () {
      localStorage.setItem('cogsworth-dismissed', 'session');
      container.remove();
    });

    // Idle key-wind animation on avatar
    var avatar = container.querySelector('.cogsworth__avatar');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      avatar.style.animation = 'cogsworth-idle 8s ease-in-out infinite';
    }

    // Inject Cogsworth keyframes
    var style = document.createElement('style');
    style.textContent = [
      '@keyframes cogsworth-idle {',
      '  0%, 100% { transform: rotate(0deg); }',
      '  25%       { transform: rotate(3deg); }',
      '  75%       { transform: rotate(-3deg); }',
      '}',
      '.cogsworth { pointer-events: auto; }',
    ].join('');
    document.head.appendChild(style);
  })();

  /* ---------------------------------------------------------------------
     INSTALL COMMAND COPY BUTTON
     --------------------------------------------------------------------- */
  (function installCopy() {
    var btn = document.getElementById('copy-install');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var cmd = btn.dataset.command || '';
      navigator.clipboard
        .writeText(cmd)
        .then(function () {
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.textContent = 'Copy';
          }, 2000);
        })
        .catch(function () {
          // Fallback
          var ta = document.createElement('textarea');
          ta.value = cmd;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.textContent = 'Copy';
          }, 2000);
        });
    });
  })();

  /* ---------------------------------------------------------------------
     HERO DIORAMA PARALLAX — mousemove + scroll, reduced-motion safe
     --------------------------------------------------------------------- */
  (function heroParallax() {
    var diorama = document.querySelector('.hero-diorama');
    if (!diorama) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var layers = diorama.querySelectorAll('.hero-diorama__layer');
    var hero = document.getElementById('boiler-rise');
    if (!hero) return;

    // Parallax rates per layer (smaller = slower = further back)
    var rates = [0.02, 0.05, 0.08]; // bg, gears

    function applyParallax() {
      var rect = hero.getBoundingClientRect();
      var centerX = window.innerWidth / 2;
      var centerY = window.innerHeight / 2;

      // Mouse-based parallax
      var mx = (window.mouseX || centerX) - centerX;
      var my = (window.mouseY || centerY) - centerY;

      // Scroll-based parallax (hero is above viewport)
      var scrollOffset = Math.max(0, -rect.top);
      var scrollShift = scrollOffset * 0.15;

      layers.forEach(function (layer, i) {
        var rate = rates[i] || 0.03;
        var x = mx * rate;
        var y = my * rate + scrollShift * rate * 2;
        layer.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      });
    }

    // Track mouse position
    document.addEventListener('mousemove', function (e) {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
      applyParallax();
    });

    // Track scroll position
    window.addEventListener('scroll', applyParallax, { passive: true });

    // Initial application
    applyParallax();
  })();
})();
