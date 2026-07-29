/**
 * ============================================================================
 *  MAIN.JS — Egyptian Dusk
 *  Nav toggle, reduced motion, scroll reveals, mascot Kheper, easter eggs,
 *  seasonal activation, visitor paths.
 *  @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     0. Reduced motion — also kills transitions (not just animations) §19.2
     Attach a change listener so a mid-session toggle is honoured.
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  applyReducedMotion();
  prefersReducedMotion.addEventListener('change', applyReducedMotion);

  /* --------------------------------------------------------------------------
     1. Mobile nav toggle
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    function openNav() {
      navMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close navigation');
    }

    function closeNav() {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Toggle navigation');
      navToggle.focus();
    }

    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('is-open')) {
          closeNav();
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Scroll reveals — IntersectionObserver fade-ins
     -------------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && !prefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
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
  } else {
    // Show all immediately if reduced motion or no reveals
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* --------------------------------------------------------------------------
     3. Scroll-chapter wipe effect — §19.12 grid + section-wipe
     -------------------------------------------------------------------------- */
  const wipeSections = document.querySelectorAll('.section-wipe');
  if (wipeSections.length && !prefersReducedMotion.matches) {
    const wipeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('wiping');
            setTimeout(function () {
              entry.target.classList.remove('wiping');
            }, 800);
            wipeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    wipeSections.forEach(function (el) {
      wipeObserver.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     4. Seasonal activation — live-js date gate
     Variants: Opet Festival (07-01..07-15), Night of Osiris (10-28..11-04),
               Winter Solstice Ra (12-19..12-26)
     -------------------------------------------------------------------------- */
  (function seasonalActivation() {
    const now = new Date();
    const monthDay = ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
    const seasonalBanner = document.querySelector('.seasonal-banner');

    const variants = [
      { key: 'seasonal-opet', start: '07-01', end: '07-15' },
      { key: 'seasonal-osiris', start: '10-28', end: '11-04' },
      { key: 'seasonal-solstice', start: '12-19', end: '12-26' },
    ];

    for (const v of variants) {
      if (monthDay >= v.start && monthDay <= v.end) {
        document.documentElement.classList.add(v.key);
        if (seasonalBanner) {
          seasonalBanner.classList.add('is-active');
        }
        break;
      }
    }
  })();

  /* --------------------------------------------------------------------------
     5. Mascot — Kheper the scarab
     Placement: bottom-right; in-flow on mobile (<768px).
     Idle: rolling sun-disk, disabled under reduced-motion.
     Tips: contextual bubble near hero, features grid, specific feature sections.
     easter_interactions: click:7 wings shimmer, hover-hold:3s wings fully spread.
     Dismiss: localStorage-persisted.
     §19.11: must not cover primary CTA at 320px.
     -------------------------------------------------------------------------- */
  const mascot = document.querySelector('.mascot');
  const mascotBody = mascot ? mascot.querySelector('.mascot__body') : null;
  const mascotTip = mascot ? mascot.querySelector('.mascot__tip') : null;
  const mascotDismiss = mascot ? mascot.querySelector('.mascot__dismiss') : null;

  if (mascot) {
    const STORAGE_KEY = 'kheper-dismissed';
    const DISMISSED = localStorage.getItem(STORAGE_KEY) === 'true';

    // Check if mobile
    const isMobile = window.innerWidth < 768;

    // If dismissed, hide permanently
    if (DISMISSED && !isMobile) {
      mascot.style.display = 'none';
    }

    // Tip content mapped by section
    const tips = [
      { where: 'home #hero', say: 'Enter the eternal kingdom — your archive awaits.' },
      {
        where: '.features-grid',
        say: "Each feature is a sacred scroll in your library's cartouche.",
      },
      { where: '#syncplay', say: 'Synchronized passage — every frame eternal across all rooms.' },
      { where: '#download', say: 'One inscription, and you become the keeper of your archive.' },
    ];

    let currentTipIndex = 0;
    let idleTimeout = null;
    let idleInterval = null;
    let idleAngle = 0;
    let dismissed = DISMISSED;

    // Show a tip
    function showTip(index) {
      if (!mascotTip || dismissed) return;
      const tip = tips[index % tips.length];
      mascotTip.textContent = tip.say;
      mascotTip.classList.add('is-visible');
    }

    function hideTip() {
      if (mascotTip) mascotTip.classList.remove('is-visible');
    }

    // Idle animation — slow roll of sun-disk (8s per roll)
    function startIdle() {
      if (prefersReducedMotion.matches || isMobile) return;
      if (idleInterval) return;
      idleInterval = setInterval(function () {
        idleAngle = (idleAngle + 45) % 360;
        if (mascotBody) {
          mascotBody.style.transform = 'rotate(' + idleAngle + 'deg)';
        }
      }, 2000); // 45deg every 2s → 360deg in 16s
    }

    function stopIdle() {
      if (idleInterval) {
        clearInterval(idleInterval);
        idleInterval = null;
      }
      idleAngle = 0;
      if (mascotBody) mascotBody.style.transform = 'rotate(0deg)';
    }

    // Show next tip on hover/focus of relevant section
    tips.forEach(function (tip) {
      const target = document.querySelector(tip.where);
      if (!target) return;
      const obs = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting && !dismissed) {
            showTip(tips.indexOf(tip));
            obs.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      obs.observe(target);
    });

    // Start idle on mouseenter / focus
    if (mascot) {
      mascot.addEventListener('mouseenter', function () {
        if (!dismissed && !prefersReducedMotion.matches) {
          startIdle();
          clearTimeout(idleTimeout);
        }
      });

      mascot.addEventListener('mouseleave', function () {
        stopIdle();
        hideTip();
      });

      // Touch: show tip on tap
      mascot.addEventListener('click', function () {
        if (dismissed) return;
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        showTip(currentTipIndex);
      });
    }

    // Easter interaction 1: click:7 → wings shimmer gold and lapis
    if (mascotBody) {
      let clickCount = 0;
      let clickTimer = null;

      mascotBody.addEventListener('click', function () {
        if (dismissed) return;
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () {
          clickCount = 0;
        }, 2000);

        if (clickCount >= 7) {
          clickCount = 0;
          // Wings shimmer effect — brief gold flash
          mascotBody.style.transition = 'filter 300ms ease';
          mascotBody.style.filter =
            'drop-shadow(0 0 20px rgba(212,165,32,0.9)) drop-shadow(0 0 40px rgba(26,72,144,0.7))';
          setTimeout(function () {
            mascotBody.style.filter = '';
          }, 800);
        }
      });
    }

    // Easter interaction 2: hover-hold:3s → wings fully spread
    if (mascotBody) {
      let holdTimer = null;

      mascotBody.addEventListener('mouseenter', function () {
        if (dismissed || prefersReducedMotion.matches) return;
        holdTimer = setTimeout(function () {
          // Wings fully spread — scale + glow
          mascotBody.style.transition = 'transform 400ms ease, filter 400ms ease';
          mascotBody.style.transform = 'scale(1.2)';
          mascotBody.style.filter = 'drop-shadow(0 0 24px rgba(212,165,32,0.7))';
        }, 3000);
      });

      mascotBody.addEventListener('mouseleave', function () {
        clearTimeout(holdTimer);
        mascotBody.style.transition = '';
        mascotBody.style.transform = '';
        mascotBody.style.filter = '';
      });
    }

    // Dismiss — "Kheper, return to the Duat"
    if (mascotDismiss) {
      mascotDismiss.addEventListener('click', function () {
        dismissed = true;
        localStorage.setItem(STORAGE_KEY, 'true');
        mascot.style.transition = 'opacity 400ms ease';
        mascot.style.opacity = '0';
        setTimeout(function () {
          mascot.style.display = 'none';
        }, 400);
      });
    }

    // Initial tip after 3s
    if (!dismissed && !isMobile) {
      setTimeout(function () {
        showTip(0);
      }, 3000);
    }
  }

  /* --------------------------------------------------------------------------
     6. Easter eggs

     Egg 1: logo-clicks:7
       Trigger: 7 clicks on logo → Kheper wings shimmer + hieroglyphic glyph floats
       §19.11: must not cover CTA at 320px

     Egg 2: typed-word:cartouche
       Trigger: type "cartouche" anywhere on page (disabled in inputs/textareas)
       Effect: cursor → scarab, nav items glow gold
       Never calls preventDefault. Exit on Esc.
       §19.8: disabled while focus in input/textarea/contenteditable.

     Egg 3: scroll-past-footer
       Trigger: scroll past the footer → tiny Kheper silhouette at bottom
       §19.20: does not remove content.
     -------------------------------------------------------------------------- */

  // --- Egg 1: logo-clicks:7 ---
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    let logoClicks = 0;
    let logoTimer = null;

    logo.addEventListener('click', function () {
      logoClicks++;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(function () {
        logoClicks = 0;
      }, 2000);

      if (logoClicks >= 7) {
        logoClicks = 0;
        // Golden glow + hieroglyphic float-up reward
        logo.classList.add('logo-glow');
        showEasterReward('Ra has witnessed your devotion. The archives are pleased.');
        setTimeout(function () {
          logo.classList.remove('logo-glow');
        }, 3000);
      }
    });
  }

  // --- Egg 2: typed-word:cartouche ---
  (function buildTypedWordEgg() {
    const TARGET = 'cartouche';
    let typed = '';
    let active = false;
    let escBound = false;

    function activate() {
      if (active) return;
      active = true;
      document.body.classList.add('cursor-scarab');
      // Glow nearest nav items
      const navLinks = document.querySelectorAll('.nav-menu__link');
      navLinks.forEach(function (link) {
        if (link.textContent.trim()) {
          link.parentElement.classList.add('nav-item-glow');
        }
      });
      showEasterReward("You have invoked the keeper's sigil. The archive acknowledges you.");
      bindEsc();
    }

    function deactivate() {
      active = false;
      typed = '';
      document.body.classList.remove('cursor-scarab');
      document.querySelectorAll('.nav-item-glow').forEach(function (el) {
        el.classList.remove('nav-item-glow');
      });
    }

    function bindEsc() {
      if (escBound) return;
      escBound = true;
      document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape' && active) {
          deactivate();
          escBound = false;
          document.removeEventListener('keydown', onEsc);
        }
      });
    }

    function isTypingField() {
      return false; // Let the keydown check handle this
    }

    document.addEventListener('keydown', function (e) {
      // §19.8: never preventDefault, never activate in inputs
      const tag = e.target.tagName.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if (isInput) return;

      // Only letters (case-insensitive)
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        if (active) return; // already triggered, don't accumulate more
        typed += e.key.toLowerCase();
        if (typed.length > TARGET.length) {
          typed = typed.slice(-TARGET.length);
        }
        if (typed === TARGET) {
          activate();
        }
      }
    });
  })();

  // --- Egg 3: scroll-past-footer ---
  (function buildScrollPastFooterEgg() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    let triggered = false;

    function showKheperDuat() {
      if (triggered) return;
      triggered = true;

      // Create a small Kheper silhouette beneath footer
      const div = document.createElement('div');
      div.style.cssText =
        'position:fixed;bottom:-60px;left:50%;transform:translateX(-50%);' +
        'z-index:10;opacity:0;transition:opacity 1s ease, bottom 2s ease;' +
        'pointer-events:none;';
      div.innerHTML =
        '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="16" cy="20" rx="8" ry="5" fill="#D4A520" opacity="0.6"/>' +
        '<circle cx="16" cy="16" r="6" fill="#D4A520" opacity="0.5"/>' +
        '<ellipse cx="10" cy="16" rx="4" ry="2" fill="#0D2B5E" opacity="0.5"/>' +
        '<ellipse cx="22" cy="16" rx="4" ry="2" fill="#0D2B5E" opacity="0.5"/>' +
        '<circle cx="16" cy="16" r="3" fill="#D4A520"/>' +
        '</svg>';
      document.body.appendChild(div);

      setTimeout(function () {
        div.style.opacity = '1';
        div.style.bottom = '0px';
      }, 50);

      setTimeout(function () {
        div.style.opacity = '0';
      }, 3000);

      setTimeout(function () {
        div.remove();
      }, 4500);

      showEasterReward('The keeper descends to guard the deeper archives.');
    }

    const footerObs = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting && !triggered) {
          // Footer has scrolled out of view (we scrolled past it)
          showKheperDuat();
          footerObs.disconnect();
        }
      },
      { threshold: 0 },
    );
    footerObs.observe(footer);
  })();

  /* --------------------------------------------------------------------------
     7. Easter reward toast
     -------------------------------------------------------------------------- */
  function showEasterReward(message) {
    // Remove any existing reward
    const existing = document.querySelector('.easter-reward');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'easter-reward';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText =
      'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
      'z-index:200;background:var(--color-surface);border:1px solid var(--color-primary);' +
      'border-radius:var(--radius-md);padding:var(--space-3) var(--space-6);' +
      'font-family:var(--font-body);font-size:0.875rem;color:var(--color-primary);' +
      'box-shadow:var(--shadow-gold);opacity:0;transition:opacity 400ms ease;' +
      'pointer-events:none;white-space:nowrap;';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.style.opacity = '1';
      });
    });

    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () {
        toast.remove();
      }, 500);
    }, 2500);
  }

  /* --------------------------------------------------------------------------
     8. Visitor paths — self-select fork
     -------------------------------------------------------------------------- */
  const pathPills = document.querySelectorAll('.path-pill');
  pathPills.forEach(function (pill) {
    pill.addEventListener('click', function (e) {
      // Track which path is chosen — no need to prevent default, it's a link
      const path = pill.dataset.path;
      if (path) {
        // Could fire analytics, etc.
      }
    });
  });
})();
