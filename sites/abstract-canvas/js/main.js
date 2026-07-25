/**
 * MAIN.JS — Abstract Canvas
 *
 * Self-contained, dependency-free enhancement layer. Everything here is
 * optional: with JS off every page keeps its copy, its CTAs and — via
 * css/nojs.css — its navigation (hero_experience.js_budget_kb is 0).
 *
 * In kit order: navigation_model.fallback · scroll_experience ·
 * intensity_toggle · mascot.behavior · easter_eggs · seasonal_activation.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var root = document.documentElement;

  /* Wrapped because private mode throws on access. `store` outlives the tab
     (preferences); `session` survives one self-navigation (the logo egg). */
  function safeStore(which) {
    return {
      get: function (k) {
        try {
          return window[which].getItem(k);
        } catch {
          return null;
        }
      },
      set: function (k, v) {
        try {
          window[which].setItem(k, v);
        } catch {
          /* nothing to do: the feature is simply not persisted */
        }
      },
    };
  }

  var store = safeStore('localStorage');
  var session = safeStore('sessionStorage');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── page id, for the tip anchors ("home:#hero", "features:.feature-grid") ── */
  var file = window.location.pathname.split('/').pop() || 'index.html';
  var pageId = file === '' || file === 'index.html' ? 'home' : file.replace(/\.html$/, '');

  /* ══ navigation_model.fallback — standard topbar + labelled hamburger ══ */

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ══ scroll_experience — a settle, not a slide. Opacity only, and never
       when the visitor has asked for less motion. ══ */

  function revealsAllowed() {
    return !reduceMotion.matches && root.getAttribute('data-intensity') !== 'quiet';
  }

  var revealed = false;

  function startReveals() {
    if (revealed || !revealsAllowed() || !('IntersectionObserver' in window)) return;
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    revealed = true;
    root.classList.add('js-reveals');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ══ intensity_toggle — "Gallery quiet" ══ */

  var QUIET_KEY = 'phlix-ac-intensity';
  var quietBtn = document.querySelector('[data-intensity-toggle]');

  function applyIntensity(quiet) {
    if (quiet) root.setAttribute('data-intensity', 'quiet');
    else root.removeAttribute('data-intensity');
    if (quietBtn) quietBtn.setAttribute('aria-pressed', quiet ? 'true' : 'false');
  }

  applyIntensity(store.get(QUIET_KEY) === 'quiet');

  if (quietBtn) {
    quietBtn.addEventListener('click', function () {
      var quiet = quietBtn.getAttribute('aria-pressed') !== 'true';
      applyIntensity(quiet);
      store.set(QUIET_KEY, quiet ? 'quiet' : 'full');
      if (quiet) {
        root.classList.remove('js-reveals');
        document.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('is-visible');
        });
      }
    });
  }

  startReveals();

  /* §19.20 — a media query read once at load never sees the visitor change it.
     If reduced motion is switched ON mid-visit, every `.reveal` that has not yet
     crossed the observer would stay at `opacity: 0` for the rest of the visit:
     the preference would have cost the visitor content, which is exactly what
     §19.20 forbids. So drop the gate and paint everything instead. */
  function onMotionPreferenceChange() {
    if (reduceMotion.matches) {
      root.classList.remove('js-reveals');
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      startReveals();
    }
  }

  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', onMotionPreferenceChange);
  }

  /* ══ mascot.behavior — Palette, the studio companion ══
       Absent on the FAQ page and on the 404 (where Palette is the artwork),
       both marked with data-palette="off". Dismissal persists. */

  var PALETTE_KEY = 'phlix-ac-palette';
  var TIPS = {
    'home:#hero': 'Every frame is a brushstroke — start painting with your collection.',
    'home:.features-overview':
      "Watch together in perfect sync with SyncPlay. No buffering, no 'are we at the same part?'",
    'features:.feature-grid':
      'Live TV + DVR? A dash of canvas white and a mark of cadmium red — Phlix paints on any surface.',
    'download:#server':
      'One line to spin up the gallery. Palette knows the studio setup from memory.',
  };
  var PALETTE_ART =
    '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
    '<path d="M32 8c13 0 24 8 24 19 0 7-6 9-11 9-4 0-6 2-6 5 0 4 3 5 3 9 0 4-4 6-10 6C18 56 8 45 8 30 8 17 19 8 32 8z" stroke="#1A1A1A" stroke-width="3" stroke-linejoin="round" fill="#E8E4D8"/>' +
    '<circle cx="22" cy="22" r="4.5" fill="#CC2200"/>' +
    '<circle cx="35" cy="18" r="4" fill="#0055AA"/>' +
    '<circle cx="18" cy="35" r="4" fill="#8A8070"/>' +
    '<path d="M44 44c6 4 10 8 13 14" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>' +
    '</svg>';

  var palette = null;
  var bubble = null;
  var figure = null;

  /* The two `data-palette="off"` pages get an authored in-flow slot instead of a
     bubble, so a top-level `easter_eggs` reward is never conditional on the
     companion. See css/components.css `.egg-line`. */
  var eggSlot = document.querySelector('[data-egg-slot]');
  var wakeBtn = document.querySelector('[data-palette-wake]');

  function paletteAllowed() {
    return document.body.getAttribute('data-palette') !== 'off';
  }

  function showWake(show) {
    if (wakeBtn) wakeBtn.hidden = !show;
  }

  /* Nine seconds reads twice; a bubble parked forever sits on the footer row.
     `earned` = a line the visitor asked for (an egg reward, a reaction to
     touching Palette) and it holds against the unrequested scroll tips. */
  var SAY_MS = 9000;
  var sayTimer = null;
  var holdUntil = 0;

  /* One surface or the other, never both, and the same mechanism for each: the
     element stays in the document (a live region has to be in the accessibility
     tree before its content changes) and CSS collapses it while it is empty. */
  function writeLine(text) {
    var target = bubble || eggSlot;
    if (target) target.textContent = text;
  }

  function say(text, earned) {
    if (!bubble && !eggSlot) return;
    if (!earned && Date.now() < holdUntil) return;
    if (earned) holdUntil = Date.now() + SAY_MS;
    writeLine(text);
    /* Speaking changes the footprint, so re-measure — on the next frame, so the
       write and the read do not interleave (see `guardPalette`). */
    scheduleGuard();
    window.clearTimeout(sayTimer);
    if (text) {
      sayTimer = window.setTimeout(function () {
        writeLine('');
        scheduleGuard();
      }, SAY_MS);
    }
  }

  /* ══ §19.11 — Palette must never be painted over a control ══

       §19.11 asks for non-overlap, not non-existence, so the guard MOVES the
       companion and never removes it. `display: none` (ROUND-1's answer) deleted
       a declared kit field from every phone viewport, swallowed the
       `logo-clicks:5` reward whose only surface is the bubble, and blurred
       whichever of Palette's two buttons held focus.

       The move: walk the companion up its own edge to the nearest band that no
       control occupies, keeping it anchored to the bottom corner
       `mascot.behavior.placement` specifies. If the trailing edge has no clear
       band at this scroll position, try the leading edge before giving up. The
       lift is a CSS custom property, so the resting corner is the CSS default and
       a JS-less visitor sees the declared placement.

       Every control, every width — "the primary CTA" is whatever copy_overlay
       renamed it to, and a companion parked on a nav link is the same defect as
       one parked on a button.

       The selector is `tools/render-check.mjs`'s own control set plus `summary`.
       The `:not([tabindex="-1"])` is the fix that matters: a bare `[tabindex]`
       matched the mandated `main[tabindex="-1"]`, i.e. the whole page body, which
       is why the guard used to fire constantly. The install snippet
       (`pre.code-block[tabindex="0"]`) stays in, deliberately — it is a
       keyboard-reachable horizontal scroller, not decoration, and render-check
       fails the build when a fixed element is painted over it. */

  var CONTROLS =
    'a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';
  var GUARD_GAP = 8; /* clearance we insist on, px */
  var GUARD_STEPS = 8; /* bands to try per edge before conceding */
  var guardFrame = null;
  var guardTargets = null;
  var lift = 0;
  var sideStart = false;

  /* Smallest lift ≥ 0 at which the box [left, right] × [bottom - h, bottom] is
     clear of every rect in `rects`, or -1 if there is none below `minTop`. */
  function clearLift(rects, left, right, h, restBottom, minTop) {
    var l = 0;
    for (var step = 0; step < GUARD_STEPS; step++) {
      var bottom = restBottom - l;
      var top = bottom - h;
      if (top < minTop) return -1;
      var highest = -1;
      for (var i = 0; i < rects.length; i++) {
        var b = rects[i];
        if (
          b.left < right - 1 &&
          b.right > left + 1 &&
          b.top < bottom - 1 &&
          b.bottom > top + 1 &&
          (highest === -1 || b.top < highest)
        ) {
          highest = b.top;
        }
      }
      if (highest === -1) return l;
      var next = restBottom - highest + GUARD_GAP;
      if (next <= l) return -1;
      l = next;
    }
    return -1;
  }

  function guardPalette() {
    if (!palette) return;

    /* ── READ. Nothing below mutates the DOM until the write block, so all ~40
       rect reads share one layout instead of forcing a reflow apiece. */
    var box = palette.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) return;

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var header = document.querySelector('.site-header');
    var headerRect = header ? header.getBoundingClientRect() : null;

    if (!guardTargets) guardTargets = document.querySelectorAll(CONTROLS);
    var rects = [];
    for (var i = 0; i < guardTargets.length; i++) {
      var el = guardTargets[i];
      if (palette.contains(el)) continue;
      var b = el.getBoundingClientRect();
      if (b.width < 1 || b.height < 1) continue;
      if (b.bottom <= 0 || b.top >= vh) continue;
      rects.push(b);
    }

    /* ── COMPUTE. `restBottom` is where the bottom edge sits at lift 0; `edge` is
       the gutter the companion keeps from whichever edge it is anchored to. The
       sticky header out-stacks Palette (100 vs 90), so walking up behind it would
       hide the companion just as surely as `display: none` — hence `minTop`. */
    var h = box.height;
    var w = box.width;
    var edge = sideStart ? box.left : vw - box.right;
    var restBottom = box.bottom + lift;
    var minTop = Math.max(GUARD_GAP, (headerRect ? headerRect.bottom : 0) + GUARD_GAP);

    var wantSideStart = false;
    var wantLift = clearLift(rects, vw - edge - w, vw - edge, h, restBottom, minTop);

    if (wantLift < 0) {
      wantLift = clearLift(rects, edge, edge + w, h, restBottom, minTop);
      wantSideStart = wantLift >= 0;
    }

    if (wantLift < 0) {
      /* No clear band on either edge at this scroll position — a viewport that is
         wall-to-wall controls. Park as high as it can safely go: the calls to
         action live in the band nearest the bottom, so this is the position that
         clears the most important of them. Never measured on any of the 9 pages
         at any tested viewport; it exists so the fallback is a known place rather
         than whatever the last frame left behind. */
      wantSideStart = false;
      wantLift = Math.max(0, restBottom - minTop - h);
    }

    /* ── WRITE. One property and one class, and only when they change — and if
       either did change, come round once more. The pass above derives the resting
       edge from the live rect minus the lift it last wrote, so the frame in which
       a lift lands is the frame in which that arithmetic is trustworthy again; a
       second look is what makes the guard converge rather than settle for its
       first estimate. Unchanged geometry writes nothing and schedules nothing, so
       this terminates. */
    wantLift = Math.round(wantLift);
    var moved = false;
    if (wantLift !== lift) {
      lift = wantLift;
      palette.style.setProperty('--palette-lift', lift + 'px');
      moved = true;
    }
    if (wantSideStart !== sideStart) {
      sideStart = wantSideStart;
      palette.classList.toggle('is-side-start', sideStart);
      moved = true;
    }
    if (moved) scheduleGuard();
  }

  function scheduleGuard() {
    if (guardFrame) return;
    guardFrame = window.requestAnimationFrame(function () {
      guardFrame = null;
      guardPalette();
    });
  }

  /* ══ mascot.behavior.tips ══
       Anchored to their sections, and never pushed at a phone (§19.11). The gate
       is re-read every time an anchor scrolls into view and on resize — read once
       at build time it would deny a tip forever to a visitor who loaded narrow
       and then widened, and keep firing for one who narrowed (§19.20). The
       observers therefore stay connected and only the `said` flag is one-way. */

  var TIP_MAX_WIDTH = 700;
  var tipStates = [];

  function maybeTip() {
    if (!palette || window.innerWidth <= TIP_MAX_WIDTH) return;
    for (var i = 0; i < tipStates.length; i++) {
      if (tipStates[i].visible && !tipStates[i].said) {
        tipStates[i].said = true;
        say(TIPS[tipStates[i].key]);
        return;
      }
    }
  }

  function buildTips() {
    if (!('IntersectionObserver' in window)) return;
    Object.keys(TIPS).forEach(function (where) {
      var parts = where.split(':');
      if (parts[0] !== pageId) return;
      var target = document.querySelector(parts[1]);
      if (target) tipStates.push({ key: where, el: target, visible: false, said: false });
    });
    if (!tipStates.length) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          tipStates.forEach(function (state) {
            if (state.el === entry.target) state.visible = entry.isIntersecting;
          });
        });
        maybeTip();
      },
      { threshold: 0.35 },
    );
    tipStates.forEach(function (state) {
      io.observe(state.el);
    });
  }

  /* ══ Palette's own controls ══ */

  /* mascot.behavior.easter_interactions[1] — "hover-hold:2s". A hover is one of
     three ways to hold something: focus and a finger are the other two, and on a
     phone — where the companion lives at every width — hover does not exist at
     all. One timer, three ways to start it. */
  var HOLD_MS = 2000;
  var holdTimer = null;
  var holdFired = false;

  function startHold() {
    if (holdTimer) return;
    holdTimer = window.setTimeout(function () {
      holdTimer = null;
      holdFired = true;
      say(
        'Palette offers you its sable brush — a gift for the artist who understands the work.',
        true,
      );
    }, HOLD_MS);
  }

  function cancelHold() {
    window.clearTimeout(holdTimer);
    holdTimer = null;
  }

  /* A press has to do something. Four of every five presses of a button named
     "Palette, the studio companion" used to change nothing observable at all —
     no class, no text, nothing for a screen reader to announce. These are
     Palette's `expressions`, in kit voice, into the polite live region. */
  var ACKS = [
    'Palette turns, studying you the way a painter studies a subject.',
    'A wet cadmium mark trembles on the rim — Palette is listening.',
    'Palette tilts, absorbed in the work. Go on.',
    'Palette lifts its sable brush a little. Inviting: come look at this.',
  ];
  var ackAt = 0;

  function buildPalette() {
    if (!paletteAllowed() || palette) return;

    /* An <aside>, and a sibling of <main>: this companion is on 7 of 9 pages, so
       it is site furniture, not the dominant non-repeated content <main> is
       specified to hold. Last in <body> so its z-index: 90 lands above the footer
       without <main> needing one of its own. */
    palette = document.createElement('aside');
    palette.className = 'palette-companion';
    palette.setAttribute('aria-label', 'Palette, the studio companion');
    palette.innerHTML =
      '<p class="palette-bubble" role="status" aria-live="polite"></p>' +
      '<div class="palette-row">' +
      '<button class="palette-figure" type="button" aria-label="Palette, the studio companion">' +
      PALETTE_ART +
      '</button>' +
      '<button class="palette-dismiss" type="button" ' +
      'aria-label="Palette, rest for a moment">×</button>' +
      '</div>';
    document.body.appendChild(palette);

    bubble = palette.querySelector('.palette-bubble');
    figure = palette.querySelector('.palette-figure');
    lift = 0;
    sideStart = false;
    guardTargets = null;
    showWake(false);

    /* mascot.behavior.dismiss. Removing the element that holds focus is the same
       SC 2.4.3 defect as hiding it, so focus moves deliberately to the control
       that undoes this — scrolling to it only when the press came from a
       keyboard (a click synthesised from Enter/Space reports `detail === 0`), so
       a thumb on the × does not throw the page down to the footer. */
    palette.querySelector('.palette-dismiss').addEventListener('click', function (e) {
      var fromKeyboard = e.detail === 0;
      cancelHold();
      palette.remove();
      palette = null;
      bubble = null;
      figure = null;
      store.set(PALETTE_KEY, 'rest');
      showWake(true);
      if (wakeBtn) wakeBtn.focus({ preventScroll: !fromKeyboard });
    });

    /* mascot.behavior.easter_interactions[0] — five clicks on Palette */
    var clicks = 0;
    var clickTimer = null;
    figure.addEventListener('click', function () {
      cancelHold();
      if (holdFired) {
        /* The press that ended a 2s finger-hold already had its reward. */
        holdFired = false;
        return;
      }
      clicks += 1;
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(function () {
        clicks = 0;
      }, 1800);
      if (clicks >= 5) {
        clicks = 0;
        figure.classList.add('is-settling', 'is-glowing');
        say('Palette spins, sets itself down, and gives you an approving look.', true);
        window.setTimeout(function () {
          if (figure) figure.classList.remove('is-settling');
        }, 900);
        return;
      }
      say(ACKS[ackAt % ACKS.length], true);
      ackAt += 1;
    });

    figure.addEventListener('mouseenter', startHold);
    figure.addEventListener('mouseleave', cancelHold);
    figure.addEventListener('focus', startHold);
    figure.addEventListener('blur', cancelHold);
    figure.addEventListener('pointerdown', startHold);
    figure.addEventListener('pointerup', cancelHold);
    figure.addEventListener('pointercancel', cancelHold);

    guardPalette();
    maybeTip();
  }

  /* An egg may not be conditional on a preference about the mascot, so a reward
     wakes a tucked-away Palette for this page view — WITHOUT clearing the stored
     'rest', because mascot.behavior.dismiss asks for that preference to persist.
     The footer control is the one thing that clears it. */
  function ensurePalette() {
    if (palette) return true;
    if (!paletteAllowed()) return false;
    buildPalette();
    return !!palette;
  }

  if (paletteAllowed() && store.get(PALETTE_KEY) !== 'rest') buildPalette();
  else showWake(paletteAllowed());

  buildTips();

  if (wakeBtn) {
    wakeBtn.addEventListener('click', function () {
      store.set(PALETTE_KEY, 'full');
      buildPalette();
      if (figure) figure.focus();
      say('Palette picks its brush back up, still a little paint-stained.', true);
    });
  }

  /* §19.11 — keep the companion clear of every control, at every scroll position
     and every width. Registered once, at module scope: `buildPalette` can run
     again when Palette is woken, and a second pair of listeners would be a leak.
     A resize invalidates the cached control list as well as the geometry.

     Scroll and resize are not the only things that move a button. `font-display:
     swap` re-lays out the whole page tens of milliseconds after the first guard
     pass; opening a `<details>` moves everything below it; an image finishing
     decode does the same. Measured: without the observer the companion settled
     12px short at 375×667 on the home page and, because nothing scrolled, stayed
     there — 2×4px onto the primary CTA. So watch the document box itself, and
     re-check when the fonts land. Palette is `position: fixed`, so moving it
     never changes the box being observed: no feedback loop. */
  window.addEventListener('scroll', scheduleGuard, { passive: true });
  window.addEventListener('resize', function () {
    guardTargets = null;
    scheduleGuard();
    maybeTip();
  });
  window.addEventListener('load', scheduleGuard);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleGuard).observe(document.body);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleGuard);

  /* ══ easter_eggs ══
       Both are inert for anyone who does not go looking, never shadow a
       browser or assistive-technology shortcut, and exit on Esc. */

  /* easter_eggs[0] — logo-clicks:5. The wordmark is a link named "Phlix home"
     and it stays one: an egg does not license `preventDefault()`, which killed
     both click and Enter. The count rides in sessionStorage across the
     self-navigation and expires after 20s, so it rewards a flurry. */
  var LOGO_KEY = 'phlix-ac-logo-clicks';
  var LOGO_WINDOW = 20000;
  var logo = document.querySelector('.nav-logo');

  function logoClicks() {
    var parts = (session.get(LOGO_KEY) || '').split(':');
    var count = parseInt(parts[0], 10);
    var at = parseInt(parts[1], 10);
    if (!count || !at || Date.now() - at > LOGO_WINDOW) return 0;
    return count;
  }

  if (logo && pageId === 'home') {
    if (logoClicks() >= 5) {
      session.set(LOGO_KEY, '');
      ensurePalette(); /* a tucked-away companion is not a reason to lose a reward */
      if (figure) {
        figure.classList.add('is-settling', 'is-glowing');
        window.setTimeout(function () {
          if (figure) figure.classList.remove('is-settling');
        }, 900);
      }
      say('The work is well-made — keep painting.', true);
      window.setTimeout(clearEggs, 4000);
    }

    logo.addEventListener('click', function () {
      session.set(LOGO_KEY, logoClicks() + 1 + ':' + Date.now());
      /* No preventDefault, no return false: the link navigates. */
    });
  }

  /* easter_eggs[1] — typed-word:palette. Never captures keys while the
     visitor is typing in a field, and never calls preventDefault. */
  var typed = '';
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      clearEggs();
      if (menu && menu.classList.contains('is-open')) {
        setMenu(false);
        if (toggle) toggle.focus();
      }
      return;
    }
    var el = document.activeElement;
    if (el && (el.matches('input, textarea, select') || el.isContentEditable)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-7);
    if (typed.indexOf('palette') !== -1) {
      typed = '';
      ensurePalette();
      if (figure) figure.classList.add('is-lifted');
      say(
        'Palette recognizes its own name — you are a true artist. (Esc to set it back down.)',
        true,
      );
    }
  });

  /* The declared `exit` for both eggs. Unlike the §19.11 guard — which must never
     touch the line, only the box around it — clearing here is what the visitor
     asked for, so the hold is released with it. */
  function clearEggs() {
    if (figure) figure.classList.remove('is-lifted', 'is-glowing', 'is-settling');
    holdUntil = 0;
    window.clearTimeout(sayTimer);
    writeLine('');
    scheduleGuard();
  }

  /* ══ seasonal_activation — mode "live-js" ══
       The season is a date range, not a build flag: the tokens each variant
       declares are applied in the browser, so no rebuild is needed. Append
       ?season=<slug> to preview one out of season. */

  var SEASONS = [
    {
      slug: 'autumn-study',
      from: '10-01',
      to: '11-15',
      tokens: {
        '--color-primary': '#8B3A00',
        '--color-secondary': '#CC6600',
        '--color-bg': '#F2EBD8',
      },
    },
    {
      slug: 'winter-white',
      from: '12-01',
      to: '01-15',
      tokens: {
        '--color-bg': '#F8F6F2',
        '--color-surface': '#EFECE4',
        '--color-secondary': '#003399',
      },
    },
    {
      slug: 'spring-opening',
      from: '03-15',
      to: '05-15',
      tokens: {
        '--color-secondary': '#AA2288',
        '--color-tertiary': '#007744',
      },
    },
  ];

  function inRange(md, from, to) {
    // A range that wraps the new year (12-01..01-15) is two ranges.
    return from <= to ? md >= from && md <= to : md >= from || md <= to;
  }

  function activeSeason() {
    var forced = /[?&]season=([a-z-]+)/.exec(window.location.search);
    var now = new Date();
    var md =
      String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    for (var i = 0; i < SEASONS.length; i++) {
      if (forced ? SEASONS[i].slug === forced[1] : inRange(md, SEASONS[i].from, SEASONS[i].to)) {
        return SEASONS[i];
      }
    }
    return null;
  }

  /* Attribute and tokens only. The banner is an authored `<aside aria-label="Seasonal
     note">` on every page, kept `display: none` by css/theme.css until `data-season`
     appears — which is also where the declared `motif_assets` mark is attached.
     Nothing is inserted after first paint, and because the banner precedes
     `<header role="banner">` it is a labelled landmark of its own rather than a run
     of content belonging to none. */
  var season = activeSeason();
  if (season) {
    root.setAttribute('data-season', season.slug);
    Object.keys(season.tokens).forEach(function (token) {
      root.style.setProperty(token, season.tokens[token]);
    });
  }

  /* ══ 404 — show the address that was asked for, once we can read it ══ */

  var pathSlot = document.querySelector('[data-requested-path]');
  if (pathSlot) {
    pathSlot.textContent = window.location.pathname;
    pathSlot.hidden = false;
  }
})();
