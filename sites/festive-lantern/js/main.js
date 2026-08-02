/**
 * main.js — Festive Lantern interactive behaviors
 * Kit: festive-lantern | Voice: Warm, Celebratory, Generous, Inviting
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ─── Reduced motion — listen for changes, not just read once ─────────── */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function onMotionChange() {
    var prefersReduced = reduceMotion.matches;
    document.documentElement.classList.toggle('reduce-motion', prefersReduced);
    // Disable/enable all CSS transitions and animations via class
    if (prefersReduced) {
      document.documentElement.style.setProperty('--motion-duration', '0.01ms');
    } else {
      document.documentElement.style.removeProperty('--motion-duration');
    }
  }
  reduceMotion.addEventListener('change', onMotionChange);
  onMotionChange(); // run once at init

  /* ─── Intensity toggle (Soften the Glow) ───────────────────────────────── */
  var toggleBtn = document.getElementById('intensity-toggle');
  if (toggleBtn) {
    // Restore persisted state
    var savedIntensity = localStorage.getItem('phlix-intensity');
    if (savedIntensity === 'calm') {
      document.body.classList.add('intensity-calm');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.textContent = 'Restore the Full Glow';
    }

    toggleBtn.addEventListener('click', function () {
      var isCalm = document.body.classList.toggle('intensity-calm');
      toggleBtn.setAttribute('aria-pressed', String(isCalm));
      toggleBtn.textContent = isCalm ? 'Restore the Full Glow' : 'Soften the Glow';
      try {
        localStorage.setItem('phlix-intensity', isCalm ? 'calm' : 'full');
      } catch (e) {
        /* storage unavailable */
      }
    });
  }

  /* ─── Mobile nav toggle ─────────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  /* ─── Scroll reveals (lantern-rise fade-in) ────────────────────────────── */
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
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

    document
      .querySelectorAll('.feature-card, .client-card, .download-card, .faq-item, .ecosystem-item')
      .forEach(function (el) {
        el.classList.add('scroll-reveal');
        revealObserver.observe(el);
      });
  } else {
    document.querySelectorAll('.scroll-reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ─── Scroll reveal animation ───────────────────────────────────────────── */
  var revealStyle = document.createElement('style');
  revealStyle.textContent = [
    '.scroll-reveal { opacity: 0; transform: translateY(16px); transition: opacity 400ms ease-out, transform 400ms ease-out; }',
    '.scroll-reveal.revealed { opacity: 1; transform: translateY(0); }',
    '@media (prefers-reduced-motion: reduce) { .scroll-reveal { opacity: 1; transform: none; transition: none; } }',
    '/* Intensity calm mode — kills glow effects and transitions */',
    '.intensity-calm .shadow-lantern-glow,',
    '.intensity-calm .shadow-gold-glow,',
    '.intensity-calm [class*="glow"] { box-shadow: none !important; }',
    '.intensity-calm * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }',
  ].join('\n');
  document.head.appendChild(revealStyle);

  /* ─── Lumen mascot ──────────────────────────────────────────────────────── */
  (function () {
    var mascot = document.getElementById('lumen');
    if (!mascot) return;

    var tips = [
      { selector: '#lantern-sky', text: 'Light the lantern — your gathering is about to begin.' },
      {
        selector: '#attraction-stage',
        text: 'Every lantern burns brighter when shared — watch together with SyncPlay.',
      },
      {
        selector: '#light-your-lantern',
        text: "One line and your lantern rises into the sky. I'll light the way from here.",
      },
      {
        selector: '.faq-list',
        text: "Questions before the feast? I've kept the answers warm for you.",
      },
    ];

    var mascotDismissed = false;
    try {
      mascotDismissed = localStorage.getItem('phlix-lumen-dismissed') === 'true';
    } catch (e) {
      /* storage unavailable */
    }

    if (mascotDismissed) {
      mascot.style.display = 'none';
      return;
    }

    // Show the restore button if mascot is dismissed
    var restoreBtn = document.getElementById('lumen-restore');
    if (restoreBtn) {
      restoreBtn.addEventListener('click', function () {
        mascot.style.display = '';
        mascot.classList.remove('lumen-dismissed');
        try {
          localStorage.removeItem('phlix-lumen-dismissed');
        } catch (e) {
          // localStorage not available — ignore
        }
        restoreBtn.style.display = 'none';
      });
    }

    // Tip system
    var tipEl = mascot.querySelector('.lumen-tip');
    if (tipEl) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !reduceMotion.matches) {
              var match = tips.find(function (t) {
                return entry.target.matches(t.selector);
              });
              if (match) {
                tipEl.textContent = match.text;
                tipEl.style.display = 'block';
                return;
              }
            }
          });
        },
        { threshold: 0.3 },
      );

      tips.forEach(function (tip) {
        var el = document.querySelector(tip.selector);
        if (el) observer.observe(el);
      });
    }

    // Dismiss
    var dismissBtn = mascot.querySelector('.lumen-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        mascot.style.display = 'none';
        mascot.classList.add('lumen-dismissed');
        try {
          localStorage.setItem('phlix-lumen-dismissed', 'true');
        } catch (e) {
          // localStorage not available — ignore
        }
        if (restoreBtn) restoreBtn.style.display = '';
      });
    }

    // Click:5 easter egg — Lumen flares with golden fireworks
    var lumenClickCount = 0;
    mascot.addEventListener('click', function () {
      lumenClickCount++;
      if (lumenClickCount >= 5) {
        lumenClickCount = 0;
        mascot.classList.add('lumen-fireworks');
        setTimeout(function () {
          mascot.classList.remove('lumen-fireworks');
        }, 2000);
      }
    });

    // Hover-hold:2s easter egg
    var hoverTimer;
    mascot.addEventListener('mouseenter', function () {
      hoverTimer = setTimeout(function () {
        if (!reduceMotion.matches) {
          var whisper = mascot.querySelector('.lumen-whisper');
          if (whisper) {
            whisper.style.display = 'block';
            whisper.textContent =
              "You're invited to the festival whenever you're ready — press play anytime.";
            setTimeout(function () {
              whisper.style.display = 'none';
            }, 4000);
          }
        }
      }, 2000);
    });
    mascot.addEventListener('mouseleave', function () {
      clearTimeout(hoverTimer);
    });

    // Add Lumen animation styles
    var lumenStyle = document.createElement('style');
    lumenStyle.textContent = [
      '#lumen { position: fixed; bottom: 24px; right: 24px; z-index: 200; cursor: pointer; }',
      '#lumen.lumen-dismissed { display: none; }',
      '.lumen-body { width: 56px; height: 72px; position: relative; animation: lumenFloat 6s ease-in-out infinite; }',
      '@keyframes lumenFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }',
      '@media (prefers-reduced-motion: reduce) { .lumen-body { animation: none; } }',
      '.lumen-fireworks .lumen-body { animation: lumenFlare 0.6s ease-out forwards !important; }',
      '@keyframes lumenFlare { 0% { filter: brightness(1); } 50% { filter: brightness(2) drop-shadow(0 0 16px #d4a017); } 100% { filter: brightness(1); } }',
      '.lumen-tip { display: none; position: absolute; bottom: 80px; right: 0; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); font-family: var(--font-ui); font-size: 0.8125rem; color: var(--color-text); max-width: 220px; box-shadow: var(--shadow-md); white-space: normal; }',
      '.lumen-whisper { display: none; position: absolute; bottom: 80px; right: 0; background: var(--color-surface-alt); border: 1px solid var(--color-secondary); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); font-family: var(--font-ui); font-size: 0.8125rem; color: var(--color-secondary); font-style: italic; max-width: 220px; }',
      '.lumen-dismiss { background: none; border: none; cursor: pointer; color: var(--color-text); opacity: 0.5; font-size: 0.75rem; font-family: var(--font-ui); padding: 2px 4px; }',
      '.lumen-dismiss:hover { opacity: 1; }',
      '#lumen-restore { position: fixed; bottom: 24px; right: 24px; z-index: 199; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-pill); padding: var(--space-2) var(--space-4); font-family: var(--font-ui); font-size: 0.75rem; color: var(--color-secondary); cursor: pointer; display: none; }',
      '@media (max-width: 767px) { #lumen { position: static; margin: var(--space-6) auto var(--space-4); } .lumen-tip { right: auto; left: 50%; transform: translateX(-50%); bottom: 90px; } .lumen-whisper { right: auto; left: 50%; transform: translateX(-50%); bottom: 90px; } }',
      '/* Intensity calm: kill Lumen animations */',
      '.intensity-calm .lumen-body { animation: none !important; }',
    ].join('\n');
    document.head.appendChild(lumenStyle);
  })();

  /* ─── Easter Egg: logo-clicks:5 → Lumen fireworks ───────────────────────── */
  (function () {
    var logo = document.querySelector('.nav-logo');
    var lumen = document.getElementById('lumen');
    if (!logo) return;
    var count = 0;
    logo.addEventListener('click', function (e) {
      // Don't count if shift/ctrl/meta held (browser shortcuts)
      if (e.shiftKey || e.ctrlKey || e.metaKey) return;
      count++;
      if (count >= 5 && lumen) {
        count = 0;
        lumen.classList.add('lumen-fireworks');
        setTimeout(function () {
          lumen.classList.remove('lumen-fireworks');
        }, 2000);
      }
    });
  })();

  /* ─── Easter Egg: typed-word:lantern → floating lanterns ───────────────── */
  (function () {
    var typed = [];
    var target = 'lantern';
    var active = true;

    // Disable when focus is in an input/textarea/contenteditable
    document.addEventListener('focusin', function () {
      active = false;
    });
    document.addEventListener('focusout', function () {
      active = true;
      typed = [];
    });

    document.addEventListener('keydown', function (e) {
      if (!active) return;
      // Never preventDefault — let typing work normally
      if (e.key === 'Escape') {
        typed = [];
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        typed.push(e.key.toLowerCase());
        if (typed.length > target.length) typed.shift();
        if (typed.join('') === target) {
          typed = [];
          spawnLanternParticles();
        }
      }
    });
  })();

  function spawnLanternParticles() {
    var container = document.getElementById('lantern-particles');
    if (!container) {
      container = document.createElement('div');
      container.id = 'lantern-particles';
      container.setAttribute('aria-hidden', 'true');
      container.style.cssText =
        'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
      document.body.appendChild(container);
    }

    for (var i = 0; i < 12; i++) {
      var particle = document.createElement('div');
      var isGold = Math.random() > 0.5;
      particle.style.cssText = [
        'position:absolute',
        'bottom:-40px',
        'left:' + (10 + Math.random() * 80) + 'vw',
        'width:16px',
        'height:22px',
        'background:' + (isGold ? '#d4a017' : '#c0392b'),
        'border-radius:50% 50% 50% 50% / 60% 60% 40% 40%',
        'opacity:0.85',
        'box-shadow: 0 0 8px ' + (isGold ? 'rgba(212,160,23,0.6)' : 'rgba(192,57,43,0.6)'),
        'animation: lanternRiseParticle ' + (2.5 + Math.random() * 2) + 's ease-out forwards',
        'animation-delay:' + Math.random() * 0.8 + 's',
      ].join(';');
      container.appendChild(particle);
      setTimeout(
        (function (p) {
          return function () {
            if (p.parentNode) p.parentNode.removeChild(p);
          };
        })(particle),
        5000,
      );
    }

    // Clean up particles after animation
    setTimeout(function () {
      if (container.parentNode) container.parentNode.removeChild(container);
    }, 6000);
  }

  /* Add lantern particle animation */
  var particleStyle = document.createElement('style');
  particleStyle.textContent = [
    '@keyframes lanternRiseParticle { 0% { transform: translateY(0) rotate(0deg); opacity: 0.85; } 80% { opacity: 0.6; } 100% { transform: translateY(-100vh) rotate(' +
      (15 + Math.random() * 30) +
      'deg); opacity: 0; } }',
  ].join('\n');
  document.head.appendChild(particleStyle);

  /* ─── Seasonal banner (Lunar New Year: Jan 20 – Feb 10) ─────────────────── */
  (function () {
    var banner = document.getElementById('seasonal-banner');
    if (!banner) return;

    function inRange() {
      var now = new Date();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      // Lunar New Year: 01-20 through 02-10
      if (month === 1 && day >= 20) return true;
      if (month === 2 && day <= 10) return true;
      return false;
    }

    if (inRange()) {
      banner.hidden = false;
      banner.removeAttribute('hidden');
    }
  })();
})();
