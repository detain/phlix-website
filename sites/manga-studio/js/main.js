/**
 * main.js — Manga Studio
 * Nav toggle, reduced-motion, scroll reveals, easter eggs, mascot, intensity toggle
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     REDUCED MOTION — must watch for changes, not just read once (§19.20)
     ═══════════════════════════════════════════════════════════════ */
  var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyReducedMotion(prefersReduced) {
    if (prefersReduced) {
      document.documentElement.classList.add('reduce-motion');
      document.documentElement.setAttribute('data-intensity', 'calm');
    } else {
      document.documentElement.classList.remove('reduce-motion');
      // Restore previous intensity state or default to 'full'
      var savedIntensity = localStorage.getItem('phlix-intensity');
      document.documentElement.setAttribute('data-intensity', savedIntensity || 'full');
    }
  }

  applyReducedMotion(reducedMotionQuery.matches);

  // Re-read on change — not just at load
  reducedMotionQuery.addEventListener('change', function (e) {
    applyReducedMotion(e.matches);
  });

  /* ═══════════════════════════════════════════════════════════════
     MOBILE NAV TOGGLE
     ═══════════════════════════════════════════════════════════════ */
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

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SCROLL REVEALS (skip if reduced motion)
     ═══════════════════════════════════════════════════════════════ */
  if (!reducedMotionQuery.matches && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.feature-card,.client-card,.download-card,.ecosystem-list li,.faq-item,' +
        '.manifesto-panel,.hero-feature-panel,.credential-panel,.proof-quote',
    );
    if (revealEls.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );

      revealEls.forEach(function (el) {
        el.classList.add('scroll-hidden');
        observer.observe(el);
      });
    }
  } else {
    // Show all immediately when reduced motion or no IntersectionObserver
    document.querySelectorAll('.scroll-hidden').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SEASONAL ACTIVATION — live-js date gate (§2A seasonal_activation)
     Applies data-season attribute to <html> for CSS token overrides
     ═══════════════════════════════════════════════════════════════ */
  (function () {
    var now = new Date();
    var monthDay =
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      now.getDate().toString().padStart(2, '0');

    var variants = [
      { name: 'new-year', range: '01-01..01-15' },
      { name: 'summer', range: '08-01..08-31' },
      { name: 'deadline', range: '12-15..12-31' },
    ];

    for (var i = 0; i < variants.length; i++) {
      var v = variants[i];
      var parts = v.range.split('..');
      if (monthDay >= parts[0] && monthDay <= parts[1]) {
        document.documentElement.setAttribute('data-season', v.name);
        break;
      }
    }
  })();

  /* ═══════════════════════════════════════════════════════════════
     INTENSITY TOGGLE — White Space (Calm Mode)
     Persisted via localStorage
     ═══════════════════════════════════════════════════════════════ */
  var intensityToggle = document.querySelector('.intensity-toggle button');
  if (intensityToggle) {
    // Restore saved state
    var savedIntensity = localStorage.getItem('phlix-intensity');
    if (savedIntensity) {
      document.documentElement.setAttribute('data-intensity', savedIntensity);
      if (savedIntensity === 'calm') {
        intensityToggle.setAttribute('aria-pressed', 'true');
        intensityToggle.textContent = 'Full Intensity';
      }
    }

    intensityToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-intensity');
      var next = current === 'calm' ? 'full' : 'calm';
      document.documentElement.setAttribute('data-intensity', next);
      localStorage.setItem('phlix-intensity', next);
      intensityToggle.setAttribute('aria-pressed', String(next === 'calm'));
      intensityToggle.textContent = next === 'calm' ? 'Full Intensity' : 'White Space (Calm Mode)';
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     EASTER EGG 1 — logo-clicks:5 → Sen manuscript animation
     ═══════════════════════════════════════════════════════════════ */
  (function () {
    var logoClicks = 0;
    var logoEl = document.querySelector('.nav-logo, .site-logo');

    if (!logoEl) return;

    function triggerManuscriptReward() {
      var toast = document.querySelector('.easter-toast');
      if (toast) {
        toast.textContent = 'Deadline met! The chapter is complete.';
        toast.classList.add('is-visible');
        setTimeout(function () {
          toast.classList.remove('is-visible');
        }, 3000);
      }
    }

    logoEl.addEventListener('click', function () {
      // Don't trigger during mobile nav open
      if (navMenu && navMenu.classList.contains('is-open')) return;

      logoClicks++;
      if (logoClicks >= 5) {
        triggerManuscriptReward();
        logoClicks = 0;
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════════
     EASTER EGG 2 — typed-word:ink → screentone overlay
     Disabled while focus is in input/textarea/contenteditable (§19.8)
     Never calls preventDefault; exits on Esc
     ═══════════════════════════════════════════════════════════════ */
  (function () {
    var typedBuffer = '';
    var inkSequence = 'ink';
    var overlay = null;

    function getOverlay() {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'easter-screentone';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
      }
      return overlay;
    }

    function showScreentone() {
      var el = getOverlay();
      el.classList.add('is-visible');
      setTimeout(function () {
        el.classList.remove('is-visible');
      }, 2000);
    }

    function isTypingField(e) {
      var tag = e.target.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
    }

    document.addEventListener('keydown', function (e) {
      // Exit on Esc — clear buffer
      if (e.key === 'Escape') {
        typedBuffer = '';
        return;
      }

      // Don't capture in input fields
      if (isTypingField(e)) {
        typedBuffer = '';
        return;
      }

      // Don't intercept typing that might be used by browser/AT
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      var ch = e.key;
      if (ch.length !== 1) return; // skip special keys

      typedBuffer += ch.toLowerCase();

      // Keep buffer to last 3 chars
      if (typedBuffer.length > inkSequence.length) {
        typedBuffer = typedBuffer.slice(-inkSequence.length);
      }

      if (typedBuffer === inkSequence) {
        showScreentone();
        typedBuffer = '';
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════════
     MASCOT COMPANION — Sen
     Fixed bottom-right; tips on first scroll; easter_interactions;
     dismiss persists via localStorage; disabled under reduced-motion
     ═══════════════════════════════════════════════════════════════ */
  (function () {
    // Only show on home, features, download, about pages
    var mascotPages = ['index', 'features', 'download', 'about'];
    var pageName = document.body.getAttribute('data-page') || '';
    if (mascotPages.indexOf(pageName) === -1) return;

    // Check dismissal
    var dismissed = localStorage.getItem('phlix-sen-dismissed');
    if (dismissed === 'true') return;

    var mascot = document.querySelector('.mascot-companion');
    if (!mascot) return;

    // Under reduced motion: show static, no idle animation, no tips
    if (reducedMotionQuery.matches) {
      mascot.classList.remove('is-hidden');
      return;
    }

    mascot.classList.remove('is-hidden');

    var tip = mascot.querySelector('.mascot-tip');
    var dismissBtn = mascot.querySelector('.mascot-dismiss');

    // Dismiss handler
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        mascot.classList.add('is-hidden');
        localStorage.setItem('phlix-sen-dismissed', 'true');
      });
    }

    // Show tip on first scroll
    var tipShown = false;
    function showTip(text) {
      if (!tip || tipShown) return;
      tipShown = true;
      if (text) tip.textContent = text;
      tip.classList.add('is-visible');
    }

    window.addEventListener(
      'scroll',
      function () {
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        var page = pageName;

        if (page === 'index' && scrollY > 50) {
          showTip('Every frame earns its place. Press play and see.');
        } else if (page === 'features' && scrollY > 100) {
          showTip('Craft is precision. Craft is choice. Craft is yours to keep.');
        } else if (page === 'download' && scrollY > 50) {
          showTip('One line. Then your deadline to create begins.');
        } else if (page === 'about' && scrollY > 50) {
          showTip("Questions? I've inked all the answers into the page.");
        }
      },
      { passive: true },
    );

    // Easter interaction: click-hold:2s → screentone from Sen
    var mascotFigure = mascot.querySelector('.mascot-figure');
    if (mascotFigure) {
      var holdTimer = null;
      mascotFigure.addEventListener('mouseenter', function () {
        holdTimer = setTimeout(function () {
          var overlay =
            document.querySelector('.easter-screentone') ||
            (function () {
              var el = document.createElement('div');
              el.className = 'easter-screentone';
              el.setAttribute('aria-hidden', 'true');
              document.body.appendChild(el);
              return el;
            })();
          overlay.classList.add('is-visible');
          setTimeout(function () {
            overlay.classList.remove('is-visible');
          }, 2000);
        }, 2000);
      });

      mascotFigure.addEventListener('mouseleave', function () {
        clearTimeout(holdTimer);
      });
    }
  })();

  /* ═══════════════════════════════════════════════════════════════
     SCROLL PANEL FLASH TRANSITION
     Adds ink-flash class to sections as they enter viewport
     ═══════════════════════════════════════════════════════════════ */
  if (!reducedMotionQuery.matches && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('ink-flash-transition');
            // Remove after animation completes
            entry.target.addEventListener(
              'animationend',
              function () {
                entry.target.classList.remove('ink-flash-transition');
              },
              { once: true },
            );
          }
        });
      },
      { threshold: 0.05 },
    );

    document
      .querySelectorAll('.craft-manifesto, .hero-features, .craft-proof, .call-to-action')
      .forEach(function (section) {
        sectionObserver.observe(section);
      });
  }
})();
