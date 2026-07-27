/**
 * main.js — Moroccan Bazaar
 * Mobile nav, reduced-motion, scroll reveals, mascot, easter eggs, seasonal
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Seasonal activation (live-js) ──────────────────────────────────── */
  (function seasonalGate() {
    var today = new Date();
    var mmdd = ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    var variants = [
      {
        name: 'Ramadan Lanterns',
        range: '03-01..04-15',
        overrides: {
          '--color-primary': '#D4920A',
          '--color-secondary': '#B87828',
          '--color-tertiary': '#E8531A',
        },
      },
      {
        name: 'Harvest Souk',
        range: '10-01..10-31',
        overrides: {
          '--color-primary': '#B87828',
          '--color-secondary': '#2E7D4F',
          '--color-surface': '#240F05',
        },
      },
      {
        name: 'Rose Water Spring',
        range: '04-20..05-10',
        overrides: { '--color-primary': '#C4504A', '--color-secondary': '#2E7D4F' },
      },
    ];

    for (var i = 0; i < variants.length; i++) {
      var v = variants[i];
      var parts = v.range.split('..');
      if (mmdd >= parts[0] && mmdd <= parts[1]) {
        var root = document.documentElement;
        for (var prop in v.overrides) {
          root.style.setProperty(prop, v.overrides[prop]);
        }
        break;
      }
    }
  })();

  /* ── Reduced-motion listener (§19.2: switch off transition AND animation) ─ */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotion(e) {
    document.documentElement.classList.toggle('reduce-motion', e.matches);
  }
  motionQuery.addEventListener('change', handleMotion);
  handleMotion(motionQuery);

  /* ── Mobile nav toggle ───────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
      if (!expanded) {
        var firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll reveals (IntersectionObserver) ───────────────────────────── */
  var revealEls = document.querySelectorAll(
    '.feature-card, .client-card, .download-card, .feature-detail',
  );
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      revealObs.observe(el);
    });
  }

  /* Reduced-motion: make all revealed elements immediately visible */
  function checkMotion() {
    if (document.documentElement.classList.contains('reduce-motion')) {
      revealEls.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
      });
    }
  }
  checkMotion();

  /* ── Amir the mascot ─────────────────────────────────────────────────── */
  (function initMascot() {
    var amir = document.querySelector('.amir-companion');
    if (!amir) return;

    var lantern = amir.querySelector('.amir-lantern');
    var tip = amir.querySelector('.amir-tip');
    var dismiss = amir.querySelector('.amir-dismiss');
    var tipText = amir.dataset.tip || '';
    var clickCount = 0;
    var hoverTimer = null;

    // Check dismissal state (sessionStorage — §19.21)
    var dismissed = sessionStorage.getItem('amir-dismissed');
    if (dismissed === 'true') {
      amir.style.display = 'none';
      return;
    }

    // Show tip on appropriate pages after delay
    var pageAndSelector =
      (document.body.dataset.page || '') + ' .' + (document.body.dataset.section || '');
    var tipData = {
      'home .hero':
        'Welcome to the bazaar. Every film here is a masterwork waiting to be discovered.',
      'home .features-overview':
        "SyncPlay means your family's movie night stays perfectly locked, no matter the room.",
      'features #library':
        'The library watches your passages and learns. Add a film and it finds its own place on the shelf.',
      'download #server':
        'One passage, one line to enter the bazaar. Patience rewards the wise builder.',
    };

    var matchingTip = '';
    for (var sel in tipData) {
      var parts = sel.split(' ');
      if (
        document.querySelector('[data-page="' + parts[0] + '"]') &&
        document.querySelector('[data-section="' + parts[1] + '"]')
      ) {
        matchingTip = tipData[sel];
        break;
      }
    }

    if (matchingTip && tip) {
      tip.textContent = matchingTip;
      setTimeout(function () {
        if (!amir.classList.contains('dismissed')) tip.classList.add('visible');
      }, 2000);
    }

    // Click easter egg: 3 clicks → zellige cascade (shared with logo-clicks)
    if (lantern) {
      lantern.addEventListener('click', function () {
        clickCount++;
        if (clickCount >= 3) {
          spawnZelligeCascade(lantern);
          clickCount = 0;
        }
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () {
          clickCount = 0;
        }, 1000);
      });

      // Hover-hold easter: 2s → whisper
      lantern.addEventListener('mouseenter', function () {
        hoverTimer = setTimeout(function () {
          if (tip) {
            tip.textContent = 'Rest here as long as you wish — the bazaar is patient.';
            tip.classList.add('visible');
          }
        }, 2000);
      });
      lantern.addEventListener('mouseleave', function () {
        clearTimeout(hoverTimer);
      });
    }

    // Dismiss
    if (dismiss) {
      dismiss.addEventListener('click', function () {
        amir.classList.add('dismissed');
        amir.style.opacity = '0';
        setTimeout(function () {
          amir.style.display = 'none';
        }, 400);
        sessionStorage.setItem('amir-dismissed', 'true');
      });
    }
  })();

  /* Zellige star cascade effect */
  function spawnZelligeCascade(origin) {
    if (!origin) return;
    var rect = origin.getBoundingClientRect();
    var count = 8;
    for (var i = 0; i < count; i++) {
      var star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      star.setAttribute('viewBox', '0 0 24 24');
      star.setAttribute('width', '16');
      star.setAttribute('height', '16');
      star.innerHTML =
        '<path d="M12 2L14 9H21L15.5 13.5L17.5 21L12 17L6.5 21L8.5 13.5L3 9H10Z" fill="none" stroke="#B87828" stroke-width="1"/>';
      star.style.cssText = [
        'position:fixed',
        'z-index:9999',
        'pointer-events:none',
        'left:' + (rect.left + rect.width / 2 - 8) + 'px',
        'top:' + (rect.top + rect.height / 2 - 8) + 'px',
        'opacity:1',
        'transition: opacity 0.8s ease-out, transform 0.8s ease-out',
      ].join(';');
      document.body.appendChild(star);

      var angle = (i / count) * Math.PI * 2;
      var dist = 60 + Math.random() * 40;
      requestAnimationFrame(
        (function (s, a, d) {
          return function () {
            s.style.transform =
              'translate(' + Math.cos(a) * d + 'px,' + Math.sin(a) * d + 'px) scale(0.5)';
            s.style.opacity = '0';
          };
        })(star, angle, dist),
      );

      setTimeout(
        function (s) {
          s.remove();
        },
        900,
        star,
      );
    }
  }

  /* ── Easter egg: logo-clicks:5 ───────────────────────────────────────── */
  (function logoEasterEgg() {
    var logo = document.querySelector('.nav-logo');
    if (!logo) return;
    var count = 0;
    logo.addEventListener('click', function (e) {
      // Don't干预 if meta/ctrl held
      if (e.metaKey || e.ctrlKey) return;
      count++;
      if (count >= 5) {
        spawnZelligeCascade(logo);
        count = 0;
      }
      setTimeout(function () {
        count = 0;
      }, 2000);
    });
  })();

  /* ── Easter egg: typed-word "bazaar" ─────────────────────────────────── */
  (function typedWordEaster() {
    var typed = [];
    var target = 'bazaar';
    var active = false;

    document.addEventListener('keydown', function (e) {
      // Never preventDefault — §19.8
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.key === 'Escape') {
        typed = [];
        active = false;
        return;
      }

      if (e.key.length === 1) {
        typed.push(e.key.toLowerCase());
        if (typed.length > target.length) typed.shift();
        if (typed.join('') === target && !active) {
          active = true;
          triggerBazaarReward();
        }
      }
    });
  })();

  function triggerBazaarReward() {
    // Subtle parchment flash on page
    var flash = document.createElement('div');
    flash.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:9998',
      'pointer-events:none',
      'background:rgba(242,228,204,0.06)',
      'transition:opacity 0.6s ease-out',
    ].join(';');
    document.body.appendChild(flash);
    setTimeout(function () {
      flash.style.opacity = '0';
    }, 100);
    setTimeout(function () {
      flash.remove();
    }, 700);
  }

  /* ── FAQ accordion (progressive enhancement) ──────────────────────────── */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var dt = item.querySelector('dt');
    var dd = item.querySelector('dd');
    if (!dt || !dd) return;
    // Wrap dt in a button for accessibility
    var btn = document.createElement('button');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'faq-dd-' + item.dataset.idx);
    btn.style.cssText =
      'background:none;border:none;cursor:pointer;text-align:left;width:100%;padding:0;color:inherit;font:inherit;display:flex;justify-content:space-between;align-items:center;gap:1rem';
    btn.innerHTML =
      dt.innerHTML +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>';
    dt.replaceWith(btn);
    dd.id = 'faq-dd-' + item.dataset.idx;
    dd.hidden = true;

    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      dd.hidden = expanded;
      btn.querySelector('svg').style.transform = expanded ? '' : 'rotate(180deg)';
    });
  });
})();
