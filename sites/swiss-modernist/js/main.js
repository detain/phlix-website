/**
 * Swiss Modernist — site behaviour.
 *
 * Deliberately small. hero_experience.js_budget_kb is 0 (the hero is fully
 * static), scroll_experience.mode is "continuous" (so there are no scroll
 * reveals and no smooth-scroll hijack), and the kit has no mascot and no
 * intensity toggle. That leaves exactly two jobs: the mobile nav toggle, and
 * the single declared easter egg.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------------
     1. MOBILE NAV — navigation_model.fallback
     The markup is a plain <nav><ul> of links that works with JS disabled;
     this only adds the small-screen disclosure.
     ---------------------------------------------------------------------- */

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  var wideNav = window.matchMedia('(min-width: 900px)');

  function closeMenu(refocus) {
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (refocus) toggle.focus();
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (!toggle.contains(e.target) && !menu.contains(e.target)) closeMenu(false);
    });

    // Above 900px the toggle is display:none and the menu is always visible, so
    // an open menu left behind an `aria-expanded="true"` on a button that no
    // longer exists for AT. Reset the state when the breakpoint is crossed.
    wideNav.addEventListener('change', function (e) {
      if (e.matches) closeMenu(false);
    });
  }

  /* ------------------------------------------------------------------------
     2. EASTER EGG — easter_eggs[0]: "logo-clicks:7"
     A 2px Basel Red rule sweeps left to right once, at constant velocity.
     Rules it obeys (new_site.md §19.8):
       • inert for anyone who does not find it — the sweep element does not
         exist in the DOM until the egg fires, so it can never cover a CTA;
       • never swallows typing: it listens for clicks, not keys;
       • Esc cancels;
       • the logo link still navigates. A click is only counted (and its
         default suppressed) when the link would be a no-op anyway, i.e. when
         it points at the page you are already on.
     ---------------------------------------------------------------------- */

  var logo = document.querySelector('.nav-logo');
  var clicks = 0;
  var sweep = null;
  var reward = null;
  var sweepTimer = 0;
  var rewardTimer = 0;

  /* The live region is created empty, at load, and never removed. A
     role="status" node that is appended with its text already in place is not
     announced by most screen readers — the region has to exist BEFORE its
     content changes. `.egg-reward:empty` keeps it invisible until it speaks. */
  function ensureReward() {
    if (reward) return reward;
    reward = document.createElement('p');
    reward.className = 'egg-reward';
    reward.setAttribute('role', 'status');
    reward.setAttribute('aria-live', 'polite');
    document.body.appendChild(reward);
    return reward;
  }

  function normalise(path) {
    return path.replace(/index\.html$/, '');
  }

  function isSelfLink(el) {
    var target = new URL(el.getAttribute('href'), window.location.href);
    return (
      target.origin === window.location.origin &&
      normalise(target.pathname) === normalise(window.location.pathname)
    );
  }

  function clearEgg() {
    window.clearTimeout(sweepTimer);
    window.clearTimeout(rewardTimer);
    if (sweep && sweep.parentNode) sweep.parentNode.removeChild(sweep);
    sweep = null;
    if (reward) reward.textContent = '';
  }

  function fireEgg() {
    clearEgg();
    var region = ensureReward();

    sweep = document.createElement('div');
    sweep.className = 'egg-sweep';
    document.body.appendChild(sweep);

    // The sweep completes on its own (~1s). Under reduced motion the rule is
    // simply drawn, not animated, and is cleared on the same schedule.
    sweepTimer = window.setTimeout(
      function () {
        if (sweep && sweep.parentNode) sweep.parentNode.removeChild(sweep);
        sweep = null;
      },
      reduceMotion.matches ? 1200 : 1000,
    );

    // One frame later, so the mutation is observed as a CHANGE to a region that
    // was already there. Held for 4s: 1s is below the window in which screen
    // readers reliably get to a polite announcement.
    window.requestAnimationFrame(function () {
      region.textContent = 'Grids on grids.';
      rewardTimer = window.setTimeout(function () {
        region.textContent = '';
      }, 4000);
    });
  }

  if (logo) {
    ensureReward();
    logo.addEventListener('click', function (e) {
      if (!isSelfLink(logo)) {
        clicks = 0;
        return; // let the browser navigate home
      }
      e.preventDefault(); // this link goes nowhere new; count it instead
      clicks += 1;
      if (clicks >= 7) {
        clicks = 0;
        fireEgg();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    clicks = 0;
    clearEgg();
    if (menu && menu.classList.contains('is-open')) closeMenu(true);
  });
})();
