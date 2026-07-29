/**
 * Event Horizon — Main JavaScript
 */

(function() {
  'use strict';

  // ---- Mobile Nav Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ---- Reveal on Scroll ----
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(function(el) {
        revealObserver.observe(el);
      });
    } else {
      // Show all immediately
      revealElements.forEach(function(el) {
        el.classList.add('is-visible');
      });
    }
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update URL without jumping
        history.pushState(null, '', targetId);
      }
    });
  });

  // ---- Spaghettification Hover Effect (Feature Cards) ----
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        card.style.transition = 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.4s ease-out, border-color 0.3s ease-out';
      });

      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Slight tilt based on cursor position
        const tiltX = y * -4;
        const tiltY = x * 4;

        // Spaghettification: subtle vertical stretch
        const stretchY = 1 + Math.abs(y) * 0.015;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scaleY(${stretchY}) translateY(-3px)`;
      });

      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        // Re-add transition for smooth reset
        card.style.transition = 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.3s ease-out, border-color 0.3s ease-out';
      });
    });
  }

  // ---- Singularity Core Pulse ----
  const singularityCore = document.querySelector('.singularity-core');
  if (singularityCore && !prefersReduced) {
    let pulsePhase = 0;

    function animateSingularity() {
      pulsePhase += 0.02;
      const scale = 1 + Math.sin(pulsePhase) * 0.05;
      const glowIntensity = 0.4 + Math.sin(pulsePhase) * 0.2;

      singularityCore.style.transform = `scale(${scale})`;
      singularityCore.style.boxShadow = `
        0 0 0 20px rgba(0,0,0,0.95),
        0 0 ${40 + Math.sin(pulsePhase) * 10}px rgba(123,44,191,${glowIntensity}),
        0 0 ${80 + Math.sin(pulsePhase) * 20}px rgba(90,24,154,${glowIntensity * 0.7}),
        0 0 ${120 + Math.sin(pulsePhase) * 30}px rgba(60,9,108,${glowIntensity * 0.4})
      `;

      requestAnimationFrame(animateSingularity);
    }

    animateSingularity();
  }

  // ---- Photon Ring Animation ----
  const photonRing = document.querySelector('.photon-ring');
  if (photonRing && !prefersReduced) {
    let ringPhase = 0;

    function animatePhotonRing() {
      ringPhase += 0.008;
      const scale = 1 + Math.sin(ringPhase) * 0.08;
      const opacity = 0.4 + Math.sin(ringPhase * 1.5) * 0.3;

      photonRing.style.transform = `scale(${scale})`;
      photonRing.style.opacity = opacity;

      requestAnimationFrame(animatePhotonRing);
    }

    animatePhotonRing();
  }

  // ---- Accretion Disk Particle Sparkle ----
  const accretionContainer = document.querySelector('.accretion-container');
  if (accretionContainer && !prefersReduced) {
    const particleCount = 24;
    const container = accretionContainer;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        background: rgba(167, 139, 250, ${0.3 + Math.random() * 0.5});
        border-radius: 50%;
        top: 50%;
        left: 50%;
        pointer-events: none;
      `;

      const angle = (i / particleCount) * Math.PI * 2;
      const orbitRadius = 200 + Math.random() * 200;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * duration;

      particle.animate([
        {
          transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg) translateX(${orbitRadius * 0.3}px)`,
          opacity: 0
        },
        {
          transform: `translate(-50%, -50%) rotate(${Math.random() * 360 + 180}deg) translateX(${orbitRadius * 0.7}px)`,
          opacity: 0.8,
          offset: 0.4
        },
        {
          transform: `translate(-50%, -50%) rotate(${Math.random() * 360 + 360}deg) translateX(${orbitRadius}px)`,
          opacity: 0
        }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'ease-in-out',
        iterations: Infinity
      });

      container.appendChild(particle);
    }
  }

})();
