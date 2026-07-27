/**
 * ============================================================================
 *  MAIN.JS — Editorial Underground
 *  Nav toggle, reduced-motion, easter eggs, mascot behavior, scroll reveals
 *  @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     REDUCED MOTION
     ----------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('motion-reduced', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  /* -----------------------------------------------------------------------
     MOBILE NAV TOGGLE
     ----------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open', !expanded);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }

  /* -----------------------------------------------------------------------
     EASTER EGG: KONAMI CODE
     Up, Up, Down, Down, Left, Right, Left, Right, B, A
     ----------------------------------------------------------------------- */
  const KONAMI = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ];
  let konamiIndex = 0;
  let konamiActive = false;

  document.addEventListener('keydown', (e) => {
    // Skip if focus is in an input/textarea/contenteditable
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

    if (e.code === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        triggerKonami();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerKonami() {
    if (konamiActive) return;
    konamiActive = true;

    // Flash background
    document.body.classList.add('konami-flash');

    // Show Riot slash
    const slash = document.createElement('div');
    slash.className = 'riot-slash';
    slash.setAttribute('aria-hidden', 'true');
    document.body.appendChild(slash);

    // Show reward message
    const reward = document.createElement('div');
    reward.style.cssText = [
      'position:fixed',
      'top:50%',
      'left:50%',
      'transform:translate(-50%,-50%)',
      'background:"var(--color-bg)"',
      'border:2px solid var(--color-primary)',
      'padding:24px 48px',
      'font-family:"var(--font-headline)"',
      'font-size:clamp(1.5rem,5vw,3rem)',
      'color:var(--color-primary)',
      'text-transform:uppercase',
      'z-index:1001',
      'text-align:center',
      'pointer-events:none',
    ].join(';');
    reward.textContent = "RIOT SAYS: THEY CAN'T STOP THE SIGNAL.";
    document.body.appendChild(reward);

    setTimeout(() => {
      document.body.classList.remove('konami-flash');
      slash.remove();
      reward.remove();
      konamiActive = false;
    }, 3000);

    // Esc to dismiss early
    const escHandler = (ev) => {
      if (ev.key === 'Escape') {
        document.body.classList.remove('konami-flash');
        slash.remove();
        reward.remove();
        konamiActive = false;
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  /* -----------------------------------------------------------------------
     EASTER EGG: TYPED-WORD :phlix
     ----------------------------------------------------------------------- */
  const TARGET_WORD = 'phlix';
  let typedBuffer = '';
  let typedTimeout = null;
  let typedActive = false;

  document.addEventListener('keydown', (e) => {
    // Skip if in input
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

    // Only A-Z keys
    if (!/^Key[A-Z]$/.test(e.code)) return;

    const letter = e.key.toLowerCase();
    typedBuffer += letter;

    // Keep buffer bounded
    if (typedBuffer.length > TARGET_WORD.length + 5) {
      typedBuffer = typedBuffer.slice(-TARGET_WORD.length);
    }

    if (typedBuffer.includes(TARGET_WORD)) {
      triggerTypedWord();
      typedBuffer = '';
    }

    clearTimeout(typedTimeout);
    typedTimeout = setTimeout(() => {
      typedBuffer = '';
    }, 1000);
  });

  function triggerTypedWord() {
    if (typedActive) return;
    typedActive = true;

    // Highlight all Phlix instances
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodesToHighlight = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.toLowerCase().includes('phlix')) {
        nodesToHighlight.push(node);
      }
    }

    const originals = nodesToHighlight.map((n) => n.nodeValue);

    nodesToHighlight.forEach((n) => {
      const regex = /phlix/gi;
      const span = document.createElement('span');
      span.innerHTML = n.nodeValue.replace(
        regex,
        '<mark style="background:var(--color-primary);color:var(--color-bg);padding:0 2px;border:1px solid var(--color-primary);display:inline;">Phlix</mark>',
      );
      n.parentNode.replaceChild(span, n);
    });

    setTimeout(() => {
      nodesToHighlight.forEach((n, i) => {
        const mark = n.parentNode;
        if (mark.tagName === 'MARK') {
          const txt = document.createTextNode(originals[i]);
          mark.parentNode.replaceChild(txt, mark);
        }
      });
      typedActive = false;
    }, 2000);

    // Esc to dismiss early
    const escHandler = (ev) => {
      if (ev.key === 'Escape') {
        nodesToHighlight.forEach((n, i) => {
          const mark = n.parentNode;
          if (mark && mark.tagName === 'MARK') {
            const txt = document.createTextNode(originals[i]);
            mark.parentNode.replaceChild(txt, mark);
          }
        });
        typedActive = false;
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  /* -----------------------------------------------------------------------
     MASCOT: Riot
     ----------------------------------------------------------------------- */
  const MAS_COT_SELECTOR = '.mascot';
  const mascot = document.querySelector(MAS_COT_SELECTOR);

  if (mascot) {
    const mascotFigure = mascot.querySelector('.mascot__figure');
    const mascotClose = mascot.querySelector('.mascot__close');
    const _mascotTip = mascot.querySelector('.mascot__tip');

    // Check if dismissed
    try {
      if (localStorage.getItem('riot-dismissed') === 'true') {
        mascot.style.display = 'none';
      }
    } catch {
      /* noop */
    }

    // Dismiss
    if (mascotClose) {
      mascotClose.addEventListener('click', () => {
        mascot.style.transition = 'transform 200ms steps(1, end), opacity 200ms';
        mascot.style.transform = 'translateX(-120%)';
        mascot.style.opacity = '0';
        try {
          localStorage.setItem('riot-dismissed', 'true');
        } catch {
          /* noop */
        }
        setTimeout(() => {
          mascot.style.display = 'none';
        }, 200);
      });
    }

    // Easter: click 3 times — Riot fist-raise + screen slash
    let riotClickCount = 0;
    let riotClickTimer = null;

    if (mascotFigure) {
      mascotFigure.addEventListener('click', () => {
        if (prefersReducedMotion.matches) return;

        riotClickCount++;
        clearTimeout(riotClickTimer);
        riotClickTimer = setTimeout(() => {
          riotClickCount = 0;
        }, 600);

        if (riotClickCount >= 3) {
          riotClickCount = 0;
          triggerRiotClick();
        }
      });

      // Easter: typed-word:phlix — Riot lightning flash
      let riotTypedBuffer = '';
      const RIOT_WORD = 'phlix';
      document.addEventListener('keydown', (e) => {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
        if (!/^Key[A-Z]$/.test(e.code)) return;

        riotTypedBuffer += e.key.toLowerCase();
        if (riotTypedBuffer.length > RIOT_WORD.length + 3) {
          riotTypedBuffer = riotTypedBuffer.slice(-RIOT_WORD.length);
        }
        if (riotTypedBuffer.includes(RIOT_WORD)) {
          triggerRiotTyped();
          riotTypedBuffer = '';
        }
      });
    }
  }

  function triggerRiotClick() {
    // Show a slash across screen
    const slash = document.createElement('div');
    slash.className = 'riot-slash';
    slash.setAttribute('aria-hidden', 'true');
    document.body.appendChild(slash);
    setTimeout(() => slash.remove(), 500);
  }

  function triggerRiotTyped() {
    const figure = document.querySelector('.mascot__figure');
    if (figure) {
      figure.classList.add('riot-flash');
      setTimeout(() => figure.classList.remove('riot-flash'), 150);
    }
  }

  /* -----------------------------------------------------------------------
     SCROLL REVEALS (IntersectionObserver)
     ----------------------------------------------------------------------- */
  if (!prefersReducedMotion.matches) {
    const revealEls = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
    );
    if (revealEls.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      revealEls.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0ms, transform 0ms';
        observer.observe(el);
      });
    }
  }

  /* -----------------------------------------------------------------------
     INSTALL COMMAND COPY BUTTON
     ----------------------------------------------------------------------- */
  document.querySelectorAll('.install-cmd__copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.install-cmd') || btn.closest('.code-block');
      if (pre) {
        const code = pre.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'COPIED';
            setTimeout(() => {
              btn.textContent = orig;
            }, 1500);
          });
        }
      }
    });
  });

  /* -----------------------------------------------------------------------
     SEASONAL VARIANT (live-js)
     Blackout New Year: 12-28..01-03
     Dead Season October: 10-01..10-31
     No Valentine: 02-10..02-14
     ----------------------------------------------------------------------- */
  (function applySeasonalVariant() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    function inRange(m1, d1, m2, d2) {
      const curr = month * 100 + day;
      const start = m1 * 100 + d1;
      const end = m2 * 100 + d2;
      if (start <= end) return curr >= start && curr <= end;
      // Crosses year boundary
      return curr >= start || curr <= end;
    }

    const root = document.documentElement;

    if (inRange(12, 28, 1, 3)) {
      // Blackout New Year — primary stays yellow, secondary stays magenta
      // (they're already the right colors for this variant)
    } else if (inRange(10, 1, 10, 31)) {
      // Dead Season October — primary swaps to magenta
      root.style.setProperty('--color-primary', '#FF0066');
      root.style.setProperty('--color-secondary', '#FFE500');
    } else if (inRange(2, 10, 2, 14)) {
      // No Valentine — primary is magenta, secondary yellow
      root.style.setProperty('--color-primary', '#FF0066');
      root.style.setProperty('--color-secondary', '#FFE500');
    }
    // else: default colors
  })();
})();
