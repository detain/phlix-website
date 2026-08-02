/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * Cyber Pursuit — Matrix Rain, Glitch Effects, Terminal Interactions
 */

(function () {
  'use strict';

  /* ── Matrix Rain Canvas ─────────────────────────────────────────────────── */

  const matrixCanvas = document.getElementById('matrix-rain');
  if (matrixCanvas && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const ctx = matrixCanvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\~`'.split(
        '',
      );
    const fontSize = 14;
    let columns = Math.floor(matrixCanvas.width / fontSize);
    let drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    function drawMatrix() {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      // Green color with glow
      ctx.fillStyle = '#00FF41';
      ctx.font = fontSize + 'px monospace';
      ctx.shadowColor = '#00FF41';
      ctx.shadowBlur = 10;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Move drop down
        drops[i]++;

        // Reset drop to top with randomness when it goes off screen
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      ctx.shadowBlur = 0;
    }

    // Run at ~30fps
    setInterval(drawMatrix, 33);
  }

  /* ── Navigation Toggle ──────────────────────────────────────────────────── */

  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Scroll Reveal ──────────────────────────────────────────────────────── */

  const revealElements = document.querySelectorAll('.reveal');

  if (
    revealElements.length &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  ) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ── Intensity Toggle ────────────────────────────────────────────────────── */

  const intensityToggle = document.querySelector('.intensity-toggle');
  if (intensityToggle) {
    const savedState = localStorage.getItem('phlix-stealth-mode');
    if (savedState === 'true') {
      intensityToggle.setAttribute('aria-pressed', 'true');
      applyStealthMode(true);
    }

    intensityToggle.addEventListener('click', function () {
      const isPressed = intensityToggle.getAttribute('aria-pressed') === 'true';
      const newState = !isPressed;
      intensityToggle.setAttribute('aria-pressed', newState);
      localStorage.setItem('phlix-stealth-mode', newState);
      applyStealthMode(newState);
    });
  }

  function applyStealthMode(enabled) {
    const matrixRain = document.getElementById('matrix-rain');
    const scanlines = document.querySelector('.scanlines');
    const mascot = document.getElementById('mascot-ghost');

    if (matrixRain) {
      matrixRain.style.opacity = enabled ? '0' : '0.15';
    }
    if (scanlines) {
      scanlines.style.opacity = enabled ? '0' : '0.5';
    }
    if (mascot) {
      mascot.style.display = enabled ? 'none' : 'block';
    }
  }

  /* ── Mascot Ghost ───────────────────────────────────────────────────────── */

  const mascotClose = document.querySelector('.mascot-close');
  const mascotGhost = document.getElementById('mascot-ghost');

  if (mascotClose && mascotGhost) {
    // Check if dismissed
    if (localStorage.getItem('phlix-ghost-dismissed') === 'true') {
      mascotGhost.style.display = 'none';
    }

    mascotClose.addEventListener('click', function () {
      mascotGhost.style.display = 'none';
      localStorage.setItem('phlix-ghost-dismissed', 'true');
    });
  }

  /* ── Code Copy Buttons ──────────────────────────────────────────────────── */

  document.querySelectorAll('.code-copy').forEach((button) => {
    button.addEventListener('click', async function () {
      const targetId = this.getAttribute('data-copy');
      if (!targetId) return;

      const codeElement = document.querySelector(targetId);
      if (!codeElement) return;

      const text = codeElement.textContent || codeElement.innerText;

      try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalHTML = this.innerHTML;
        this.innerHTML = '<span style="color: var(--color-primary)">Copied!</span>';
        setTimeout(() => {
          this.innerHTML = originalHTML;
        }, 1500);
      } catch (err) {
        console.warn('Copy failed:', err);
      }
    });
  });

  /* ── Glitch Effect on Hover ─────────────────────────────────────────────── */

  const glitchElements = document.querySelectorAll('.site-wordmark, .hero-headline');

  if (
    glitchElements.length &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  ) {
    glitchElements.forEach((el) => {
      el.addEventListener('mouseenter', function () {
        this.style.animation = 'none';
        // Force reflow
        this.offsetHeight;
        this.style.animation = 'glitch-text 0.3s ease-out';
      });
    });
  }

  /* ── Terminal Typing Effect ─────────────────────────────────────────────── */

  const typingElements = document.querySelectorAll('.hero-eyebrow');

  if (
    typingElements.length &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  ) {
    typingElements.forEach((el) => {
      const text = el.textContent;
      el.textContent = '';
      el.style.borderRight = '2px solid var(--color-primary)';

      let charIndex = 0;

      function typeChar() {
        if (charIndex < text.length) {
          el.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 50 + Math.random() * 30);
        } else {
          // Remove cursor after typing complete
          setTimeout(() => {
            el.style.borderRight = 'none';
          }, 1000);
        }
      }

      // Start typing after a short delay
      setTimeout(typeChar, 500);
    });
  }

  /* ── Boot Sequence Parallax ─────────────────────────────────────────────── */

  const bootLines = document.querySelectorAll('.boot-line');

  if (bootLines.length && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener(
      'scroll',
      function () {
        const scrollY = window.scrollY;
        bootLines.forEach((line, index) => {
          const speed = 0.1 + index * 0.02;
          line.style.transform = `translateX(${scrollY * speed}px)`;
          line.style.opacity = 0.7 - scrollY * 0.001;
        });
      },
      { passive: true },
    );
  }

  /* ── Seasonal Banner (if active) ────────────────────────────────────────── */

  const seasonSlot = document.getElementById('season-slot');
  if (seasonSlot) {
    // Check if seasonal mode is enabled
    // This is a simple implementation - in production you'd check dates
    const seasonalBanner = localStorage.getItem('phlix-seasonal-banner');
    if (seasonalBanner) {
      seasonSlot.hidden = false;
      seasonSlot.innerHTML = `<div class="season-banner">${seasonalBanner}</div>`;
    }
  }
})();
