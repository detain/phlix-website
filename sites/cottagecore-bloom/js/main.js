/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MPL-2.0
 */

/* ===========================================================================
   MAIN.JS — Cottagecore Bloom
   Vanilla JS: nav, reduced-motion, scroll reveals, mascot, easter eggs,
   seasonal activation, intensity toggle, FAQ accordion
   =========================================================================== */

'use strict';

/* ---- Seasonal variant activation ---- */
(function seasonalActivator() {
  const now = new Date();
  const monthDay = ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
                   ('0' + now.getDate()).slice(-2);

  const variants = [
    { key: 'harvest',  start: '09-15', end: '10-31' },
    { key: 'midwinter',start: '12-01', end: '01-06' },
    { key: 'spring',   start: '03-15', end: '05-15' },
  ];

  for (const v of variants) {
    if (monthDay >= v.start && monthDay <= v.end) {
      document.documentElement.setAttribute('data-season', v.key);
      break;
    }
  }
})();

/* ---- Reduced motion ---- */
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isQuietMode = () =>
  document.body.classList.contains('quiet-mode') || prefersReducedMotion;

/* ---- Scroll reveal ---- */
(function initScrollReveal() {
  if (isQuietMode()) {
    // Show everything immediately when motion is reduced
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ---- Mobile nav toggle ---- */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    // Focus first item for a11y
    const first = menu.querySelector('.nav-link');
    if (first) first.focus();
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();

/* ---- Intensity toggle ("Quiet the Garden") ---- */
(function initIntensityToggle() {
  const toggle = document.getElementById('intensity-toggle');
  if (!toggle) return;

  // Restore preference
  if (localStorage.getItem('cottagecore-bloom-quiet') === 'true' ||
      prefersReducedMotion) {
    document.body.classList.add('quiet-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    const quiet = toggle.checked;
    document.body.classList.toggle('quiet-mode', quiet);
    localStorage.setItem('cottagecore-bloom-quiet', String(quiet));
  });
})();

/* ---- Mascot: Primrose ---- */
(function initMascot() {
  const mascot    = document.getElementById('mascot');
  const tip       = document.getElementById('mascot-tip');
  const tipClose = document.querySelector('.mascot-tip-close');
  if (!mascot) return;

  const TOOLTIPS = {
    'home':           "Come in through the garden gate — there's always something wonderful blooming.",
    'features':       "Each of these blooms does something special. Hover to see what makes it grow.",
    'features-page':  "I've visited every corner of this garden — take your time, pick what speaks to you.",
    'download':       "One line, and your own garden begins. I'll help it grow.",
    'about':          "Questions? Tend to them like I tend the flowers — one petal at a time.",
  };

  function getTipKey() {
    const page = document.body.dataset.page || '';
    if (page === 'home')     return 'home';
    if (page === 'features') return window.location.pathname.includes('/features.html') ? 'features-page' : 'features';
    if (page === 'download') return 'download';
    if (page === 'about')    return 'about';
    return null;
  }

  let hoverTimer = null;
  let tipVisible = false;

  function showTip() {
    const key = getTipKey();
    if (!key || !TOOLTIPS[key]) return;
    if (tip) {
      const msg = tip.querySelector('.tip-message') || tip;
      if (msg.dataset.originalText === undefined) msg.dataset.originalText = msg.textContent;
      msg.textContent = TOOLTIPS[key];
      tip.classList.add('is-visible');
      tipVisible = true;
    }
  }

  function hideTip() {
    if (tip) { tip.classList.remove('is-visible'); tipVisible = false; }
    clearTimeout(hoverTimer);
  }

  // Hover-hold tip on mascot
  if (!isQuietMode()) {
    mascot.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(showTip, 800);
    });
    mascot.addEventListener('mouseleave', hideTip);
    // Dismiss tip on close button
    if (tipClose) {
      tipClose.addEventListener('click', e => {
        e.stopPropagation();
        hideTip();
      });
    }
  }

  // Idle animation
  if (!isQuietMode() && !prefersReducedMotion) {
    mascot.classList.add('idle');
  }

  // Easter interaction: hover-hold 2s → petal sparkle
  let holdTimer = null;
  mascot.addEventListener('mouseenter', () => {
    if (isQuietMode()) return;
    holdTimer = setTimeout(() => {
      if (!document.getElementById('petal-shower')) {
        const shower = document.createElement('div');
        shower.id = 'petal-shower';
        document.body.appendChild(shower);
        for (let i = 0; i < 12; i++) {
          const p = document.createElement('div');
          p.className = 'shower-petal';
          p.style.left = (10 + Math.random() * 80) + '%';
          p.style.animationDuration = (2 + Math.random() * 2) + 's';
          p.style.animationDelay = (Math.random() * 0.8) + 's';
          shower.appendChild(p);
        }
        setTimeout(() => shower.remove(), 3500);
      }
    }, 2000);
  });
  mascot.addEventListener('mouseleave', () => clearTimeout(holdTimer));

  // Click: Primrose does a loop-de-loop
  let mascotClickCount = 0;
  mascot.addEventListener('click', () => {
    if (isQuietMode()) return;
    mascotClickCount++;
    if (mascotClickCount % 5 === 0) {
      // Trigger petal shower every 5th click
      if (!document.getElementById('petal-shower')) {
        const shower = document.createElement('div');
        shower.id = 'petal-shower';
        document.body.appendChild(shower);
        for (let i = 0; i < 16; i++) {
          const p = document.createElement('div');
          p.className = 'shower-petal';
          p.style.left = (5 + Math.random() * 90) + '%';
          p.style.animationDuration = (2.5 + Math.random() * 2) + 's';
          p.style.animationDelay = (Math.random() * 0.6) + 's';
          shower.appendChild(p);
        }
        setTimeout(() => shower.remove(), 4000);
      }
    }
  });

  // Persist dismissal
  if (localStorage.getItem('cottagecore-bloom-mascot-dismissed') === 'true') {
    mascot.classList.add('dismissed');
  }

  if (tipClose) {
    tipClose.addEventListener('click', () => {
      mascot.classList.add('dismissed');
      localStorage.setItem('cottagecore-bloom-mascot-dismissed', 'true');
    });
  }
})();

/* ---- Easter Egg: typed-word 'garden' ---- */
(function initTypedWordEgg() {
  const TARGET = 'garden';
  let typed = '';
  let exitTimer = null;
  const reward = document.getElementById('garden-reward');

  function showReward() {
    if (reward) {
      reward.classList.add('is-visible');
      // Animate mascot
      const mascot = document.getElementById('mascot');
      if (mascot) {
        mascot.style.animation = 'spiral-loop 0.8s ease-in-out';
        setTimeout(() => {
          mascot.style.animation = '';
          if (!isQuietMode()) mascot.classList.add('idle');
        }, 900);
      }
      // Auto-dismiss after 3s
      exitTimer = setTimeout(hideReward, 3000);
    }
  }

  function hideReward() {
    if (reward) { reward.classList.remove('is-visible'); }
    clearTimeout(exitTimer);
  }

  document.addEventListener('keydown', e => {
    // Disable while in form fields
    if (['INPUT', 'TEXTAREA', 'CONTENTEDITABLE'].includes(e.target.tagName)) return;
    // Never preventDefault on typing
    if (e.key === 'Escape') { hideReward(); typed = ''; return; }

    // Only collect letter characters
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      typed += e.key.toLowerCase();

      // Keep only the last TARGET.length chars
      if (typed.length > TARGET.length) {
        typed = typed.slice(-TARGET.length);
      }

      if (typed === TARGET) {
        typed = '';
        showReward();
      }
    }
  });
})();

/* ---- FAQ accordion enhancements ---- */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    // Ensure keyboard toggle works with native details-like behavior
    const summary = item.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', e => {
      // Let the native toggle happen; we just ensure styles update
      item.addEventListener('toggle', () => {}, { once: true });
    });
  });
})();

/* ---- Visitor paths redirect ---- */
(function initVisitorPaths() {
  document.querySelectorAll('.path-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) window.location.href = target;
    });
  });
})();

/* ---- Petal shower on demand (from easter_eggs click:5) ---- */
function triggerPetalShower() {
  if (isQuietMode()) return;
  const existing = document.getElementById('petal-shower');
  if (existing) return;

  const shower = document.createElement('div');
  shower.id = 'petal-shower';
  document.body.appendChild(shower);

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'shower-petal';
    p.style.left = (Math.random() * 100) + '%';
    p.style.animationDuration = (2 + Math.random() * 3) + 's';
    p.style.animationDelay = (Math.random() * 1) + 's';
    p.style.background = ['rgba(200,85,106,0.5)', 'rgba(139,122,181,0.4)', 'rgba(122,158,107,0.35)'][i % 3];
    shower.appendChild(p);
  }

  setTimeout(() => shower.remove(), 5000);
}

/* ---- Logo click easter egg ---- */
(function initLogoEgg() {
  let logoClicks = 0;
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;

  logo.addEventListener('click', e => {
    // Only count plain clicks, not nav
    if (isQuietMode()) return;
    logoClicks++;
    if (logoClicks >= 5) {
      logoClicks = 0;
      triggerPetalShower();
      // Show reward toast
      let toast = document.getElementById('garden-reward');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'garden-reward';
        toast.textContent = 'How lovely that you found me!';
        document.body.appendChild(toast);
      }
      toast.classList.add('is-visible');
      setTimeout(() => toast.classList.remove('is-visible'), 3000);
    }
  });
})();
