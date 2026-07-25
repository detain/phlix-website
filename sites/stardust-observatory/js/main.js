/**
 * Stardust Observatory — js/main.js
 *
 * Dependency-free enhancement layer for the kit's experience fields: nav toggle,
 * Steady Gaze (intensity_toggle), hero guided-reveal, page-turn bookmarks,
 * Meridian (mascot.behavior), three easter_eggs, seasonal date-gate. All of it
 * is additive — with JS off the copy is identical, the dome is already open, and
 * the nav is a plain list of links.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var root = document.documentElement;
  var STORE_INTENSITY = 'stardust:intensity';
  var STORE_MERIDIAN = 'stardust:meridian-dismissed';
  var page = document.body.getAttribute('data-page') || '';

  function store(key, value) {
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    } catch {
      /* private mode — the feature simply does not persist */
    }
  }

  function stored(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  var systemCalm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function calm() {
    return systemCalm || root.getAttribute('data-intensity') === 'steady';
  }

  function observe(nodes, onEnter, options) {
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(nodes, onEnter);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            onEnter(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      options || { threshold: 0.2 },
    );
    Array.prototype.forEach.call(nodes, function (n) {
      io.observe(n);
    });
  }

  /* ── 1. Topbar (navigation_model.fallback stays the source of truth) ───── */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('is-open'));
    });
    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setMenu(false);
      }
    });
  }

  /* ── 2. "Steady Gaze" — intensity_toggle, default "full" ──────────────── */
  var intensity = document.querySelector('.intensity-toggle');
  if (stored(STORE_INTENSITY) === 'steady') root.setAttribute('data-intensity', 'steady');

  if (intensity) {
    var syncIntensity = function () {
      var steady = root.getAttribute('data-intensity') === 'steady';
      intensity.setAttribute('aria-pressed', String(steady));
    };
    syncIntensity();
    intensity.addEventListener('click', function () {
      var steady = root.getAttribute('data-intensity') !== 'steady';
      if (steady) root.setAttribute('data-intensity', 'steady');
      else root.removeAttribute('data-intensity');
      store(STORE_INTENSITY, steady ? 'steady' : null);
      syncIntensity();
    });
  }

  /* ── 3. hero_experience: guided-reveal (fallback = already open) ───────── */
  var dome = document.querySelector('.dome');
  if (dome && !calm()) {
    dome.setAttribute('data-dome', 'closed');
    observe(
      [dome],
      function (el) {
        el.removeAttribute('data-dome');
        el.classList.add('is-open');
      },
      { threshold: 0.35 },
    );
  } else if (dome) {
    dome.classList.add('is-open');
  }

  /* ── 4. scroll_experience: continuous-with-bookmarks ──────────────────── */
  if (!calm()) {
    observe(
      document.querySelectorAll('.page-turn'),
      function (el) {
        el.classList.add('is-turning');
      },
      { threshold: 0.9 },
    );
    observe(document.querySelectorAll('.reveal'), function (el) {
      el.classList.add('is-visible');
    });
  } else {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── 5. mascot.behavior — Meridian, the armillary companion ───────────── */
  var meridian = document.querySelector('.meridian');
  var bubble = document.getElementById('meridian-say');

  var TIPS = [
    { page: 'home', sel: '#hero', say: 'The dome is open. Let me show you what’s inside.' },
    {
      page: 'home',
      sel: '.features-overview',
      say: 'Aperture is our precision term for a telescope’s opening; think of each feature as a different way to look at your library.',
    },
    {
      page: 'features',
      sel: '#syncplay',
      say: 'SyncPlay is like keeping a shared transit line — every device stays locked to the same frame, no matter the distance.',
    },
    {
      page: 'download',
      sel: '#server',
      say: 'One line and you’re the astronomer. I’ll help you chart the path.',
    },
    {
      page: 'download',
      sel: '.clients',
      say: 'Native apps for every screen — as if you had a telescope pointed from every room in your house.',
    },
  ];

  if (meridian && bubble) {
    if (stored(STORE_MERIDIAN) === '1') {
      meridian.remove();
      meridian = null;
    }
  }

  if (meridian && bubble) {
    var bubbleBox = meridian.querySelector('.meridian-bubble');
    var orb = meridian.querySelector('.meridian-orb');
    var mine = TIPS.filter(function (t) {
      return t.page === page;
    });
    var queue = mine.slice();
    var armed = false; /* nothing is pushed before the visitor moves */
    var phone = window.matchMedia('(width <= 600px)').matches;

    var say = function (text) {
      bubble.textContent = text;
      bubbleBox.hidden = false;
    };
    var hush = function () {
      bubbleBox.hidden = true;
    };

    /* A floating companion must never sit on a control that is already on
     * screen (new_site.md §19.11) — at 320px there is no corner free of the
     * hero's buttons at all. So Meridian waits in the wings and arrives once
     * the visitor starts exploring: first scroll, tap or keystroke. */
    meridian.hidden = true;

    var arrive = function () {
      armed = true;
      if (meridian) meridian.hidden = false;
      window.removeEventListener('scroll', arrive);
      window.removeEventListener('pointerdown', arrive);
      window.removeEventListener('keydown', arrive);
    };
    window.addEventListener('scroll', arrive, { passive: true });
    window.addEventListener('pointerdown', arrive);
    window.addEventListener('keydown', arrive);

    /* Context-aware tips: desktop offers them as you pass each surface; a
     * phone never gets an unrequested bubble (new_site.md §19.11). */
    if (!phone) {
      mine.forEach(function (tip) {
        var target = document.querySelector(tip.sel);
        if (!target) return;
        observe(
          [target],
          function () {
            if (!armed || !meridian) return;
            say(tip.say);
            queue = queue.filter(function (q) {
              return q !== tip;
            });
            window.setTimeout(hush, 9000);
          },
          { threshold: 0.4 },
        );
      });
    }

    /* Tap Meridian for the next note — the only tip source on a phone. */
    var clicks = 0;
    var clickTimer = null;
    orb.addEventListener('click', function () {
      clicks += 1;
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(function () {
        clicks = 0;
      }, 2500);

      if (clicks >= 5) {
        clicks = 0;
        meridian.classList.add('is-nova');
        say('The rings weave, the eyepiece snaps out — a star going nova, briefly.');
        window.setTimeout(function () {
          if (meridian) meridian.classList.remove('is-nova');
        }, 2600);
        return;
      }

      if (!bubbleBox.hidden) {
        hush();
        return;
      }
      var next = queue.shift();
      if (!next) {
        queue = mine.slice();
        next = queue.shift();
      }
      say(next ? next.say : 'The sky is clear tonight. Ask me again from another page.');
    });

    /* easter_interactions[1] — hover-hold:2s */
    var holdTimer = null;
    orb.addEventListener('pointerenter', function () {
      holdTimer = window.setTimeout(function () {
        meridian.classList.add('is-tilted');
        say('You’re curious. Good. That’s how discovery works.');
      }, 2000);
    });
    orb.addEventListener('pointerleave', function () {
      window.clearTimeout(holdTimer);
      meridian.classList.remove('is-tilted');
    });

    var dismiss = meridian.querySelector('.meridian-dismiss');
    if (dismiss) {
      dismiss.addEventListener('click', function () {
        store(STORE_MERIDIAN, '1');
        if (meridian) meridian.remove();
        meridian = null;
      });
    }
  }

  /* ── 6. easter_eggs ───────────────────────────────────────────────────── */

  /* (a) logo-clicks:5 — the dome aligns */
  var logo = document.querySelector('.nav-logo');
  var eggLayer = null;

  function clearEgg() {
    if (eggLayer) {
      eggLayer.remove();
      eggLayer = null;
    }
    if (logo) logo.classList.remove('is-aligned');
  }

  if (logo) {
    var logoClicks = 0;
    var logoTimer = null;
    logo.addEventListener('click', function (e) {
      logoClicks += 1;
      window.clearTimeout(logoTimer);
      logoTimer = window.setTimeout(function () {
        logoClicks = 0;
      }, 2500);
      if (logoClicks < 5) return;

      logoClicks = 0;
      e.preventDefault(); /* only on the 5th click, so the link still works */
      clearEgg();
      logo.classList.add('is-aligned');

      eggLayer = document.createElement('div');
      eggLayer.className = 'egg-sparkles';
      var box = logo.getBoundingClientRect();
      for (var i = 0; i < 18; i += 1) {
        var spark = document.createElement('span');
        var angle = (i / 18) * Math.PI * 2;
        spark.style.left = box.left + box.width / 2 + 'px';
        spark.style.top = box.top + box.height / 2 + 'px';
        spark.style.setProperty('--dx', Math.cos(angle) * 160 + 'px');
        spark.style.setProperty('--dy', Math.sin(angle) * 160 + 'px');
        eggLayer.appendChild(spark);
      }
      var reward = document.createElement('div');
      reward.className = 'egg-reward';
      reward.innerHTML =
        '<span>The dome is aligned perfectly. You&rsquo;ve found the zenith.</span>';
      eggLayer.appendChild(reward);
      document.body.appendChild(eggLayer);
      window.setTimeout(clearEgg, 5000);
    });
  }

  /* (b) typed-word:aperture — never swallows typing, never preventDefault */
  var typed = '';
  var words = document.querySelectorAll('.word-aperture');

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      clearEgg();
      Array.prototype.forEach.call(words, function (w) {
        w.classList.remove('egg-word');
      });
      if (meridian) meridian.classList.remove('is-tilted');
      if (menu && menu.classList.contains('is-open') && toggle) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
      return;
    }

    var el = e.target;
    var tag = el && el.tagName ? el.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (el && el.isContentEditable)) {
      return; /* focus is in a field — stay out of the way entirely */
    }
    if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;

    typed = (typed + e.key.toLowerCase()).slice(-12);
    if (typed.indexOf('aperture') === -1 || !words.length) return;
    typed = '';
    Array.prototype.forEach.call(words, function (w) {
      w.classList.add('egg-word');
    });
    if (meridian) meridian.classList.add('is-tilted');
    window.setTimeout(function () {
      Array.prototype.forEach.call(words, function (w) {
        w.classList.remove('egg-word');
      });
      if (meridian) meridian.classList.remove('is-tilted');
    }, 4000);
  });

  /* (c) scroll-past-footer — a whisper below the deep navy */
  var whisper = document.querySelector('.footer-whisper');
  if (whisper) {
    window.addEventListener(
      'scroll',
      function () {
        var atEnd = window.scrollY + window.innerHeight >= document.body.scrollHeight - 2;
        if (atEnd && whisper.hidden) whisper.hidden = false;
        else if (
          !whisper.hidden &&
          window.scrollY + window.innerHeight < document.body.scrollHeight - 160
        ) {
          whisper.hidden = true;
        }
      },
      { passive: true },
    );
  }

  /* ── 7. seasonal_activation: mode "live-js" ───────────────────────────── */
  var SEASONS = [
    {
      name: 'Perseid Watch',
      from: '08-07',
      to: '08-16',
      motif: 'img/seasonal/perseid-meteor-trail.svg',
      tokens: {
        '--color-primary': '#E8D48B',
        '--shadow-glow-gold': '0 0 28px rgba(232,212,139,0.40)',
      },
      banner:
        'Stardust is celebrating: the Perseid meteor shower lights up the dome — perfect timing to browse.',
    },
    {
      name: 'Winter Solstice',
      from: '12-18',
      to: '01-05',
      motif: 'img/seasonal/winter-solstice-frost-dome.svg',
      tokens: { '--color-tertiary': '#9B7AC8', '--color-bg': '#0A1520' },
      banner:
        'Stardust is celebrating the winter solstice: frost on the dome glass, Orion overhead.',
    },
    {
      name: 'Vernal Equinox',
      from: '03-15',
      to: '04-05',
      motif: 'img/seasonal/vernal-equinox-garden.svg',
      tokens: { '--color-secondary': '#7A9E6A', '--color-neutral': '#BACFB5' },
      banner:
        'Stardust is celebrating the vernal equinox: the observatory garden is in leaf again.',
    },
  ];

  var banner = document.getElementById('seasonal-banner');
  if (banner) {
    var now = new Date();
    var today =
      String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    var live = SEASONS.filter(function (s) {
      return s.from <= s.to ? today >= s.from && today <= s.to : today >= s.from || today <= s.to;
    })[0];

    if (live) {
      Object.keys(live.tokens).forEach(function (token) {
        root.style.setProperty(token, live.tokens[token]);
      });
      var motif = banner.querySelector('.seasonal-motif');
      if (motif) {
        motif.setAttribute('src', live.motif);
        motif.setAttribute('alt', live.name + ' motif');
      }
      var text = banner.querySelector('.seasonal-text');
      if (text) text.textContent = live.banner;
      banner.hidden = false;
    }
  }
})();
