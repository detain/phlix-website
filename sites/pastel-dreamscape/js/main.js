/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MPL-2.0
 */

/* ─────────────────────────────────────────────────────────────────────────────
   PASTEL DREAMSCAPE — MAIN JAVASCRIPT
   Mascot (Dreamy), nav toggle, FAQ accordion, easter eggs,
   sparkle mode, seasonal activation
   ───────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Reduced motion ─────────────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Seasonal activation ─────────────────────────────────────────────────── */
  function activateSeasonal() {
    const now = new Date();
    const mmdd = (now.getMonth() + 1).toString().padStart(2, '0') +
                  (now.getDate()).toString().padStart(2, '0');
    const variants = [
      { name: 'winter', range: ['1201', '0110'] },
      { name: 'spring', range: ['0320', '0515'] },
      { name: 'summer', range: ['0615', '0831'] },
      { name: 'autumn', range: ['0922', '1114'] },
    ];
    for (const v of variants) {
      const [start, end] = v.range;
      if (mmdd >= start && mmdd <= end) {
        document.documentElement.setAttribute('data-season', v.name);
        break;
      }
    }
  }
  activateSeasonal();

  /* ── Sparkle mode toggle ─────────────────────────────────────────────────── */
  function initSparkleMode() {
    const toggle = document.getElementById('sparkle-toggle');
    if (!toggle) return;
    const stored = localStorage.getItem('phlix-sparkle-mode');
    const enabled = stored !== 'off';
    if (!enabled) {
      document.documentElement.setAttribute('data-sparkle', 'off');
      toggle.querySelector('input').checked = false;
    }
    toggle.addEventListener('change', function () {
      const off = !this.querySelector('input').checked;
      document.documentElement.setAttribute('data-sparkle', off ? 'off' : 'on');
      localStorage.setItem('phlix-sparkle-mode', off ? 'off' : 'on');
    });
  }
  initSparkleMode();

  /* ── Navigation mobile toggle ───────────────────────────────────────────── */
  function initNav() {
    const btn = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Toggle navigation');

    // Focusable elements within nav for focus trap
    function getFocusable() {
      return links.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    }

    // Close nav helper
    function closeNav() {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }

    // Toggle nav on button click
    btn.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      this.setAttribute('aria-expanded', String(open));
      if (open) {
        const focusable = getFocusable();
        if (focusable.length) focusable[0].focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!links.contains(e.target) && !btn.contains(e.target)) {
        if (links.classList.contains('open')) closeNav();
      }
    });

    // Keyboard handling: Escape, focus trap
    links.addEventListener('keydown', function (e) {
      if (!links.classList.contains('open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeNav();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
  initNav();

  /* ── FAQ accordion ──────────────────────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question) return;
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('role', 'button');
      if (answer && answer.id) {
        question.setAttribute('aria-controls', answer.id);
      }
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item.open').forEach(function (o) {
          o.classList.remove('open');
          const q = o.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
  initFAQ();

  /* ── Dreamy mascot ───────────────────────────────────────────────────────── */
  function initMascot() {
    const mascot = document.querySelector('.mascot');
    if (!mascot) return;

    // Check dismissed state
    const dismissed = localStorage.getItem('phlix-dreamscape-mascot-dismissed');
    if (dismissed === 'true') {
      mascot.style.display = 'none';
      return;
    }

    const body = mascot.querySelector('.mascot-body');
    const tip = mascot.querySelector('.mascot-tip');
    const dismissBtn = mascot.querySelector('.mascot-dismiss');

    // Current tip index
    let tipIndex = 0;
    const tips = [
      'Welcome to the dreamscape! Ready to float in?',
      'Psst… SyncPlay keeps everyone drifting together, no matter where they are.',
      'Drop a file in and watch it bloom onto your shelf — so dreamy!',
      'One click and movie night stays in perfect step across every screen.',
      'Your big screen just became a cloud — float a movie up there anytime.',
      'One line and you\'re the dreamer. Your library, your wonder, all yours.',
    ];

    // Show tip for current section
    function showTip(index) {
      if (!tip) return;
      const sections = ['hero', 'features-overview', 'library', 'syncplay', 'clients#roku', 'download'];
      const sectionId = sections[index % sections.length];
      const currentPage = window.location.pathname.replace(/^\/(pastel-dreamscape\/)?/, '').replace('.html', '') || 'home';
      tip.textContent = tips[index % tips.length];
      tip.setAttribute('aria-live', 'polite');
    }

    showTip(0);

    // Change tip on scroll/nav
    let scrollTimer;
    window.addEventListener('scroll', function () {
      if (prefersReducedMotion) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        tipIndex++;
        showTip(tipIndex);
      }, 2000);
    }, { passive: true });

    // Dismiss
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        mascot.style.display = 'none';
        localStorage.setItem('phlix-dreamscape-mascot-dismissed', 'true');
      });
    }

    // Hover for tip visibility
    mascot.addEventListener('mouseenter', function () {
      mascot.classList.add('tip-visible');
    });
    mascot.addEventListener('mouseleave', function () {
      mascot.classList.remove('tip-visible');
    });
  }
  initMascot();

  /* ── Easter egg 1: logo-clicks:5 ─────────────────────────────────────────── */
  function initLogoEgg() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;
    let clickCount = 0;
    let timer;

    logo.addEventListener('click', function (e) {
      // Don't trigger if clicking a real link inside
      if (e.target.tagName === 'A' || e.target.closest('a')) return;

      clickCount++;
      clearTimeout(timer);
      timer = setTimeout(function () { clickCount = 0; }, 1500);

      if (clickCount >= 5) {
        clickCount = 0;
        triggerBubbleShower();
        if (!prefersReducedMotion) {
          showMascotReaction('Dreamy loves the joy in clicking!');
        }
      }
    });
  }
  initLogoEgg();

  /* ── Easter egg 2: typed-word:sparkle ──────────────────────────────────── */
  function initSparkleWordEgg() {
    const letters = [];
    const TARGET = 'sparkle';
    let active = false;

    document.addEventListener('keydown', function (e) {
      // Disabled in inputs
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.contentEditable === 'true') return;

      if (e.key === 'Escape') {
        // Dismiss any active effects
        active = false;
        letters.length = 0;
        document.querySelectorAll('.sparkle-word').forEach(function (el) { el.remove(); });
        return;
      }

      if (e.key.length !== 1) return;

      if (!active) active = true;
      letters.push(e.key.toLowerCase());

      // Keep only the last TARGET.length letters
      while (letters.length > TARGET.length) letters.shift();

      // Check
      if (letters.join('') === TARGET) {
        letters.length = 0;
        active = false;
        if (!prefersReducedMotion) {
          triggerSparkleBloom();
          showMascotReaction('You found the magic word!');
        }
      }
    });
  }
  initSparkleWordEgg();

  /* ── Bubble shower (logo egg) ─────────────────────────────────────────────── */
  function triggerBubbleShower() {
    if (prefersReducedMotion) return;
    const colors = ['#F9A8D4', '#C4B5FD', '#A7F3D0', '#FBCBA9', '#93C5FD'];
    const mascot = document.querySelector('.mascot-body');
    const origin = mascot
      ? { x: mascot.getBoundingClientRect().left + 36, y: mascot.getBoundingClientRect().top + 36 }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    for (let i = 0; i < 18; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble-particle';
      const size = 8 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 120;
      bubble.style.cssText = [
        `left:${origin.x}px`,
        `top:${origin.y}px`,
        `width:${size}px`,
        `height:${size}px`,
        `background:radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${colors[i % colors.length]}66)`,
        `animation:bubble-pop ${0.8 + Math.random() * 0.6}s ease-out forwards`,
        `transform:translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
      ].join(';');
      document.body.appendChild(bubble);
      setTimeout(function () { bubble.remove(); }, 2000);
    }
  }

  /* ── Sparkle bloom (word egg) ─────────────────────────────────────────────── */
  function triggerSparkleBloom() {
    if (prefersReducedMotion) return;
    const colors = ['#F9A8D4', '#C4B5FD', '#A7F3D0', '#FBCBA9', '#93C5FD', '#A78BFA'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'sparkle-particle';
      const size = 4 + Math.random() * 10;
      p.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `width:${size}px`,
        `height:${size}px`,
        `background:${colors[Math.floor(Math.random() * colors.length)]}`,
        `border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`,
        `animation:sparkle-burst ${0.6 + Math.random() * 0.8}s ease-out forwards`,
        `animation-delay:${Math.random() * 0.4}s`,
        `opacity:0`,
      ].join(';');
      container.appendChild(p);
    }

    // Show the word
    const word = document.createElement('div');
    word.className = 'sparkle-word';
    word.textContent = '✦ sparkle ✦';
    container.appendChild(word);

    setTimeout(function () {
      container.remove();
    }, 2500);
  }

  /* ── Mascot reaction (text bubble) ───────────────────────────────────────── */
  function showMascotReaction(text) {
    const existing = document.querySelector('.mascot-reaction');
    if (existing) existing.remove();
    const reaction = document.createElement('div');
    reaction.className = 'mascot-tip';
    reaction.style.cssText = 'position:fixed;bottom:140px;right:24px;opacity:1;transform:none;max-width:200px;';
    reaction.textContent = text;
    document.body.appendChild(reaction);
    setTimeout(function () { reaction.remove(); }, 3000);
  }

  /* ── Smooth scroll for anchor links ─────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }
  initSmoothScroll();

})();
