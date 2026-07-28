/**
 * ============================================================================
 *  soundwave-studio — main.js
 *  Soundwave Studio brand kit — vanilla JS interactions
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * LICENCE: MPL-2.0
 */

(function() {
  'use strict';

  /* ── Reduced motion ─────────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav toggle ───────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ── Scroll reveals ─────────────────────────────────────────────────── */
  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }

  /* ── Intensity toggle ────────────────────────────────────────────────── */
  const intensityToggle = document.getElementById('intensity-toggle');
  if (intensityToggle) {
    intensityToggle.addEventListener('change', () => {
      document.body.classList.toggle('intensity-reduced', intensityToggle.checked);
      localStorage.setItem('soundwave-intensity', intensityToggle.checked ? 'reduced' : 'full');
    });

    // Restore preference
    if (localStorage.getItem('soundwave-intensity') === 'reduced') {
      intensityToggle.checked = true;
      document.body.classList.add('intensity-reduced');
    }
  }

  /* ── Easter egg: logo clicks ─────────────────────────────────────────── */
  let logoClickCount = 0;
  let logoClickTimer = null;

  const logoEl = document.querySelector('.nav-logo, .site-logo');
  if (logoEl) {
    logoEl.addEventListener('click', (e) => {
      // Don't trigger on nav links
      if (e.target.closest('a')) return;

      logoClickCount++;
      clearTimeout(logoClickTimer);

      if (logoClickCount >= 3) {
        logoClickCount = 0;
        triggerLogoEasterEgg();
      } else {
        logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 1000);
      }
    });
  }

  function triggerLogoEasterEgg() {
    // Peak waveform animation
    const peak = document.createElement('div');
    peak.className = 'easter-peak';
    document.body.appendChild(peak);

    // Mascot reaction
    const mascotBubble = document.querySelector('.mascot__bubble');
    if (mascotBubble) {
      mascotBubble.textContent = 'Peak locked in.';
      mascotBubble.classList.add('is-visible');
      setTimeout(() => mascotBubble.classList.remove('is-visible'), 2500);
    }

    setTimeout(() => peak.remove(), 3000);
  }

  /* ── Easter egg: typed words ─────────────────────────────────────────── */
  const typedWordTriggers = {
    'tape': triggerTapeEasterEgg,
    'signal': triggerSignalEasterEgg
  };

  let typedBuffer = '';
  let typedTimer = null;

  document.addEventListener('keydown', (e) => {
    // Don't capture when in input/textarea/contenteditable
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const char = e.key;
    if (char.length !== 1) return;

    typedBuffer += char.toLowerCase();
    clearTimeout(typedTimer);
    typedTimer = setTimeout(() => { typedBuffer = ''; }, 1000);

    // Check triggers
    for (const [word, fn] of Object.entries(typedWordTriggers)) {
      if (typedBuffer.includes(word)) {
        fn();
        typedBuffer = '';
        break;
      }
    }
  });

  function triggerTapeEasterEgg() {
    // Show a spinning reel indicator near cursor
    const reel = document.createElement('div');
    reel.innerHTML = '◉';
    reel.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;font-size:24px;color:var(--color-primary);animation:reel-spin 0.5s linear infinite;';
    document.body.appendChild(reel);

    const style = document.createElement('style');
    style.textContent = '@keyframes reel-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
    document.head.appendChild(style);

    setTimeout(() => { reel.remove(); style.remove(); }, 2000);

    if (window.showMascotBubble) window.showMascotBubble('Rolling it back.');
  }

  function triggerSignalEasterEgg() {
    // Pulse the primary color
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.backgroundColor = 'rgba(0, 230, 118, 0.05)';
    setTimeout(() => {
      document.body.style.backgroundColor = '';
    }, 400);

    if (window.showMascotBubble) window.showMascotBubble('Signal locked.');
  }

  /* ── Mascot companion ───────────────────────────────────────────────── */
  const mascotFigure = document.querySelector('.mascot__figure');
  const mascotBubble = document.querySelector('.mascot__bubble');

  if (mascotFigure && !prefersReducedMotion) {
    // Check dismissal preference
    const isDismissed = localStorage.getItem('soundwave-mascot-dismissed') === 'true';

    if (!isDismissed) {
      const mascotContainer = document.querySelector('.mascot');
      if (mascotContainer) {
        mascotContainer.style.display = 'flex';

        // Idle animation is CSS-driven
        // Tips based on location
        const tips = [
          { selector: '#hero, .hero', text: 'Levels are set. Ready to press play?' },
          { selector: '.feature-card, .feature-detail', text: 'Each one of these features is tuned for precision.' },
          { selector: '#server, .download-section', text: 'One line, and you\'re the engineer. I\'ll monitor the levels.' }
        ];

        window.showMascotBubble = function(text) {
          if (mascotBubble) {
            mascotBubble.textContent = text;
            mascotBubble.classList.add('is-visible');
          }
        };

        // Show tip on first scroll into relevant section
        const tipObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const tip = tips.find(t => entry.target.closest(t.selector));
              if (tip) {
                setTimeout(() => showMascotBubble(tip.text), 1500);
                tipObserver.unobserve(entry.target);
              }
            }
          });
        }, { threshold: 0.5 });

        document.querySelectorAll('.hero, .feature-card, .feature-detail, #server').forEach(el => {
          tipObserver.observe(el);
        });

        // Dismiss button
        const dismissBtn = document.querySelector('.mascot__close');
        if (dismissBtn) {
          dismissBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mascotContainer.style.display = 'none';
            localStorage.setItem('soundwave-mascot-dismissed', 'true');
          });
        }
      }
    }
  }

  /* ── Seasonal activation ─────────────────────────────────────────────── */
  (function checkSeasonal() {
    const now = new Date();
    const monthDay = (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0');

    const variants = [
      {
        name: 'New Year Session',
        activeRange: { start: '12-26', end: '01-07' },
        cssVars: { '--color-secondary': '#E040FB', '--color-bg': '#0D0D12' }
      },
      {
        name: 'Summer Festival Mix',
        activeRange: { start: '06-21', end: '08-15' },
        cssVars: { '--color-primary': '#00E5FF', '--color-secondary': '#FFD600' }
      },
      {
        name: 'Halloween Dead Air',
        activeRange: { start: '10-15', end: '11-01' },
        cssVars: { '--color-primary': '#FF6D00', '--color-tertiary': '#AA00FF' }
      }
    ];

    for (const variant of variants) {
      const { start, end } = variant.activeRange;
      let active = false;

      if (start <= end) {
        active = monthDay >= start && monthDay <= end;
      } else {
        // Cross-year range
        active = monthDay >= start || monthDay <= end;
      }

      if (active) {
        const root = document.documentElement;
        for (const [prop, value] of Object.entries(variant.cssVars)) {
          root.style.setProperty(prop, value);
        }

        // Add banner
        const banner = document.createElement('div');
        banner.className = `seasonal-banner seasonal-banner--${variant.name.toLowerCase().replace(/\s+/g, '-')}`;
        banner.textContent = variant.name + ' — a limited-time seasonal mix.';
        document.body.insertBefore(banner, document.body.firstChild);
        break;
      }
    }
  })();

  /* ── Smooth scroll for anchor links ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ── FAQ accordion ──────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-list__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-list__item');
      const isOpen = item.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.faq-list__item').forEach(i => i.classList.remove('is-open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-expanded', 'false');
    btn.tabIndex = 0;

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* ── Reduced motion: disable mascots and animations ─────────────────── */
  if (prefersReducedMotion) {
    const mascot = document.querySelector('.mascot');
    if (mascot) mascot.style.display = 'none';

    document.querySelectorAll('.waveform-bar__line, .vu-meter__segment').forEach(el => {
      el.style.animation = 'none';
    });
  }

})();
