/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Reduced Motion Guard ──────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile Nav Toggle ─────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll Reveal — Narrative Chaptered Sections ──────────────────── */
  if (!prefersReducedMotion) {
    const revealEls = document.querySelectorAll('.narrative-section, .reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  } else {
    // If reduced motion, show everything immediately
    document.querySelectorAll('.narrative-section, .reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  /* ── Pollen Particles ───────────────────────────────────────────────── */
  if (!prefersReducedMotion) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'pollen-particles';
    particleContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(particleContainer);

    function spawnPollen() {
      const dot = document.createElement('div');
      dot.className = 'pollen-dot';
      dot.style.left = Math.random() * 100 + 'vw';
      dot.style.animationDuration = 6 + Math.random() * 6 + 's';
      dot.style.animationDelay = Math.random() * 2 + 's';
      dot.style.width = 3 + Math.random() * 3 + 'px';
      dot.style.height = dot.style.width;
      particleContainer.appendChild(dot);
      setTimeout(() => dot.remove(), 14000);
    }

    // Spawn a few on load, then periodically
    for (let i = 0; i < 5; i++) setTimeout(spawnPollen, i * 400);
    setInterval(spawnPollen, 2000);
  }

  /* ── Mascot Companion — Sunny ───────────────────────────────────────── */
  (function () {
    const COMPANION_PAGES = ['home', 'features', 'download'];
    const STORAGE_KEY = 'phlix-sunny-dismissed';

    // Only on designated pages
    const pageId = document.body.dataset.pageId || '';
    if (!COMPANION_PAGES.includes(pageId)) return;

    // Check dismissed state
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;

    // Tips keyed by section anchor
    const tips = [
      { where: 'home:#hero', say: "Pull up a chair — the meadow's ready for you." },
      {
        where: 'home:.features-overview',
        say: 'Watch together with SyncPlay — everyone stays in step, room to room.',
      },
      {
        where: 'features:#syncplay',
        say: "That's the one for family movie night — lock every screen to one frame.",
      },
      {
        where: 'features:#library',
        say: 'Drop a show in and watch it bloom on your shelf. The meadow grows itself.',
      },
      {
        where: 'download:#server',
        say: "One line of soil, and you're the gardener. I'll help tend the harvest.",
      },
    ];

    // Build companion DOM
    const companion = document.createElement('div');
    companion.className = 'mascot-companion';
    companion.innerHTML = `
      <div class="mascot-tip" id="mascot-tip" role="status" aria-live="polite"></div>
      <div class="mascot-sunny-wrapper" style="position:relative;display:flex;flex-direction:column;align-items:flex-end;">
        <img
          class="mascot-sunny"
          id="mascot-sunny"
          src="img/sunny.svg"
          alt="Sunny the sunflower mascot"
          width="72"
          height="72"
          tabindex="0"
          aria-label="Sunny the sunflower — click for a tip"
        />
        <button class="mascot-dismiss" id="mascot-dismiss" aria-label="Dismiss Sunny">Sunny, take a rest</button>
      </div>
    `;
    document.body.appendChild(companion);

    const sunnyEl = document.getElementById('mascot-sunny');
    const tipEl = document.getElementById('mascot-tip');
    const dismissBtn = document.getElementById('mascot-dismiss');

    let currentTip = null;
    let tipTimeout = null;

    function showTip(index) {
      if (!tips[index]) return;
      currentTip = index;
      tipEl.textContent = tips[index].say;
      tipEl.classList.add('is-visible');
      clearTimeout(tipTimeout);
      tipTimeout = setTimeout(() => {
        tipEl.classList.remove('is-visible');
        currentTip = null;
      }, 5000);
    }

    function nextTip() {
      const next = ((currentTip ?? -1) + 1) % tips.length;
      showTip(next);
    }

    // Initial tip after 1.5s
    setTimeout(nextTip, 1500);

    // Sunny click → next tip
    sunnyEl.addEventListener('click', nextTip);
    sunnyEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextTip();
      }
    });

    // Dismiss
    dismissBtn.addEventListener('click', () => {
      companion.classList.add('is-dismissed');
      localStorage.setItem(STORAGE_KEY, 'true');
    });

    // Section-aware tips via IntersectionObserver
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              const tipIndex = tips.findIndex((t) => t.where.includes('#' + id));
              if (tipIndex !== -1 && tipIndex !== currentTip) showTip(tipIndex);
            }
          });
        },
        { threshold: 0.4 },
      );

      tips.forEach((tip) => {
        const selector = tip.where.split(':')[1];
        const el = document.querySelector(selector);
        if (el) sectionObserver.observe(el);
      });
    }
  })();

  /* ── Easter Egg 1: Logo Click 3× → Sunny Celebration ────────────────── */
  (function () {
    let clickCount = 0;
    let clickTimer = null;

    const logo = document.querySelector('.nav-logo, .hero__logo');
    if (!logo) return;

    const celebration = document.createElement('div');
    celebration.className = 'sunny-celebration';
    celebration.innerHTML = `<p class="sunny-celebration__text">You've made Sunny's day! 🌻</p>`;
    document.body.appendChild(celebration);

    function triggerCelebration() {
      celebration.classList.add('is-visible');
      setTimeout(() => celebration.classList.remove('is-visible'), 3000);
    }

    logo.addEventListener('click', (e) => {
      // Don't trigger on keyboard or modified clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();

      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 800);

      if (clickCount >= 3) {
        clickCount = 0;
        triggerCelebration();

        // Sunny hat-tip animation if mascot exists
        const sunny = document.getElementById('mascot-sunny');
        if (sunny) {
          sunny.classList.add('sunny-hat-tip');
          setTimeout(() => sunny.classList.remove('sunny-hat-tip'), 600);
        }
      }
    });
  })();

  /* ── Easter Egg 2: Type "sunflower" → Golden Tint + Bloom ──────────── */
  (function () {
    const TARGET = 'sunflower';
    let typed = '';
    let timer = null;
    let isInInput = false;

    const tintEl = document.createElement('div');
    tintEl.className = 'easter-golden-tint';
    tintEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tintEl);

    // Detect when focus is in an input/textarea
    document.addEventListener('focusin', () => {
      isInInput = true;
    });
    document.addEventListener('focusout', () => {
      // Small delay to allow focus to move legitimately
      setTimeout(() => {
        isInInput = false;
      }, 50);
    });

    document.addEventListener('keydown', (e) => {
      if (isInInput) return; // Don't steal typing from inputs
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') {
        tintEl.classList.remove('is-active');
        typed = '';
        return;
      }
      if (e.key.length !== 1) return; // Only printable characters

      typed += e.key.toLowerCase();
      // Keep only the last TARGET.length chars
      if (typed.length > TARGET.length) typed = typed.slice(-TARGET.length);

      if (typed === TARGET) {
        typed = '';
        tintEl.classList.add('is-active');
        setTimeout(() => tintEl.classList.remove('is-active'), 2000);
      }

      // Reset after 1.5s of no typing
      clearTimeout(timer);
      timer = setTimeout(() => {
        typed = '';
      }, 1500);
    });
  })();

  /* ── Seasonal Activation — live-js date gate ───────────────────────── */
  (function () {
    const now = new Date();
    const monthDay =
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      now.getDate().toString().padStart(2, '0');

    const variants = [
      {
        id: 'harvest',
        range: ['09-15', '11-15'],
        overrides: {
          '--color-primary': '#D97A2E',
          '--color-bg': '#F5E8CC',
          '--color-surface': '#FBF1E0',
        },
      },
      {
        id: 'winter',
        range: ['11-25', '01-06'],
        overrides: {
          '--color-primary': '#B83A3A',
          '--color-secondary': '#4E7C59',
          '--color-bg': '#F3ECE2',
        },
      },
      {
        id: 'spring',
        range: ['03-20', '05-31'],
        overrides: {
          '--color-primary': '#6BAE75',
          '--color-secondary': '#A87DC8',
          '--color-bg': '#F4F2E6',
        },
      },
    ];

    function inRange(dateStr, [start, end]) {
      if (start <= end) return dateStr >= start && dateStr <= end;
      // Wrap around year end
      return dateStr >= start || dateStr <= end;
    }

    const active = variants.find((v) => inRange(monthDay, v.range));
    if (active) {
      const root = document.documentElement;
      Object.entries(active.overrides).forEach(([prop, val]) => {
        root.style.setProperty(prop, val);
      });

      // Show seasonal banner
      const banner = document.createElement('div');
      banner.className = 'seasonal-banner';
      banner.textContent = 'The season has arrived in the meadow — gather around.';
      document.body.prepend(banner);
    }
  })();

  /* ── Code Block Copy Button ─────────────────────────────────────────── */
  document.querySelectorAll('.code-block').forEach((block) => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-block__copy';
    copyBtn.textContent = 'Copy';
    copyBtn.setAttribute('aria-label', 'Copy install command');
    copyBtn.addEventListener('click', () => {
      const code = block.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent || '').then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    });
    block.appendChild(copyBtn);
  });
})();
