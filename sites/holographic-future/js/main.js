/* ==========================================================================
   MAIN.JS — Holographic Future
   Nav toggle, reduced-motion, mascot (Lux), seasonal activation,
   easter eggs, scroll experience.
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

  // Close on outside click
  on(document, 'click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });

  // Close on Escape
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      toggle.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   2. Reduced motion — switch off BOTH transition AND animation
   -------------------------------------------------------------------------- */
function initReducedMotion() {
  const btn = qs('.reduce-motion-btn');
  if (!btn) return;

  // Read current preference
  let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sync toggle button state
  btn.setAttribute('aria-pressed', String(reduced));

  function applyMotion(reduce) {
    document.documentElement.classList.toggle('reduce-motion', reduce);
    btn.setAttribute('aria-pressed', String(reduce));
    // Disable both transition and animation via CSS custom property
    document.documentElement.style.setProperty('--motion-duration', reduce ? '0s' : '1s');
  }

  applyMotion(reduced);

  on(btn, 'click', () => {
    reduced = !reduced;
    applyMotion(reduced);
    try {
      localStorage.setItem('phlix-reduce-motion', String(reduced));
    } catch (_) {
      // localStorage not available — ignore
    }
  });
}

/* --------------------------------------------------------------------------
   3. Seasonal activation (live-js)
   Active ranges (MM-DD..MM-DD):
     Aurora Solstice:     12-15..01-05
     Solar Maximum:       06-21..07-04
     Void Protocol:       10-27..11-01
   -------------------------------------------------------------------------- */
function initSeasonal() {
  const seasonal = [
    { name: 'aurora', class: 'seasonal-aurora', start: [12, 15], end: [1, 5] },
    { name: 'solar', class: 'seasonal-solar', start: [6, 21], end: [7, 4] },
    { name: 'void', class: 'seasonal-void', start: [10, 27], end: [11, 1] },
  ];

  const now = new Date();
  const m = now.getMonth() + 1; // 1-12
  const d = now.getDate(); // 1-31

  for (const variant of seasonal) {
    const [sm, sd] = variant.start;
    const [em, ed] = variant.end;

    let active = false;
    if (sm > em) {
      // Cross-year: Dec 15 – Jan 5
      active = m > sm || (m === sm && d >= sd) || m < em || (m === em && d <= ed);
    } else {
      active = (m > sm || (m === sm && d >= sd)) && (m < em || (m === em && d <= ed));
    }

    if (active) {
      document.body.classList.add(variant.class);
      // Show optional banner
      const banner = qs('.seasonal-banner');
      if (banner) {
        banner.textContent = "You've entered a seasonal dimension. The spectrum has shifted.";
        banner.style.display = 'block';
      }
      break;
    }
  }
}

/* --------------------------------------------------------------------------
   4. Easter Egg: logo-clicks:7 — Lux spectrum spray
   -------------------------------------------------------------------------- */
function initLogoEgg() {
  const logo = qs('.nav-logo');
  if (!logo) return;

  let clickCount = 0;
  let sprayTimeout = null;

  on(logo, 'click', () => {
    clickCount++;

    if (clickCount === 7) {
      clickCount = 0;
      triggerSpectrum();
    }

    // Reset after 2s of inactivity
    clearTimeout(sprayTimeout);
    sprayTimeout = setTimeout(() => {
      clickCount = 0;
    }, 2000);
  });
}

function triggerSpectrum() {
  let overlay = qs('.spectrum-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'spectrum-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.add('is-active');

  // Lux tip
  showMascotTip("You've unlocked Lux's light show.");

  setTimeout(() => {
    overlay.classList.remove('is-active');
  }, 3000);

  // Allow dismiss with Escape
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      overlay.classList.remove('is-active');
      document.removeEventListener('keydown', escHandler);
    }
  };
  on(document, 'keydown', escHandler);
}

/* --------------------------------------------------------------------------
   5. Easter Egg: typed-word:refract
   -------------------------------------------------------------------------- */
function initTypedEgg() {
  let typed = '';

  on(document, 'keydown', (e) => {
    // Skip if in an input/textarea/contenteditable
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) {
      return;
    }

    // Never preventDefault — let typing happen
    if (e.key.length === 1) {
      typed += e.key.toLowerCase();

      // Keep only last 8 chars
      if (typed.length > 8) typed = typed.slice(-8);

      if (typed.includes('refract')) {
        typed = '';
        triggerDiffraction();
      }
    }

    if (e.key === 'Escape') {
      dismissDiffraction();
    }
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
  showMascotTip('You understand the language of light.');

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
   6. Mascot: Lux
   -------------------------------------------------------------------------- */
function initMascot() {
  const mascot = qs('#mascot-lux');
  if (!mascot) return;

  // Check dismissal
  try {
    if (localStorage.getItem('phlix-lux-dismissed') === 'true') {
      mascot.classList.add('is-dismissed');
      return;
    }
  } catch (_) {}

  const tip = qs('.mascot-tip');

  // Show tip after 1.5s (not on reduced motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => {
      showMascotTip("I'm Lux. Let me guide you through the dimensions of Phlix.");
    }, 1500);
  }

  // Dismiss button
  const dismissBtn = qs('.mascot-dismiss');
  if (dismissBtn) {
    on(dismissBtn, 'click', (e) => {
      e.stopPropagation();
      mascot.classList.add('is-dismissed');
      try {
        localStorage.setItem('phlix-lux-dismissed', 'true');
      } catch (_) {}
    });
  }

  // Click on mascot → click-hold easter interaction
  let clickTimer;
  on(mascot, 'mousedown', () => {
    clickTimer = setTimeout(() => {
      showMascotTip("You're paying attention to detail.");
    }, 2000);
  });
  on(mascot, 'mouseup', () => clearTimeout(clickTimer));
  on(mascot, 'mouseleave', () => clearTimeout(clickTimer));

  // Click counter for easter interaction
  let mascotClicks = 0;
  on(mascot, 'click', () => {
    mascotClicks++;
    if (mascotClicks >= 3) {
      mascotClicks = 0;
      showMascotTip(
        "Lux projects a brief holographic spectrum arc from their raised hand, then settles to 'luminous calm'.",
      );
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
    // Rebuild tip content
    tip.innerHTML = `<span class="tip-text">${text}</span><span class="mascot-dismiss" role="button" tabindex="0">Dismiss</span>`;
    on(tip.querySelector('.mascot-dismiss'), 'click', (e) => {
      e.stopPropagation();
      tip.classList.remove('is-visible');
      const mascot = qs('#mascot-lux');
      if (mascot) {
        mascot.classList.add('is-dismissed');
        try {
          localStorage.setItem('phlix-lux-dismissed', 'true');
        } catch (_) {}
      }
    });
  }

  tip.classList.add('is-visible');

  // Auto-hide after 4s
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
  if (window.innerWidth < 768) return; // No parallax on mobile

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

          // Hero parallax — subtle shift
          if (scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.15}px)`;
          }

          // Card parallax stagger
          cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
              const offset = (rect.top / window.innerHeight - 0.5) * 12;
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

  // Revealed state
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
   9. Lux section tips (context-aware)
   -------------------------------------------------------------------------- */
function initLuxTips() {
  if (!qs('#mascot-lux')) return;

  const tips = [
    {
      selector: '#hero-reveal',
      text: "I'm Lux. Let me guide you through the dimensions of Phlix.",
    },
    {
      selector: '.feature-cards',
      text: 'Each of these dimensions can render independently or in perfect sync.',
    },
    {
      selector: '#syncplay',
      text: 'Synchronization at the speed of light — every device, every frame.',
    },
    {
      selector: '#download',
      text: "The calibration ritual: one line, and you've built your portal.",
    },
    { selector: '.faq-list', text: 'Your questions bring clarity. I answer with precision.' },
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
  initLuxTips();
});

/* @copyright 2026 Joe Huss <detain@interserver.net> */
