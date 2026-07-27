/**
 * main.js — Afrofuturism Brand Kit Site
 * Nav toggle, Orisha mascot, easter eggs, intensity toggle, seasonal activation
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Reduced motion helper ──────────────────────────────────────────────── */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── Reward stubs (no-op handlers for easter-egg triggers) ─────────────── */
  // Kept as noop stubs — called by easter-egg handlers defined elsewhere
  const _showReward = () => {};
  const _hideReward = () => {};

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open', !expanded);
      if (!expanded) {
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  /* ── Active nav link on scroll ──────────────────────────────────────────── */
  var sections = document.querySelectorAll('main section[id]');
  if (sections.length > 0) {
    var navLinks = document.querySelectorAll('.nav-link');
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('is-active');
              if (
                link.getAttribute('href') === '#' + id ||
                link.getAttribute('href') === location.pathname + '#' + id
              ) {
                link.classList.add('is-active');
              }
            });
          }
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ── Intensity toggle ───────────────────────────────────────────────────── */
  var intensityToggle = document.getElementById('intensity-toggle');
  if (intensityToggle) {
    // Read saved preference
    var savedIntensity = localStorage.getItem('phlix-intensity');
    if (savedIntensity === 'dim') {
      document.documentElement.setAttribute('data-intensity', 'dim');
      intensityToggle.setAttribute('aria-pressed', 'true');
    }

    // Listen for changes (not just load)
    intensityToggle.addEventListener('click', function () {
      var isDim = intensityToggle.getAttribute('aria-pressed') === 'true';
      intensityToggle.setAttribute('aria-pressed', String(!isDim));
      if (!isDim) {
        document.documentElement.setAttribute('data-intensity', 'dim');
        localStorage.setItem('phlix-intensity', 'dim');
      } else {
        document.documentElement.removeAttribute('data-intensity');
        localStorage.removeItem('phlix-intensity');
      }
    });

    // Also listen to system preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
      if (!e.matches && savedIntensity !== 'dim') {
        document.documentElement.removeAttribute('data-intensity');
      }
    });
  }

  /* ── Seasonal activation (live-js date gate) ───────────────────────────── */
  // Runs for December 28–January 3 (Cosmic New Year), June 16–20 (Juneteenth),
  // December 26–January 1 (Kwanzaa Season).
  var seasonSlot = document.getElementById('season-slot');
  if (seasonSlot) {
    var now = new Date();
    var month = now.getMonth(); // 0-indexed
    var day = now.getDate();
    var banner = null;

    if (month === 11 && day >= 28) {
      banner = 'The cosmos awakens anew.';
    } else if (month === 0 && day <= 3) {
      banner = 'The cosmos awakens anew.';
    } else if (month === 5 && day >= 16 && day <= 20) {
      banner = 'Chains to stars — freedom radiates outward.';
    } else if (month === 11 && day >= 26) {
      banner = 'Seven principles, seven flames, one collective hearth.';
    } else if (month === 10 && day >= 26) {
      // Kwanzaa season starts ~Dec 26
      banner = 'Seven principles, seven flames, one collective hearth.';
    }

    if (banner) {
      seasonSlot.removeAttribute('hidden');
      seasonSlot.textContent = banner;
      seasonSlot.style.cssText =
        'display:block;padding:12px 24px;background:var(--color-surface);' +
        'border-bottom:2px solid var(--color-primary);text-align:center;' +
        'font-family:var(--font-ui);font-size:0.875rem;color:var(--color-text);' +
        'letter-spacing:0.02em;';
    }
  }

  /* ── Scroll reveal (staggered section entrances) ──────────────────────── */
  if (!prefersReducedMotion()) {
    var revealEls = document.querySelectorAll(
      '.feature-hero-card, .feature-card, .portal-card, .kente-proclamation, ' +
        '.walkthrough-step, .feature-altar, .hub-option, .ecosystem-card',
    );
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry, _i) {
            if (entry.isIntersecting) {
              // Stagger with dataset delay or 0
              var delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
              setTimeout(function () {
                entry.target.classList.add('is-revealed');
              }, delay);
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );
      revealEls.forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition =
          'opacity 0.4s ease-out ' +
          (i % 5) * 80 +
          'ms, transform 0.4s ease-out ' +
          (i % 5) * 80 +
          'ms';
        revealObserver.observe(el);
      });

      // Add CSS for revealed state
      var revealCSS = document.createElement('style');
      revealCSS.textContent = '.is-revealed{opacity:1!important;transform:none!important;}';
      document.head.appendChild(revealCSS);
    }
  }

  /* ── Orisha mascot ──────────────────────────────────────────────────────── */
  var orishaCompanion = document.getElementById('orisha-companion');
  var orishaClose = document.getElementById('orisha-close');
  var orishaTip = document.getElementById('orisha-tip');

  // Pages Orisha appears on: home, download, features, hub
  var orishaPages = ['/', '/index.html', '/download.html', '/features.html', '/hub.html'];
  var _currentPath = location.pathname.replace(/[^/]*$/, '') || '/';
  var showOrisha = orishaPages.some(function (p) {
    return location.pathname === p || location.pathname.endsWith(p);
  });

  if (orishaCompanion && showOrisha) {
    // Check localStorage
    var orishaDismissed = localStorage.getItem('phlix-orisha-dismissed');

    if (!orishaDismissed) {
      // Position: fixed on desktop, in-flow on mobile
      if (window.innerWidth >= 768) {
        orishaCompanion.style.cssText = 'position:fixed;bottom:32px;right:32px;z-index:200;';
      } else {
        orishaCompanion.style.cssText = 'position:relative;bottom:auto;right:auto;z-index:auto;';
        orishaCompanion.style.margin = '32px auto 0';
        orishaCompanion.style.display = 'flex';
        orishaCompanion.style.flexDirection = 'column';
        orishaCompanion.style.alignItems = 'center';
      }
      orishaCompanion.removeAttribute('hidden');

      // Section tips map
      var tips = [
        { where: 'home:#cosmic-rise', say: 'Welcome, starkeeper. Your cosmos awaits.' },
        {
          where: 'home:.stellar-features',
          say: 'These constellations—SyncPlay binds your collective; Library guards your heritage.',
        },
        {
          where: 'features:#syncplay',
          say: 'Resonance across any distance. One frame. One heart. All of you.',
        },
        {
          where: 'download:#server',
          say: 'Speak the first chant. The cosmos responds. Then choose your portal.',
        },
        {
          where: 'hub:#bridge-home',
          say: 'The bridge home—access your starfield from anywhere, always.',
        },
      ];

      // Show tip based on current section
      var currentSection = document.querySelector('section[id]');
      if (currentSection) {
        var sectionId = currentSection.getAttribute('id');
        var tip = tips.find(function (t) {
          return t.where.includes(sectionId);
        });
        if (tip && orishaTip) {
          orishaTip.textContent = tip.say;
        }
      }
    }

    // Dismiss
    if (orishaClose) {
      orishaClose.addEventListener('click', function () {
        orishaCompanion.setAttribute('hidden', '');
        localStorage.setItem('phlix-orisha-dismissed', 'true');
      });
    }
  }

  /* ── Easter Egg 1: Logo click counter (7 clicks → Orisha dispersal) ─────── */
  var logoClickCount = 0;
  var logoTimer = null;
  var navLogos = document.querySelectorAll('.nav-logo');

  navLogos.forEach(function (logo) {
    logo.addEventListener('click', function (e) {
      // Only count direct clicks, not navigation
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      logoClickCount++;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(function () {
        logoClickCount = 0;
      }, 2000); // reset after 2s quiet

      if (logoClickCount >= 7) {
        logoClickCount = 0;
        triggerOrishaDispersal();
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  function triggerOrishaDispersal() {
    if (!orishaCompanion) return;
    // Show Orisha if hidden
    orishaCompanion.removeAttribute('hidden');
    var orishaFig = orishaCompanion.querySelector('.orisha-figure');
    if (orishaFig) {
      orishaFig.style.transition = 'transform 1.5s ease-in-out, opacity 0.8s ease-in-out';
      orishaFig.style.transform = 'scale(0.5) rotate(360deg)';
      orishaFig.style.opacity = '0';
      setTimeout(function () {
        orishaFig.style.transform = '';
        orishaFig.style.opacity = '';
      }, 2500);
    }
    if (orishaTip) {
      orishaTip.textContent = 'The ancestor approves. You have discovered cosmic resonance.';
    }
  }

  /* ── Easter Egg 2: Typed word "heritage" ────────────────────────────────── */
  var typedBuffer = '';
  var typedTimer = null;
  var isTypingInInput = false;

  // Detect focus in input/textarea
  document.addEventListener('focusin', function (e) {
    if (e.target.matches('input, textarea, [contenteditable="true"]')) {
      isTypingInInput = true;
    }
  });
  document.addEventListener('focusout', function (e) {
    if (e.target.matches('input, textarea, [contenteditable="true"]')) {
      isTypingInInput = false;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (isTypingInInput) return; // §19.8: disabled in inputs
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape') {
      // Clear any active glow
      typedBuffer = '';
      document.body.style.backgroundImage = '';
      document.body.style.transition = '';
      return;
    }
    if (e.key.length === 1) {
      typedBuffer += e.key.toLowerCase();
      if (typedBuffer.length > 10) typedBuffer = typedBuffer.slice(-10);
      clearTimeout(typedTimer);
      typedTimer = setTimeout(function () {
        typedBuffer = '';
      }, 1500);

      if (typedBuffer.includes('heritage')) {
        triggerHeritageGlow();
        typedBuffer = '';
      }
    }
  });

  function triggerHeritageGlow() {
    // Ancestral Glow radial bloom from center
    document.body.style.transition = 'background 0.5s ease-out';
    document.body.style.backgroundImage =
      'radial-gradient(ellipse at center, rgba(240,184,0,0.18) 0%, rgba(8,5,16,0) 60%)';
    // Cursor becomes star (CSS only approximation)
    document.body.style.cursor =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpolygon points='12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26' fill='%23F0B800'/%3E%3C/svg%3E\") 10 10, auto";
    setTimeout(function () {
      document.body.style.backgroundImage = '';
      document.body.style.cursor = '';
      document.body.style.transition = '';
    }, 2500);
    // Tip message
    if (orishaTip) {
      orishaTip.textContent = 'Heritage is the boldest science fiction.';
    }
  }

  /* ── Easter Egg 3: Scroll past footer ──────────────────────────────────── */
  var footer = document.querySelector('.site-footer');
  var scrolledPastFooter = false;

  if (footer) {
    var footerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting && !scrolledPastFooter) {
            scrolledPastFooter = true;
            triggerFooterSprinkle();
          }
        });
      },
      { threshold: 0 },
    );
    footerObserver.observe(footer);
  }

  function triggerFooterSprinkle() {
    if (!orishaCompanion) return;
    orishaCompanion.removeAttribute('hidden');
    // Create particle spray
    var orishaFig = orishaCompanion.querySelector('.orisha-figure');
    if (orishaFig) {
      for (var i = 0; i < 8; i++) {
        var particle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        particle.setAttribute('viewBox', '0 0 20 20');
        particle.setAttribute('width', '16');
        particle.setAttribute('height', '16');
        particle.style.cssText =
          'position:fixed;bottom:200px;right:40px;opacity:0;pointer-events:none;' +
          'z-index:199;animation:triangle-fly ' +
          (1.5 + i * 0.15) +
          's ease-out forwards;' +
          'animation-delay:' +
          i * 0.1 +
          's;';
        particle.innerHTML = '<polygon points="10,2 18,18 2,18" fill="#F0B800" opacity="0.7"/>';
        document.body.appendChild(particle);
        setTimeout(
          function (p) {
            p.remove();
          },
          4000,
          particle,
        );
      }
    }
    // Keyframes for particles
    if (!document.getElementById('particle-css')) {
      var pCSS = document.createElement('style');
      pCSS.id = 'particle-css';
      pCSS.textContent =
        '@keyframes triangle-fly{' +
        '0%{transform:translate(0,0) rotate(0deg);opacity:0.9;}' +
        '100%{transform:translate(' +
        (Math.random() > 0.5 ? '' : '-') +
        (60 + Math.random() * 80) +
        'px,-' +
        (80 + Math.random() * 120) +
        'px) rotate(360deg);opacity:0;}' +
        '}';
      document.head.appendChild(pCSS);
    }
    if (orishaTip) {
      orishaTip.textContent = 'Even the cosmic ancestor celebrates reaching the end.';
    }
  }

  /* ── Mascot hover-hold (3s) → Orisha bloom + 360° rotation ─────────────── */
  if (orishaCompanion) {
    var hoverTimer = null;
    orishaCompanion.addEventListener('mouseenter', function () {
      hoverTimer = setTimeout(function () {
        triggerOrishaBloom();
      }, 3000);
    });
    orishaCompanion.addEventListener('mouseleave', function () {
      clearTimeout(hoverTimer);
    });
  }

  function triggerOrishaBloom() {
    var orishaFig = orishaCompanion.querySelector('.orisha-figure');
    if (!orishaFig) return;
    // Golden glow burst + 360 rotation
    orishaCompanion.style.boxShadow = '0 0 30px rgba(240,184,0,0.6), 0 0 60px rgba(240,184,0,0.3)';
    orishaFig.style.transition = 'transform 1.2s cubic-bezier(0.4,0,0.2,1)';
    orishaFig.style.transform = 'rotate(360deg) scale(1.1)';
    setTimeout(function () {
      orishaCompanion.style.boxShadow = '';
      orishaFig.style.transform = '';
      orishaFig.style.transition = 'transform 1.2s cubic-bezier(0.4,0,0.2,1)';
    }, 2000);
  }

  /* ── Scroll: Orisha appears on scroll-past-footer ───────────────────────── */
  // (handled in footerObserver above)

  /* ── Scroll reveal for home sections ────────────────────────────────────── */
  if (!prefersReducedMotion()) {
    var homeSections = document.querySelectorAll(
      '#cosmic-rise, #stellar-features, #ancestral-truth, #proof-of-cosmos, #gateway-call',
    );
    homeSections.forEach(function (section, i) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(24px)';
      section.style.transition =
        'opacity 0.5s ease-out ' +
        (i * 80 + 200) +
        'ms, transform 0.5s ease-out ' +
        (i * 80 + 200) +
        'ms';
      var hsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'none';
              hsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      hsObserver.observe(section);
    });
  }
})();
