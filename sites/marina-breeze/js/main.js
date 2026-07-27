/**
 * main.js — nav toggle, reduced-motion guard, easter eggs, mascot
 * Marina Breeze brand kit — phlix-website/sites/marina-breeze/
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */
(function () {
  'use strict';

  /* ==========================================================================
     1. Mobile nav toggle
     ========================================================================== */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ==========================================================================
     2. Reduced motion guard
     ========================================================================== */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var prefersReducedMotion = motionQuery.matches;

  motionQuery.addEventListener('change', function (e) {
    prefersReducedMotion = e.matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  });

  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduce-motion');
  }

  /* ==========================================================================
     3. Scroll reveals (IntersectionObserver)
     ========================================================================== */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.feature-card, .feature-hero-card, .client-card, .download-card, .faq-item, .ecosystem-item, .proof-card, .path-card',
    );

    if (revealEls.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ==========================================================================
     4. Easter Egg: Logo Click (logo-clicks:3)
     ========================================================================== */
  var logoClickCount = 0;
  var logoEl = document.getElementById('site-logo');
  var mascot = document.getElementById('binnacle');

  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return;
      }
      e.preventDefault();
      logoClickCount++;

      if (logoClickCount >= 3) {
        logoClickCount = 0;
        triggerLogoEasterEgg();
      }
    });
  }

  function triggerLogoEasterEgg() {
    if (mascot) {
      var beacon = mascot.querySelector('.mascot-beacon');
      if (beacon) {
        beacon.style.transition = 'none';
        beacon.style.boxShadow = '0 0 24px 12px rgba(221, 168, 74, 0.9)';
        setTimeout(function () {
          beacon.style.boxShadow = '';
        }, 1500);
      }
      var body = mascot.querySelector('.mascot-body');
      if (body && !prefersReducedMotion) {
        body.style.animation = 'mascot-celebrate 0.6s ease-out';
        setTimeout(function () {
          body.style.animation = '';
        }, 600);
      }
    }

    var msgEl = document.createElement('div');
    msgEl.className = 'easter-msg';
    msgEl.textContent = 'Welcome home, sailor!';
    msgEl.setAttribute('role', 'status');
    msgEl.setAttribute('aria-live', 'polite');
    Object.assign(msgEl.style, {
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--color-surface)',
      border: '1.5px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4) var(--space-8)',
      fontFamily: 'var(--font-ui)',
      fontSize: '1.125rem',
      color: 'var(--color-primary)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity 0.3s ease',
    });
    document.body.appendChild(msgEl);
    requestAnimationFrame(function () {
      msgEl.style.opacity = '1';
    });
    setTimeout(function () {
      msgEl.style.opacity = '0';
      setTimeout(function () {
        msgEl.remove();
      }, 300);
    }, 2000);
  }

  /* ==========================================================================
     5. Easter Egg: Typed Word "anchor"
     ========================================================================== */
  var typedBuffer = '';
  var typedTimeout = null;
  var isTypingInInput = false;

  var inputSelector = 'input, textarea, [contenteditable="true"], [contenteditable=""]';
  document.addEventListener('focusin', function (e) {
    if (e.target.matches(inputSelector)) {
      isTypingInInput = true;
    }
  });
  document.addEventListener('focusout', function (e) {
    if (e.target.matches(inputSelector)) {
      isTypingInInput = false;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (isTypingInInput) {
      return;
    }
    if (e.key === 'Escape') {
      typedBuffer = '';
      clearActiveCursorEffect();
      return;
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typedBuffer += e.key.toLowerCase();
      if (typedBuffer.length > 10) {
        typedBuffer = typedBuffer.slice(-10);
      }
      if (typedBuffer.indexOf('anchor') !== -1) {
        typedBuffer = '';
        triggerAnchorEasterEgg();
      }
    }
  });

  function triggerAnchorEasterEgg() {
    document.body.classList.add('anchor-cursor');
    var msgEl = document.createElement('div');
    msgEl.className = 'easter-msg';
    msgEl.textContent = "You've dropped anchor!";
    msgEl.setAttribute('role', 'status');
    msgEl.setAttribute('aria-live', 'polite');
    Object.assign(msgEl.style, {
      position: 'fixed',
      bottom: '120px',
      right: 'var(--space-6)',
      background: 'var(--color-surface)',
      border: '1.5px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3) var(--space-6)',
      fontFamily: 'var(--font-ui)',
      fontSize: '0.9375rem',
      color: 'var(--color-secondary)',
      boxShadow: 'var(--shadow-md)',
      zIndex: '9998',
      opacity: '0',
      transition: 'opacity 0.3s ease',
    });
    document.body.appendChild(msgEl);
    requestAnimationFrame(function () {
      msgEl.style.opacity = '1';
    });
    setTimeout(function () {
      msgEl.style.opacity = '0';
      setTimeout(function () {
        msgEl.remove();
      }, 300);
    }, 2500);
    setTimeout(function () {
      clearActiveCursorEffect();
    }, 3000);
  }

  function clearActiveCursorEffect() {
    document.body.classList.remove('anchor-cursor');
  }

  /* ==========================================================================
     6. Mascot — Binnacle
     ========================================================================== */
  if (mascot) {
    var tipEl = mascot.querySelector('#mascot-tip') || mascot.querySelector('.mascot-tip');
    var dismissBtn = mascot.querySelector('.mascot-dismiss');
    var mascotDismissed = false;

    function getMascotTip() {
      var path = window.location.pathname;
      if (path.endsWith('index.html') || path === '/' || path.endsWith('/marina-breeze/')) {
        var heroEl = document.querySelector('.hero');
        if (heroEl && isInViewport(heroEl)) {
          return 'Welcome back to the harbor. Ready to set sail?';
        }
        var featuresEl = document.querySelector('.features-overview');
        if (featuresEl && isInViewport(featuresEl)) {
          return 'Psst\u2026 SyncPlay keeps movie night in perfect time across every room in your house.';
        }
      }
      if (path.includes('features.html')) {
        var libraryEl = document.getElementById('library');
        if (libraryEl && isInViewport(libraryEl)) {
          return 'Every film and episode you add just appears on the shelf. No work \u2014 the scanner finds them.';
        }
      }
      if (path.includes('download.html')) {
        return "One line and you're the harbormaster. I'll keep the beacon lit.";
      }
      return null;
    }

    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function showTip(text) {
      if (!tipEl || mascotDismissed) return;
      tipEl.textContent = text;
      tipEl.classList.add('is-visible');
    }

    function hideTip() {
      if (!tipEl) return;
      tipEl.classList.remove('is-visible');
    }

    var tipInterval = setInterval(function () {
      if (mascotDismissed) {
        clearInterval(tipInterval);
        return;
      }
      var tipText = getMascotTip();
      if (tipText) {
        showTip(tipText);
      } else {
        hideTip();
      }
    }, 2000);

    if (dismissBtn) {
      dismissBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        mascot.classList.add('is-dismissed');
        mascotDismissed = true;
        clearInterval(tipInterval);
        try {
          sessionStorage.setItem('binnacle-dismissed', '1');
        } catch (err) {}
      });
    }

    try {
      if (sessionStorage.getItem('binnacle-dismissed') === '1') {
        mascot.classList.add('is-dismissed');
        mascotDismissed = true;
        clearInterval(tipInterval);
      }
    } catch (err) {}

    mascot.addEventListener('click', function (e) {
      if (e.target === dismissBtn || dismissBtn.contains(e.target)) return;
      logoClickCount++;
      if (logoClickCount >= 3) {
        logoClickCount = 0;
        triggerMascotCelebration();
      }
    });
  }

  function triggerMascotCelebration() {
    if (!mascot || prefersReducedMotion) return;
    var beacon = mascot.querySelector('.mascot-beacon');
    if (beacon) {
      beacon.style.transition = 'box-shadow 0.3s ease, opacity 0.3s ease';
      beacon.style.boxShadow = '0 0 28px 14px rgba(221, 168, 74, 0.9)';
      setTimeout(function () {
        beacon.style.boxShadow = '';
      }, 800);
    }
  }

  /* ==========================================================================
     7. Lighthouse-beam ambient animation
     ========================================================================== */
  if (!prefersReducedMotion) {
    var heroEl = document.querySelector('.hero');
    if (heroEl) {
      heroEl.classList.add('lighthouse-hero');
    }
  }
})();
