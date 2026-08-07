/* ==========================================================================
   MAIN.JS — Nexus Core
   Nav toggle, reduced-motion, mascot (Orb), seasonal activation,
   easter eggs, scroll experience, orbital animations.
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   0. Helpers
   -------------------------------------------------------------------------- */
function qs(sel, ctx) {
  return (ctx || document).querySelector(sel);
}

function qsa(sel, ctx) {
  return Array.from((ctx || document).querySelectorAll(sel));
}

function on(el, event, handler, opts) {
  el.addEventListener(event, handler, opts);
}

/* --------------------------------------------------------------------------
   1. Navigation toggle (mobile hamburger)
   -------------------------------------------------------------------------- */
function initNav() {
  const toggle = qs('.nav-toggle');
  const menu = qs('.nav-menu');

  if (!toggle || !menu) return;

  on(toggle, 'click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open', !expanded);
  });

  on(document, 'click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });

  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      toggle.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   2. Reduced motion
   -------------------------------------------------------------------------- */
function initReducedMotion() {
  const btn = qs('.reduce-motion-btn');
  if (!btn) return;

  let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  btn.setAttribute('aria-pressed', String(reduced));

  function applyMotion(reduce) {
    document.documentElement.classList.toggle('reduce-motion', reduce);
    btn.setAttribute('aria-pressed', String(reduce));
    document.documentElement.style.setProperty('--motion-duration', reduce ? '0s' : '1s');
  }

  applyMotion(reduced);

  on(btn, 'click', () => {
    reduced = !reduced;
    applyMotion(reduced);
    try {
      localStorage.setItem('nexus-reduce-motion', String(reduced));
    } catch (_ignored) {
      // Ignored by design: applyMotion() above has already applied the toggle,
      // so the accessibility preference takes effect immediately. A blocked
      // localStorage only costs us the memory of it on the next visit.
    }
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    reduced = e.matches;
    applyMotion(reduced);
    try {
      localStorage.setItem('nexus-reduce-motion', String(reduced));
    } catch (_ignored) {
      // Ignored by design: as above. This branch mirrors the OS-level
      // prefers-reduced-motion change, which the media query will report again
      // on the next load anyway, so nothing is actually lost.
    }
  });
}

/* --------------------------------------------------------------------------
   3. Seasonal activation
   -------------------------------------------------------------------------- */
function initSeasonal() {
  const seasonal = [
    { name: 'solar', class: 'seasonal-solar', start: [6, 21], end: [7, 4] },
    { name: 'void', class: 'seasonal-void', start: [10, 27], end: [11, 1] },
  ];

  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  for (const variant of seasonal) {
    const [sm, sd] = variant.start;
    const [em, ed] = variant.end;

    // Declared without an initialiser: both arms of the if/else below assign
    // unconditionally, so any initial value here would be dead (no-useless-assignment).
    let active;
    if (sm > em) {
      active = m > sm || (m === sm && d >= sd) || m < em || (m === em && d <= ed);
    } else {
      active = (m > sm || (m === sm && d >= sd)) && (m < em || (m === em && d <= ed));
    }

    if (active) {
      document.body.classList.add(variant.class);
      const banner = qs('.seasonal-banner');
      if (banner) {
        banner.textContent = 'The nexus shifts frequency. Energy recalibrated.';
        banner.style.display = 'block';
      }
      break;
    }
  }
}

/* --------------------------------------------------------------------------
   4. Easter Egg: logo-clicks:5 — Energy burst
   -------------------------------------------------------------------------- */
function initLogoEgg() {
  const logo = qs('.nav-logo');
  if (!logo) return;

  let clickCount = 0;
  let sprayTimeout = null;

  on(logo, 'click', () => {
    clickCount++;

    if (clickCount === 5) {
      clickCount = 0;
      triggerEnergyBurst();
    }

    clearTimeout(sprayTimeout);
    sprayTimeout = setTimeout(() => {
      clickCount = 0;
    }, 2000);
  });
}

function triggerEnergyBurst() {
  let overlay = qs('.spectrum-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'spectrum-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.add('is-active');
  showMascotTip('Energy sync achieved.');

  setTimeout(() => {
    overlay.classList.remove('is-active');
  }, 3000);

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('is-active');
      document.removeEventListener('keydown', escHandler);
    }
  };
  on(document, 'keydown', escHandler);
}

/* --------------------------------------------------------------------------
   5. Easter Egg: typed-word:nexus
   -------------------------------------------------------------------------- */
function initTypedEgg() {
  let typed = '';

  on(document, 'keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;

    if (e.key.length === 1) {
      typed += e.key.toLowerCase();
      if (typed.length > 8) typed = typed.slice(-8);

      if (typed.includes('nexus')) {
        typed = '';
        triggerDiffraction();
      }
    }

    if (e.key === 'Escape') dismissDiffraction();
  });
}

let diffractionTimeout = null;

function triggerDiffraction() {
  let overlay = qs('.diffraction-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'diffraction-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.add('is-active');
  showMascotTip('The core responds to your command.');

  clearTimeout(diffractionTimeout);
  diffractionTimeout = setTimeout(dismissDiffraction, 4000);

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      dismissDiffraction();
      document.removeEventListener('keydown', escHandler);
    }
  };
  on(document, 'keydown', escHandler);
}

function dismissDiffraction() {
  const overlay = qs('.diffraction-overlay');
  if (overlay) overlay.classList.remove('is-active');
  clearTimeout(diffractionTimeout);
}

/* --------------------------------------------------------------------------
   6. Mascot: Orb
   -------------------------------------------------------------------------- */
function initMascot() {
  const mascot = qs('#mascot-orb');
  if (!mascot) return;

  try {
    if (localStorage.getItem('nexus-orb-dismissed') === 'true') {
      mascot.classList.add('is-dismissed');
      return;
    }
  } catch (_ignored) {
    // Ignored by design: an unreadable localStorage is treated exactly like
    // "never dismissed" — we fall through and show the mascot, as on a first
    // visit. There is no other outcome to choose and nothing to report.
  }

  const tip = qs('.mascot-tip');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => {
      showMascotTip('Welcome to the core. I am Orb — your guide to connection.');
    }, 1500);
  }

  const dismissBtn = qs('.mascot-dismiss');
  if (dismissBtn) {
    on(dismissBtn, 'click', (e) => {
      e.stopPropagation();
      mascot.classList.add('is-dismissed');
      try {
        localStorage.setItem('nexus-orb-dismissed', 'true');
      } catch (_ignored) {
        // Ignored by design: the dismissal has already been applied to the DOM
        // on the line above, so the user's click is honoured for this page
        // view. Only persistence across reloads is lost.
      }
    });
  }

  let clickTimer;
  on(mascot, 'mousedown', () => {
    clickTimer = setTimeout(() => {
      showMascotTip("You're channeling energy through the nexus.");
    }, 2000);
  });
  on(mascot, 'mouseup', () => clearTimeout(clickTimer));
  on(mascot, 'mouseleave', () => clearTimeout(clickTimer));

  let mascotClicks = 0;
  on(mascot, 'click', () => {
    mascotClicks++;
    if (mascotClicks >= 3) {
      mascotClicks = 0;
      showMascotTip('Orb expands its rings, showing a full orbital system.');
    }
  });
}

function showMascotTip(text) {
  const tip = qs('.mascot-tip');
  if (!tip) return;

  const textEl = tip.querySelector('.tip-text') || tip;
  if (textEl.classList.contains('tip-text')) {
    textEl.textContent = text;
  } else {
    tip.innerHTML = `<span class="tip-text">${text}</span><span class="mascot-dismiss" role="button" tabindex="0">Dismiss</span>`;
    on(tip.querySelector('.mascot-dismiss'), 'click', (e) => {
      e.stopPropagation();
      tip.classList.remove('is-visible');
      const mascot = qs('#mascot-orb');
      if (mascot) {
        mascot.classList.add('is-dismissed');
        try {
          localStorage.setItem('nexus-orb-dismissed', 'true');
        } catch (_ignored) {
          // Ignored by design: same contract as the dismiss button above — the
          // DOM change on the line above is the user-visible effect; storage is
          // only the memory of it.
        }
      }
    });
  }

  tip.classList.add('is-visible');

  clearTimeout(showMascotTip._timeout);
  showMascotTip._timeout = setTimeout(() => {
    tip.classList.remove('is-visible');
  }, 4000);
}

/* --------------------------------------------------------------------------
   7. Scroll parallax (disabled under reduced motion)
   -------------------------------------------------------------------------- */
function initScrollParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  const hero = qs('.hero');
  const cards = qsa('.ar-panel, .feature-card');

  if (!hero) return;

  let ticking = false;

  on(
    window,
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (scrollY < window.innerHeight && hero) {
            hero.style.transform = `translateY(${scrollY * 0.1}px)`;
          }

          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
              const offset = (rect.top / window.innerHeight - 0.5) * 10;
              card.style.transform = `translateY(${offset}px)`;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}

/* --------------------------------------------------------------------------
   8. Scroll reveals (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  qsa('.feature-card, .ar-panel, .client-card, .faq-item, .section').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition =
      'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .is-revealed { opacity: 1 !important; transform: none !important; }
    @media (prefers-reduced-motion: reduce) {
      .is-revealed { transition: none !important; }
    }
  `;
  document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   9. Orb section tips (context-aware)
   -------------------------------------------------------------------------- */
function initOrbTips() {
  if (!qs('#mascot-orb')) return;

  const tips = [
    { selector: '#hero-core', text: 'Welcome to the core. I am Orb — your guide to connection.' },
    { selector: '.feature-cards', text: 'Each stream flows through me. Everything connects.' },
    {
      selector: '#syncplay',
      text: 'SyncPlay creates an orbital lock — all devices move together.',
    },
    { selector: '#hub', text: 'The Hub extends my reach across any distance.' },
    { selector: '.faq-list', text: 'Your questions map new pathways through the nexus.' },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          const tip = tips.find((t) => entry.target.matches(t.selector));
          if (tip) showMascotTip(tip.text);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  tips.forEach((tip) => {
    const el = qs(tip.selector);
    if (el) observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   10. Reduce-motion class + CSS variable
   -------------------------------------------------------------------------- */
function initMotionCSS() {
  const style = document.createElement('style');
  style.id = 'motion-css';
  style.textContent = `
    .reduce-motion *,
    .reduce-motion *::before,
    .reduce-motion *::after {
      transition-duration: 0s !important;
      animation-duration: 0s !important;
      animation-iteration-count: 1 !important;
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        transition-duration: 0s !important;
        animation-duration: 0s !important;
        animation-iteration-count: 1 !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   11. Orbital ring initialization
   -------------------------------------------------------------------------- */
function initOrbitalRings() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroBg = qs('.hero-bg');
  if (!heroBg) return;

  // Create orbital rings
  for (let i = 1; i <= 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'orbital-ring';
    ring.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(0, 245, 255, ${0.15 / i});
      border-radius: 50%;
      animation: orbit ${20 + i * 10}s linear infinite;
      animation-delay: -${i * 5}s;
    `;
    heroBg.appendChild(ring);
  }
}

/* --------------------------------------------------------------------------
   Init
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initMotionCSS();
  initNav();
  initReducedMotion();
  initSeasonal();
  initLogoEgg();
  initTypedEgg();
  initMascot();
  initScrollParallax();
  initScrollReveal();
  initOrbTips();
  initOrbitalRings();
});

/* @copyright 2026 Joe Huss <detain@interserver.net> */
