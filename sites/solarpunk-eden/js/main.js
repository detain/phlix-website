/*@copyright 2026 Joe Huss <detain@interserver.net>*/
/**
 * main.js — Solarpunk Eden: interactive features
 * Kit: solarpunk-eden v1.0
 */

(function () {
  'use strict';

  /* ─── Nav toggle (mobile) ───────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── Scroll reveal ──────────────────────────────────────────────────── */
  var revealedSelector = '.reveal, .chapter-section';
  var revealEls = document.querySelectorAll(revealedSelector);

  if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Show all immediately if reduced-motion or no reveals
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ─── Reduced-motion change listener ─────────────────────────────────── */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleMotionChange() {
    if (motionQuery.matches) {
      document.querySelectorAll('.reveal, .chapter-section').forEach(function (el) {
        el.classList.add('is-visible');
        el.style.transition = 'none';
      });
    }
  }

  motionQuery.addEventListener('change', handleMotionChange);

  /* ─── Intensity toggle (Dim the lights) ───────────────────────────────── */
  var intensityToggle = document.querySelector('.intensity-toggle');
  var siteRoot = document.documentElement;

  if (intensityToggle) {
    // Load saved state
    var savedIntensity = localStorage.getItem('phlix-intensity');
    if (savedIntensity === 'dim') {
      applyDimMode(true);
    }

    intensityToggle.addEventListener('click', function () {
      var isDim = intensityToggle.getAttribute('aria-pressed') === 'true';
      applyDimMode(!isDim);
      localStorage.setItem('phlix-intensity', !isDim ? 'dim' : 'full');
    });
  }

  function applyDimMode(dim) {
    if (dim) {
      siteRoot.classList.add('dim-mode');
      intensityToggle.setAttribute('aria-pressed', 'true');
      intensityToggle.querySelector('span:last-child').textContent = 'Lights on';
      // Reduce all transitions
      document.body.style.transition = 'opacity 0.3s';
    } else {
      siteRoot.classList.remove('dim-mode');
      intensityToggle.setAttribute('aria-pressed', 'false');
      intensityToggle.querySelector('span:last-child').textContent = 'Dim the lights';
      document.body.style.transition = '';
    }
  }

  /* ─── Seasonal variant date-gate ─────────────────────────────────────── */
  var SEASONS = [
    {
      name: 'harvest',
      range: [new Date('2026-09-15'), new Date('2026-11-15')],
    },
    {
      name: 'winter',
      range: [new Date('2026-12-01'), new Date('2027-01-15')],
    },
    {
      name: 'bloom',
      range: [new Date('2026-03-20'), new Date('2026-05-31')],
    },
    {
      name: 'summer',
      range: [new Date('2026-06-21'), new Date('2026-08-31')],
    },
  ];

  var today = new Date();
  var activeSeason = null;

  for (var s = 0; s < SEASONS.length; s++) {
    var season = SEASONS[s];
    if (today >= season.range[0] && today <= season.range[1]) {
      activeSeason = season.name;
      break;
    }
  }

  if (activeSeason) {
    document.documentElement.setAttribute('data-season', activeSeason);
  }

  /* ─── Frond mascot ───────────────────────────────────────────────────── */
  var MASCOT_PAGES = ['index', 'features', 'download'];
  var _PAGE_IDS = {
    index: 'home',
    features: 'features',
    download: 'download',
  };

  var currentPage =
    document.body.getAttribute('data-page') || document.querySelector('[data-page]')
      ? document.querySelector('[data-page]').getAttribute('data-page')
      : null;

  // Simple page detection from body class or id
  var bodyClasses = document.body.className || '';
  var pageKey = 'home';
  if (bodyClasses.indexOf('page-features') !== -1) pageKey = 'features';
  else if (bodyClasses.indexOf('page-download') !== -1) pageKey = 'download';
  else if (bodyClasses.indexOf('page-clients') !== -1) pageKey = 'clients';

  // Check if this page should show Frond
  var showMascot =
    MASCOT_PAGES.indexOf(pageKey) !== -1 ||
    MASCOT_PAGES.indexOf(currentPage) !== -1 ||
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/index.html');

  if (showMascot) {
    initMascot(pageKey);
  }

  function initMascot(pageKey) {
    // Check dismissal
    var dismissed = localStorage.getItem('phlix-frond-dismissed');
    if (dismissed === 'true') return;

    var mascotContainer = document.createElement('div');
    mascotContainer.className = 'mascot';
    mascotContainer.setAttribute('role', 'complementary');
    mascotContainer.setAttribute('aria-label', 'Frond, your companion');

    var frondTips = {
      home: [
        {
          where: '#eden-welcome',
          say: "Welcome to your media garden — let's grow something beautiful together!",
        },
        {
          where: '.features-overview',
          say: 'Psst… SyncPlay keeps movie night in step across every room.',
        },
      ],
      features: [
        { where: '.feature-card', say: 'Each feature is a seed you plant to grow your library.' },
      ],
      download: [
        {
          where: '.code-block',
          say: "One command and you're the gardener. I'll help things flourish from here.",
        },
      ],
    };

    var tipTexts = [];
    if (frondTips[pageKey]) {
      tipTexts = frondTips[pageKey];
    }

    var mascotHTML =
      '<svg class="mascot-sprite frond-idle" viewBox="0 0 72 72" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
      '<!-- Seedling body -->' +
      '<ellipse cx="36" cy="58" rx="14" ry="8" fill="#8B6347" opacity="0.3"/>' +
      '<rect x="32" y="44" width="8" height="16" rx="4" fill="#2D7A4F"/>' +
      '<!-- Leaf head -->' +
      '<ellipse cx="36" cy="34" rx="18" ry="20" fill="#2D7A4F"/>' +
      '<path d="M36 14 Q46 24 36 54 Q26 24 36 14" fill="#4AADCF" opacity="0.3"/>' +
      '<!-- Eyes -->' +
      '<circle cx="29" cy="32" r="3" fill="#1A2E1E"/>' +
      '<circle cx="43" cy="32" r="3" fill="#1A2E1E"/>' +
      '<circle cx="30" cy="31" r="1" fill="white"/>' +
      '<circle cx="44" cy="31" r="1" fill="white"/>' +
      '<!-- Smile -->' +
      '<path d="M30 40 Q36 46 42 40" stroke="#1A2E1E" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<!-- Left tendril arm -->' +
      '<path d="M18 44 Q12 38 14 30" stroke="#2D7A4F" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="13" cy="28" rx="5" ry="3" fill="#7DC98A" transform="rotate(-30 13 28)"/>' +
      '<!-- Right tendril arm with watering can -->' +
      '<path d="M54 44 Q60 38 58 32" stroke="#2D7A4F" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<rect x="54" y="26" width="10" height="8" rx="2" fill="#8B6347"/>' +
      '<rect x="64" y="28" width="4" height="3" rx="1" fill="#8B6347"/>' +
      '<!-- Gold glow -->' +
      '<ellipse cx="36" cy="34" rx="20" ry="22" fill="none" stroke="#E8A020" stroke-width="1" opacity="0.2"/>' +
      '</svg>' +
      '<div class="mascot-tip" aria-live="polite"></div>';

    mascotContainer.innerHTML = mascotHTML;

    // Mobile: don't fix position
    if (window.innerWidth < 768) {
      mascotContainer.style.position = 'static';
      mascotContainer.style.flexDirection = 'row';
    }

    document.body.appendChild(mascotContainer);

    var sprite = mascotContainer.querySelector('.mascot-sprite');
    var tip = mascotContainer.querySelector('.mascot-tip');
    var clickCount = 0;
    var _tipIndex = 0;
    var tipTimeout;

    function showTip(text) {
      tip.textContent = text;
      tip.style.display = 'block';
      clearTimeout(tipTimeout);
      tipTimeout = setTimeout(function () {
        tip.style.display = 'none';
      }, 6000);
    }

    function _hideTip() {
      tip.style.display = 'none';
      clearTimeout(tipTimeout);
    }

    // Show first tip after short delay
    if (tipTexts.length) {
      setTimeout(function () {
        showTip(tipTexts[0].say);
        _tipIndex = 0;
      }, 1500);
    }

    // Click counter for easter egg
    sprite.addEventListener('click', function () {
      clickCount++;
      if (clickCount === 5) {
        triggerFrondJoy();
        clickCount = 0;
      }
    });

    // Dismiss button
    var dismissBtn = document.createElement('button');
    dismissBtn.className = 'mascot-dismiss';
    dismissBtn.innerHTML =
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg> Frond, take a rest';
    dismissBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      localStorage.setItem('phlix-frond-dismissed', 'true');
      mascotContainer.remove();
    });

    // Observe section changes for contextual tips
    if (tipTexts.length > 1 && 'IntersectionObserver' in window) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var matched = tipTexts.find(function (t) {
                return entry.target.matches(t.where) || entry.target.closest(t.where);
              });
              if (matched) {
                showTip(matched.say);
              }
            }
          });
        },
        { threshold: 0.5 },
      );

      tipTexts.forEach(function (t) {
        var el = document.querySelector(t.where);
        if (el) sectionObserver.observe(el);
      });
    }
  }

  function triggerFrondJoy() {
    // Frond does a spin + leaf burst
    var sprite = document.querySelector('.mascot-sprite');
    if (!sprite) return;

    sprite.style.animation = 'none';
    sprite.offsetHeight; // reflow
    sprite.style.animation = 'frondSpin 0.6s ease-out forwards';

    // Petal shower
    var colors = ['#E8A020', '#7DC98A', '#4AADCF', '#f0b429'];
    var shower = document.createElement('div');
    shower.className = 'petal-shower';
    document.body.appendChild(shower);

    for (var i = 0; i < 30; i++) {
      var petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.background = colors[Math.floor(Math.random() * colors.length)];
      petal.style.animationDuration = 2 + Math.random() * 3 + 's';
      petal.style.animationDelay = Math.random() * 0.5 + 's';
      petal.style.opacity = 0.6 + Math.random() * 0.4;
      shower.appendChild(petal);
    }

    var tip = document.querySelector('.mascot-tip');
    if (tip) {
      tip.textContent = 'Frond is so excited! You found the joy in the garden!';
      tip.style.display = 'block';
    }

    setTimeout(function () {
      shower.remove();
    }, 6000);

    // Exit on Esc
    function clearOnEsc(e) {
      if (e.key === 'Escape') {
        shower.remove();
        sprite.style.animation = '';
        document.removeEventListener('keydown', clearOnEsc);
      }
    }
    document.addEventListener('keydown', clearOnEsc);
  }

  /* ─── Easter eggs ────────────────────────────────────────────────────── */

  // 1. click:5 — handled by Frond mascot above

  // 2. typed-word:solarpunk
  var typedBuffer = '';
  var typedTimeout;

  document.addEventListener('keydown', function (e) {
    // Disable while in form fields
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.key === 'Escape') return; // Don't buffer Esc

    clearTimeout(typedTimeout);
    typedBuffer += e.key.toLowerCase();

    // Keep buffer reasonable
    if (typedBuffer.length > 20) {
      typedBuffer = typedBuffer.slice(-20);
    }

    typedTimeout = setTimeout(function () {
      typedBuffer = '';
    }, 1000);

    if (typedBuffer.indexOf('solarpunk') !== -1) {
      triggerSolarpunkEgg();
      typedBuffer = '';
    }
  });

  function triggerSolarpunkEgg() {
    document.documentElement.classList.add('solarpunk-mode');
    var banner = document.createElement('div');
    banner.style.cssText =
      'position:fixed;top:var(--space-4);left:50%;transform:translateX(-50%);' +
      'background:var(--color-solar-gold);color:var(--color-deep-canopy);' +
      'padding:var(--space-3) var(--space-6);border-radius:var(--radius-pill);' +
      'font-family:var(--font-ui);font-size:0.875rem;font-weight:var(--fw-semibold);' +
      'z-index:9999;box-shadow:var(--shadow-md);animation:fadeIn 0.3s ease-out';
    banner.textContent = 'You know the secret name of the garden!';
    document.body.appendChild(banner);

    setTimeout(function () {
      document.documentElement.classList.remove('solarpunk-mode');
      banner.remove();
    }, 4000);

    function escClear(e) {
      if (e.key === 'Escape') {
        document.documentElement.classList.remove('solarpunk-mode');
        banner.remove();
        document.removeEventListener('keydown', escClear);
      }
    }
    document.addEventListener('keydown', escClear);
  }

  // 3. scroll-past-footer
  var footer = document.querySelector('.site-footer');
  if (footer) {
    var _antMarch = null;
    var footerObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          triggerAntMarch();
          footerObserver.disconnect();
        }
      },
      { threshold: 0 },
    );
    footerObserver.observe(footer);
  }

  function triggerAntMarch() {
    var march = document.createElement('div');
    march.className = 'ant-march';
    march.innerHTML = '';
    document.body.appendChild(march);

    for (var i = 0; i < 6; i++) {
      var ant = document.createElement('div');
      ant.className = 'ant';
      ant.style.animationDelay = i * 1.2 + 's';
      ant.style.left = -40 + i * 5 + 'px';
      march.appendChild(ant);
    }

    var tip = document.querySelector('.mascot-tip');
    if (tip) {
      tip.textContent = 'Even gardens have hidden corners.';
      tip.style.display = 'block';
    }

    setTimeout(function () {
      march.remove();
    }, 10000);

    function escClear(e) {
      if (e.key === 'Escape') {
        march.remove();
        document.removeEventListener('keydown', escClear);
      }
    }
    document.addEventListener('keydown', escClear);
  }

  /* ─── Dim mode CSS ─────────────────────────────────────────────────────── */
  var styleEl = document.createElement('style');
  styleEl.textContent =
    '.dim-mode * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }' +
    '.dim-mode .hero { opacity: 0.85; }' +
    '.solarpunk-mode { filter: sepia(0.3) saturate(1.4) brightness(1.1); }' +
    '@keyframes frondSpin { to { transform: rotate(360deg); } }' +
    '@keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }';
  document.head.appendChild(styleEl);
})();
/*@copyright 2026 Joe Huss <detain@interserver.net>*/
