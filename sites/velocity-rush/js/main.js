/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Velocity Rush — main.js
 * Nav, mascot Rush, easter eggs, scroll reveal, FAQ, install copy,
 * seasonal activation, parallax racing stripes.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────────
     NAV TOGGLE (mobile hamburger)
  ───────────────────────────────────────────────────────────────────────── */

  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ACTIVE NAV — highlight current page
  ───────────────────────────────────────────────────────────────────────── */

  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.main-nav a[href]');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ─────────────────────────────────────────────────────────────────────────
     SCROLL REVEAL — blur-to-focus on sections into view
  ───────────────────────────────────────────────────────────────────────── */

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     FAQ ACCORDION
  ───────────────────────────────────────────────────────────────────────── */

  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');
      var answer = item.querySelector('.faq-answer');

      // Close all others
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          var openAnswer = openItem.querySelector('.faq-answer');
          if (openAnswer) openAnswer.style.display = 'none';
        }
      });

      // Toggle this one
      item.classList.toggle('is-open', !isOpen);
      if (answer) {
        answer.style.display = isOpen ? 'none' : 'block';
      }
    });
  });

  /* ─────────────────────────────────────────────────────────────────────────
     INSTALL COPY BUTTON
  ───────────────────────────────────────────────────────────────────────── */

  document.querySelectorAll('.install-copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.closest('.install-block').querySelector('.install-code');
      var label = btn.textContent;

      if (!code) return;

      navigator.clipboard.writeText(code.textContent.trim()).then(
        function () {
          btn.textContent = 'Copied';
          btn.style.color = 'var(--color-success)';
          btn.style.borderColor = 'var(--color-success)';
          setTimeout(function () {
            btn.textContent = label;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        },
        function () {
          // Fallback: select text
          var range = document.createRange();
          range.selectNodeContents(code);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        },
      );
    });
  });

  /* ─────────────────────────────────────────────────────────────────────────
     SEASONAL ACTIVATION
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    // Seasonal variant date ranges for velocity-rush
    var variants = [
      {
        name: 'Night Circuit',
        // 09-01 to 10-31
        from: [9, 1],
        to: [10, 31],
        motif: 'Night Circuit season — neon saturation engaged.',
      },
      {
        name: 'Championship Lap',
        // 11-01 to 11-30
        from: [11, 1],
        to: [11, 30],
        motif: 'Championship season active — new lap records available.',
      },
    ];

    function inRange(now, from, to) {
      var m = now.getMonth() + 1;
      var d = now.getDate();
      var fm = from[0], fd = from[1], tm = to[0], td = to[1];
      if (fm === tm) {
        return m === fm && d >= fd && d <= td;
      }
      if (fm < tm) {
        return (m === fm && d >= fd) || (m === tm && d <= td);
      }
      return (m === fm && d >= fd) || (m === tm && d <= td);
    }

    var now = new Date();
    var active = variants.find(function (v) {
      return inRange(now, v.from, v.to);
    });

    if (active) {
      var slot = document.getElementById('season-slot');
      var slot2 = document.getElementById('season-slot-2');
      var html =
        '<div class="season-banner">' +
        active.motif +
        ' <a href="about.html#faq">Learn more</a></div>';

      if (slot) {
        slot.innerHTML = html;
        slot.hidden = false;
      }
      if (slot2) {
        slot2.innerHTML = html;
        slot2.hidden = false;
      }

      // Apply Night Circuit overrides
      if (active.name === 'Night Circuit') {
        document.documentElement.style.setProperty('--color-primary', '#00FFFF');
        document.documentElement.style.setProperty('--color-secondary', '#FF00FF');
      }
    }
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     MASCOT: RUSH — speed streak companion
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var PAGE_WHITELIST = ['index.html', 'features.html', 'download.html', 'about.html'];
    var path = window.location.pathname.split('/').pop() || 'index.html';

    if (PAGE_WHITELIST.indexOf(path) === -1) return;

    var mascot = document.getElementById('mascot-rush');
    if (!mascot) return;

    var tip = mascot.querySelector('.mascot-tip');
    var closeBtn = mascot.querySelector('.mascot-close');
    var dismissedKey = 'phlix-rush-dismissed';

    if (localStorage.getItem(dismissedKey) === '1') {
      mascot.classList.add('is-hidden');
      return;
    }

    // Page-specific tips
    var pageTip = {
      'index.html': 'Zero to play — let\'s go! Your library\'s already warmed up.',
      'features.html': 'SyncPlay syncs every frame across every device. No drift, no lag.',
      'download.html': 'One command to rule them all. You\'re the driver now.',
      'about.html': 'Questions? Fast answers, no pit stops.',
    };

    function showTip(text) {
      if (!tip) return;
      tip.textContent = text;
      tip.classList.add('is-visible');
    }

    function hideTip() {
      if (tip) tip.classList.remove('is-visible');
    }

    // Show tip after delay
    var tipTimer = setTimeout(function () {
      showTip(pageTip[path] || 'Zero to play — let\'s go!');
    }, 2500);

    // Dismiss
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        localStorage.setItem(dismissedKey, '1');
        mascot.classList.add('is-hidden');
        clearTimeout(tipTimer);
      });
    }

    // Click count interactions
    var clickCount = 0;
    mascot.querySelector('.mascot-body').addEventListener('click', function () {
      clickCount++;
      clearTimeout(tipTimer);
      hideTip();
      if (clickCount >= 5) {
        // Easter egg: speed trail
        triggerSpeedTrail();
        showTip('Zero lag detected. Nice reflexes!');
        clickCount = 0;
      } else {
        showTip('Rush blurs into position...');
        setTimeout(hideTip, 2500);
      }
    });

    // Hover-hold easter egg
    var holdTimer;
    mascot.querySelector('.mascot-body').addEventListener('mouseenter', function () {
      holdTimer = setTimeout(function () {
        showTip('Rush is charged and ready. Full throttle ahead.');
      }, 2000);
    });
    mascot.querySelector('.mascot-body').addEventListener('mouseleave', function () {
      clearTimeout(holdTimer);
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     EASTER EGG: Speed trail effect (5 clicks on Rush or logo)
  ───────────────────────────────────────────────────────────────────────── */

  function triggerSpeedTrail() {
    var streaks = document.createElement('div');
    streaks.className = 'speed-streaks is-active';
    streaks.setAttribute('aria-hidden', 'true');
    document.body.appendChild(streaks);
    setTimeout(function () {
      streaks.remove();
    }, 1600);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     EASTER EGG: Logo clicks — Rush flies across + lap badge
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var wordmark = document.querySelector('.site-wordmark');
    if (!wordmark) return;

    var clickCount = 0;
    var timer;

    wordmark.addEventListener('click', function () {
      clickCount++;
      clearTimeout(timer);
      timer = setTimeout(function () {
        clickCount = 0;
      }, 2000);

      if (clickCount >= 5) {
        clickCount = 0;
        clearTimeout(timer);

        // Speed trail effect
        triggerSpeedTrail();

        // Lap badge
        var badge = document.createElement('div');
        badge.className = 'lap-badge is-visible';
        badge.textContent = '5 clicks: 0.00s';
        document.body.appendChild(badge);

        var mascot = document.getElementById('mascot-rush');
        if (mascot && !mascot.classList.contains('is-hidden')) {
          var tip = mascot.querySelector('.mascot-tip');
          if (tip) {
            tip.textContent = 'Zero lag detected. Nice reflexes!';
            tip.classList.add('is-visible');
            setTimeout(function () {
              tip.classList.remove('is-visible');
            }, 3000);
          }
        }

        setTimeout(function () {
          badge.classList.remove('is-visible');
          setTimeout(function () { badge.remove(); }, 300);
        }, 2000);
      }
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     EASTER EGG 2: Typed "velocity" — cursor becomes speed streak
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var typed = [];
    var targetWord = 'velocity';
    var isInput = false;

    document.addEventListener('focusin', function (e) {
      isInput = ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE'].indexOf(e.target.tagName) !== -1;
    });
    document.addEventListener('focusout', function (e) {
      setTimeout(function () {
        isInput = ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE'].indexOf(e.target.tagName) !== -1;
      }, 10);
    });

    document.addEventListener('keydown', function (e) {
      if (isInput) return;

      if (e.key === 'Escape') {
        typed = [];
        return;
      }

      if (e.key.length === 1) {
        typed.push(e.key.toLowerCase());
        if (typed.length > targetWord.length) typed.shift();

        if (typed.join('') === targetWord) {
          typed = [];
          triggerSpeedTrail();

          var mascot = document.getElementById('mascot-rush');
          if (mascot && !mascot.classList.contains('is-hidden')) {
            var tip = mascot.querySelector('.mascot-tip');
            if (tip) {
              tip.textContent = 'Velocity confirmed. Top speed engaged.';
              tip.classList.add('is-visible');
              setTimeout(function () {
                tip.classList.remove('is-visible');
              }, 3000);
            }
          }
        }
      }
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     SCROLL EXPERIENCE — parallax racing stripe sections
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    if (prefersReducedMotion) return;

    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.05 },
    );

    sections.forEach(function (section) {
      section.classList.add('section-reveal');
      sectionObserver.observe(section);
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     PERSONA VIGNETTES — Intersection Observer for visibility
  ───────────────────────────────────────────────────────────────────────── */

  document.querySelectorAll('[data-vignette]').forEach(function (el) {
    if (prefersReducedMotion) {
      el.style.opacity = '1';
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
})();
