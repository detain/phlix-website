/**
 * main.js — Pop Art Explosion
 * Mascot companion, seasonal activation, easter eggs, FAQ accordion,
 * mobile nav, install copy button.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Seasonal activation (live-js) ─────────────────────────────────── */
  function applySeasonalVariant() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const md = `${month}-${day}`;

    const summerStart = '06-21';
    const summerEnd = '09-21';
    const winterStart = '12-01';
    const winterEnd = '01-06';

    let season = 'default';

    if (md >= summerStart && md <= summerEnd) {
      season = 'summer';
    } else if (md >= winterStart || md <= winterEnd) {
      season = 'winter';
    }

    if (season !== 'default') {
      document.documentElement.setAttribute('data-season', season);
    }
  }

  applySeasonalVariant();

  /* ── Reduced motion listener (re-read on change) ─────────────────────── */
  function readMotionPreference() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── Mobile nav toggle ─────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var expanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(expanded));
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── FAQ accordion ─────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        var btn = openItem.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
    question.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
  });

  /* ── Copy install command ──────────────────────────────────────────── */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cmd = btn.getAttribute('data-command') || '';
      if (!cmd) {
        var pre = btn.closest('.install-panel') || btn.closest('.install-panel-alt');
        if (pre) {
          var preEl = pre.querySelector('.install-command');
          if (preEl) cmd = preEl.textContent.replace(/^\$\s*/gm, '').trim();
        }
      }
      if (!cmd) return;
      navigator.clipboard
        .writeText(cmd)
        .then(function () {
          var original = btn.textContent;
          btn.textContent = 'COPIED!';
          btn.style.background = 'var(--color-secondary)';
          setTimeout(function () {
            btn.textContent = original;
            btn.style.background = '';
          }, 1500);
        })
        .catch(function () {
          // Fallback
          var ta = document.createElement('textarea');
          ta.value = cmd;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        });
    });
  });

  /* ── Mascot companion ──────────────────────────────────────────────── */
  (function () {
    var mascot = document.querySelector('.mascot-companion');
    if (!mascot) return;

    var body = mascot.querySelector('.mascot-body');
    var tipEl = mascot.querySelector('.mascot-tip');
    var dismissBtn = mascot.querySelector('.mascot-dismiss');

    var prefersReducedMotion = readMotionPreference();

    // Tip content per page/section
    var tips = [
      { selector: '#starburst-intro', say: 'Press play and the dots start pulsing. WHAM!' },
      {
        selector: '.features-overview',
        say: 'Psst… SyncPlay keeps every seat in sync — same frame, same moment.',
      },
      {
        selector: '#syncplay',
        say: 'Movie night stops for nobody — NTP time-sync is the secret sauce.',
      },
      { selector: '#clients', say: 'Five clients, zero compromises. Pick your screen and BOOM!' },
      { selector: '#download, #server', say: "One line and you're screaming. Copy, paste, POW!" },
    ];

    function showTip(text) {
      if (prefersReducedMotion) return;
      if (!tipEl) return;
      tipEl.textContent = text;
      tipEl.style.display = 'block';
    }

    function hideTip() {
      if (tipEl) tipEl.style.display = 'none';
    }

    // Show contextual tip
    var currentTip = null;
    tips.forEach(function (t) {
      if (document.querySelector(t.selector)) currentTip = t.say;
    });
    if (currentTip) showTip(currentTip);

    // Dismiss
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        mascot.style.display = 'none';
        try {
          localStorage.setItem('mascot-dismissed', '1');
        } catch (e) {}
      });
    }

    // Check if already dismissed
    try {
      if (localStorage.getItem('mascot-dismissed') === '1') {
        mascot.style.display = 'none';
        return;
      }
    } catch (e) {}

    // Easter: click-hold on logo shows confetti (handled via CSS + JS click counter)
  })();

  /* ── Easter egg: logo clicks (5) ──────────────────────────────────── */
  (function () {
    var logo = document.querySelector('.nav-logo');
    var clickCount = 0;
    if (!logo) return;

    logo.addEventListener('click', function (e) {
      // Don't count if modifier keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      clickCount++;
      if (clickCount >= 5) {
        clickCount = 0;
        // Dotty confetti burst
        fireConfetti();
      }
    });

    function fireConfetti() {
      var mascot = document.querySelector('.mascot-body');
      var target = mascot || logo;
      var rect = target.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      var colors = ['#FF1A1A', '#FFE600', '#0028DC', '#FF6B00'];
      for (var i = 0; i < 24; i++) {
        var dot = document.createElement('div');
        dot.style.cssText = [
          'position:fixed',
          'width:10px',
          'height:10px',
          'border-radius:50%',
          'background:' + colors[i % colors.length],
          'left:' + cx + 'px',
          'top:' + cy + 'px',
          'pointer-events:none',
          'z-index:9999',
          'transform:translate(-50%,-50%)',
        ].join(';');
        document.body.appendChild(dot);

        var angle = (Math.PI * 2 * i) / 24;
        var dist = 60 + Math.random() * 60;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist;

        dot.animate(
          [
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0)', opacity: 0 },
          ],
          { duration: 600, easing: 'ease-out' },
        ).onfinish = function () {
          dot.remove();
        };
      }
    }
  })();

  /* ── Easter egg: typed-word:dots ──────────────────────────────────── */
  (function () {
    var typed = '';
    var target = 'dots';
    var active = false;

    document.addEventListener('keydown', function (e) {
      // Skip if focus is in input/textarea/contenteditable
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        document.activeElement.contentEditable === 'true'
      ) {
        return;
      }

      if (e.key === 'Escape') {
        typed = '';
        active = false;
        return;
      }

      if (e.key.length !== 1) return;

      typed += e.key.toLowerCase();

      // Keep only last N chars
      if (typed.length > target.length + 3) {
        typed = typed.slice(-(target.length + 3));
      }

      if (typed.includes(target)) {
        active = true;
        typed = '';
        fireDotBurst();
      }
    });

    function fireDotBurst() {
      var mascot = document.querySelector('.mascot-body');
      var origin = mascot ? mascot : document.querySelector('.site-nav');
      if (!origin) return;
      var rect = origin.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      var colors = ['#FF1A1A', '#FFE600'];
      for (var i = 0; i < 16; i++) {
        var dot = document.createElement('div');
        dot.style.cssText = [
          'position:fixed',
          'width:8px',
          'height:8px',
          'border-radius:50%',
          'background:' + colors[i % 2],
          'left:' + cx + 'px',
          'top:' + cy + 'px',
          'pointer-events:none',
          'z-index:9999',
        ].join(';');
        document.body.appendChild(dot);

        var angle = (Math.PI * 2 * i) / 16;
        var dist = 50 + Math.random() * 50;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist;

        dot.animate(
          [
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0)', opacity: 0 },
          ],
          { duration: 500, easing: 'ease-out' },
        ).onfinish = function () {
          dot.remove();
        };
      }
    }
  })();

  /* ── Easter egg: typed-word:kapow ──────────────────────────────────── */
  (function () {
    var typed = '';
    var target = 'kapow';
    var active = false;

    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        document.activeElement.contentEditable === 'true'
      ) {
        return;
      }

      if (e.key === 'Escape') {
        typed = '';
        active = false;
        return;
      }

      if (e.key.length !== 1) return;

      typed += e.key.toLowerCase();
      if (typed.length > target.length + 4) {
        typed = typed.slice(-(target.length + 4));
      }

      if (typed.includes(target)) {
        typed = '';
        fireKapow();
      }
    });

    function fireKapow() {
      var banner = document.createElement('div');
      banner.textContent = 'KAPOW!';
      banner.style.cssText = [
        'position:fixed',
        'top:50%',
        'left:50%',
        'transform:translate(-50%,-50%)',
        'font-family:var(--font-headline)',
        'font-size:clamp(3rem,15vw,8rem)',
        'color:var(--color-bg)',
        '-webkit-text-stroke:4px var(--color-bg)',
        'paint-order:stroke fill',
        'background:var(--color-primary)',
        'padding:0.2em 0.5em',
        'border:var(--border-feature)',
        'box-shadow:var(--shadow-lg)',
        'pointer-events:none',
        'z-index:99999',
        'white-space:nowrap',
      ].join(';');
      document.body.appendChild(banner);

      banner.animate(
        [
          { transform: 'translate(-50%,-50%) scale(0.5)', opacity: 0 },
          { transform: 'translate(-50%,-50%) scale(1.1)', opacity: 1 },
          { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: 0.6 },
          { transform: 'translate(-50%,-50%) scale(1.05)', opacity: 1 },
          { transform: 'translate(-50%,-60%) scale(0.9)', opacity: 0 },
        ],
        { duration: 900, easing: 'ease-out' },
      ).onfinish = function () {
        banner.remove();
      };
    }
  })();

  /* ── Smooth scroll for anchor links ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
