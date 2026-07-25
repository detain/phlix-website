/**
 * experience.js — Neon Noir kit-declared surfaces.
 *
 *   hero_experience      playable-vignette (neon sign cycles, Lux shifts pose,
 *                        each pose lights one more lead line)
 *   mascot.behavior      Lux: section-keyed tip, two reactions, dismissal
 *   easter_eggs          logo-clicks:5 and typed-word:shadow
 *   intensity_toggle     "Case closed (calm mode)"
 *   seasonal_activation  live-js date gate over seasonal_variants
 *   conversion_funnel    copy-the-token affordance on the install snippet
 *
 * Every surface here is an ENHANCEMENT. All copy it reveals is already in the
 * markup, so the page carries the same information with JS disabled.
 * Nothing animates when prefers-reduced-motion or calm mode is set.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) {
      try {
        return window.localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set: function (k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch {
        /* private mode — the feature just does not persist */
      }
    },
  };

  /* ======================================================================
     1. intensity_toggle — the lights-out switch
     ====================================================================== */

  var calmBtn = document.querySelector('.intensity-toggle');

  function applyCalm(on) {
    if (on) {
      root.setAttribute('data-intensity', 'calm');
    } else {
      root.setAttribute('data-intensity', 'full');
    }
    if (calmBtn) {
      calmBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var state = calmBtn.querySelector('.intensity-toggle__state');
      if (state) state.textContent = on ? 'Lights out' : 'Neon on';
    }
    window.dispatchEvent(new CustomEvent('phlix:calm', { detail: { calm: on } }));
  }

  if (store.get('phlix-noir-intensity') === 'calm') applyCalm(true);

  if (calmBtn) {
    calmBtn.addEventListener('click', function () {
      var on = root.getAttribute('data-intensity') !== 'calm';
      applyCalm(on);
      store.set('phlix-noir-intensity', on ? 'calm' : 'full');
    });
  }

  function quiet() {
    return (
      root.getAttribute('data-intensity') === 'calm' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /* ======================================================================
     2. hero_experience — playable vignette
     Poses 0-2. Pose n lights lead n. Without this file every lead is lit and
     the sign is fully on, which is the declared fallback.
     ====================================================================== */

  var stage = document.querySelector('[data-vignette]');

  if (stage) {
    var art = document.querySelector('[data-pose-art]');
    var leads = [].slice.call(stage.querySelectorAll('.vignette__lead'));
    var advance = stage.querySelector('.vignette__advance');
    var pose = 0;
    var last = 0;

    var paint = function () {
      leads.forEach(function (lead, i) {
        lead.setAttribute('data-state', i <= pose ? 'lit' : 'dim');
      });
      if (art) art.setAttribute('data-pose', String(pose));
      if (advance) {
        var done = pose >= leads.length - 1;
        advance.disabled = done;
        advance.textContent = done ? 'The sign holds steady' : 'Follow the next lead';
      }
    };

    var step = function () {
      if (pose >= leads.length - 1) return;
      pose += 1;
      paint();
    };

    paint();

    if (advance) advance.removeAttribute('hidden');
    if (advance) advance.addEventListener('click', step);

    if (art) {
      art.addEventListener('click', step);
      art.addEventListener('pointerenter', function () {
        var now = Date.now();
        if (quiet() || now - last < 900) return;
        last = now;
        step();
      });
    }
  }

  /* ======================================================================
     3. mascot.behavior — Lux
     ====================================================================== */

  var lux = document.querySelector('.lux');

  if (lux) {
    var recall = document.querySelector('.lux-recall');
    var react = lux.querySelector('.lux__react');
    var figure = lux.querySelector('.lux__figure');
    var keyed = lux.getAttribute('data-tip-for');

    var show = function (msg) {
      if (react) react.textContent = msg;
    };

    var setAway = function (away) {
      if (away) {
        lux.setAttribute('hidden', '');
      } else {
        lux.removeAttribute('hidden');
      }
      if (recall) {
        if (away) {
          recall.removeAttribute('hidden');
        } else {
          recall.setAttribute('hidden', '');
        }
      }
    };

    if (store.get('phlix-noir-lux') === 'away') setAway(true);

    var dismiss = lux.querySelector('.lux__dismiss');
    if (dismiss) {
      dismiss.removeAttribute('hidden');
      dismiss.addEventListener('click', function () {
        setAway(true);
        store.set('phlix-noir-lux', 'away');
      });
    }

    if (recall) {
      recall.addEventListener('click', function () {
        setAway(false);
        store.set('phlix-noir-lux', 'here');
        var summary = lux.querySelector('.lux__tip > summary');
        if (summary) summary.focus();
      });
    }

    // Tip keyed to a page section: cue it only while that section is in view.
    var section = keyed ? document.getElementById(keyed) : null;
    if (section && 'IntersectionObserver' in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            lux.classList.toggle('is-cued', entry.isIntersecting);
          });
        },
        { threshold: 0.12 },
      ).observe(section);
    }

    // easter_interactions[0] — click:3
    var clicks = 0;
    if (figure) {
      figure.addEventListener('click', function () {
        clicks += 1;
        if (clicks % 3 === 0) {
          show('Lux tips his fedora slowly and nods. "I see you’re paying attention."');
        }
      });

      // easter_interactions[1] — hover-hold:3s
      var hold = null;
      figure.addEventListener('pointerenter', function () {
        hold = window.setTimeout(function () {
          show('Lux lights a cigarette against the neon and exhales. "Patience. Good trait."');
        }, 3000);
      });
      figure.addEventListener('pointerleave', function () {
        if (hold) window.clearTimeout(hold);
        hold = null;
      });
    }
  }

  /* ======================================================================
     4. easter_eggs
     ====================================================================== */

  var note = document.querySelector('.egg-note');
  var noteBody = note ? note.querySelector('.egg-note__body') : null;
  var noteTimer = null;

  function sayEgg(html, ms) {
    if (!note || !noteBody) return;
    noteBody.innerHTML = html;
    note.removeAttribute('hidden');
    if (noteTimer) window.clearTimeout(noteTimer);
    noteTimer = window.setTimeout(clearEggs, ms);
  }

  function clearEggs() {
    if (noteTimer) window.clearTimeout(noteTimer);
    noteTimer = null;
    if (note) note.setAttribute('hidden', '');
    root.removeAttribute('data-egg');
    var logo = document.querySelector('.nav-logo');
    if (logo) logo.classList.remove('is-pulsing');
  }

  // easter_eggs[0] — logo-clicks:5. A single click still navigates; only a
  // rapid multi-click run (MouseEvent.detail >= 2) is held back, so the
  // wordmark never stops being a working link to the home page.
  var logoLink = document.querySelector('.nav-logo');
  if (logoLink) {
    logoLink.addEventListener('click', function (e) {
      if (e.detail >= 2) e.preventDefault();
      if (e.detail === 5 && !quiet()) {
        logoLink.classList.add('is-pulsing');
        sayEgg('Case noted. <code>NOIR</code>', 3000);
      }
    });
  }

  // easter_eggs[1] — typed-word:shadow. Never calls preventDefault, and stays
  // inert while focus is in a field so it can never swallow typing.
  var typed = '';
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      clearEggs();
      return;
    }

    var el = e.target;
    if (
      el &&
      (el.isContentEditable ||
        /^(input|textarea|select)$/i.test(el.tagName || '') ||
        (el.closest && el.closest('[contenteditable="true"]')))
    ) {
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;

    typed = (typed + e.key.toLowerCase()).slice(-6);
    if (typed === 'shadow' && !quiet()) {
      root.setAttribute('data-egg', 'shadow');
      sayEgg('You’ve got the eye for details.', 8000);
      typed = '';
    }
  });

  /* ======================================================================
     5. seasonal_activation — live-js date gate
     ====================================================================== */

  var VARIANTS = [
    {
      id: 'midnight-new-year',
      name: 'Midnight New Year',
      from: '12-28',
      to: '01-03',
      motif: 'img/seasonal/champagne-countdown.svg',
      alt: 'Champagne flute silhouette against a magenta neon countdown clock',
    },
    {
      id: 'blood-moon-october',
      name: 'Blood Moon October',
      from: '10-01',
      to: '10-31',
      motif: 'img/seasonal/blood-moon-rooftops.svg',
      alt: 'Crescent moon silhouette over rainy rooftops in crimson neon',
    },
    {
      id: 'valentines-neon',
      name: "Valentine's Neon",
      from: '02-10',
      to: '02-14',
      motif: 'img/seasonal/valentine-neon-hearts.svg',
      alt: 'Neon heart sign flickering above a city roofline',
    },
  ];

  function inRange(md, from, to) {
    return from <= to ? md >= from && md <= to : md >= from || md <= to;
  }

  var slot = document.querySelector('[data-season-slot]');
  if (slot) {
    var now = new Date();
    var md =
      String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

    for (var i = 0; i < VARIANTS.length; i += 1) {
      var v = VARIANTS[i];
      if (!inRange(md, v.from, v.to)) continue;

      root.setAttribute('data-season', v.id);

      var banner = document.createElement('div');
      banner.className = 'season-banner';
      banner.setAttribute('role', 'note');

      var img = document.createElement('img');
      img.src = v.motif;
      img.alt = v.alt;
      img.width = 32;
      img.height = 32;
      banner.appendChild(img);

      var text = document.createElement('p');
      text.textContent =
        'A seasonal variant is now live — the case has changed color for the occasion. (' +
        v.name +
        ')';
      banner.appendChild(text);

      slot.appendChild(banner);
      break;
    }
  }

  /* ======================================================================
     6. conversion_funnel — copy the clearance token
     ====================================================================== */

  var copyBtn = document.querySelector('.copy-token');
  if (copyBtn && navigator.clipboard) {
    var target = document.getElementById(copyBtn.getAttribute('data-copies'));
    copyBtn.removeAttribute('hidden');
    copyBtn.addEventListener('click', function () {
      if (!target) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(
        function () {
          copyBtn.textContent = 'Copied';
          window.setTimeout(function () {
            copyBtn.textContent = 'Copy';
          }, 2000);
        },
        function () {
          copyBtn.textContent = 'Copy failed — select it by hand';
        },
      );
    });
  }
})();
