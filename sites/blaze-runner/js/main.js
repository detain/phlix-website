/**
 * js/main.js — Blaze Runner
 * Vanilla, dependency-free.
 * Fire particle systems, ember floats, mobile nav, reduced-motion support.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Mobile nav toggle ──────────────────────────────────────────────────────
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ─── Ember particle system ───────────────────────────────────────────────────
  // Respects prefers-reduced-motion: shows static glow overlay instead.
  function initEmberParticles() {
    if (reducedMotion) {
      // Reduced motion: static ember glow overlay, no particles
      createReducedMotionOverlay();
      return;
    }

    var canvas = document.getElementById('ember-canvas');
    if (!canvas) return;

    // Only run on desktop — particle systems are too heavy for mobile
    if (window.innerWidth < 768) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animationId;
    var isRunning = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Particle class
    function Ember(x, y) {
      this.x = x !== undefined ? x : Math.random() * canvas.width;
      this.y = y !== undefined ? y : canvas.height + 10;
      this.size = Math.random() * 3 + 1;
      this.speedY = -(Math.random() * 0.8 + 0.3); // rising
      this.speedX = (Math.random() - 0.5) * 0.4; // slight drift
      this.opacity = Math.random() * 0.7 + 0.3;
      this.flickerRate = Math.random() * 0.05;
      this.color = Math.random() > 0.6 ? '#FF4500' : Math.random() > 0.5 ? '#FF6B00' : '#FFD700';
      this.life = 1;
      this.decay = Math.random() * 0.003 + 0.001;
    }

    Ember.prototype.update = function () {
      this.y += this.speedY;
      this.x += this.speedX;
      // Wind drift
      this.x += Math.sin(Date.now() * 0.001 + this.y * 0.01) * 0.1;
      this.life -= this.decay;
      // Flicker opacity
      this.opacity = Math.max(
        0,
        Math.min(1, this.opacity + (Math.random() - 0.5) * this.flickerRate),
      );
    };

    Ember.prototype.draw = function () {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.opacity * this.life;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.size * 4;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    Ember.prototype.isDead = function () {
      return this.life <= 0 || this.y < -20;
    };

    // Spawn particles
    function spawnParticle() {
      if (!isRunning) return;
      particles.push(new Ember());
      // Occasional burst
      if (Math.random() < 0.08) {
        for (var i = 0; i < 3; i++) {
          particles.push(
            new Ember(Math.random() * canvas.width, canvas.height - Math.random() * 100),
          );
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw heat shimmer lines at bottom
      drawHeatShimmer();

      // Update and draw particles
      for (var i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }

      // Spawn new particles
      if (Math.random() < 0.15 && particles.length < 80) {
        spawnParticle();
      }

      animationId = requestAnimationFrame(animate);
    }

    // Heat shimmer effect — wavy lines at bottom
    var shimmerOffset = 0;
    function drawHeatShimmer() {
      if (reducedMotion) return;
      shimmerOffset += 0.02;
      var bottomY = canvas.height - 30;
      var gradient = ctx.createLinearGradient(0, bottomY, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 69, 0, 0)');
      gradient.addColorStop(1, 'rgba(255, 69, 0, 0.08)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, bottomY, canvas.width, 30);

      // Wavy shimmer line
      ctx.strokeStyle = 'rgba(255, 69, 0, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var x = 0; x < canvas.width; x += 4) {
        var y = bottomY + Math.sin(x * 0.03 + shimmerOffset) * 3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Start
    for (var i = 0; i < 20; i++) {
      particles.push(new Ember());
    }
    animate();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationId);
      } else {
        isRunning = true;
        animate();
      }
    });
  }

  // Reduced motion: create a static ember glow overlay div
  function createReducedMotionOverlay() {
    var canvas = document.getElementById('ember-canvas');
    if (!canvas) return;
    canvas.style.display = 'none';

    var overlay = document.createElement('div');
    overlay.id = 'ember-static-overlay';
    overlay.style.cssText = [
      'position: fixed',
      'bottom: 0',
      'left: 0',
      'right: 0',
      'height: 200px',
      'background: radial-gradient(ellipse at 50% 100%, rgba(255,69,0,0.15) 0%, transparent 70%)',
      'pointer-events: none',
      'z-index: 0',
    ].join(';');
    document.body.appendChild(overlay);
  }

  initEmberParticles();

  // ─── Scroll reveals ─────────────────────────────────────────────────────────
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
    );
    if (revealTargets.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      revealTargets.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition =
          'opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)';
        observer.observe(el);
      });
    }
  }
})();
