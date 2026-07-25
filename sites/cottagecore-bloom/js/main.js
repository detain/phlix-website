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
 *   mascot.behavior    Primrose — idle, tips, curtsy, hover-hold, dismiss/wake
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

  /**
   * Every visible string this script can put on the page, in one place.
   * A translator should never have to read the logic to find copy, and an
   * `alt`/`aria-label` generated in JS is exactly as visible as one in markup.
   * Strings quoted from the kit are marked, and the seasonal banner sentence is
   * VERBATIM — the season name is prefixed as its own element rather than
   * folded into the sentence, so the declared sentence survives intact.
   */
  const STRINGS = {
    calmOff: 'Quiet the Garden', // kit intensity_toggle.label
    calmOn: 'Wake the Garden',
    beeNudge: 'Still plenty blooming over here.',
    beeCurtsy: 'A curtsy, just for you.',
    keepTending: 'Keep tending.', // kit easter_eggs[2].effect
    greetings: [
      // kit mascot greetings
      "Good to see you. The garden's lovely today.",
      'Come in. Something is always blooming.',
      'Hello again. Ready to find something wonderful?',
    ],
    sigilReward: 'How lovely that you found me!', // kit easter_eggs[0].reward_copy
    typedReward: 'This is where it all blooms.', // kit easter_eggs[1].reward_copy
    seasonBanner: "The garden is blooming in its season — come see what's growing.",
    seasonAriaLabel: (name) => `Seasonal theme: ${name}`,
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    seasons: {
      harvest: {
        name: 'Harvest Home',
        alt: 'Hedgerow berries, rosehips and autumn leaves',
      },
      midwinter: {
        name: 'Midwinter Hearth',
        alt: 'Holly, mistletoe and dried orange slices',
      },
      spring: {
        name: 'Spring Awakening',
        alt: 'Cherry blossom and tulips under a light canopy',
      },
    },
  };

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
    remove(k) {
      try {
        window.localStorage.removeItem(k);
      } catch {
        /* as above */
      }
    },
  };

  /** True when motion should be still: reduced-motion, or the garden is quiet. */
  const isStill = () => reduceMotion.matches || html.dataset.calm === 'true';

  /* Assigned by the diorama block below. Declared up here because the calm
   * toggle and the reduced-motion listener both have to be able to put the
   * planes back in register, and they are wired before the diorama runs. */
  let resetPlanes = () => {};

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
      if (label) label.textContent = on ? STRINGS.calmOn : STRINGS.calmOff;
    };
    paint();
    calmBtn.addEventListener('click', () => {
      const on = html.dataset.calm !== 'true';
      html.dataset.calm = String(on);
      store.set(CALM_KEY, String(on));
      paint();
      if (on) {
        closeEggs();
        // The visitor asked for stillness, so the planes go back to register.
        // Leaving the last translate3d() in place froze the diorama wherever
        // the cursor happened to be — motion removed, displacement kept.
        resetPlanes();
      }
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

    resetPlanes = () => {
      for (const p of planes) p.el.style.transform = '';
    };

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
      if (queued) return;
      if (isStill()) {
        resetPlanes();
        return;
      }
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

  /* A media query read once at load never sees the visitor change the setting
   * mid-session (§19.20). Turning reduced motion ON must put the planes back in
   * register; turning it OFF must let them drift again. */
  const onMotionPreferenceChange = () => {
    if (isStill()) resetPlanes();
  };
  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', onMotionPreferenceChange);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(onMotionPreferenceChange);
  }

  /* mascot.behavior — Primrose. Fixed bottom-right on Home / Features /
   * Download / About (the markup only exists there). CSS renders her at 900px
   * and up — the same breakpoint the nav uses — so she can never crowd the
   * primary CTA or a visitor_paths card on a phone or a tablet. */
  const mascot = document.querySelector('.mascot');
  const bee = mascot && mascot.querySelector('.mascot-bee');
  const bubble = mascot && mascot.querySelector('.mascot-bubble');
  const restoreBtn = document.querySelector('.primrose-restore');
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

  /* Primrose renders at 900px and up only, so the control that brings her back
   * must not offer itself on a phone where she could not appear either way. The
   * query is re-read on `change`, not once at load (§19.20). */
  const companionRoom = window.matchMedia('(min-width: 56.25rem)');
  const showRestore = () => {
    if (restoreBtn) restoreBtn.hidden = !companionRoom.matches;
  };
  const syncRestore = () => {
    if (!restoreBtn) return;
    if (store.get(REST_KEY) === 'true') showRestore();
    else restoreBtn.hidden = true;
  };
  if (typeof companionRoom.addEventListener === 'function') {
    companionRoom.addEventListener('change', syncRestore);
  } else if (typeof companionRoom.addListener === 'function') {
    companionRoom.addListener(syncRestore);
  }

  /** The dismiss pill is only interactive once Primrose has been engaged. */
  const engage = () => {
    if (mascot) mascot.dataset.engaged = 'true';
  };
  const disengage = () => {
    if (mascot) delete mascot.dataset.engaged;
  };

  let primroseWired = false;

  /** Wire Primrose's tips and interactions. Idempotent, because "Wake
   *  Primrose" can call it long after load. */
  const wirePrimrose = () => {
    if (primroseWired || !mascot || !bee) return;
    primroseWired = true;

    // tips[] — each anchored to a selector on this page; shown when that part
    // of the garden comes into view AND the visitor has engaged with the page.
    // The hero is already intersecting at load, so an unguarded observer made
    // the first tip a pop-up on arrival — which the kit's own "never push
    // unrequested tips" line and this comment both said it was not.
    let armed = false;
    let pending = '';
    const arm = () => {
      if (armed) return;
      armed = true;
      if (pending) {
        say(pending);
        pending = '';
      }
    };
    for (const ev of ['scroll', 'wheel', 'pointerdown', 'keydown', 'touchstart']) {
      window.addEventListener(ev, arm, { once: true, passive: true });
    }

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
            if (!hit) continue;
            if (!armed) {
              pending = hit.text;
              continue;
            }
            say(hit.text);
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
      engage();
      const now = Date.now();
      beeClicks = now - beeClickAt > 2500 ? 1 : beeClicks + 1;
      beeClickAt = now;
      if (beeClicks < 5) {
        say(STRINGS.beeNudge);
        return;
      }
      beeClicks = 0;
      say(STRINGS.beeCurtsy);
      if (isStill()) return;
      bee.classList.add('is-curtsy');
      window.setTimeout(() => bee.classList.remove('is-curtsy'), 1700);
    });

    // easter_eggs[2] / easter_interactions[1] — hover-hold:2s on Primrose.
    // Exit is "move your cursor away", exactly as the kit specifies. Calm mode
    // takes the petal spiral away, never the encouragement itself.
    let holdTimer = 0;
    const startHold = () => {
      holdTimer = window.setTimeout(() => {
        say(STRINGS.keepTending, true);
        if (!isStill()) petalSpiral();
      }, 2000);
    };
    const endHold = () => window.clearTimeout(holdTimer);
    bee.addEventListener('pointerenter', startHold);
    bee.addEventListener('pointerleave', () => {
      endHold();
      hush();
    });
    bee.addEventListener('focus', () => {
      engage();
      startHold();
    });
    bee.addEventListener('blur', endHold);

    const dismiss = mascot.querySelector('.mascot-dismiss');
    if (dismiss) {
      dismiss.addEventListener('click', () => {
        mascot.hidden = true;
        disengage();
        hush();
        store.set(REST_KEY, 'true');
        // §19.21 — persisting a dismissal without a way back means one stray
        // click costs the visitor a declared feature permanently. Focus is
        // deliberately NOT moved to the restore control: it lives in the footer,
        // and pulling focus there would scroll the page out from under a
        // visitor who was reading the hero.
        showRestore();
      });
    }
  };

  if (mascot && bee) {
    if (store.get(REST_KEY) === 'true') {
      showRestore();
    } else {
      mascot.hidden = false;
      wirePrimrose();
    }

    if (restoreBtn) {
      restoreBtn.addEventListener('click', () => {
        store.remove(REST_KEY);
        mascot.hidden = false;
        restoreBtn.hidden = true;
        wirePrimrose();
        bee.focus();
      });
    }

    // Tapping elsewhere puts the dismiss pill away again, so it is never a
    // permanently clickable target hovering over the page.
    document.addEventListener('click', (e) => {
      if (!mascot.contains(e.target)) disengage();
    });
  }

  /* easter_eggs — all three, inert until found, all exiting on Esc.
   *
   * intensity_toggle.affects lists easter_eggs, and all three are now gated the
   * SAME way: calm mode (and reduced motion) removes the MOTION — the petal
   * shower, the honeybee flight path, the curtsy — and never the reward itself.
   * The typed-word egg used to be suppressed outright, which made calm mode
   * cost a visitor content rather than animation (§19.20). */
  let overlay = null;
  let reward = null;
  let rewardTimer = 0;

  const closeEggs = () => {
    window.clearTimeout(rewardTimer);
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
    // Each greeting used to schedule its own un-cleared closeEggs(), so an
    // earlier click's timer tore down the fifth click's petal shower after
    // ~1.1s instead of the declared ~3s. Same pattern as bubbleTimer above.
    window.clearTimeout(rewardTimer);
    if (reward) reward.remove();
    reward = document.createElement('p');
    reward.className = 'reward-note';
    reward.setAttribute('role', 'status');
    reward.textContent = text;
    document.body.append(reward);
    rewardTimer = window.setTimeout(closeEggs, ms);
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
  const sigil = document.querySelector('.nav-sigil');
  if (sigil) {
    let clicks = 0;
    let last = 0;
    sigil.addEventListener('click', () => {
      const now = Date.now();
      clicks = now - last > 2500 ? 1 : clicks + 1;
      last = now;
      if (clicks < 5) {
        showReward(STRINGS.greetings[(clicks - 1) % STRINGS.greetings.length], 2600);
        return;
      }
      clicks = 0;
      petalShower(26);
      showReward(STRINGS.sigilReward, 3200);
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
      disengage();
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
    showReward(STRINGS.typedReward, 5000);
    if (isStill()) return;
    html.dataset.egg = 'garden';
    if (bee && mascot && !mascot.hidden) {
      bee.classList.add('is-curtsy');
      window.setTimeout(() => bee.classList.remove('is-curtsy'), 1700);
    }
  });

  /* seasonal_activation "live-js" — a date gate over the kit's
   * seasonal_variants: flips the override tokens and shows the kit's banner
   * during each active_range. Every variant carries its own pre-measured ink
   * tokens, because a variant that overrode only the display hue would break
   * the small-text ratios the ink scale guarantees.
   *
   * A variant that is inert today still ships and will be live for weeks
   * (§19.19), so all three were exercised by forcing each branch rather than by
   * trusting today's date. */
  const SEASONS = [
    {
      id: 'harvest',
      from: [9, 15],
      to: [10, 31],
      motif: 'img/seasonal/harvest-berries-and-leaves.svg',
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
      from: [12, 1],
      to: [1, 6],
      motif: 'img/seasonal/midwinter-holly-sprigs.svg',
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
      from: [3, 15],
      to: [5, 15],
      motif: 'img/seasonal/spring-blossom-canopy.svg',
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

  /** "15 March – 15 May", from the same integers the date gate uses. */
  const rangeLabel = (s) =>
    `${s.from[1]} ${STRINGS.months[s.from[0] - 1]} – ${s.to[1]} ${STRINGS.months[s.to[0] - 1]}`;

  /* seasons.html spells each active_range out in prose so a no-JS visitor still
   * reads it. That is duplicated data, and duplicated data drifts — so where JS
   * runs, the label is rewritten from the integers above and there is exactly
   * one source of truth. */
  for (const el of document.querySelectorAll('[data-season-range]')) {
    const season = SEASONS.find((s) => s.id === el.dataset.seasonRange);
    if (season) el.textContent = rangeLabel(season);
  }

  const slot = document.querySelector('#season-slot');
  if (slot) {
    const now = new Date();
    const season = SEASONS.find((s) => inRange(now.getMonth() + 1, now.getDate(), s.from, s.to));
    if (season) {
      const copyFor = STRINGS.seasons[season.id];
      html.dataset.season = season.id;
      for (const [k, v] of Object.entries(season.tokens)) html.style.setProperty(k, v);

      const banner = document.createElement('aside');
      banner.className = 'season-banner';
      banner.setAttribute('aria-label', STRINGS.seasonAriaLabel(copyFor.name));
      const wrap = document.createElement('div');
      wrap.className = 'container';
      const img = document.createElement('img');
      img.src = season.motif;
      img.alt = copyFor.alt;
      img.width = 30;
      img.height = 30;
      img.loading = 'lazy';
      const copy = document.createElement('p');
      const name = document.createElement('span');
      name.className = 'season-name';
      name.textContent = copyFor.name;
      // The kit's banner sentence, verbatim, after the season's own name.
      copy.append(name, document.createTextNode(` ${STRINGS.seasonBanner}`));
      wrap.append(img, copy);
      banner.append(wrap);
      slot.replaceWith(banner);
    }
  }
})();
