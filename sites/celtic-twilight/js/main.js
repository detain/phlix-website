/**
 * main.js — Celtic Twilight
 * Nav toggle, reduced motion, scroll reveals, mascot, easter eggs, seasonal.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. Mobile Nav Toggle
     --------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open', !expanded);
      // Trap focus inside open menu
      if (!expanded) {
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });

    // Keyboard nav within menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var links = Array.from(navMenu.querySelectorAll('a'));
        var idx = links.indexOf(document.activeElement);
        if (idx < links.length - 1) links[idx + 1].focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        var links = Array.from(navMenu.querySelectorAll('a'));
        var idx = links.indexOf(document.activeElement);
        if (idx > 0) links[idx - 1].focus();
      }
    });
  }

  /* ---------------------------------------------------------------------
     2. Scroll Reveal
     --------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      // Show all reveals instantly
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  handleReducedMotion();

  if (!prefersReducedMotion.matches) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     3. Reduced Motion Change Listener
     --------------------------------------------------------------------- */
  prefersReducedMotion.addEventListener('change', function () {
    handleReducedMotion();
  });

  /* ---------------------------------------------------------------------
     4. Mascot — Sídhe
     --------------------------------------------------------------------- */
  var mascot = document.querySelector('.mascot');
  var mascotBody = document.querySelector('.mascot-body');
  var mascotTip = document.querySelector('.mascot-tip');
  var mascotDismiss = document.querySelector('.mascot-dismiss');

  if (mascot && mascotBody) {
    // Check dismissal persisted from a previous session
    var dismissed = localStorage.getItem('sidhe-dismissed');

    // Mobile: show in-flow version only
    if (window.innerWidth < 768) {
      mascot.classList.add('mobile-visible');
    }

    if (dismissed) {
      mascot.classList.add('hidden');
    }

    // Section tips (per section anchors)
    var tipData = [
      { selector: '#the-threshold', say: 'Welcome, seeker. The fire is lit. What calls to you?' },
      {
        selector: '.features-overview',
        say: 'Three treasures await: stories held, circles kept in sync, and vessels that reach anywhere.',
      },
      {
        selector: '.feature-grid',
        say: 'Each of these is a thread in the great tapestry. Pull one, and the whole loom reveals itself.',
      },
      {
        selector: '#server',
        say: 'Here begins the threshold. One command, and you become the keeper of your own archive.',
      },
      {
        selector: '.faq-section, .faq-list',
        say: 'The elder questions, answered by firelight. Ask what troubles you.',
      },
    ];

    var tipIndex = -1;
    var tipTimeout;

    function showNextTip() {
      if (!mascotTip) return;
      if (dismissed) return;
      tipIndex = (tipIndex + 1) % tipData.length;
      var entry = tipData[tipIndex];
      var section = document.querySelector(entry.selector);
      if (section) {
        mascotTip.textContent = entry.say;
        mascotTip.classList.add('visible');
        clearTimeout(tipTimeout);
        tipTimeout = setTimeout(function () {
          if (mascotTip) mascotTip.classList.remove('visible');
        }, 5000);
      }
    }

    function hideTip() {
      if (mascotTip) mascotTip.classList.remove('visible');
      clearTimeout(tipTimeout);
    }

    // Show first tip after a delay
    if (!dismissed && !prefersReducedMotion.matches) {
      setTimeout(showNextTip, 3000);
    }

    // Dismiss
    if (mascotDismiss) {
      mascotDismiss.addEventListener('click', function () {
        mascot.classList.add('hidden');
        localStorage.setItem('sidhe-dismissed', '1');
        hideTip();
      });
    }

    // Hover shows tip on desktop
    if (window.innerWidth >= 768 && !prefersReducedMotion.matches) {
      mascotBody.addEventListener('mouseenter', function () {
        if (!mascotTip) return;
        // Find current section
        var scrollY = window.scrollY;
        var wh = window.innerHeight;
        for (var i = 0; i < tipData.length; i++) {
          var el = document.querySelector(tipData[i].selector);
          if (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < wh && rect.bottom > 0) {
              mascotTip.textContent = tipData[i].say;
              break;
            }
          }
        }
        clearTimeout(tipTimeout);
        setTimeout(function () {
          if (mascotTip) mascotTip.classList.add('visible');
        }, 400);
      });
      mascotBody.addEventListener('mouseleave', function () {
        clearTimeout(tipTimeout);
        tipTimeout = setTimeout(function () {
          if (mascotTip) mascotTip.classList.remove('visible');
        }, 800);
      });
    }

    // Click: easter egg — triskelion spiral burst
    var clickCount = 0;
    mascotBody.addEventListener('click', function () {
      clickCount++;
      if (clickCount >= 7) {
        clickCount = 0;
        triggerTriskelionBurst();
      }
    });

    // Hover-hold 3s easter egg
    var hoverHoldTimer;
    if (!prefersReducedMotion.matches) {
      mascotBody.addEventListener('mouseenter', function () {
        hoverHoldTimer = setTimeout(function () {
          triggerHoverHold();
        }, 3000);
      });
      mascotBody.addEventListener('mouseleave', function () {
        clearTimeout(hoverHoldTimer);
      });
    }

    // Mobile: tap to show tip
    if (window.innerWidth < 768) {
      mascotBody.addEventListener('click', function () {
        showNextTip();
      });
    }
  }

  /* ---------------------------------------------------------------------
     5. Easter Egg: Hover-Hold Mascot → Gold Spiral Burst
     --------------------------------------------------------------------- */
  function triggerHoverHold() {
    var sparkles = document.querySelector('.gold-sparkles');
    if (!sparkles) return;

    sparkles.classList.add('active');
    var particles = sparkles.querySelectorAll('.sparkle');

    // Place 12 sparkles around center
    var cx = 60,
      cy = 60,
      r = 48;
    particles.forEach(function (p, i) {
      var angle = (i / particles.length) * Math.PI * 2;
      var tx = Math.cos(angle) * r;
      var ty = Math.sin(angle) * r;
      p.style.setProperty('--tx', tx + 'px');
      p.style.setProperty('--ty', ty + 'px');
      p.classList.remove('burst');
      void p.offsetWidth; // reflow
      p.classList.add('burst');
    });

    // Show reward message
    showEasterReward("The spirit's light burns brighter when you believe.");

    setTimeout(function () {
      sparkles.classList.remove('active');
      particles.forEach(function (p) {
        p.classList.remove('burst');
      });
    }, 3000);
  }

  /* ---------------------------------------------------------------------
     6. Easter Egg: Triskelion Burst (mascot click:7)
     --------------------------------------------------------------------- */
  function triggerTriskelionBurst() {
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText =
      'position:fixed;inset:0;z-index:300;pointer-events:none;opacity:0;transition:opacity 0.3s';
    canvas.classList.add('mascot-easter-effect');
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var t = 0;
    var duration = 60;
    var anim;

    function drawTriskelion(x, y, rot, scale, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var arm = 0; arm < 3; arm++) {
        var a0 = (arm / 3) * Math.PI * 2;
        ctx.moveTo(0, 0);
        var cx1 = Math.cos(a0) * 20;
        var cy1 = Math.sin(a0) * 20;
        var cx2 = Math.cos(a0 + 1.2) * 30;
        var cy2 = Math.sin(a0 + 1.2) * 30;
        var ex = Math.cos(a0 + 2.4) * 40;
        var ey = Math.sin(a0 + 2.4) * 40;
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
      }
      ctx.stroke();
      ctx.restore();
    }

    var spirals = Array.from({ length: 5 }, function () {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        rot: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 1.5,
        speed: (Math.random() - 0.5) * 0.08,
      };
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;
      var alpha = Math.max(0, 1 - t / duration);
      spirals.forEach(function (s) {
        s.rot += s.speed;
        drawTriskelion(s.x, s.y, s.rot, s.scale, alpha);
      });
      if (t < duration) {
        anim = requestAnimationFrame(animate);
      } else {
        canvas.style.opacity = '0';
        setTimeout(function () {
          canvas.remove();
        }, 400);
        return;
      }
    }

    canvas.style.opacity = '1';
    animate();
  }

  /* ---------------------------------------------------------------------
     7. Easter Egg: Typed-Word "knotwork"
     --------------------------------------------------------------------- */
  var typedBuffer = '';
  var typedTimeout;
  var knotworkBorder = null;

  function initKnotworkBorder() {
    if (!knotworkBorder) {
      knotworkBorder = document.createElement('div');
      knotworkBorder.className = 'knotwork-border';
      document.body.appendChild(knotworkBorder);
    }
  }

  document.addEventListener('keydown', function (e) {
    // Disable while in an input/textarea/contenteditable
    var tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) return;
    if (e.key === 'Escape') {
      if (knotworkBorder && knotworkBorder.classList.contains('active')) {
        knotworkBorder.classList.remove('active');
        return;
      }
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typedBuffer += e.key.toLowerCase();
      if (typedBuffer.length > 10) typedBuffer = typedBuffer.slice(-10);
      clearTimeout(typedTimeout);
      typedTimeout = setTimeout(function () {
        typedBuffer = '';
      }, 1200);
      if (typedBuffer.indexOf('knotwork') !== -1) {
        typedBuffer = '';
        triggerKnotworkBorder();
      }
    }
  });

  function triggerKnotworkBorder() {
    initKnotworkBorder();
    knotworkBorder.classList.add('active');
    showEasterReward("You've found the hidden pattern.");
    setTimeout(function () {
      if (knotworkBorder) knotworkBorder.classList.remove('active');
    }, 4000);
  }

  /* ---------------------------------------------------------------------
     8. Easter Reward Toast
     --------------------------------------------------------------------- */
  var rewardTimeout;
  function showEasterReward(text) {
    var existing = document.querySelector('.easter-reward-toast');
    if (existing) existing.remove();
    clearTimeout(rewardTimeout);

    var toast = document.createElement('div');
    toast.className = 'easter-reward-toast';
    toast.textContent = text;
    toast.setAttribute('role', 'status');
    toast.style.cssText =
      'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);' +
      'z-index:300;background:var(--color-surface, #FAF7EE);' +
      'color:var(--color-text, #1A1208);' +
      'border:1.5px solid var(--color-border, #2C2010);' +
      'border-top:3px solid var(--color-tertiary, #B8860B);' +
      'padding:12px 24px;border-radius:18px;font-family:var(--font-body, serif);' +
      'font-style:italic;font-size:0.9375rem;box-shadow:0 10px 28px rgba(30,15,48,0.28);' +
      'opacity:0;transition:opacity 0.4s ease;white-space:nowrap;';
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(function () {
      toast.style.opacity = '1';
    });

    rewardTimeout = setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () {
        toast.remove();
      }, 400);
    }, 3500);
  }

  /* ---------------------------------------------------------------------
     9. Hero Parallax — diorama-parallax
     --------------------------------------------------------------------- */
  var heroLantern = document.querySelector('.lantern-glow');
  var heroSection = document.querySelector('.hero');

  if (heroLantern && heroSection && !prefersReducedMotion.matches) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          var heroH = heroSection.offsetHeight;
          if (scrollY < heroH) {
            var progress = scrollY / heroH;
            // Lantern brightens as you scroll
            var scale = 1 + progress * 0.12;
            var bright = 0.7 + progress * 0.3;
            heroLantern.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
            heroLantern.style.opacity = String(bright);
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    // Pointer-based parallax (mouse movement)
    var heroInner = document.querySelector('.hero-inner');
    if (heroInner) {
      document.addEventListener('mousemove', function (e) {
        var cx = window.innerWidth / 2;
        var cy = window.innerHeight / 2;
        var dx = (e.clientX - cx) / cx; // -1 to 1
        var dy = (e.clientY - cy) / cy;
        var lantern = document.querySelector('.lantern-glow');
        if (lantern) {
          lantern.style.transform =
            'translate(calc(-50% + ' + dx * 12 + 'px), calc(-50% + ' + dy * 8 + 'px))';
        }
      });
    }
  }

  /* ---------------------------------------------------------------------
     10. Seasonal Activation — live-js
     --------------------------------------------------------------------- */
  (function activateSeasonal() {
    var now = new Date();
    var month = now.getMonth() + 1; // 1-12
    var day = now.getDate();

    var seasonal = null;
    if ((month === 10 && day >= 20) || (month === 11 && day <= 2)) seasonal = 'samhain';
    else if (month === 2 && day >= 1 && day <= 14) seasonal = 'imbolc';
    else if (month === 5 && day >= 1 && day <= 7) seasonal = 'bealtaine';
    else if (month === 12 && day >= 18 && day <= 26) seasonal = 'solstice';

    if (seasonal && document.documentElement.getAttribute('data-season') !== seasonal) {
      document.documentElement.setAttribute('data-season', seasonal);
    }
  })();

  /* ---------------------------------------------------------------------
     11. Visitor Path Fork — keyboard accessible
     --------------------------------------------------------------------- */
  document.querySelectorAll('.visitor-fork-options a').forEach(function (link) {
    link.addEventListener('focus', function () {
      // Ensure visible within scroll
    });
  });
})();
