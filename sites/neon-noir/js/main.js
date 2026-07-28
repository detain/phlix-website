/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Neon Noir — main.js
 * Nav, mascot, easter eggs, scroll reveal, FAQ, install copy,
 * seasonal activation, intensity toggle.
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
     SCROLL REVEAL — animate sections into view
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
    // Seasonal variant date ranges for neon-noir
    var variants = [
      {
        name: 'Midnight New Year',
        // 12-28 to 01-03 (MM-DD format, checked month-first)
        from: [12, 28],
        to: [1, 3],
        motif: 'A seasonal variant is now live — the case has changed color for the occasion.',
      },
      {
        name: 'Blood Moon October',
        from: [10, 1],
        to: [10, 31],
        motif: 'A seasonal variant is now live — the case has changed color for the occasion.',
      },
      {
        name: "Valentine's Neon",
        from: [2, 10],
        to: [2, 14],
        motif: 'A seasonal variant is now live — the case has changed color for the occasion.',
      },
    ];

    function inRange(now, from, to) {
      var m = now.getMonth() + 1;
      var d = now.getDate();
      var fm = from[0],
        fd = from[1],
        tm = to[0],
        td = to[1];
      if (fm === tm) {
        return m === fm && d >= fd && d <= td;
      }
      if (fm < tm) {
        return (m === fm && d >= fd) || (m === tm && d <= td);
      }
      // wraps year (e.g. Dec 28 → Jan 3)
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
        ' <a href="/neon-noir/about.html#faq">Learn more</a></div>';

      if (slot) {
        slot.innerHTML = html;
        slot.hidden = false;
      }
      if (slot2) {
        slot2.innerHTML = html;
        slot2.hidden = false;
      }

      // Apply Blood Moon October overrides if active
      if (active.name === 'Blood Moon October') {
        document.documentElement.style.setProperty('--color-primary', '#E5154E');
        document.documentElement.style.setProperty('--color-secondary', '#FF6B00');
        document.documentElement.style.setProperty('--color-surface', '#170810');
      }
    }
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     INTENSITY TOGGLE — "Case closed" mode
  ───────────────────────────────────────────────────────────────────────── */

  var toggleBtn = document.querySelector('.intensity-toggle');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (toggleBtn) {
    var stored = localStorage.getItem('phlix-intensity');
    var isActive = stored === 'calm';

    function applyMode(calm) {
      document.documentElement.classList.toggle('intensity-calm', calm);
      toggleBtn.classList.toggle('is-active', calm);
      toggleBtn.setAttribute('aria-pressed', String(calm));

      // Reduce neon glow intensity
      if (calm) {
        document.documentElement.style.setProperty(
          '--shadow-neon-cyan',
          '0 0 4px rgba(0,229,255,0.2)',
        );
        document.documentElement.style.setProperty(
          '--shadow-neon-amber',
          '0 0 4px rgba(245,166,35,0.2)',
        );
        document.documentElement.style.setProperty(
          '--shadow-neon-magenta',
          '0 0 4px rgba(255,45,120,0.2)',
        );
      } else {
        document.documentElement.style.setProperty(
          '--shadow-neon-cyan',
          '0 0 12px rgba(0,229,255,0.5), 0 0 30px rgba(0,229,255,0.2)',
        );
        document.documentElement.style.setProperty(
          '--shadow-neon-amber',
          '0 0 12px rgba(245,166,35,0.6), 0 0 30px rgba(245,166,35,0.2)',
        );
        document.documentElement.style.setProperty(
          '--shadow-neon-magenta',
          '0 0 12px rgba(255,45,120,0.5), 0 0 30px rgba(255,45,120,0.2)',
        );
      }
    }

    applyMode(isActive);

    toggleBtn.addEventListener('click', function () {
      var nowActive = !toggleBtn.classList.contains('is-active');
      localStorage.setItem('phlix-intensity', nowActive ? 'calm' : 'full');
      applyMode(nowActive);
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     MASCOT: LUX
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var PAGE_WHITELIST = ['index.html', 'features.html', 'download.html', 'about.html'];
    var path = window.location.pathname.split('/').pop() || 'index.html';

    if (PAGE_WHITELIST.indexOf(path) === -1) return;

    var mascot = document.getElementById('mascot-lux');
    if (!mascot) return;

    var tip = mascot.querySelector('.mascot-tip');
    var closeBtn = mascot.querySelector('.mascot-close');
    var dismissedKey = 'phlix-lux-dismissed';

    if (localStorage.getItem(dismissedKey) === '1') {
      mascot.classList.add('is-hidden');
      return;
    }

    // Page-specific tips
    var pageTip = {
      'index.html': 'The case is yours now. Press play and see what you find.',
      'features.html': 'Eight tools. One mission. Know them, and you know the archive.',
      'download.html': "One line and you're running the show. I'll be here when you get back.",
      'about.html': "Questions? I've seen this case a hundred times. Ask away.",
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
      showTip(pageTip[path] || 'The case is yours now.');
    }, 3000);

    // Dismiss
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        localStorage.setItem(dismissedKey, '1');
        mascot.classList.add('is-hidden');
        clearTimeout(tipTimer);
      });
    }

    // Click interactions (easter egg tier 1)
    var clickCount = 0;
    mascot.querySelector('.mascot-body').addEventListener('click', function () {
      clickCount++;
      clearTimeout(tipTimer);
      hideTip();
      if (clickCount >= 3) {
        showTip("I see you're paying attention.");
        clickCount = 0;
      } else {
        showTip('Lux tips his fedora slowly and nods.');
        setTimeout(hideTip, 3000);
      }
    });

    // Hover-hold easter egg
    var holdTimer;
    mascot.querySelector('.mascot-body').addEventListener('mouseenter', function () {
      holdTimer = setTimeout(function () {
        showTip('Patience. Good trait.');
      }, 3000);
    });
    mascot.querySelector('.mascot-body').addEventListener('mouseleave', function () {
      clearTimeout(holdTimer);
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     EASTER EGG 1: Logo clicks — Lux tips hat + neon pulse + "NOIR"
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

        // Neon pulse
        var pulse = document.createElement('div');
        pulse.className = 'logo-glow-pulse';
        pulse.setAttribute('aria-hidden', 'true');
        document.body.appendChild(pulse);

        // "NOIR" subtext appears briefly
        var noir = document.createElement('div');
        noir.textContent = 'NOIR';
        noir.style.cssText = [
          'position:fixed',
          'top:50%',
          'left:50%',
          'transform:translate(-50%,-50%)',
          'font-family:"IBM Plex Mono",monospace',
          'font-size: "1.5rem"',
          'letter-spacing:"0.4em"',
          'color:"#00E5FF"',
          'textShadow:"0 0 20px rgba(0,229,255,0.8)"',
          'pointerEvents:none',
          'z-index:9999',
          'opacity:0',
          'transition:"opacity 0.3s"',
        ].join(';');
        document.body.appendChild(noir);

        requestAnimationFrame(function () {
          noir.style.opacity = '1';
          setTimeout(function () {
            noir.style.opacity = '0';
            setTimeout(function () {
              noir.remove();
            }, 300);
          }, 1800);
        });

        setTimeout(function () {
          pulse.remove();
        }, 3000);
      }
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     EASTER EGG 2: Typed word — "shadow" triggers venetian-blind sweep
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    var typed = [];
    var targetWord = 'shadow';
    var sweep = null;
    var isInput = false;

    // Check if focus is in an input
    document.addEventListener('focusin', function (e) {
      isInput = ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE'].indexOf(e.target.tagName) !== -1;
    });
    document.addEventListener('focusout', function (e) {
      setTimeout(function () {
        isInput = ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE'].indexOf(e.target.tagName) !== -1;
      }, 10);
    });

    // Create sweep element once
    sweep = document.createElement('div');
    sweep.className = 'shadow-sweep';
    sweep.setAttribute('aria-hidden', 'true');
    document.body.appendChild(sweep);

    document.addEventListener('keydown', function (e) {
      if (isInput) return;

      // Esc clears typed
      if (e.key === 'Escape') {
        typed = [];
        sweep.classList.remove('is-active');
        return;
      }

      if (e.key.length === 1) {
        typed.push(e.key.toLowerCase());
        if (typed.length > targetWord.length) typed.shift();

        if (typed.join('') === targetWord) {
          typed = [];
          sweep.classList.remove('is-active');
          // Force reflow
          void sweep.offsetWidth;
          sweep.classList.add('is-active');
          setTimeout(function () {
            sweep.classList.remove('is-active');
          }, 1600);

          // Lux glances up if present
          var tip = document.querySelector('#mascot-lux .mascot-tip');
          if (tip) {
            tip.textContent = "You've got the eye for details.";
            tip.classList.add('is-visible');
            setTimeout(function () {
              tip.classList.remove('is-visible');
            }, 3000);
          }
        }
      }
    });
  })();

  /* ─────────────────────────────────────────────────────────────────────────
     SCROLL EXPERIENCE — venetian-blind section transitions
     (handled via CSS + intersection observer for class toggling)
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    if (prefersReducedMotion) return;

    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    // Add venetian-blind clip to each section as it enters
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
