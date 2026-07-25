/* ==========================================================================
   MAIN.JS — Pop Art Explosion
   Hand-written, dependency-free. Implements, in order:
     • navigation_model  — topbar + hamburger, Alt+M, arrow keys
     • scroll_experience — panel-sequence comic-page wipes + the sequence rail
     • hero_experience   — the playable starburst vignette (KAPOW → ZAP → POW)
     • intensity_toggle  — "Dim the lights", persisted
     • seasonal_activation (mode: "live-js") — the date gate + motif
     • easter_eggs       — logo-clicks:5, typed-word:dots, typed-word:kapow
     • the install one-liner's copy button
   Every motion path is gated on prefers-reduced-motion AND on the intensity
   toggle, and re-checked whenever either changes. Reduced motion removes
   MOTION ONLY: no reward, tip or piece of content is ever withheld by it
   (new_site.md §19.20).
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  var html = document.documentElement;
  var STORE_INTENSITY = 'phlix-pop-intensity';

  /* ----------------------------------------------------------------------
     0. Motion state — one source of truth, two inputs.
        accessibility.motion_reduction + intensity_toggle.affects[]
     ---------------------------------------------------------------------- */
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var dimmed = false;
  try {
    dimmed = window.localStorage.getItem(STORE_INTENSITY) === 'dim';
  } catch {
    dimmed = false; /* private mode: default to the kit's "full" intensity */
  }

  function motionOff() {
    return mqReduce.matches || dimmed;
  }

  var motionListeners = [];
  function onMotionChange(fn) {
    motionListeners.push(fn);
  }
  function syncMotion() {
    html.classList.toggle('motion-off', motionOff());
    html.classList.toggle('js-wipe', !motionOff() && 'IntersectionObserver' in window);
    for (var i = 0; i < motionListeners.length; i += 1) motionListeners[i](motionOff());
  }
  /* A media query read once at load never sees the visitor change the OS
     setting mid-session (§19.20). */
  if (mqReduce.addEventListener) mqReduce.addEventListener('change', syncMotion);

  /* ----------------------------------------------------------------------
     1. navigation_model.mode: "topbar"
        The hamburger ships `hidden` and is unhidden here, so with JS off the
        menu is simply already open and every link is reachable — and the
        aria-expanded state only ever exists while real behaviour backs it.
     ---------------------------------------------------------------------- */
  (function nav() {
    var header = document.querySelector('.site-header');
    var toggle = header && header.querySelector('.nav-toggle');
    var menu = header && header.querySelector('.nav-menu');
    if (!header || !toggle || !menu) return;

    toggle.hidden = false;
    header.setAttribute('data-nav', 'closed');
    toggle.setAttribute('aria-expanded', 'false');

    function setOpen(open) {
      header.setAttribute('data-nav', open ? 'open' : 'closed');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', function (e) {
      if (header.getAttribute('data-nav') !== 'open') return;
      if (header.contains(e.target)) return;
      setOpen(false);
    });

    /* navigation_model.keyboard: "Alt+M focuses the nav menu; arrow keys move
       between links." Alt+M is not a browser or screen-reader shortcut. */
    document.addEventListener('keydown', function (e) {
      if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 'm' || e.key === 'M')) {
        setOpen(true);
        var first = menu.querySelector('a');
        if (first) first.focus();
        return;
      }
      if (e.key === 'Escape' && header.getAttribute('data-nav') === 'open') {
        setOpen(false);
        toggle.focus();
      }
    });

    menu.addEventListener('keydown', function (e) {
      if (
        e.key !== 'ArrowRight' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowDown' &&
        e.key !== 'ArrowUp'
      )
        return;
      var links = [].slice.call(menu.querySelectorAll('a'));
      var at = links.indexOf(document.activeElement);
      if (at === -1) return;
      var next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? at + 1 : at - 1;
      if (next < 0) next = links.length - 1;
      if (next >= links.length) next = 0;
      links[next].focus();
    });
  })();

  /* ----------------------------------------------------------------------
     2. scroll_experience.mode: "panel-sequence"
        Each panel arrives as a hard left→right wipe with a Ben-Day dust
        trail. Everything below is additive: the un-scripted page is already
        fully visible, and a 1.2s safety net reveals any panel the observer
        never reported.
     ---------------------------------------------------------------------- */
  (function panels() {
    var seq = [].slice.call(document.querySelectorAll('.panel[data-seq]'));
    if (!seq.length) return;

    function turnAll() {
      for (var i = 0; i < seq.length; i += 1) seq[i].classList.add('is-turned');
    }

    if (!('IntersectionObserver' in window)) {
      turnAll();
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i += 1) {
          if (!entries[i].isIntersecting) continue;
          entries[i].target.classList.add('is-turned');
          io.unobserve(entries[i].target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );
    for (var i = 0; i < seq.length; i += 1) io.observe(seq[i]);

    window.setTimeout(turnAll, 1200);
    onMotionChange(function (off) {
      if (off) turnAll();
    });
  })();

  /* The sequence rail: how far through the panel sequence you are. Drawn on
     the header's own bottom border, so it can never sit over a control. */
  (function rail() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var queued = false;
    function paint() {
      queued = false;
      var doc = document.documentElement;
      var span = doc.scrollHeight - window.innerHeight;
      var pct = span > 0 ? Math.min(100, Math.max(0, (window.scrollY / span) * 100)) : 0;
      header.style.setProperty('--progress', pct.toFixed(2) + '%');
    }
    window.addEventListener(
      'scroll',
      function () {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(paint);
      },
      { passive: true },
    );
    paint();
  })();

  /* ----------------------------------------------------------------------
     3. hero_experience.mode: "playable-vignette"
        "click or tap to trigger a sequence: red KAPOW → yellow ZAP → blue
        POW, each rotating around a central motif illustration. The headline
        animates in on the last burst."
        The fallback (all three bursts + the full headline) is the CSS default,
        so this only ever adds motion. js_budget_kb: 4 — this is ~1.2 KB.
     ---------------------------------------------------------------------- */
  (function vignette() {
    var stage = document.querySelector('[data-stage]');
    if (!stage) return;
    var hero = document.querySelector('.hero');
    var orbit = stage.querySelector('.stage__orbit');
    var spins = 0;
    var timer = null;

    stage.setAttribute('data-vignette', 'ready');

    function play() {
      if (motionOff()) {
        /* Motion is off, so the burst does not animate — but the visitor still
           gets a response: the trio re-arranges to a new angle instantly. */
        spins += 1;
        if (orbit) orbit.style.setProperty('--spin', spins * 120 + 'deg');
        return;
      }
      stage.classList.remove('is-playing');
      if (hero) hero.classList.remove('is-lit');
      /* force a reflow so the animation restarts on a repeat click */
      void stage.offsetWidth;
      stage.classList.add('is-playing');
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        stage.classList.remove('is-playing');
        spins += 1;
        if (orbit) orbit.style.setProperty('--spin', spins * 120 + 'deg');
        if (hero) hero.classList.add('is-lit');
      }, 460);
    }

    stage.addEventListener('click', play);
    if (!motionOff()) window.setTimeout(play, 260);
  })();

  /* ----------------------------------------------------------------------
     4. intensity_toggle — label "Dim the lights", default "full",
        affects starburst-animation, burst-transitions, hero→static,
        scroll→continuous. Placed in the footer utility row next to the
        reduced-motion indicator, exactly as the kit asks.
     ---------------------------------------------------------------------- */
  (function intensity() {
    var btn = document.querySelector('[data-intensity]');
    var note = document.querySelector('[data-motion-note]');

    /* The readout has to report the state that is actually in force, which is
       `dimmed || mqReduce.matches` — not the media query alone. Reading only the
       query meant that after pressing "Dim the lights" the note still claimed
       "Motion: full-blast", i.e. the one piece of copy describing the switch
       contradicted the switch. */
    function paintNote() {
      if (!note) return;
      if (dimmed) {
        note.textContent = mqReduce.matches
          ? 'Motion: dimmed, and your device asked for less too. Everything is still.'
          : 'Motion: dimmed. The bursts, wipes and Dotty’s bob are holding still.';
      } else if (mqReduce.matches) {
        note.textContent = 'Your device asks for reduced motion — the bursts are already still.';
      } else {
        note.textContent = 'Motion: full-blast. Your device has not asked for less.';
      }
    }

    if (btn) {
      btn.hidden = false;
      btn.setAttribute('aria-pressed', dimmed ? 'true' : 'false');
      btn.addEventListener('click', function () {
        dimmed = !dimmed;
        try {
          window.localStorage.setItem(STORE_INTENSITY, dimmed ? 'dim' : 'full');
        } catch {
          /* storage unavailable — the toggle still works for this visit */
        }
        btn.setAttribute('aria-pressed', dimmed ? 'true' : 'false');
        syncMotion();
        paintNote();
      });
    }

    paintNote();
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', paintNote);

    /* §19.21: a companion that can be dismissed for good needs a way back, and
       the restore control has to live somewhere stable — here, beside the
       intensity toggle. js/dotty.js listens for the event. */
    var restore = document.querySelector('[data-dotty-restore]');
    if (restore) {
      restore.addEventListener('click', function () {
        document.dispatchEvent(new CustomEvent('phlix:dotty-restore'));
      });
    }
  })();

  /* ----------------------------------------------------------------------
     5. seasonal_activation.mode: "live-js"
        A date gate flips the seasonal_variants override tokens and turns on
        the motif. Both variants ship, so both were contrast-measured
        (§19.19): Factory Winter re-points --color-primary to Pow Blue, where
        black ink would drop to 2.05:1 — so it also re-points the two ink
        tokens that sit on the primary ground.
     ---------------------------------------------------------------------- */
  (function seasonal() {
    var variants = [
      {
        slug: 'summer-of-love',
        from: [6, 21],
        to: [9, 21],
        vars: {
          '--color-primary': '#ff1a1a',
          '--color-secondary': '#ff6b00',
          '--color-bg': '#ffffff',
        },
      },
      {
        slug: 'factory-winter',
        from: [12, 1],
        to: [1, 6],
        vars: {
          '--color-primary': '#0028dc',
          '--color-secondary': '#ffe600',
          '--color-bg': '#ffffff',
          /* white on Pow Blue is 8.99:1; black would be 2.05:1 */
          '--ink-on-primary': '#ffffff',
          /* and no red ink survives into a blue palette */
          '--color-primary-ink': '#0028dc',
        },
      },
    ];

    var now = new Date();
    var md = (now.getMonth() + 1) * 100 + now.getDate();

    for (var i = 0; i < variants.length; i += 1) {
      var v = variants[i];
      var from = v.from[0] * 100 + v.from[1];
      var to = v.to[0] * 100 + v.to[1];
      var live = from <= to ? md >= from && md <= to : md >= from || md <= to;
      if (!live) continue;
      html.setAttribute('data-season', v.slug);
      for (var key in v.vars) {
        if (Object.prototype.hasOwnProperty.call(v.vars, key)) {
          html.style.setProperty(key, v.vars[key]);
        }
      }
      break;
    }
  })();

  /* ----------------------------------------------------------------------
     6. easter_eggs[] — three of them, all inert until earned.
        §19.8: the typed-word listener is disabled while focus is in a field,
        never calls preventDefault, and Esc always exits.
     ---------------------------------------------------------------------- */
  (function eggs() {
    var status = document.querySelector('[data-egg-status]');
    var open = [];

    function announce(text) {
      if (status) status.textContent = text;
    }

    function close() {
      while (open.length) {
        var node = open.pop();
        if (node.parentNode) node.parentNode.removeChild(node);
      }
      announce('');
    }

    function stage(cls, inner, life) {
      var el = document.createElement('div');
      el.className = 'egg ' + cls;
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = inner;
      document.body.appendChild(el);
      open.push(el);
      if (life) window.setTimeout(close, life);
      return el;
    }

    /* egg 1 — logo-clicks:5 */
    var logo = document.querySelector('.nav-logo');
    if (logo) {
      var hits = 0;
      var reset = null;
      logo.addEventListener('click', function (e) {
        /* On the home page the logo points at the page you are already on, so
           swallowing the click costs nothing; anywhere else it must navigate. */
        var onHome = document.body.getAttribute('data-page') === 'home';
        if (onHome) e.preventDefault();
        hits += 1;
        window.clearTimeout(reset);
        reset = window.setTimeout(function () {
          hits = 0;
        }, 2600);
        if (hits < 5) return;
        hits = 0;
        stage(
          'egg--dotty',
          '<div class="egg__card"><svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">' +
            '<circle cx="32" cy="32" r="27" fill="var(--color-secondary)" stroke="#0A0A0A" stroke-width="4"/>' +
            '<circle cx="23" cy="27" r="5" fill="#0A0A0A"/><circle cx="41" cy="27" r="5" fill="#0A0A0A"/>' +
            '<path d="M20 42 q12 12 24 0" fill="var(--color-primary)" stroke="#0A0A0A" stroke-width="4" stroke-linejoin="round"/>' +
            '</svg><p>POW! You found Dotty&rsquo;s secret stash!</p></div>',
          3000,
        );
        announce("POW! You found Dotty's secret stash! Press Escape to send her off.");
      });
    }

    /* eggs 2 + 3 — typed words */
    var buf = '';
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        close();
        return;
      }
      var t = e.target;
      if (
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.tagName === 'SELECT' ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!e.key || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-8);

      if (buf.slice(-4) === 'dots') {
        buf = '';
        stage(
          'egg--dots',
          '<div class="egg__dots"></div><span class="egg__shout">BOOM</span>',
          2600,
        );
        announce('The dots approve of you. Press Escape to clear them.');
      } else if (buf.slice(-5) === 'kapow') {
        buf = '';
        var el = stage(
          'egg--kapow',
          '<svg class="egg__cursor" viewBox="0 0 160 160" aria-hidden="true">' +
            '<polygon points="80,2 96,44 132,20 126,62 158,72 124,92 148,128 106,124 96,158 80,124 56,158 44,124 8,128 30,92 2,72 34,62 28,20 64,44" fill="var(--color-primary)" stroke="#0A0A0A" stroke-width="6"/>' +
            '<text x="80" y="94" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="34" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="2" paint-order="stroke">KAPOW!</text>' +
            '</svg>',
          2200,
        );
        var burst = el.querySelector('.egg__cursor');
        var move = function (ev) {
          burst.style.left = ev.clientX + 'px';
          burst.style.top = ev.clientY + 'px';
        };
        burst.style.left = '50%';
        burst.style.top = '46%';
        document.addEventListener('mousemove', move);
        window.setTimeout(function () {
          document.removeEventListener('mousemove', move);
        }, 2200);
        announce('You said the magic word. Press Escape to dismiss.');
      }
    });
  })();

  /* ----------------------------------------------------------------------
     7. The install one-liner's copy button. Hidden unless the clipboard API
        is actually available, so nothing ever advertises a dead control.
     ---------------------------------------------------------------------- */
  (function copy() {
    var buttons = [].slice.call(document.querySelectorAll('[data-copy]'));
    if (!buttons.length || !navigator.clipboard) return;
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].hidden = false;
      buttons[i].addEventListener('click', function (e) {
        var btn = e.currentTarget;
        var pre = document.getElementById(btn.getAttribute('data-copy'));
        if (!pre) return;
        var was = btn.textContent;
        navigator.clipboard.writeText(pre.textContent.trim()).then(
          function () {
            btn.textContent = 'Copied! POW!';
            window.setTimeout(function () {
              btn.textContent = was;
            }, 1600);
          },
          function () {
            btn.textContent = 'Select and copy';
          },
        );
      });
    }
  })();

  syncMotion();
})();
