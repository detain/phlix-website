/**
 * ============================================================================
 * MAIN.JS — Día de Muertos
 * Vanilla JS — no dependencies.
 *
 * Handles: nav toggle, reduced motion, scroll reveals, Catrina mascot,
 * easter eggs (click:7 dance, typed-word:marigold, time-of-day:20-23),
 * intensity toggle (Soften the Flame), and seasonal activation.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     Helpers
     ----------------------------------------------------------------------- */

  /**
   * Get the reduced-motion state. Re-reads on change (not just once).
   * §19.2: must switch off transition AND animation.
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Add a listener for reduced-motion changes — re-runs callback on change.
   */
  function onReducedMotionChange(callback) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    callback(mq.matches);
    mq.addEventListener('change', function (e) {
      callback(e.matches);
    });
  }

  /**
   * Check if focus is currently inside an input/textarea/contenteditable.
   * Used to disable easter eggs when typing.
   */
  function isTyping() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || el.isContentEditable;
  }

  /* -----------------------------------------------------------------------
     Seasonal activation — Día de Muertos Peak: Oct 31 – Nov 2
     Mode: live-js
     ----------------------------------------------------------------------- */
  function activateSeasonalBanner() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-based
    const day = now.getDate();
    // Oct 31 → month=10, day=31
    // Nov  1 → month=11, day=1
    // Nov  2 → month=11, day=2
    const isDDM = (month === 10 && day === 31) || (month === 11 && day >= 1 && day <= 2);

    if (isDDM) {
      document.body.classList.add('seasonal-ddm');
      const banner = document.getElementById('seasonal-banner');
      if (banner) banner.removeAttribute('hidden');
    }
  }

  /* -----------------------------------------------------------------------
     Mobile navigation toggle
     Uses the CSS checkbox hack for no-JS fallback.
     ----------------------------------------------------------------------- */
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const check = document.querySelector('.nav-check');

    if (!toggle || !menu || !check) return;

    // Sync aria-expanded from checkbox state
    function syncAria() {
      toggle.setAttribute('aria-expanded', check.checked ? 'true' : 'false');
    }
    toggle.addEventListener('click', syncAria);

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        check.checked = false;
        syncAria();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && check.checked) {
        check.checked = false;
        syncAria();
        // Return focus to toggle button for keyboard users
        toggle.focus();
      }
    });
  }

  /* -----------------------------------------------------------------------
     Scroll reveals — IntersectionObserver
     ----------------------------------------------------------------------- */
  function initScrollReveals() {
    if (!window.IntersectionObserver) return;
    if (prefersReducedMotion()) return;

    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    els.forEach(function (el) {
      obs.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     Intensity toggle — "Soften the Flame"
     §19.2: must switch off transition AND animation (not just animation!)
     ----------------------------------------------------------------------- */
  function initIntensityToggle() {
    const toggle = document.querySelector('.intensity-toggle');
    if (!toggle) return;

    // Restore persisted state
    const stored = localStorage.getItem('phlix-intensity');
    if (stored === 'reduced') {
      applyIntensityReduced(true);
      toggle.setAttribute('aria-pressed', 'true');
    }

    toggle.addEventListener('click', function () {
      const isReduced = toggle.getAttribute('aria-pressed') === 'true';
      const next = !isReduced;
      toggle.setAttribute('aria-pressed', String(next));
      applyIntensityReduced(next);
      localStorage.setItem('phlix-intensity', next ? 'reduced' : 'full');
    });

    // Also react to system reduced-motion changes
    onReducedMotionChange(function (reduced) {
      if (reduced) {
        applyIntensityReduced(true);
        toggle.setAttribute('aria-pressed', 'true');
      } else if (localStorage.getItem('phlix-intensity') !== 'reduced') {
        applyIntensityReduced(false);
        toggle.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Apply or remove intensity-reduced mode.
   * Kills ALL CSS transitions and animations on <body> and its children.
   * §19.2: must kill transition AND animation.
   */
  function applyIntensityReduced(on) {
    if (on) {
      document.body.classList.add('intensity-reduced');
      // Kill all transitions and animations at the document level
      var style = document.createElement('style');
      style.id = 'intensity-killer';
      style.textContent =
        '*, *::before, *::after { transition: none !important; animation: none !important; }';
      document.head.appendChild(style);
    } else {
      document.body.classList.remove('intensity-reduced');
      var kill = document.getElementById('intensity-killer');
      if (kill) kill.remove();
    }
  }

  /* -----------------------------------------------------------------------
     Catrina mascot
     §19.11: never fixed on mobile; §19.21: dismissible with localStorage
     §19.8: tips tied to specific section anchors
     ----------------------------------------------------------------------- */
  var Catrina = {
    el: null,
    bubble: null,
    orb: null,
    dismissBtn: null,
    sayEl: null,
    clickCount: 0,
    hoverTimer: null,
    dismissed: false,

    tips: [
      { where: 'home:#hero', say: 'Welcome. Every story is an ofrenda waiting to be honored.' },
      {
        where: 'home:.features-overview',
        say: "Share a film, sync a memory — you're building an altar of moments together.",
      },
      {
        where: 'download:#server',
        say: 'Light the first candle. One line, and your library becomes the ofrenda.',
      },
      {
        where: 'features:.feature-grid',
        say: 'Each feature is a marigold petal — together they light the path home.',
      },
    ],

    init: function () {
      this.el = document.querySelector('.catrina');
      this.bubble = document.querySelector('.catrina-bubble');
      this.orb = document.querySelector('.catrina-orb');
      this.dismissBtn = document.querySelector('.catrina-dismiss');
      this.sayEl = document.getElementById('catrina-say');

      if (!this.el || !this.orb) return;

      // Respect persisted dismissal
      if (localStorage.getItem('phlix-catrina') === 'dismissed') {
        this.el.hidden = true;
        this.dismissed = true;
        return;
      }

      // Remove hidden so JS-driven show works (markup has hidden for no-JS)
      this.el.hidden = false;

      this.bindOrb();
      this.bindDismiss();
      this.bindTips();

      // Reduced motion: disable idle sway
      if (prefersReducedMotion()) {
        var sway = this.el.querySelector('.catrina-sway');
        if (sway) sway.style.animation = 'none';
      }
    },

    bindOrb: function () {
      if (!this.orb) return;
      var self = this;

      this.orb.addEventListener('click', function () {
        self.clickCount++;
        // Easter interaction: click:7 — Catrina dances
        if (self.clickCount >= 7) {
          self.dance();
          self.clickCount = 0;
        }
        // Show tip on orb click
        self.showRandomTip();
      });

      // Hover-hold easter: hover-hold:3s
      this.orb.addEventListener('mouseenter', function () {
        self.hoverTimer = setTimeout(function () {
          self.whisperHeart();
        }, 3000);
      });
      this.orb.addEventListener('mouseleave', function () {
        clearTimeout(self.hoverTimer);
      });
    },

    bindDismiss: function () {
      if (!this.dismissBtn) return;
      var self = this;
      this.dismissBtn.addEventListener('click', function () {
        self.dismiss();
      });
    },

    bindTips: function () {
      var self = this;
      var sections = document.querySelectorAll('section[id]');

      if (!sections.length) return;

      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              self.showTipForAnchor('#' + entry.target.id);
            }
          });
        },
        { threshold: 0.4 },
      );

      sections.forEach(function (sec) {
        obs.observe(sec);
      });
    },

    showTipForAnchor: function (anchor) {
      var tip = this.tips.find(function (t) {
        return t.where.includes(anchor);
      });
      if (tip && this.sayEl) {
        this.sayEl.textContent = tip.say;
        this.bubble.hidden = false;
        // Auto-hide after 5s
        clearTimeout(this._tipTimeout);
        this._tipTimeout = setTimeout(function () {
          if (self.bubble) self.bubble.hidden = true;
        }, 5000);
      }
    },

    showRandomTip: function () {
      if (!this.sayEl) return;
      var tip = this.tips[Math.floor(Math.random() * this.tips.length)];
      if (tip) {
        this.sayEl.textContent = tip.say;
        this.bubble.hidden = false;
        clearTimeout(this._tipTimeout);
        this._tipTimeout = setTimeout(function () {
          if (self.bubble) self.bubble.hidden = true;
        }, 5000);
      }
    },

    whisperHeart: function () {
      if (!this.sayEl) return;
      this.sayEl.textContent = 'You remember them well.';
      this.bubble.hidden = false;
    },

    dismiss: function () {
      this.el.hidden = true;
      this.dismissed = true;
      localStorage.setItem('phlix-catrina', 'dismissed');
    },

    dance: function () {
      // Catrina dance: CSS class triggers the animation
      if (!this.orb) return;
      this.orb.classList.add('catrina-dancing');
      if (this.sayEl) {
        this.sayEl.textContent = 'Catrina dances for the joy of remembrance.';
        this.bubble.hidden = false;
      }
      setTimeout(function () {
        if (self.orb) self.orb.classList.remove('catrina-dancing');
      }, 6000);
    },

    restore: function () {
      this.el.hidden = false;
      this.dismissed = false;
      localStorage.removeItem('phlix-catrina');
    },
  };

  var self = Catrina; // for dance timeout reference

  /* -----------------------------------------------------------------------
     Easter Egg 1 — Catrina dance on logo click:7
     ----------------------------------------------------------------------- */
  function initLogoClickEgg() {
    var logo = document.querySelector('.nav-logo');
    if (!logo) return;
    var count = 0;
    logo.addEventListener('click', function () {
      count++;
      if (count >= 7) {
        if (Catrina.orb) Catrina.orb.classList.add('catrina-dancing');
        setTimeout(function () {
          if (Catrina.orb) Catrina.orb.classList.remove('catrina-dancing');
        }, 6000);
        count = 0;
      }
    });
  }

  /* -----------------------------------------------------------------------
     Easter Egg 2 — typed-word:marigold → petal shower
     §19.8: disabled when focus in input/textarea/contenteditable,
             never preventDefault, exits on Esc.
     ----------------------------------------------------------------------- */
  function initTypedWordEgg() {
    var buffer = '';
    var active = false;
    var petalLayer = null;

    function makePetals() {
      if (petalLayer) return;
      petalLayer = document.createElement('div');
      petalLayer.className = 'marigold-petals';
      petalLayer.setAttribute('aria-hidden', 'true');
      petalLayer.style.cssText =
        'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;';
      document.body.appendChild(petalLayer);

      for (var i = 0; i < 18; i++) {
        var p = document.createElement('div');
        p.className = 'petal';
        p.style.cssText = [
          'left:' + Math.random() * 100 + '%;',
          'animation-duration:' + (3 + Math.random() * 4) + 's;',
          'animation-delay:' + Math.random() * 2 + 's;',
          'width:' + (8 + Math.random() * 8) + 'px;',
          'height:' + (8 + Math.random() * 8) + 'px;',
          'opacity:0;',
          'animation:petal-fall linear infinite;',
        ].join('');
        petalLayer.appendChild(p);
      }
    }

    function clearPetals() {
      if (petalLayer) {
        petalLayer.remove();
        petalLayer = null;
      }
    }

    document.addEventListener('keydown', function (e) {
      // §19.8: disabled while typing in a field
      if (isTyping()) return;

      // Exit on Esc
      if (e.key === 'Escape') {
        if (active) {
          active = false;
          clearPetals();
          return;
        }
      }

      // Accumulate printable characters
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        buffer += e.key.toLowerCase();
        if (buffer.length > 20) buffer = buffer.slice(-20);

        if (buffer.includes('marigold')) {
          active = true;
          makePetals();
          showWhisper('The marigolds bloom for you.');
          buffer = '';
          // Petals settle after 5s
          setTimeout(function () {
            active = false;
            clearPetals();
            hideWhisper();
          }, 5000);
        }
      }
    });
  }

  /* -----------------------------------------------------------------------
     Easter Egg 3 — time-of-day:20:00..23:59 → midnight note
     ----------------------------------------------------------------------- */
  function initMidnightEgg() {
    function checkTime() {
      var h = new Date().getHours();
      var note = document.querySelector('.midnight-note');
      if (!note) return;
      if (h >= 20 && h < 24) {
        note.classList.add('is-visible');
      } else {
        note.classList.remove('is-visible');
      }
    }
    checkTime();
    // Re-check every minute
    setInterval(checkTime, 60000);
  }

  /* -----------------------------------------------------------------------
     Whisper — the small footer message for typed-word reward
     ----------------------------------------------------------------------- */
  function showWhisper(text) {
    var existing = document.querySelector('.footer-whisper');
    if (existing) existing.remove();
    var w = document.createElement('p');
    w.className = 'footer-whisper';
    w.textContent = text;
    w.setAttribute('role', 'status');
    w.setAttribute('aria-live', 'polite');
    document.body.appendChild(w);
  }

  function hideWhisper() {
    var w = document.querySelector('.footer-whisper');
    if (w) {
      w.style.opacity = '0';
      w.style.transition = 'opacity 800ms ease';
      setTimeout(function () {
        w.remove();
      }, 800);
    }
  }

  /* -----------------------------------------------------------------------
     Scroll-driven Catrina tip reveal — tie to scroll position
     ----------------------------------------------------------------------- */
  function initScrollCatrinaTips() {
    if (!window.IntersectionObserver) return;
    var tips = [
      { selector: '#hero', tip: 'Welcome. Every story is an ofrenda waiting to be honored.' },
      { selector: '#why-watch', tip: 'We gather to watch, to remember, to honor — together.' },
      {
        selector: '#the-offerings',
        tip: 'Each feature is a marigold petal — together they light the path home.',
      },
      {
        selector: '#gather-together',
        tip: 'The altar holds everything — 8 native features, 5 client paths.',
      },
      { selector: '#light-it', tip: 'One line of code. Your library becomes the ofrenda.' },
    ];

    if (!Catrina.sayEl) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var t = tips.find(function (x) {
              return x.selector === entry.target.id;
            });
            if (t) {
              Catrina.sayEl.textContent = t.tip;
              if (Catrina.bubble) Catrina.bubble.hidden = false;
              clearTimeout(Catrina._tipTimeout);
              Catrina._tipTimeout = setTimeout(function () {
                if (Catrina.bubble) Catrina.bubble.hidden = true;
              }, 4000);
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    tips.forEach(function (t) {
      var el = document.querySelector(t.selector);
      if (el) obs.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     Init all
     ----------------------------------------------------------------------- */
  function init() {
    activateSeasonalBanner();
    initNav();
    initScrollReveals();
    initIntensityToggle();
    Catrina.init();
    initLogoClickEgg();
    initTypedWordEgg();
    initMidnightEgg();
    initScrollCatrinaTips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
