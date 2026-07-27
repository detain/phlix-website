/**
 * main.js — Mid-Century Modern Brand Kit
 * Mobile nav toggle, reduced-motion guard, scroll reveals,
 * easter eggs, and mascot companion (Orbit)
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Utilities ─────────────────────────────────────────────────────────── */
  function qs(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function qsa(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */
  var navToggle = qs('.nav-toggle');
  var navMenu = qs('.nav-menu');

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

  /* ── Reduced motion ─────────────────────────────────────────────────────── */
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', motionQuery.matches);
  }

  handleReducedMotion();
  motionQuery.addEventListener('change', handleReducedMotion);

  /* ── Scroll reveals ────────────────────────────────────────────────────── */
  var revealElements = qsa(
    '.feature-card, .feature-detail, .client-card, .download-card, .ecosystem-list li, .faq-item',
  );

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    revealElements.forEach(function (el) {
      el.classList.add('scroll-hidden');
      revealObserver.observe(el);
    });
  }

  /* ── Active nav link highlighting ──────────────────────────────────────── */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = qsa('.nav-menu a');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === '' && href === 'index.html') ||
      (currentPath === 'index.html' && href === './')
    ) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ─────────────────────────────────────────────────────────────────────────
   * EASTER EGG 1 — logo-clicks:5
   * Sunburst burst animation on the logo after 5 clicks
   * ───────────────────────────────────────────────────────────────────────── */
  var logoClickCount = 0;
  var logoEl = qs('.nav-logo');

  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      // Don't interfere with nav links
      logoClickCount++;
      if (logoClickCount >= 5) {
        logoClickCount = 0;
        triggerSunburstBurst(logoEl);
      }
    });
  }

  function triggerSunburstBurst(el) {
    var rect = el.getBoundingClientRect();
    var burst = document.createElement('div');
    burst.style.cssText = [
      'position:fixed',
      'width:120px',
      'height:120px',
      'pointer-events:none',
      'z-index:9999',
      'left:' + (rect.left + rect.width / 2 - 60) + 'px',
      'top:' + (rect.top + rect.height / 2 - 60) + 'px',
    ].join(';');
    burst.setAttribute('aria-hidden', 'true');
    burst.innerHTML =
      '<svg viewBox="0 0 120 120" width="120" height="120" style="position:absolute;inset:0">' +
      qsa('g', document)
        .forEach(function () {
          return '';
        })
        .join('') +
      Array.from({ length: 12 }, function (_, i) {
        var angle = (i * 30 * Math.PI) / 180;
        var x1 = 60 + 50 * Math.cos(angle);
        var y1 = 60 + 50 * Math.sin(angle);
        var x2 = 60 + 35 * Math.cos(angle);
        var y2 = 60 + 35 * Math.sin(angle);
        return (
          '<line x1="60" y1="60" x2="' +
          x2 +
          '" y2="' +
          y2 +
          '" stroke="#F2B705" stroke-width="3" stroke-linecap="round" opacity="0.9"/>'
        );
      }).join('') +
      '<circle cx="60" cy="60" r="8" fill="#00AFAF"/>' +
      '</svg>';
    document.body.appendChild(burst);
    burst.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    burst.style.opacity = '1';
    burst.style.transform = 'scale(1.5)';
    setTimeout(function () {
      burst.style.opacity = '0';
      burst.style.transform = 'scale(2)';
    }, 100);
    setTimeout(function () {
      burst.parentNode.removeChild(burst);
    }, 700);
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * EASTER EGG 2 — typed-word:orbit
   * Visitor types "orbit" and gets a message
   * Disabled when focus is in input/textarea/contenteditable
   * Does NOT preventDefault, exits on Esc
   * ───────────────────────────────────────────────────────────────────────── */
  var typedBuffer = '';
  var typedTimeout;
  var typedMessage = null;
  var typedActive = false;

  function isTypingTarget() {
    var tag = document.activeElement && document.activeElement.tagName;
    return (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      document.activeElement.getAttribute('contenteditable') === 'true'
    );
  }

  document.addEventListener('keydown', function (e) {
    // Don't run on form elements
    if (isTypingTarget()) return;

    // Esc clears the message
    if (e.key === 'Escape') {
      if (typedMessage) {
        typedMessage.parentNode.removeChild(typedMessage);
        typedMessage = null;
        typedActive = false;
      }
      return;
    }

    // Only record letter keys (ignore modifiers)
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typedBuffer += e.key.toLowerCase();

      // Keep buffer manageable
      if (typedBuffer.length > 10) {
        typedBuffer = typedBuffer.slice(-10);
      }

      clearTimeout(typedTimeout);
      typedTimeout = setTimeout(function () {
        typedBuffer = '';
      }, 1500);

      if (typedBuffer.indexOf('orbit') !== -1) {
        typedBuffer = '';
        showTypedMessage();
      }
    }
  });

  function showTypedMessage() {
    if (typedMessage) return; // already showing

    var msg = document.createElement('div');
    msg.style.cssText = [
      'position:fixed',
      'bottom:120px',
      'right:32px',
      'background:var(--color-surface)',
      'border:1px solid var(--color-border)',
      'border-radius:var(--radius-md)',
      'padding:var(--space-4) var(--space-6)',
      'font-family:var(--font-ui)',
      'font-size:0.875rem',
      'color:var(--color-text)',
      'box-shadow:var(--shadow-md)',
      'z-index:9000',
      'max-width:260px',
      'animation:orbitMsgIn 0.3s ease',
    ].join(';');
    msg.setAttribute('role', 'status');
    msg.setAttribute('aria-live', 'polite');
    msg.innerHTML =
      '<p style="margin:0;color:var(--color-primary);font-weight:600;">Orbit here!</p>' +
      '<p style="margin:0;margin-top:4px;color:var(--color-neutral);font-size:0.8125rem;">The future was always within reach. Welcome to the mission.</p>';

    var style = document.createElement('style');
    style.textContent =
      '@keyframes orbitMsgIn{' +
      'from{opacity:0;transform:translateY(8px)}' +
      'to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(style);

    document.body.appendChild(msg);
    typedMessage = msg;
    typedActive = true;

    // Auto-dismiss after 4 seconds
    setTimeout(function () {
      if (typedMessage && typedMessage.parentNode) {
        typedMessage.parentNode.removeChild(typedMessage);
        typedMessage = null;
        typedActive = false;
      }
    }, 4000);
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * EASTER EGG 3 — scroll-past-footer
   * Starfield appears when visitor scrolls past the footer
   * ───────────────────────────────────────────────────────────────────────── */
  var starfieldShown = false;
  var footerEl = qs('.site-footer');

  if (footerEl && 'IntersectionObserver' in window) {
    var footerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !starfieldShown) {
            starfieldShown = true;
            triggerStarfield();
          }
        });
      },
      { threshold: 0.1 },
    );
    footerObserver.observe(footerEl);
  }

  function triggerStarfield() {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = [
      'position:fixed',
      'inset:0',
      'pointer-events:none',
      'z-index:1',
      'opacity:0',
      'transition:opacity 1s ease',
    ].join(';');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var stars = Array.from({ length: 80 }, function () {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
      };
    });

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(function (s) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(245,239,232,' + s.opacity + ')';
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
    }

    var animFrame;
    function animate() {
      drawStars();
      animFrame = requestAnimationFrame(animate);
    }

    // Fade in
    setTimeout(function () {
      canvas.style.opacity = '1';
      animate();
    }, 200);

    // Fade out and clean up after 6 seconds
    setTimeout(function () {
      canvas.style.opacity = '0';
      cancelAnimationFrame(animFrame);
      setTimeout(function () {
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }, 1000);
    }, 6000);
  }

  /* ─────────────────────────────────────────────────────────────────────────
   * MASCOT — Orbit the rocket
   * Bottom-right hovering companion with idle bobbing, tips, dismiss
   * ───────────────────────────────────────────────────────────────────────── */
  var orbitEl = null;
  var orbitDismissed = false;

  function initMascot() {
    // Only on Home, Download, About pages (not docs/reading pages)
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var mascotPages = ['index.html', 'download.html', 'about.html'];
    if (mascotPages.indexOf(page) === -1) return;

    // Check localStorage dismissal
    try {
      orbitDismissed = localStorage.getItem('orbit-dismissed') === 'true';
    } catch (e) {
      /* noop */
    }
    if (orbitDismissed) return;

    orbitEl = document.createElement('div');
    orbitEl.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'right:24px',
      'width:56px',
      'height:56px',
      'cursor:pointer',
      'z-index:8000',
      'transition:transform 0.3s ease',
    ].join(';');
    orbitEl.setAttribute('aria-label', 'Orbit the rocket mascot');
    orbitEl.setAttribute('role', 'img');
    orbitEl.innerHTML =
      '<svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">' +
      // Sunburst trail
      '<g transform="translate(28,28)" opacity="0.4">' +
      Array.from({ length: 8 }, function (_, i) {
        var angle = ((i * 45 + 90) * Math.PI) / 180;
        return (
          '<line x1="0" y1="0" x2="' +
          12 * Math.cos(angle) +
          '" y2="' +
          12 * Math.sin(angle) +
          '" stroke="#F2B705" stroke-width="2" stroke-linecap="round"/>'
        );
      }).join('') +
      '</g>' +
      // Rocket body
      '<ellipse cx="28" cy="28" rx="10" ry="18" fill="#00AFAF"/>' +
      // Rocket nose
      '<path d="M28 8 Q32 14 28 18 Q24 14 28 8Z" fill="#F2B705"/>' +
      // Fins
      '<path d="M18 32 Q14 38 18 42 L22 36Z" fill="#E8543C"/>' +
      '<path d="M38 32 Q42 38 38 42 L34 36Z" fill="#E8543C"/>' +
      // Window
      '<circle cx="28" cy="26" r="5" fill="#111008"/>' +
      '<circle cx="28" cy="26" r="3" fill="#00AFAF" opacity="0.6"/>' +
      // Eyes in window
      '<circle cx="26.5" cy="25.5" r="0.8" fill="#F5EFE8"/>' +
      '<circle cx="29.5" cy="25.5" r="0.8" fill="#F5EFE8"/>' +
      // Smile
      '<path d="M26 28 Q28 30 30 28" stroke="#F5EFE8" stroke-width="0.8" fill="none"/>' +
      '</svg>';

    document.body.appendChild(orbitEl);

    // Idle bobbing animation
    if (!motionQuery.matches) {
      orbitEl.style.animation = 'orbitBob 3s ease-in-out infinite';
      var bobStyle = document.createElement('style');
      bobStyle.textContent =
        '@keyframes orbitBob{' +
        '0%,100%{transform:translateY(0)}' +
        '50%{transform:translateY(-6px)}' +
        '}';
      document.head.appendChild(bobStyle);
    }

    // Dismiss button (hover)
    orbitEl.addEventListener('mouseenter', function () {
      showOrbitDismiss();
    });

    // Click: launch animation
    orbitEl.addEventListener('click', function () {
      triggerOrbitLaunch();
    });
  }

  function showOrbitDismiss() {
    if (qs('.orbit-dismiss')) return;
    var btn = document.createElement('button');
    btn.className = 'orbit-dismiss';
    btn.style.cssText = [
      'position:absolute',
      'top:-8px',
      'right:-8px',
      'width:20px',
      'height:20px',
      'border-radius:50%',
      'background:var(--color-surface-alt)',
      'border:1px solid var(--color-border)',
      'color:var(--color-neutral)',
      'font-size:10px',
      'line-height:1',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center',
    ].join(';');
    btn.setAttribute('aria-label', 'Dismiss Orbit');
    btn.textContent = '\u2715';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      dismissOrbit();
    });
    orbitEl.appendChild(btn);
  }

  function dismissOrbit() {
    if (orbitEl && orbitEl.parentNode) {
      orbitEl.parentNode.removeChild(orbitEl);
      orbitEl = null;
    }
    orbitDismissed = true;
    try {
      localStorage.setItem('orbit-dismissed', 'true');
    } catch (e) {
      /* noop */
    }
  }

  function triggerOrbitLaunch() {
    if (!orbitEl) return;
    orbitEl.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    orbitEl.style.transform = 'translateY(-80px) scale(0.7)';
    orbitEl.style.opacity = '0.5';

    // Sunburst flash
    var flash = document.createElement('div');
    flash.style.cssText = [
      'position:fixed',
      'bottom:80px',
      'right:24px',
      'width:120px',
      'height:120px',
      'pointer-events:none',
      'z-index:9001',
    ].join(';');
    flash.setAttribute('aria-hidden', 'true');
    flash.innerHTML =
      '<svg viewBox="0 0 120 120" width="120" height="120">' +
      Array.from({ length: 16 }, function (_, i) {
        var angle = (i * 22.5 * Math.PI) / 180;
        var x2 = 60 + 55 * Math.cos(angle);
        var y2 = 60 + 55 * Math.sin(angle);
        return (
          '<line x1="60" y1="60" x2="' +
          x2 +
          '" y2="' +
          y2 +
          '" stroke="#F2B705" stroke-width="3" stroke-linecap="round"/>'
        );
      }).join('') +
      '</svg>';
    document.body.appendChild(flash);

    setTimeout(function () {
      if (orbitEl) {
        orbitEl.style.transform = '';
        orbitEl.style.opacity = '';
        orbitEl.style.transition = '';
      }
      if (flash.parentNode) flash.parentNode.removeChild(flash);
    }, 600);
  }

  /* ── Tip bubble logic ──────────────────────────────────────────────────── */
  function initOrbitTips() {
    if (!orbitEl) return;
    var tips = [
      {
        selector: '#sunburst-rise',
        msg: 'Launch into your collection — the future is ready to stream.',
      },
      {
        selector: '.features-overview',
        msg: 'SyncPlay keeps every screen locked to the same frame across the house.',
      },
      {
        selector: '#server, #download-roku',
        msg: 'One line to ignite the server — you are the mission control now.',
      },
      {
        selector: '.faq-section, .faq-list',
        msg: 'Questions about the flight? I have plotted the course to every answer.',
      },
    ];

    tips.forEach(function (tip) {
      var target = qs(tip.selector);
      if (!target) return;

      target.addEventListener('mouseenter', function () {
        if (qs('.orbit-tip')) return;
        var bubble = document.createElement('div');
        bubble.className = 'orbit-tip';
        bubble.style.cssText = [
          'position:fixed',
          'bottom:90px',
          'right:24px',
          'background:var(--color-surface)',
          'border:1px solid var(--color-primary)',
          'border-radius:var(--radius-md)',
          'padding:var(--space-3) var(--space-4)',
          'font-family:var(--font-ui)',
          'font-size:0.75rem',
          'color:var(--color-text)',
          'max-width:220px',
          'box-shadow:var(--shadow-teal-glow)',
          'z-index:8001',
          'pointer-events:none',
          'animation:orbitTipIn 0.25s ease',
        ].join(';');
        bubble.setAttribute('role', 'status');
        bubble.innerHTML =
          '<p style="margin:0;color:var(--color-primary);font-size:0.6875rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:2px">Orbit</p>' +
          '<p style="margin:0;color:var(--color-neutral);line-height:1.4">' +
          tip.msg +
          '</p>';

        var tipStyle = document.createElement('style');
        tipStyle.textContent =
          '@keyframes orbitTipIn{' +
          'from{opacity:0;transform:translateY(4px)}' +
          'to{opacity:1;transform:translateY(0)}}';
        document.head.appendChild(tipStyle);

        document.body.appendChild(bubble);
      });

      target.addEventListener('mouseleave', function () {
        var bubble = qs('.orbit-tip');
        if (bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
      });
    });
  }

  /* ── Init on DOM ready ─────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMascot();
      initOrbitTips();
    });
  } else {
    initMascot();
    initOrbitTips();
  }
})();
