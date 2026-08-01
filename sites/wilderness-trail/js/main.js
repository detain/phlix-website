/**
 * main.js — Wilderness Trail
 * Nav toggle, mascot, easter eggs, intensity toggle, seasonal, reduced-motion
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Reduced Motion listener ──────────────────────────────────────────── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleReducedMotion() {
    document.documentElement.dataset.reducedMotion = prefersReduced.matches ? 'yes' : 'no';
  }
  handleReducedMotion();
  prefersReduced.addEventListener('change', handleReducedMotion);

  /* ── Nav toggle ────────────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll reveal for sections ────────────────────────────────────────── */
  if (!prefersReduced.matches) {
    const sections = document.querySelectorAll('.section-reveal');
    if (sections.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in-up');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      sections.forEach((s) => observer.observe(s));
    }
  }

  /* ── Intensity toggle (Dim the Campfire) ───────────────────────────────── */
  const intensityToggle = document.getElementById('intensity-toggle');
  if (intensityToggle) {
    // Read persisted preference
    const saved = localStorage.getItem('wt-intensity');
    if (saved === 'dim') {
      intensityToggle.checked = true;
      document.documentElement.dataset.intensity = 'dim';
    }

    intensityToggle.addEventListener('change', () => {
      const dim = intensityToggle.checked;
      document.documentElement.dataset.intensity = dim ? 'dim' : 'full';
      try {
        localStorage.setItem('wt-intensity', dim ? 'dim' : 'full');
      } catch (_) { /* intentionally empty — localStorage unavailable */ }
    });
  }

  /* ── Seasonal activation ──────────────────────────────────────────────── */
  (function applySeason() {
    try {
      const stored = localStorage.getItem('wt-season');
      if (stored && ['winter', 'wildflower', 'autumn'].includes(stored)) {
        document.documentElement.dataset.season = stored;
        return;
      }
    } catch (_) { /* intentionally empty — localStorage unavailable */ }

    const month = new Date().getMonth() + 1; // 1-12
    let season = null;
    if (month >= 12 || month <= 2)     season = 'winter';
    else if (month >= 6 && month <= 7)  season = 'wildflower';
    else if (month >= 9 && month <= 11)  season = 'autumn';

    if (season) {
      document.documentElement.dataset.season = season;
      const banner = document.getElementById('season-banner-text');
      if (banner) {
        const messages = {
          winter:    "Scout says: The seasons change the trail, but the summit's always worth it.",
          wildflower:"Scout says: Wildflower season — the trail blooms all summer long.",
          autumn:    "Scout says: Autumn ridge — the aspens are turning, and the fire's warm.",
        };
        banner.textContent = messages[season] || '';
      }
      const bannerSlot = document.getElementById('season-slot');
      if (bannerSlot) bannerSlot.removeAttribute('hidden');
    }
  })();

  /* ── Mascot: Scout ─────────────────────────────────────────────────────── */
  var mascotState = { dismissed: false, logoClicks: 0, tipIndex: 0 };
  try {
    var ms = JSON.parse(localStorage.getItem('wt-mascot'));
    if (ms && ms.dismissed) mascotState.dismissed = true;
  } catch (_) { /* intentionally empty — localStorage unavailable */ }

  var mascotEl    = document.querySelector('.mascot');
  var mascotClose = document.querySelector('.mascot__close');
  var mascotTip   = document.querySelector('.mascot__tip');

  function getScoutTip(where) {
    var tips = {
      'home:#trailhead-call':     "Lace up, friend — the trail starts right here.",
      'home:.features-overview':  "Your whole library is the terrain. Every blaze marks a new summit.",
      'download:#server':          "One line of code and you're the ranger. I'll tend the first fire.",
      'about:.faq-list':          "Questions from the trailhead? I've got answers by the fire.",
    };
    return tips[where] || "The trail's in good hands, friend.";
  }

  function showMascotTip() {
    if (!mascotEl || mascotState.dismissed) return;
    var where = document.body.dataset.mascotWhere || '';
    if (mascotTip) mascotTip.textContent = getScoutTip(where);
    mascotEl.classList.add('tip-visible');
    clearTimeout(mascotEl._tipTimer);
    mascotEl._tipTimer = setTimeout(hideMascotTip, 6000);
  }

  function hideMascotTip() {
    if (mascotEl) {
      mascotEl.classList.remove('tip-visible');
      clearTimeout(mascotEl._tipTimer);
    }
  }

  if (mascotClose) {
    mascotClose.addEventListener('click', function (e) {
      e.stopPropagation();
      mascotState.dismissed = true;
      try { localStorage.setItem('wt-mascot', JSON.stringify({ dismissed: true })); } catch (_) { /* intentionally empty */ }
      if (mascotEl) mascotEl.style.display = 'none';
    });
  }

  /* ── Logo-click easter egg (5 clicks) ─────────────────────────────────── */
  var logoEl = document.querySelector('.logo-easter, .nav-logo, .site-logo');
  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      // Don't count if modifier keys
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      mascotState.logoClicks++;
      if (mascotState.logoClicks === 5) {
        mascotState.logoClicks = 0;
        showMascotTip();
        if (mascotTip) {
          mascotTip.textContent = "Sharper eyes than most, friend.";
        }
        if (mascotEl) {
          mascotEl.classList.add('tip-visible');
          clearTimeout(mascotEl._tipTimer);
          mascotEl._tipTimer = setTimeout(function () {
            hideMascotTip();
          }, 4000);
        }
      }
    });
  }

  /* ── Typed-word easter egg: "summit" ─────────────────────────────────── */
  var typedBuffer = '';
  var typedTimer  = null;
  var typedActive = false;

  function activateTypedEgg() {
    if (typedActive) return;
    typedActive = true;
    document.body.classList.add('summit-mode');
    setTimeout(function () {
      document.body.classList.remove('summit-mode');
      typedActive = false;
    }, 8000);
  }

  document.addEventListener('keydown', function (e) {
    // Skip if focus is in an input/textarea/contenteditable
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    // Exit on Escape
    if (e.key === 'Escape') {
      document.body.classList.remove('summit-mode');
      typedActive = false;
      typedBuffer = '';
      return;
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typedBuffer += e.key.toLowerCase();
      if (typedBuffer.length > 10) typedBuffer = typedBuffer.slice(-6);
      clearTimeout(typedTimer);
      typedTimer = setTimeout(function () { typedBuffer = ''; }, 1500);
      if (typedBuffer.includes('summit')) {
        typedBuffer = '';
        activateTypedEgg();
      }
    }
  });

  /* ── FAQ accordion ────────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.hasAttribute('open');
      // Close all others
      document.querySelectorAll('.faq-item[open]').forEach(function (i) {
        if (i !== item) i.removeAttribute('open');
      });
      if (wasOpen) item.removeAttribute('open');
      else item.setAttribute('open', '');
    });
  });

  /* ── Copy install command ──────────────────────────────────────────────── */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cmd = btn.closest('.install-block') || btn.closest('.install-command');
      if (!cmd) return;
      var codeEl = cmd.querySelector('code');
      if (!codeEl) return;
      var text = codeEl.textContent.trim();
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          var orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = orig; }, 2000);
        }).catch(function () {
          fallbackCopy(text, btn);
        });
      } else {
        fallbackCopy(text, btn);
      }
    });
  });

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) { /* intentionally empty — execCommand may fail */ }
    document.body.removeChild(ta);
    var orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(function () { btn.textContent = orig; }, 2000);
  }

  /* ── Smooth scroll for anchor links ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Visitor path selector ────────────────────────────────────────────── */
  document.querySelectorAll('.path-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var target = card.dataset.target;
      if (target) window.location.href = target;
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ── Init mascot on eligible pages ────────────────────────────────────── */
  var mascotPages = ['index', 'download', 'about'];
  var currentPage = document.body.dataset.page || '';
  if (mascotPages.includes(currentPage) && !mascotState.dismissed) {
    // Mascot will be shown by scroll-based reveal or after 3s idle
    setTimeout(showMascotTip, 3000);
  }

})();

/* @copyright 2026 Joe Huss <detain@interserver.net> */
