/**
 * main.js — Desert Horizon
 * Mobile nav, reduced motion, scroll reveals, mascot (Dusty),
 * easter eggs, seasonal activation, intensity toggle, parallax hero.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function localStorageGet(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function localStorageSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (err) {
      console.error('localStorageSet failed:', err);
    }
  }

  /* ── Seasonal activation (live-js date gate) ──────────────────────────── */
  (function seasonalActivation() {
    const now = new Date();
    const mmdd = (m = now.getMonth() + 1, d = now.getDate()) =>
      String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');

    const variants = [
      { key: 'monsoon', start: '07-01', end: '09-15' },
      { key: 'harvest', start: '10-01', end: '11-15' },
      { key: 'solstice', start: '12-10', end: '01-05' },
      { key: 'spring', start: '03-01', end: '04-30' },
    ];

    const today = mmdd();
    const year = now.getFullYear();

    for (const v of variants) {
      const active = v.start <= v.end
        ? today >= v.start && today <= v.end
        : today >= v.start || today <= v.end;
      if (active) {
        document.documentElement.dataset.season = v.key;
        const banner = $('.season-banner');
        if (banner) {
          banner.textContent = 'The desert is changing \u2014 look how the light is shifting.';
          banner.classList.add('is-visible');
        }
        break;
      }
    }
  })();

  /* ── Intensity toggle (prefers-reduced-motion observer) ───────────────── */
  (function intensityToggle() {
    const btn = $('#intensity-toggle');
    if (!btn) return;

    const stored = localStorageGet('dh-motion', 'full');
    const apply = (val) => {
      document.documentElement.classList.toggle('motion-reduced', val === 'reduced');
      btn.querySelector('input').checked = val === 'reduced';
    };

    apply(stored);

    btn.addEventListener('change', (e) => {
      const next = e.target.checked ? 'reduced' : 'full';
      localStorageSet('dh-motion', next);
      apply(next);
    });

    // Also respond to OS-level change
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (localStorageGet('dh-motion', 'full') === 'full') {
        apply(e.matches ? 'reduced' : 'full');
      }
    });
  })();

  /* ── Mobile nav toggle ────────────────────────────────────────────────── */
  (function mobileNav() {
    const toggle = $('.nav-toggle');
    const menu = $('.nav-menu');
    if (!toggle || !menu) return;

    function open() {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      // Trap focus inside menu
      menu.querySelector('a, button')?.focus();
    }

    function close() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? close() : open();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        close();
      }
    });

    // Close on nav link click
    $$('a', menu).forEach((a) => a.addEventListener('click', close));
  })();

  /* ── Scroll reveals ───────────────────────────────────────────────────── */
  (function scrollReveals() {
    if (prefersReducedMotion()) return;
    const els = $$('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    els.forEach((el) => io.observe(el));
  })();

  /* ── Parallax hero (diorama-parallax) ─────────────────────────────────── */
  (function parallaxHero() {
    const hero = $('.hero.parallax-ready');
    if (!hero) return;
    if (prefersReducedMotion()) return;
    if (localStorageGet('dh-motion', 'full') === 'reduced') return;

    const layers = $$('.hero__layer', hero);
    const sun = $('.hero__sun', hero);
    const ridge = $('.hero__ridge', hero);

    let ticking = false;

    function update() {
      const sy = window.scrollY;
      const hH = hero.offsetHeight;
      if (sy > hH * 1.5) return;

      const progress = sy / hH; // 0..1

      layers.forEach((layer, i) => {
        const speed = (i + 1) * 0.08;
        layer.style.transform = `translateY(${sy * speed}px)`;
      });

      if (sun) {
        const bottomPct = 28 + progress * 8;
        sun.style.bottom = bottomPct + '%';
        sun.style.opacity = 1 - progress * 0.7;
      }

      if (ridge) {
        ridge.style.clipPath = `polygon(
          0% 100%, 0% ${60 + progress * 15}%,
          8% ${45 + progress * 12}%, 15% ${55 + progress * 10}%,
          22% ${40 + progress * 8}%, 30% ${50 + progress * 8}%,
          38% ${35 + progress * 6}%, 45% ${45 + progress * 6}%,
          52% ${30 + progress * 5}%, 60% ${42 + progress * 5}%,
          68% ${38 + progress * 5}%, 75% ${48 + progress * 4}%,
          82% ${40 + progress * 4}%, 88% ${50 + progress * 4}%,
          95% ${42 + progress * 3}%, 100% ${55 + progress * 3}%,
          100% 100%
        )`;
      }
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            update();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );

    // Pointer-based parallax (optional, gentle)
    hero.addEventListener('pointermove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy;
      layers.forEach((layer, i) => {
        const speed = (i + 1) * 4;
        layer.style.transform = `translate(${dx * speed}px, ${dy * speed * 0.5}px)`;
      });
    });

    hero.addEventListener('pointerleave', () => {
      layers.forEach((layer) => {
        layer.style.transform = '';
      });
    });
  })();

  /* ── Logo click easter egg (logo-clicks:5) ─────────────────────────────── */
  (function logoEasterEgg() {
    const logo = $('.nav-logo');
    if (!logo) return;

    let count = 0;
    let toast = null;
    let timeout = null;

    function showToast(msg) {
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'egg-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('is-visible');
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => toast.classList.remove('is-visible'), 4000);
    }

    logo.addEventListener('click', (e) => {
      // Don't intercept modifier+clicks or middle clicks
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (e.target.tagName === 'IMG') {
        count++;
        if (count === 5) {
          showToast('The desert knows you\u2019re here.');
          // Remove after 4s
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (toast) toast.classList.remove('is-visible');
            count = 0;
          }, 4000);
          e.preventDefault();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toast) {
        toast.classList.remove('is-visible');
        count = 0;
      }
    });
  })();

  /* ── Typed-word easter egg (typed-word:horizon) ───────────────────────── */
  (function typedWordEasterEgg() {
    const TARGET = 'horizon';
    let typed = '';
    let toast = null;
    let timeout = null;
    let armed = false;

    function showToast(msg) {
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'egg-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('is-visible');
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        toast.classList.remove('is-visible');
        typed = '';
      }, 4000);
    }

    function isTypingAllowed() {
      const el = document.activeElement;
      if (!el) return true;
      const tag = el.tagName.toLowerCase();
      return tag !== 'input' && tag !== 'textarea' && !el.isContentEditable;
    }

    document.addEventListener('keydown', (e) => {
      // Never preventDefault — §19.8
      if (!isTypingAllowed()) return;
      if (e.key === 'Escape') {
        if (toast) toast.classList.remove('is-visible');
        typed = '';
        return;
      }
      if (e.key.length !== 1) return; // only printable characters

      typed += e.key.toLowerCase();
      if (typed.length > TARGET.length) {
        typed = typed.slice(-TARGET.length);
      }
      if (typed === TARGET) {
        showToast('Dusty saw you looking.');
        typed = '';
        e.preventDefault(); // we do preventDefault only after confirming it's our sequence
      }
    });
  })();

  /* ── Time-of-day easter egg (time-of-day:sunset-zone) ─────────────────── */
  (function todEasterEgg() {
    // Sunset zone: between 17:00 and 20:00 local time
    const h = new Date().getHours();
    if (h < 17 || h >= 20) return;

    let toast = null;
    let timeout = null;

    function showToast(msg) {
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'egg-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('is-visible');
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 5000);
    }

    showToast('Golden hour hits different.');

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toast) {
        toast.classList.remove('is-visible');
      }
    });
  })();

  /* ── Mascot companion (Dusty) ─────────────────────────────────────────── */
  (function mascotCompanion() {
    const PAGES = ['index', 'download', 'about'];
    const pageId = document.body.dataset.page;

    if (!PAGES.includes(pageId)) return;
    if (localStorageGet('dh-mascot-dismissed', 'false') === 'true') return;
    if (prefersReducedMotion()) return;

    const tips = [
      {
        where: 'home:#hero',
        say: 'Welcome to the trading post. Take a seat \u2014 there\u2019s a whole mesa of stories waiting.',
      },
      {
        where: 'home:.pitch',
        say: 'Your library, rooted on your land. No horizon too far to reach.',
      },
      {
        where: 'home:.features-overview',
        say: 'Every feature here is a well-worn trail through the desert. SyncPlay? It keeps your whole posse in step.',
      },
      {
        where: 'download:#server',
        say: 'One command. That\u2019s all it takes to light the fire at this trading post.',
      },
      {
        where: 'about:.faq-list',
        say: 'Questions from the road? I\u2019ve stood on enough ridges to have seen them all.',
      },
    ];

    // Create mascot DOM
    const mascot = document.createElement('aside');
    mascot.className = 'mascot';
    mascot.setAttribute('aria-label', 'Dusty, your guide');

    mascot.innerHTML = `
      <div class="mascot__tip" aria-live="polite"></div>
      <div class="mascot__body">
        <button class="mascot__dismiss" aria-label="Dismiss Dusty" title="Rest a while, Dusty">&#10005;</button>
        <!-- Saguaro cactus SVG silhouette -->
        <svg class="mascot-svg" viewBox="0 0 72 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e07050"/>
              <stop offset="100%" stop-color="#8c3a18"/>
            </linearGradient>
          </defs>
          <!-- Ground -->
          <ellipse cx="36" cy="96" rx="20" ry="4" fill="#5c2e14" opacity="0.3"/>
          <!-- Main trunk -->
          <path d="M28 96 C28 70, 26 50, 30 35 C33 22, 32 14, 36 8
                   C40 14, 39 22, 42 35 C46 50, 44 70, 44 96 Z"
                fill="url(#sg)" stroke="#2e1a0e" stroke-width="1.5"/>
          <!-- Left arm -->
          <path d="M30 48 C22 44, 14 38, 12 28 C14 20, 18 16, 22 18
                   C26 20, 24 30, 30 40 Z"
                fill="url(#sg)" stroke="#2e1a0e" stroke-width="1.5"/>
          <!-- Right arm -->
          <path d="M42 42 C50 38, 58 32, 60 22 C62 14, 58 10, 54 12
                   C50 14, 52 24, 46 36 Z"
                fill="url(#sg)" stroke="#2e1a0e" stroke-width="1.5"/>
          <!-- Hat -->
          <ellipse cx="36" cy="8" rx="14" ry="3" fill="#5c2e14"/>
          <rect x="24" y="3" width="24" height="6" rx="2" fill="#5c2e14"/>
          <!-- Eyes (ink dots) -->
          <circle cx="33" cy="52" r="2" fill="#2e1a0e"/>
          <circle cx="39" cy="52" r="2" fill="#2e1a0e"/>
        </svg>
      </div>
    `;

    document.body.appendChild(mascot);

    const tipEl = $('.mascot__tip', mascot);
    const dismissBtn = $('.mascot__dismiss', mascot);

    // Tips on section entry
    const tipObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = tips.find((t) => {
              const [pg, sel] = t.where.split(':');
              return (pg === 'home' || pg === pageId) && entry.target.matches(sel);
            });
            if (match) {
              tipEl.textContent = match.say;
              tipEl.classList.add('is-visible');
              setTimeout(() => tipEl.classList.remove('is-visible'), 5000);
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    // Observe all tip targets
    tips.forEach((t) => {
      const [pg, sel] = t.where.split(':');
      if (pg === 'home' || pg === pageId) {
        const el = document.querySelector(sel);
        if (el) tipObserver.observe(el);
      }
    });

    // Dismiss
    dismissBtn.addEventListener('click', () => {
      mascot.classList.add('is-hidden');
      localStorageSet('dh-mascot-dismissed', 'true');
    });

    // Easter: click:3 — Dusty tips his hat
    let mascotClickCount = 0;
    let mascotClickTimer = null;
    const mascotBody = $('.mascot__body', mascot);

    mascotBody.addEventListener('click', () => {
      mascotClickCount++;
      if (mascotClickTimer) clearTimeout(mascotClickTimer);
      mascotClickTimer = setTimeout(() => {
        mascotClickCount = 0;
      }, 1500);
      if (mascotClickCount >= 3) {
        tipEl.textContent =
          'Tips his weathered hat three times and grins, clearly pleased by the attention.';
        tipEl.classList.add('is-visible');
        mascotClickCount = 0;
        if (mascotClickTimer) clearTimeout(mascotClickTimer);
      }
    });

    // Easter: hover-hold:2s — Dusty points at horizon
    let hoverTimer = null;
    mascotBody.addEventListener('pointerenter', () => {
      hoverTimer = setTimeout(() => {
        tipEl.textContent =
          'Raises one arm to point at the horizon: \u2018That\u2019s where the best sunsets happen.\u2019';
        tipEl.classList.add('is-visible');
      }, 2000);
    });
    mascotBody.addEventListener('pointerleave', () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    });
  })();

  /* ── Visitor paths fork ───────────────────────────────────────────────── */
  (function visitorPaths() {
    const fork = $('.visitor-paths');
    if (!fork) return;

    $$('.visitor-path-btn', fork).forEach((btn) => {
      btn.addEventListener('click', () => {
        const href = btn.dataset.href;
        if (href) window.location.href = href;
      });
    });
  })();

  /* ── FAQ smooth open (no-JS fallback via <details>; JS upgrades aria) ─── */
  (function faqAria() {
    $$('.faq-item').forEach((item) => {
      const dt = $('dt', item);
      const dd = $('dd', item);
      if (!dt || !dd) return;

      // Add aria-expanded if parent is a <details>
      const details = item.closest('details');
      if (details) {
        details.addEventListener('toggle', () => {
          dt.setAttribute('aria-expanded', String(details.open));
        });
      }
    });
  })();
})();
