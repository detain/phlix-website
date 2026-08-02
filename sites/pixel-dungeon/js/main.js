/**
 * ============================================================================
 *  MAIN.JS — Pixel Dungeon
 *  Easter eggs, mascot companion (Blip), intensity toggle, FAQ accordion,
 *  nav mobile toggle, visitor paths, reduced-motion listener.
 *  @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     0. REDUCED MOTION — re-read on change (§19.20)
     ----------------------------------------------------------------------- */
  let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function onMotionChange() {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.body.classList.toggle('intensity-reduced', reduceMotion.matches);
  }
  reduceMotion.addEventListener('change', onMotionChange);
  onMotionChange();

  /* -----------------------------------------------------------------------
     1. INTENSITY TOGGLE
     ----------------------------------------------------------------------- */
  const intensityToggle = document.getElementById('intensity-toggle');
  if (intensityToggle) {
    // Restore preference
    if (localStorage.getItem('pixel-dungeon-calm') === 'true' || reduceMotion.matches) {
      intensityToggle.checked = true;
      document.body.classList.add('intensity-reduced');
    }

    intensityToggle.addEventListener('change', function () {
      const calm = this.checked;
      document.body.classList.toggle('intensity-reduced', calm);
      try {
        localStorage.setItem('pixel-dungeon-calm', calm ? 'true' : 'false');
      } catch (e) {
        /* storage blocked */
      }
    });
  }

  /* -----------------------------------------------------------------------
     2. MOBILE NAV TOGGLE
     ----------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open', !expanded);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  /* -----------------------------------------------------------------------
     3. ACTIVE NAV LINK
     ----------------------------------------------------------------------- */
  const currentPage = document.body.dataset.page || '';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (
      (currentPage === 'index' && (href === './' || href === 'index.html')) ||
      (currentPage !== 'index' && href && href.includes(currentPage + '.html'))
    ) {
      link.setAttribute('aria-current', 'page');
      link.dataset.active = 'true';
    }
  });

  /* -----------------------------------------------------------------------
     4. FAQ ACCORDION
     ----------------------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (f) {
        f.classList.remove('open');
      });
      // Toggle this one
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* -----------------------------------------------------------------------
     5. EASTER EGG 1 — logo-clicks:5 → Blip victory + coin shower
     ----------------------------------------------------------------------- */
  let logoClickCount = 0;
  let logoClickTimer = null;
  const siteLogo = document.querySelector('.nav-logo, .site-logo, .logo');
  if (siteLogo) {
    siteLogo.addEventListener('click', function (e) {
      // Don't count if focus was in an input
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA' ||
          document.activeElement.contentEditable === 'true')
      ) {
        return;
      }

      logoClickCount++;
      clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(function () {
        logoClickCount = 0;
      }, 2000);

      if (logoClickCount >= 5) {
        logoClickCount = 0;
        triggerCoinShower();
        triggerBlipVictory();
        triggerRewardText("1UP! You've found the secret stash!");
      }
    });
  }

  function triggerCoinShower() {
    if (reduceMotion.matches) return;
    const shower = document.getElementById('coin-shower');
    if (!shower) return;
    shower.innerHTML = '';
    shower.classList.add('active');
    for (let i = 0; i < 8; i++) {
      const coin = document.createElement('div');
      coin.className = 'coin-particle';
      coin.style.left = 10 + Math.random() * 80 + '%';
      coin.style.animationDelay = i * 50 + 'ms';
      shower.appendChild(coin);
    }
    setTimeout(function () {
      shower.classList.remove('active');
    }, 2000);
  }

  function triggerBlipVictory() {
    if (reduceMotion.matches) return;
    const blip = document.querySelector('.blip-sprite');
    if (blip) {
      blip.style.animation = 'blip-victory 200ms steps(1) 5';
      setTimeout(function () {
        blip.style.animation = 'blip-idle 800ms steps(1) infinite';
      }, 1200);
    }
  }

  function triggerRewardText(text) {
    const reward = document.getElementById('easter-reward');
    if (!reward) return;
    reward.textContent = text;
    reward.classList.add('active');
    setTimeout(function () {
      reward.classList.remove('active');
    }, 5000);

    // Allow Esc to dismiss
    function onKey(e) {
      if (e.key === 'Escape') {
        reward.classList.remove('active');
        document.removeEventListener('keydown', onKey);
      }
    }
    document.addEventListener('keydown', onKey);
  }

  /* -----------------------------------------------------------------------
     6. EASTER EGG 2 — typed-word:continue
     Disables while focus is in input/textarea/contenteditable.
     Must never call preventDefault. Exits on Esc.
     ----------------------------------------------------------------------- */
  let typedBuffer = '';
  let continueTimer = null;
  const CONTINUE_WORD = 'continue';

  document.addEventListener('keydown', function (e) {
    // Skip if in input
    const el = document.activeElement;
    if (
      el &&
      (el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.contentEditable === 'true' ||
        el.getAttribute('contenteditable') === 'true')
    ) {
      return;
    }

    // Esc clears
    if (e.key === 'Escape') {
      typedBuffer = '';
      const cont = document.getElementById('easter-continue');
      if (cont) cont.classList.remove('active');
      return;
    }

    // Only letter keys
    if (e.key.length !== 1) return;

    typedBuffer += e.key.toLowerCase();
    if (typedBuffer.length > CONTINUE_WORD.length) {
      typedBuffer = typedBuffer.slice(-CONTINUE_WORD.length);
    }

    clearTimeout(continueTimer);
    continueTimer = setTimeout(function () {
      typedBuffer = '';
    }, 1500);

    if (typedBuffer === CONTINUE_WORD) {
      typedBuffer = '';
      triggerContinueScreen();
    }
  });

  function triggerContinueScreen() {
    const cont = document.getElementById('easter-continue');
    if (!cont) return;
    cont.classList.add('active');
    setTimeout(function () {
      cont.classList.remove('active');
    }, 10000);

    function onKey(e) {
      if (e.key === 'Escape') {
        cont.classList.remove('active');
        document.removeEventListener('keydown', onKey);
      } else {
        // Any other key dismisses
        cont.classList.remove('active');
        document.removeEventListener('keydown', onKey);
      }
    }
    document.addEventListener('keydown', onKey);
  }

  /* -----------------------------------------------------------------------
     7. BLIP MASCOT COMPANION
     ----------------------------------------------------------------------- */
  (function () {
    const blip = document.querySelector('.blip-companion');
    if (!blip) return;

    // Check dismissal
    try {
      const dismissed = localStorage.getItem('pixel-dungeon-blip-dismissed');
      if (dismissed) {
        const ttl = parseInt(dismissed, 10);
        if (Date.now() < ttl) {
          blip.classList.add('dismissed');
          return;
        } else {
          localStorage.removeItem('pixel-dungeon-blip-dismissed');
        }
      }
    } catch (e) {
      /* storage blocked */
    }

    // Dismiss button
    const dismissBtn = blip.querySelector('.blip-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        blip.classList.add('dismissed');
        try {
          // 30-day TTL
          localStorage.setItem(
            'pixel-dungeon-blip-dismissed',
            String(Date.now() + 30 * 24 * 60 * 60 * 1000),
          );
        } catch (err) {
          /* storage blocked */
        }
      });
    }

    // Contextual tips based on page/section
    const tip = blip.querySelector('.blip-tip');
    if (tip) {
      const page = document.body.dataset.page;
      const section = page === 'index' ? 'home' : page;
      // Show tip after a delay
      setTimeout(function () {
        if (!blip.classList.contains('dismissed')) {
          tip.classList.add('visible');
          setTimeout(function () {
            tip.classList.remove('visible');
          }, 4000);
        }
      }, 3000);
    }
  })();

  /* -----------------------------------------------------------------------
     8. VISITOR PATH SELECTOR
     ----------------------------------------------------------------------- */
  document.querySelectorAll('.path-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const group = this.closest('.path-buttons');
      group.querySelectorAll('.path-btn').forEach(function (b) {
        b.classList.remove('selected');
      });
      this.classList.add('selected');
    });
  });

  /* -----------------------------------------------------------------------
     9. SEASONAL BANNER
     ----------------------------------------------------------------------- */
  (function () {
    const banner = document.getElementById('seasonal-banner');
    if (!banner) return;

    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const today = month * 100 + day; // e.g. 725 = July 25

    let motif = null;

    // Winter: Dec 15 – Jan 5
    if (today >= 1215 || today <= 105) motif = 'Winter Dungeon';
    // Halloween: Oct 20 – Nov 1
    else if (today >= 1020 || today <= 1101) motif = 'Halloween Boss';
    // Spring: Mar 21 – Apr 30
    else if (today >= 321 && today <= 430) motif = 'Spring Update';

    if (motif) {
      banner.textContent = 'A new dungeon awaits — gear up for the season.';
      banner.style.display = 'block';
    }
  })();

  /* -----------------------------------------------------------------------
     10. SMOOTH ANCHOR SCROLL (only if no reduced-motion)
     ----------------------------------------------------------------------- */
  if (!reduceMotion.matches) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
     11. LEVEL-UP TRIGGER (for success moments)
     ----------------------------------------------------------------------- */
  window.triggerLevelUp = function () {
    const levelUp = document.getElementById('level-up');
    if (!levelUp) return;
    levelUp.classList.add('active');
    setTimeout(function () {
      levelUp.classList.remove('active');
    }, 1500);
  };
})();
