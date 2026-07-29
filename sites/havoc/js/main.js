/**
 * ============================================================================
 *  Havoc — main.js
 *  Nav toggle, reduced-motion, scroll reveals, chaos effects, glitch system
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Utility ───────────────────────────────────────────────────────────── */
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ── Mobile nav toggle ─────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        const firstLink = navMenu.querySelector('a');
        firstLink && firstLink.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('is-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');
        }
      });
    });
  }

  /* ── Scroll reveals (IntersectionObserver) ──────────────────────────────── */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal, .spotlight-reveal');

    if (revealEls.length > 0) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    document.querySelectorAll('.reveal, .spotlight-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Glitch System ─────────────────────────────────────────────────────── */
  function triggerGlitch(element, duration) {
    if (reducedMotion) return;
    if (!element) return;

    duration = duration || (100 + Math.random() * 300);
    element.classList.add('glitching');

    setTimeout(function () {
      element.classList.remove('glitching');
    }, duration);
  }

  function randomGlitch() {
    if (reducedMotion) return;

    const glitchElements = document.querySelectorAll('.hero-title, .text-display');
    if (glitchElements.length === 0) return;

    var randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    triggerGlitch(randomElement, 150);
  }

  // Random glitch bursts during page load
  if (!reducedMotion) {
    setTimeout(randomGlitch, 1000);
    setTimeout(randomGlitch, 2500);
    setTimeout(randomGlitch, 4500);
  }

  // Glitch on hover for specific elements
  document.querySelectorAll('.feature-card, .client-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      if (!reducedMotion) {
        triggerGlitch(el.querySelector('.feature-title') || el, 200);
      }
    });
  });

  /* ── Explosion effect on buttons ───────────────────────────────────────── */
  document.querySelectorAll('.btn-primary').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (reducedMotion) return;

      var explosion = document.createElement('span');
      explosion.className = 'btn-explosion';
      explosion.style.cssText = [
        'position: absolute',
        'width: 10px',
        'height: 10px',
        'background: var(--color-primary)',
        'border-radius: 0',
        'pointer-events: none',
        'z-index: -1'
      ].join(';');

      var rect = btn.getBoundingClientRect();
      explosion.style.left = (e.clientX - rect.left) + 'px';
      explosion.style.top = (e.clientY - rect.top) + 'px';

      btn.style.position = 'relative';
      btn.appendChild(explosion);

      explosion.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(20)', opacity: 0 }
      ], {
        duration: 400,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = function () {
        explosion.remove();
      };
    });
  });

  /* ── Chaos particles on scroll ─────────────────────────────────────────── */
  if (!reducedMotion) {
    var ticking = false;

    function createChaosParticle() {
      var particle = document.createElement('div');
      particle.className = 'scroll-chaos-particle';
      particle.style.cssText = [
        'position: fixed',
        'width: ' + (2 + Math.random() * 4) + 'px',
        'height: ' + (2 + Math.random() * 4) + 'px',
        'background: [' + ['#F72585', '#7209B7', '#4361EE', '#4CC9F0'][Math.floor(Math.random() * 4)] + ']',
        'pointer-events: none',
        'z-index: 9999',
        'left: ' + Math.random() * window.innerWidth + 'px',
        'top: ' + window.innerHeight + 'px',
        'opacity: 0.8'
      ].join(';');

      document.body.appendChild(particle);

      particle.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
        { transform: 'translateY(-' + (window.innerHeight + 200) + 'px) rotate(720deg)', opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = function () {
        particle.remove();
      };
    }

    window.addEventListener('scroll', function () {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (!reducedMotion && Math.random() > 0.85) {
            createChaosParticle();
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ── Keyboard navigation glitch effect ────────────────────────────────── */
  var glitchElements = document.querySelectorAll('h1, h2, h3, .hero-title');

  document.addEventListener('keydown', function (e) {
    if (reducedMotion) return;
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      glitchElements.forEach(function (el) {
        if (Math.random() > 0.7) {
          triggerGlitch(el, 80);
        }
      });
    }
  });

  /* ── Smooth scroll for anchor links ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ── Screen shake on impact ────────────────────────────────────────────── */
  function screenShake(intensity) {
    if (reducedMotion) return;

    intensity = intensity || 'medium';
    var translateMax = intensity === 'high' ? 8 : intensity === 'medium' ? 4 : 2;

    document.body.animate([
      { transform: 'translate(0, 0)' },
      { transform: 'translate(' + (Math.random() * translateMax - translateMax/2) + 'px, ' + (Math.random() * translateMax - translateMax/2) + 'px)' },
      { transform: 'translate(' + (Math.random() * translateMax - translateMax/2) + 'px, ' + (Math.random() * translateMax - translateMax/2) + 'px)' },
      { transform: 'translate(' + (Math.random() * translateMax - translateMax/2) + 'px, ' + (Math.random() * translateMax - translateMax/2) + 'px)' },
      { transform: 'translate(0, 0)' }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)'
    });
  }

  // Apply screen shake on download button click
  var downloadBtn = document.querySelector('a[href="download.html"]');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      screenShake('medium');
    });
  }

  /* ── Initialize page ────────────────────────────────────────────────────── */
  console.log('%c HAVOC ', 'background: #F72585; color: #FFFFFF; font-weight: bold; padding: 4px 8px; font-size: 16px;');

})();
