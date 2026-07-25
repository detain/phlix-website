/* ==========================================================================
   DOTTY.JS — Pop Art Explosion
   mascot.behavior: the on-page companion. Loaded ONLY on home, features,
   clients and download — the kit says "never on docs or about (reading
   pages)", so those pages do not even fetch this file.
     • placement  — bottom-right fixture at >= 62rem, in flow above the footer
                    below that (new_site.md §19.11 / §19.14)
     • idle       — a gentle bob (CSS) plus an occasional KAPOW! thought
                    bubble, both dropped when motion is off
     • tips       — the five contextual tips, keyed to page + anchor. Offered,
                    never pushed: nothing opens before the visitor's first
                    scroll, and nothing auto-opens on a phone at all
     • easter     — click:5 → confetti + "SUPERSTAR!"; hover-hold:2s → a wink
     • dismiss    — "Dotty, take five" persists to localStorage, and the footer
                    carries a matching restore control (§19.21)
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  var root = document.querySelector('[data-dotty]');
  if (!root) return;

  var figure = root.querySelector('[data-dotty-figure]');
  var panel = root.querySelector('[data-dotty-panel]');
  var say = root.querySelector('[data-dotty-say]');
  var badge = root.querySelector('[data-dotty-badge]');
  var STORE = 'phlix-pop-dotty';
  var page = document.body.getAttribute('data-page');

  /* mascot.behavior.tips — verbatim, except tips[3] where the kit's "Five
     clients" is corrected against content.json: four native clients plus any
     DLNA device (new_site.md §19.14). */
  var TIPS = {
    home: [
      { at: '#starburst-intro', say: 'Press play and the dots start pulsing. WHAM!' },
      {
        at: '.features-overview',
        say: 'Psst… SyncPlay keeps every seat in sync — same frame, same moment.',
      },
    ],
    features: [
      { at: '#syncplay', say: 'Movie night stops for nobody — NTP time-sync is the secret sauce.' },
    ],
    clients: [
      { at: null, say: 'Four native clients, plus any DLNA device. Pick your screen and BOOM!' },
    ],
    download: [{ at: '#server', say: "One line and you're screaming. Copy, paste, POW!" }],
  };

  var greetings = [
    'POW! Good to see you.',
    'You’re back. The dots approve.',
    'ZAP! Ready when you are.',
  ];
  var tips = TIPS[page] || [];
  var queue = [];
  var scrolled = false;
  var closeTimer = null;

  function motionOff() {
    return document.documentElement.classList.contains('motion-off');
  }

  function desktop() {
    return window.matchMedia('(width >= 62rem)').matches;
  }

  /* §19.11: a fixed companion must never paint itself over a control. Dotty's
     tip panel opens up-and-left from the bottom-right corner, and the footer
     reaches that corner — the utility row there carries "Dim the lights" AND
     Dotty's own "Bring Dotty back" button, so an auto-opened tip could cover the
     one control that undoes dismissing her. While any part of the footer is on
     screen a tip is therefore only ADVERTISED (the badge), never auto-opened;
     clicking Dotty still opens it, which is the visitor asking for it. */
  function footerOnScreen() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return false;
    var box = footer.getBoundingClientRect();
    return box.bottom > 0 && box.top < (window.innerHeight || 0);
  }

  /* ── dismissal ─────────────────────────────────────────────────────────
     The kit explicitly asks for localStorage persistence, so §19.21's
     "prefer session scope" yields — but the restore control is mandatory,
     and it lives in the footer utility row of every page that has Dotty. */
  function stored() {
    try {
      return window.localStorage.getItem(STORE);
    } catch {
      return null;
    }
  }

  function remember(v) {
    try {
      if (v) window.localStorage.setItem(STORE, v);
      else window.localStorage.removeItem(STORE);
    } catch {
      /* nothing to do: dismissal then lasts for this visit only */
    }
  }

  /* true while the panel on screen was opened by Dotty rather than by the
     visitor — the only case we are allowed to close again on their behalf. */
  var autoOpened = false;

  function shutPanel() {
    panel.hidden = true;
    figure.setAttribute('aria-expanded', 'false');
    autoOpened = false;
    window.clearTimeout(closeTimer);
  }

  function openPanel(text, life) {
    say.textContent = text;
    panel.hidden = false;
    figure.setAttribute('aria-expanded', 'true');
    badge.hidden = true;
    window.clearTimeout(closeTimer);
    if (life) closeTimer = window.setTimeout(shutPanel, life);
  }

  if (stored() === 'off') {
    root.hidden = true;
  }

  /* ── the figure ────────────────────────────────────────────────────────
     click:1 opens the pending tip (or a greeting); click:5 in quick
     succession is mascot.behavior.easter_interactions[0]. */
  var hits = 0;
  var hitReset = null;

  figure.addEventListener('click', function () {
    hits += 1;
    window.clearTimeout(hitReset);
    hitReset = window.setTimeout(function () {
      hits = 0;
    }, 3000);

    if (hits >= 5) {
      hits = 0;
      openPanel('SUPERSTAR!', 4200);
      confetti();
      return;
    }

    if (figure.getAttribute('aria-expanded') === 'true') {
      shutPanel();
      return;
    }

    var next = queue.shift();
    openPanel(next || greetings[Math.floor(Math.random() * greetings.length)], 0);
  });

  /* easter_interactions[1] — hover-hold:2s. Also wired to focus, so a
     keyboard visitor can earn it too. */
  var holdTimer = null;
  function startHold() {
    window.clearTimeout(holdTimer);
    holdTimer = window.setTimeout(function () {
      root.classList.add('is-winking');
      openPanel('You’ve got good taste.', 3600);
      window.setTimeout(function () {
        root.classList.remove('is-winking');
      }, 900);
    }, 2000);
  }
  function endHold() {
    window.clearTimeout(holdTimer);
  }
  figure.addEventListener('mouseenter', startHold);
  figure.addEventListener('mouseleave', endHold);
  figure.addEventListener('focus', startHold);
  figure.addEventListener('blur', endHold);

  /* red/yellow dot confetti. Under motion-off the reward still arrives — the
     dots simply appear and clear without drifting (§19.20). */
  function confetti() {
    var stage = document.createElement('div');
    stage.className = 'egg egg--confetti';
    stage.setAttribute('aria-hidden', 'true');
    var bits = '';
    for (var i = 0; i < 22; i += 1) {
      var left = Math.round(Math.random() * 96);
      var delay = Math.round(Math.random() * 400);
      var fill = i % 2 ? 'var(--color-secondary)' : 'var(--color-primary)';
      bits +=
        '<i style="left:' +
        left +
        '%;animation-delay:' +
        delay +
        'ms;background:' +
        fill +
        '"></i>';
    }
    stage.innerHTML = bits;
    document.body.appendChild(stage);
    window.setTimeout(function () {
      if (stage.parentNode) stage.parentNode.removeChild(stage);
    }, 1800);
  }

  root.querySelector('[data-dotty-close]').addEventListener('click', function () {
    shutPanel();
    figure.focus();
  });

  root.querySelector('[data-dotty-dismiss]').addEventListener('click', function () {
    shutPanel();
    root.hidden = true;
    remember('off');
    var restore = document.querySelector('[data-dotty-restore]');
    if (restore) restore.focus();
  });

  document.addEventListener('phlix:dotty-restore', function () {
    remember(null);
    root.hidden = false;
    openPanel('BAM! Back on the wall.', 3200);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && figure.getAttribute('aria-expanded') === 'true') shutPanel();
  });

  /* ── contextual tips ──────────────────────────────────────────────────
     A tip becomes available when its target scrolls into view. It is then
     advertised by the badge; on a wide viewport it also opens itself, but
     never before the first scroll — so nothing is ever painted over a
     control the visitor has not moved past yet, and phones are never
     interrupted (§19.14). */
  function offer(text) {
    if (root.hidden) return;
    if (figure.getAttribute('aria-expanded') === 'true') return;
    if (desktop() && scrolled && !footerOnScreen()) {
      autoOpened = true;
      openPanel(text, 9000);
      return;
    }
    queue.push(text);
    badge.hidden = false;
    badge.textContent = String(queue.length);
  }

  window.addEventListener(
    'scroll',
    function () {
      scrolled = true;
    },
    { passive: true, once: true },
  );

  /* Scrolling on into the footer while an auto-opened tip is still up would put
     it over those same controls, so it stands down and goes back to the badge —
     the tip itself is never lost. A panel the visitor opened is left alone. */
  window.addEventListener(
    'scroll',
    function () {
      if (!autoOpened || !footerOnScreen()) return;
      var text = say.textContent;
      shutPanel();
      queue.push(text);
      badge.hidden = false;
      badge.textContent = String(queue.length);
    },
    { passive: true },
  );

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i += 1) {
          if (!entries[i].isIntersecting) continue;
          var text = entries[i].target.getAttribute('data-tip');
          io.unobserve(entries[i].target);
          if (text) offer(text);
        }
      },
      { threshold: 0.35 },
    );
    for (var t = 0; t < tips.length; t += 1) {
      var target = tips[t].at ? document.querySelector(tips[t].at) : null;
      if (target) {
        target.setAttribute('data-tip', tips[t].say);
        io.observe(target);
      } else {
        /* a page-level tip (clients) — offered on the first scroll instead */
        (function (text) {
          window.addEventListener(
            'scroll',
            function () {
              window.setTimeout(function () {
                offer(text);
              }, 600);
            },
            { passive: true, once: true },
          );
        })(tips[t].say);
      }
    }
  }

  /* ── idle: the occasional tiny KAPOW! thought bubble ──────────────────
     mascot.behavior.idle. Wide viewports only, after the first scroll, never
     while the panel is open, and never when motion is off. */
  var pip = root.querySelector('[data-dotty-pip]');
  if (pip) {
    window.setInterval(function () {
      if (!pip || root.hidden || motionOff() || !desktop() || !scrolled) return;
      if (figure.getAttribute('aria-expanded') === 'true') return;
      pip.hidden = false;
      window.setTimeout(function () {
        pip.hidden = true;
      }, 1600);
    }, 15000);
  }
})();
