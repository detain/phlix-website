/**
 * main.js — Cottagecore Bloom
 *
 * Hand-written, dependency-free, defer-loaded. Everything here is an
 * ENHANCEMENT: with JS off the topbar is a plain accessible nav, the hero is a
 * static painted garden carrying the same copy, and every beat is at full
 * opacity. Implements the kit's declared experience fields —
 *
 *   navigation_model   mobile disclosure for the topbar fallback
 *   intensity_toggle   "Quiet the Garden" (footer, persisted)
 *   scroll_experience  "petal-unfold" reveal / settle
 *   hero_experience    "diorama-parallax" (js_budget_kb: 5)
 *   mascot.behavior    Primrose — idle, tips, curtsy, hover-hold, dismiss
 *   easter_eggs        logo x5, typed "garden", hover-hold 2s
 *   seasonal_activation live-js date gate over seasonal_variants
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(() => {
  'use strict';

  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const CALM_KEY = 'phlix-cottagecore-calm';
  const REST_KEY = 'phlix-cottagecore-primrose-rest';

  /** localStorage is unavailable in some privacy modes; never let that throw. */
  const store = {
    get(k) {
      try {
        return window.localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch {
        /* the garden carries on without a memory */
      }
    },
  };

  /** True when motion should be still: reduced-motion, or the garden is quiet. */
  const isStill = () => reduceMotion.matches || html.dataset.calm === 'true';

  /* intensity_toggle "Quiet the Garden" — affects animation, parallax,
   * petal_unfold and easter_eggs. default: full. */
  if (store.get(CALM_KEY) === 'true') html.dataset.calm = 'true';

  const calmBtn = document.querySelector('.calm-toggle');
  if (calmBtn) {
    calmBtn.hidden = false;
    const paint = () => {
      const on = html.dataset.calm === 'true';
      calmBtn.setAttribute('aria-pressed', String(on));
      const label = calmBtn.querySelector('.calm-label');
      if (label) label.textContent = on ? 'Wake the Garden' : 'Quiet the Garden';
    };
    paint();
    calmBtn.addEventListener('click', () => {
      const on = html.dataset.calm !== 'true';
      html.dataset.calm = String(on);
      store.set(CALM_KEY, String(on));
      paint();
      if (on) closeEggs();
    });
  }

  /* navigation_model — the topbar's mobile disclosure. The <ul> is already a
   * working nav; this only opens and closes it. */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    setOpen(false);
    toggle.addEventListener('click', () => setOpen(menu.dataset.open !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.dataset.open === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (menu.dataset.open !== 'true') return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
  }

  /* scroll_experience "petal-unfold" — beats bloom in, passed beats settle.
   * Under reduced motion or calm mode the CSS resolves to plain continuous
   * scroll, so this only ever adds classes. */
  const beats = [...document.querySelectorAll('.reveal')];
  if (beats.length) {
    if ('IntersectionObserver' in window) {
      html.classList.add('js-reveal');
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) {
              en.target.classList.add('is-open');
              en.target.classList.remove('is-past');
            } else if (en.target.classList.contains('is-open') && en.boundingClientRect.top < 0) {
              en.target.classList.add('is-past');
            }
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      );
      beats.forEach((b) => io.observe(b));
      // Safety net: if anything goes wrong, nothing stays invisible.
      window.setTimeout(() => beats.forEach((b) => b.classList.add('is-open')), 2500);
    }
  }

  /* hero_experience "diorama-parallax" — five garden planes drift on pointer
   * position and scroll offset. The declared fallback (one static painted
   * garden, gate already open, identical copy) is what the markup ships; this
   * only nudges it. */
  const diorama = document.querySelector('.hero-diorama');
  if (diorama) {
    const planes = [...diorama.querySelectorAll('.hero-plane')].map((el) => ({
      el,
      depth: Number(el.dataset.depth || 0),
    }));
    let px = 0;
    let py = 0;
    let queued = false;

    const draw = () => {
      queued = false;
      // Clamped to the diorama's own height: past the hero the planes are
      // clipped anyway, and an unbounded offset would fling them arbitrarily far.
      const scroll = Math.min(window.scrollY, diorama.offsetHeight || 900);
      for (const p of planes) {
        const x = px * p.depth * 26;
        const y = py * p.depth * 12 - scroll * p.depth * 0.09;
        p.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }
    };
    const request = () => {
      if (queued || isStill()) return;
      queued = true;
      window.requestAnimationFrame(draw);
    };

    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType !== 'mouse') return;
        px = e.clientX / window.innerWidth - 0.5;
        py = e.clientY / window.innerHeight - 0.5;
        request();
      },
      { passive: true },
    );
    window.addEventListener('scroll', request, { passive: true });
    request();
  }

  /* mascot.behavior — Primrose. Fixed bottom-right on Home / Features /
   * Download / About (the markup only exists there). CSS hides her below 720px
   * so she can never crowd the primary CTA on a phone; never shown once
   * dismissed. */
  const mascot = document.querySelector('.mascot');
  const bee = mascot && mascot.querySelector('.mascot-bee');
  const bubble = mascot && mascot.querySelector('.mascot-bubble');
  let bubbleTimer = 0;

  const say = (text, sticky) => {
    if (!bubble) return;
    window.clearTimeout(bubbleTimer);
    bubble.textContent = text;
    bubble.hidden = false;
    if (!sticky) bubbleTimer = window.setTimeout(() => hush(), 7000);
  };
  const hush = () => {
    if (bubble) bubble.hidden = true;
  };

  if (mascot && bee && store.get(REST_KEY) !== 'true') {
    mascot.hidden = false;

    // tips[] — each anchored to a selector on this page; shown when that part
    // of the garden comes into view, one at a time, never as a pop-up on load.
    const tips = [...mascot.querySelectorAll('template[data-tip-for]')].map((t) => ({
      target: document.querySelector(t.dataset.tipFor),
      text: t.content.textContent.trim(),
    }));
    const live = tips.filter((t) => t.target);
    if (live.length && 'IntersectionObserver' in window) {
      const tipIo = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            const hit = live.find((t) => t.target === en.target);
            if (hit) say(hit.text);
          }
        },
        { threshold: 0.35 },
      );
      live.forEach((t) => tipIo.observe(t.target));
    }

    // easter_interactions[0] — click:5 on PRIMROSE: loop-de-loop + a curtsy.
    // Distinct from easter_eggs[0], which is five clicks on the LOGO (§19.8).
    let beeClicks = 0;
    let beeClickAt = 0;
    bee.addEventListener('click', () => {
      const now = Date.now();
      beeClicks = now - beeClickAt > 2500 ? 1 : beeClicks + 1;
      beeClickAt = now;
      if (beeClicks < 5) {
        say('Still plenty blooming over here.');
        return;
      }
      beeClicks = 0;
      say('A curtsy, just for you.');
      if (isStill()) return;
      bee.classList.add('is-curtsy');
      window.setTimeout(() => bee.classList.remove('is-curtsy'), 1700);
    });

    // easter_eggs[2] / easter_interactions[1] — hover-hold:2s on Primrose.
    // Exit is "move your cursor away", exactly as the kit specifies.
    let holdTimer = 0;
    const startHold = () => {
      holdTimer = window.setTimeout(() => {
        say('Keep tending.', true);
        if (!isStill()) petalSpiral();
      }, 2000);
    };
    const endHold = () => window.clearTimeout(holdTimer);
    bee.addEventListener('pointerenter', startHold);
    bee.addEventListener('pointerleave', () => {
      endHold();
      hush();
    });
    bee.addEventListener('focus', startHold);
    bee.addEventListener('blur', endHold);

    const dismiss = mascot.querySelector('.mascot-dismiss');
    if (dismiss) {
      dismiss.addEventListener('click', () => {
        mascot.hidden = true;
        store.set(REST_KEY, 'true');
      });
    }
  }

  /* easter_eggs — all three, inert until found, all exiting on Esc. */
  let overlay = null;
  let reward = null;

  const closeEggs = () => {
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
    if (reward) {
      reward.remove();
      reward = null;
    }
    delete html.dataset.egg;
  };

  const showReward = (text, ms) => {
    if (reward) reward.remove();
    reward = document.createElement('p');
    reward.className = 'reward-note';
    reward.setAttribute('role', 'status');
    reward.textContent = text;
    document.body.append(reward);
    window.setTimeout(closeEggs, ms);
  };

  /** A drift of petals in rose, lavender and sage (kit header_motif). */
  const petalShower = (count) => {
    if (isStill() || overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'petal-fall';
    overlay.setAttribute('aria-hidden', 'true');
    const hues = ['var(--color-primary)', 'var(--color-tertiary)', 'var(--color-secondary)'];
    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement('i');
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.background = hues[i % hues.length];
      petal.style.animationDelay = `${(Math.random() * 1.2).toFixed(2)}s`;
      petal.style.animationDuration = `${(2.6 + Math.random() * 1.8).toFixed(2)}s`;
      overlay.append(petal);
    }
    document.body.append(overlay);
  };

  const petalSpiral = () => petalShower(9);

  // easter_eggs[0] — five clicks on the Primrose sigil in the topbar. It is a
  // plain button, NOT part of the logo link: an anchor navigates on the first
  // click, so a click-count egg attached to it could never reach five.
  // Earlier clicks are not dead — each returns one of the kit's greetings, so
  // the control is honest about doing something. Exit: the petals settle on
  // their own after ~3s, or Esc dismisses immediately.
  const GREETINGS = [
    "Good to see you. The garden's lovely today.",
    'Come in. Something is always blooming.',
    'Hello again. Ready to find something wonderful?',
  ];
  const sigil = document.querySelector('.nav-sigil');
  if (sigil) {
    let clicks = 0;
    let last = 0;
    sigil.addEventListener('click', () => {
      const now = Date.now();
      clicks = now - last > 2500 ? 1 : clicks + 1;
      last = now;
      if (clicks < 5) {
        showReward(GREETINGS[(clicks - 1) % GREETINGS.length], 2600);
        return;
      }
      clicks = 0;
      petalShower(26);
      showReward('How lovely that you found me!', 3200);
    });
  }

  // easter_eggs[1] — type "garden". Per §19.8 this listener never calls
  // preventDefault, is disabled while focus is in any editable field, and
  // exits on Esc, so it can never swallow typing or shadow a shortcut.
  let typed = '';
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEggs();
      hush();
      return;
    }
    const t = e.target;
    if (
      t &&
      (t.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) ||
        t.getAttribute('role') === 'textbox')
    ) {
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-6);
    if (typed !== 'garden') return;
    typed = '';
    if (html.dataset.calm === 'true') return;
    html.dataset.egg = 'garden';
    showReward('This is where it all blooms.', 5000);
    if (bee && !isStill() && mascot && !mascot.hidden) {
      bee.classList.add('is-curtsy');
      window.setTimeout(() => bee.classList.remove('is-curtsy'), 1700);
    }
  });

  /* seasonal_activation "live-js" — a date gate over the kit's
   * seasonal_variants: flips the override tokens and shows the kit's banner
   * during each active_range. Every variant carries its own pre-measured ink
   * tokens, because a variant that overrode only the display hue would break
   * the small-text ratios the ink scale guarantees. */
  const SEASONS = [
    {
      id: 'harvest',
      name: 'Harvest Home',
      from: [9, 15],
      to: [10, 31],
      motif: 'img/seasonal/harvest-berries-and-leaves.svg',
      alt: 'Hedgerow berries, rosehips and autumn leaves',
      tokens: {
        '--color-primary': '#B8621A',
        '--color-bg': '#FFF8EE',
        '--color-surface': '#FFF0DC',
        '--color-rose-ink': '#8B4A14',
        '--color-taupe-ink': '#75655A',
      },
    },
    {
      id: 'midwinter',
      name: 'Midwinter Hearth',
      from: [12, 1],
      to: [1, 6],
      motif: 'img/seasonal/midwinter-holly-sprigs.svg',
      alt: 'Holly, mistletoe and dried orange slices',
      tokens: {
        '--color-primary': '#8B4A5A',
        '--color-secondary': '#5A7A4A',
        '--color-tertiary': '#A08DB0',
        '--color-surface': '#FFF0EA',
        '--color-rose-ink': '#6C3947',
        '--color-sage-ink': '#455B38',
      },
    },
    {
      id: 'spring',
      name: 'Spring Awakening',
      from: [3, 15],
      to: [5, 15],
      motif: 'img/seasonal/spring-blossom-canopy.svg',
      alt: 'Cherry blossom and tulips under a light canopy',
      tokens: {
        '--color-primary': '#D46A82',
        '--color-secondary': '#8AB878',
        '--color-tertiary': '#A090CC',
        '--color-rose-ink': '#9E3B52',
        '--color-sage-ink': '#557B42',
      },
    },
  ];

  /** Inclusive month/day range that may wrap the new year. */
  const inRange = (m, d, from, to) => {
    const at = m * 100 + d;
    const a = from[0] * 100 + from[1];
    const b = to[0] * 100 + to[1];
    return a <= b ? at >= a && at <= b : at >= a || at <= b;
  };

  const slot = document.querySelector('#season-slot');
  if (slot) {
    const now = new Date();
    const season = SEASONS.find((s) => inRange(now.getMonth() + 1, now.getDate(), s.from, s.to));
    if (season) {
      html.dataset.season = season.id;
      for (const [k, v] of Object.entries(season.tokens)) html.style.setProperty(k, v);

      const banner = document.createElement('aside');
      banner.className = 'season-banner';
      banner.setAttribute('aria-label', `Seasonal theme: ${season.name}`);
      const wrap = document.createElement('div');
      wrap.className = 'container';
      const img = document.createElement('img');
      img.src = season.motif;
      img.alt = season.alt;
      img.width = 30;
      img.height = 30;
      img.loading = 'lazy';
      const copy = document.createElement('p');
      copy.textContent = `${season.name} — the garden is blooming in its season, come see what's growing.`;
      wrap.append(img, copy);
      banner.append(wrap);
      slot.replaceWith(banner);
    }
  }
})();
