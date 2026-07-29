/**
 * ==========================================================================
 *  MAIN.JS — Quantum Stream
 *  Quantum effects: probability blur, superposition fade, wave collapse,
 *  electron orbit animations, observer effect.
 *  @copyright 2026 Joe Huss <detain@interserver.net>
 * ==========================================================================
 */

(function() {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Initialize when DOM is ready
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function() {
    initNav();
    initRevealAnimations();
    initObserverEffects();
    initProbabilityCloud();
    initAtomDecorations();
  });

  /* --------------------------------------------------------------------------
     2. Mobile navigation toggle
     -------------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });

    // Close menu on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Scroll reveal animations
     -------------------------------------------------------------------------- */
  function initRevealAnimations() {
    var reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     4. Observer effect - blur on hover (quantum measurement)
     -------------------------------------------------------------------------- */
  function initObserverEffects() {
    var observerElements = document.querySelectorAll('.observer-effect');

    observerElements.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.style.filter = 'blur(2px) saturate(0.8)';
          el.style.opacity = '0.85';
        }
      });

      el.addEventListener('mouseleave', function() {
        el.style.filter = '';
        el.style.opacity = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Probability cloud pulsing effect
     -------------------------------------------------------------------------- */
  function initProbabilityCloud() {
    var clouds = document.querySelectorAll('.probability-cloud');

    if (!clouds.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    clouds.forEach(function(cloud, index) {
      cloud.style.setProperty('--pulse-delay', (index * 0.5) + 's');
    });
  }

  /* --------------------------------------------------------------------------
     6. Atom decoration electron orbits
     -------------------------------------------------------------------------- */
  function initAtomDecorations() {
    var atoms = document.querySelectorAll('.atom-decoration');

    if (!atoms.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // For reduced motion, just show static electrons
      atoms.forEach(function(atom) {
        var orbits = atom.querySelectorAll('.electron-orbit');
        orbits.forEach(function(orbit) {
          orbit.style.animation = 'none';
        });
      });
      return;
    }

    // Randomize initial electron positions slightly
    atoms.forEach(function(atom) {
      var electrons = atom.querySelectorAll('.electron');
      electrons.forEach(function(electron, _i) {
        var orbit = electron.closest('.electron-orbit');
        if (orbit) {
          var rotation = Math.random() * 360;
          orbit.style.transform = 'rotate(' + rotation + 'deg)';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Wave collapse effect on click
     -------------------------------------------------------------------------- */
  function attachWaveCollapse() {
    var collapseElements = document.querySelectorAll('.wave-collapse');

    collapseElements.forEach(function(el) {
      el.addEventListener('click', function() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }

        el.style.filter = 'blur(0) saturate(1.2) brightness(1.1)';
        el.style.transform = 'scale(0.98)';

        setTimeout(function() {
          el.style.filter = '';
          el.style.transform = '';
        }, 200);
      });
    });
  }

  // Initialize wave collapse
  attachWaveCollapse();

  /* --------------------------------------------------------------------------
     8. Smooth scroll for anchor links
     -------------------------------------------------------------------------- */
  document.addEventListener('click', function(e) {
    var target = e.target.closest('a[href^="#"]');

    if (!target) return;

    var id = target.getAttribute('href').slice(1);
    if (!id) return;

    var element = document.getElementById(id);
    if (!element) return;

    e.preventDefault();

    element.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    });
  });

  /* --------------------------------------------------------------------------
     9. Quantum tunneling fade transition helper
     -------------------------------------------------------------------------- */
  window.quantumTunnel = function(element, callback) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (callback) callback();
      return;
    }

    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';

    setTimeout(function() {
      if (callback) callback();
      element.style.opacity = '';
      element.style.transform = '';
    }, 300);
  };

})();
