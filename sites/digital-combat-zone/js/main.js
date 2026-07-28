/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 *
 * Digital Combat Zone — main.js
 * Nav, scroll reveal, FAQ, install copy, intensity toggle.
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
     INTENSITY TOGGLE — "Arena calm" mode
  ───────────────────────────────────────────────────────────────────────── */

  var toggleBtn = document.querySelector('.intensity-toggle');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (toggleBtn) {
    var stored = localStorage.getItem('phlix-combat-intensity');
    var isActive = stored === 'calm';

    function applyMode(calm) {
      document.documentElement.classList.toggle('intensity-calm', calm);
      toggleBtn.classList.toggle('is-active', calm);
      toggleBtn.setAttribute('aria-pressed', String(calm));

      // Reduce glow intensity
      if (calm) {
        document.documentElement.style.setProperty(
          '--shadow-glow-red',
          '0 0 8px rgba(255,62,62,0.2)',
        );
        document.documentElement.style.setProperty(
          '--shadow-glow-cyan',
          '0 0 8px rgba(0,217,255,0.2)',
        );
        document.documentElement.style.setProperty(
          '--shadow-glow-fire',
          '0 0 8px rgba(255,107,53,0.2)',
        );
      } else {
        document.documentElement.style.setProperty(
          '--shadow-glow-red',
          '0 0 20px rgba(255,62,62,0.5)',
        );
        document.documentElement.style.setProperty(
          '--shadow-glow-cyan',
          '0 0 20px rgba(0,217,255,0.5)',
        );
        document.documentElement.style.setProperty(
          '--shadow-glow-fire',
          '0 0 30px rgba(255,107,53,0.5)',
        );
      }
    }

    applyMode(isActive);

    toggleBtn.addEventListener('click', function () {
      var nowActive = !toggleBtn.classList.contains('is-active');
      localStorage.setItem('phlix-combat-intensity', nowActive ? 'calm' : 'full');
      applyMode(nowActive);
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     SCROLL EXPERIENCE — speed lines on scroll
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
     INTERACTION EFFECTS — particle burst on click
  ───────────────────────────────────────────────────────────────────────── */

  (function () {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.btn-primary, .btn-fab').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // Create impact ring
        var ring = document.createElement('span');
        ring.style.cssText = [
          'position: absolute',
          'width: 20px',
          'height: 20px',
          'border-radius: 50%',
          'background: rgba(255,62,62,0.4)',
          'pointer-events: none',
          'z-index: 9999',
          'animation: impact-ring 0.4s ease-out forwards',
        ].join(';');

        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - 10;
        var y = e.clientY - rect.top - 10;
        ring.style.left = x + 'px';
        ring.style.top = y + 'px';

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ring);

        setTimeout(function () {
          ring.remove();
        }, 400);
      });
    });

    // Add impact ring keyframes
    var style = document.createElement('style');
    style.textContent = [
      '@keyframes impact-ring {',
      '  0% { transform: scale(0); opacity: 1; }',
      '  100% { transform: scale(4); opacity: 0; }',
      '}',
    ].join('');
    document.head.appendChild(style);
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
