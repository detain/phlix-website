/**
 * main.js — Street Mural brand kit site
 * Vanilla JS, no dependencies, defer-loaded.
 * Implements: mobile nav, scroll reveals, mascots, easter eggs,
 * intensity toggle, seasonal activation, typed-word detection.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ─── Utility helpers ──────────────────────────────────────────────────── */
  function qs(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function qsa(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ─── Mobile nav toggle ──────────────────────────────────────────────── */
  onReady(function () {
    var toggle = qs('.nav-toggle');
    var menu = qs('.nav-menu');

    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('is-open', !expanded);
        menu.setAttribute('aria-hidden', String(expanded));
        if (!expanded) {
          var firstLink = menu.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });

      document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('is-open');
          menu.setAttribute('aria-hidden', 'true');
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('is-open');
          menu.setAttribute('aria-hidden', 'true');
          toggle.focus();
        }
      });
    }
  });

  /* ─── Scroll reveals — IntersectionObserver ─────────────────────────── */
  onReady(function () {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Listen for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
      reducedMotion = e.matches;
    });

    if (!reducedMotion && 'IntersectionObserver' in window) {
      var reveals = qsa('.reveal');
      if (reveals.length > 0) {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 },
        );

        reveals.forEach(function (el) {
          observer.observe(el);
        });
      }
    } else {
      qsa('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  });

  /* ─── Intensity toggle (Volume: LOUD / chill) ────────────────────────── */
  onReady(function () {
    var intensityBtns = qsa('.intensity-btn');
    var motionStates = qsa('.motion-state');

    function applyIntensity(loud) {
      document.documentElement.dataset.intensity = loud ? 'loud' : 'chill';
      intensityBtns.forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(loud));
        qs('.intensity-state', btn).textContent = loud ? 'LOUD' : 'chill';
      });
      motionStates.forEach(function (el) {
        el.textContent = loud ? 'on' : 'off';
      });
      try {
        localStorage.setItem('phlix-intensity', loud ? 'loud' : 'chill');
      } catch {
        /* noop */
      }
    }

    // Restore preference
    try {
      var saved = localStorage.getItem('phlix-intensity');
      if (saved === 'chill') applyIntensity(false);
    } catch {
      /* noop */
    }

    intensityBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isLoud = btn.getAttribute('aria-pressed') !== 'false';
        applyIntensity(!isLoud);
      });
    });
  });

  /* ─── Mascot Cap ─────────────────────────────────────────────────────── */
  onReady(function () {
    var cap = qs('#mascot-cap');
    if (!cap) return;

    var tipTexts = {
      home: 'Yo, crew. Fresh wall — time to paint it.',
      features: 'Transcode, auth, live TV—the spray-cans in your kit.',
      download: "Three lines and it's yours. We run quiet.",
      about: 'BSD license means you own every pixel.',
    };

    // Determine which tip to show based on current page
    var page = document.body.dataset.page || '';
    var tipEl = qs('.mascot-tip p', cap) || qs('.mascot-tip', cap);
    if (tipEl && tipTexts[page]) {
      tipEl.textContent = tipTexts[page];
    }

    // Check if dismissed
    try {
      if (localStorage.getItem('phlix-cap-dismissed') === 'true') {
        cap.style.display = 'none';
        return;
      }
    } catch {
      /* noop */
    }

    // Dismiss button
    var dismissBtn = qs('.mascot-dismiss', cap);
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        cap.style.display = 'none';
        try {
          localStorage.setItem('phlix-cap-dismissed', 'true');
        } catch {
          /* noop */
        }
      });
    }

    // Only show Cap fixed on desktop
    var isMobile = window.matchMedia('(width <= 767px)').matches;
    if (isMobile) return;

    // Idle animation: Cap shakes periodically when page is idle
    var mascotBody = qs('.mascot-body', cap);
    var idleTimeout;

    function startIdle() {
      if (qs('.mascot-cap[data-dismissed]')) return;
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(
        function () {
          if (mascotBody && !document.hidden) {
            mascotBody.classList.add('idle');
            setTimeout(function () {
              if (mascotBody) mascotBody.classList.remove('idle');
            }, 400);
          }
          startIdle();
        },
        5000 + Math.random() * 3000,
      );
    }

    document.addEventListener(
      'mousemove',
      function () {
        startIdle();
      },
      { passive: true },
    );

    if (!isMobile) startIdle();
  });

  /* ─── Easter Egg 1: logo-clicks:7 ────────────────────────────────────── */
  onReady(function () {
    var logoClicks = 0;
    var logoTimeout;

    var logo = qs('.nav-logo');
    if (!logo) return;

    logo.addEventListener('click', function (e) {
      // Don't trigger on keyboard nav
      if (e.clientX === 0 && e.clientY === 0) return;

      clearTimeout(logoTimeout);
      logoClicks++;

      if (logoClicks >= 7) {
        logoClicks = 0;

        // Cap does a shake and spray burst
        var cap = qs('#mascot-cap');
        var mascotBody = cap ? qs('.mascot-body', cap) : null;
        if (mascotBody) {
          mascotBody.classList.add('idle');
          setTimeout(function () {
            if (mascotBody) mascotBody.classList.remove('idle');
          }, 600);
        }

        // Spray burst overlay
        var burst = document.createElement('div');
        burst.className = 'spray-burst';
        document.body.appendChild(burst);
        setTimeout(function () {
          if (burst.parentNode) burst.parentNode.removeChild(burst);
        }, 900);

        // Paint splatter on page
        document.body.style.transition = 'filter 0.3s';
        document.body.style.filter =
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")";
        setTimeout(function () {
          document.body.style.filter = '';
        }, 4000);

        // Show reward copy in tip
        var tip = cap ? qs('.mascot-tip p', cap) : null;
        if (tip) {
          var orig = tip.textContent;
          tip.textContent = 'Nice tag! Cap approved.';
          cap.classList.add('is-active');
          setTimeout(function () {
            tip.textContent = orig;
            cap.classList.remove('is-active');
          }, 3000);
        }
      } else {
        logoTimeout = setTimeout(function () {
          logoClicks = 0;
        }, 2000);
      }
    });
  });

  /* ─── Easter Egg 2: typed-word:crew ──────────────────────────────────── */
  onReady(function () {
    var typedBuffer = '';
    var typedTimeout;
    var escHandler;

    function resetTyped() {
      typedBuffer = '';
      document.body.classList.remove('spray-cursor');
      document.removeEventListener('keydown', escHandler);
    }

    escHandler = function (e) {
      if (e.key === 'Escape') resetTyped();
    };

    document.addEventListener('keydown', function (e) {
      // Skip if in input/textarea/contenteditable
      var tag = (e.target.tagName || '').toLowerCase();
      if (['input', 'textarea', 'select'].includes(tag) || e.target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      clearTimeout(typedTimeout);
      typedBuffer += e.key.toLowerCase();

      // Keep buffer bounded
      if (typedBuffer.length > 20) typedBuffer = typedBuffer.slice(-20);

      if (typedBuffer.includes('crew')) {
        document.body.classList.add('spray-cursor');
        // Find the nearest tagline and glow it
        var taglines = qsa('.footer-tagline, .hero-headline, .tagline-primary');
        taglines.forEach(function (el) {
          el.style.transition = 'color 0.2s, text-shadow 0.2s';
          el.style.color = 'var(--color-primary)';
          el.style.textShadow = '0 0 12px rgba(232,31,31,0.6)';
          setTimeout(function () {
            el.style.color = '';
            el.style.textShadow = '';
          }, 3000);
        });

        // Show reward in mascot tip if present
        var tip = qs('#mascot-cap .mascot-tip p');
        if (tip) {
          var orig = tip.textContent;
          tip.textContent = "You're speaking Cap's language.";
          qs('#mascot-cap').classList.add('is-active');
          setTimeout(function () {
            tip.textContent = orig;
            qs('#mascot-cap').classList.remove('is-active');
          }, 3000);
        }

        document.addEventListener('keydown', escHandler);
        clearTimeout(typedTimeout);
        typedTimeout = setTimeout(resetTyped, 5000);
      } else {
        typedTimeout = setTimeout(resetTyped, 1000);
      }
    });
  });

  /* ─── Easter Egg 3: scroll-past-footer:3x ─────────────────────────────── */
  onReady(function () {
    var footerScrollCount = 0;
    var lastScrollTop = 0;
    var footer = qs('.site-footer');
    if (!footer) return;

    var thanksMsg = document.createElement('div');
    thanksMsg.className = 'footer-thanks';
    thanksMsg.setAttribute('role', 'status');
    thanksMsg.setAttribute('aria-live', 'polite');
    thanksMsg.textContent = 'The wall sees you, crew. Welcome home. — Cap';
    footer.appendChild(thanksMsg);

    function handleScroll() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var footerRect = footer.getBoundingClientRect();
      var viewportHeight = window.innerHeight;

      // Scrolled past footer: footer top is above viewport bottom
      if (lastScrollTop > scrollTop && footerRect.top < viewportHeight) {
        footerScrollCount++;
        if (footerScrollCount >= 3) {
          thanksMsg.classList.add('is-visible');
          setTimeout(function () {
            thanksMsg.classList.remove('is-visible');
          }, 5000);
          footerScrollCount = 0; // reset after showing
        }
      }

      lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  /* ─── Seasonal activation ─────────────────────────────────────────────── */
  onReady(function () {
    var variants = [
      { name: 'winter', start: [12, 1], end: [1, 15] },
      { name: 'summer', start: [6, 21], end: [9, 1] },
      { name: 'culture', start: [2, 1], end: [2, 28] },
      { name: 'pride', start: [6, 1], end: [6, 20] },
    ];

    function getCurrentVariant() {
      var now = new Date();
      var month = now.getMonth() + 1; // 1-12
      var day = now.getDate();

      for (var i = 0; i < variants.length; i++) {
        var v = variants[i];
        var startMonth = v.start[0],
          startDay = v.start[1];
        var endMonth = v.end[0],
          endDay = v.end[1];

        var inRange;
        if (startMonth <= endMonth) {
          // Normal range within one year
          if (month > startMonth && month < endMonth) {
            inRange = true;
          } else if (month === startMonth && day >= startDay) {
            inRange = true;
          } else if (month === endMonth && day <= endDay) {
            inRange = true;
          } else {
            inRange = false;
          }
        } else {
          // Wraps across year (e.g. Winter: Dec-Jan)
          if (month >= startMonth || month <= endMonth) {
            if (month === startMonth && day >= startDay) inRange = true;
            else if (month === endMonth && day <= endDay) inRange = true;
            else if (month > startMonth || month < endMonth) inRange = true;
            else inRange = false;
          } else {
            inRange = false;
          }
        }

        if (inRange) return v.name;
      }
      return null;
    }

    var activeVariant = getCurrentVariant();
    if (activeVariant) {
      document.documentElement.dataset.season = activeVariant;
    }
  });
})();
