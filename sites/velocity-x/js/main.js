/**
 * main.js — Velocity X Brand Kit — Interactive JavaScript
 * Extreme sports energy: kickflip transitions, grind-rail navigation, gravity-defying scroll
 */

(function() {
  'use strict';

  /* ==========================================================================
     PREFERENCES
     ========================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     SCROLL ANIMATIONS — Animate on scroll
     ========================================================================== */
  function initScrollAnimations() {
    if (prefersReducedMotion) {
      // Show all elements immediately
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger the animations
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
      if (!el.dataset.delay) {
        el.dataset.delay = (i % 6) * 80;
      }
      observer.observe(el);
    });
  }

  /* ==========================================================================
     MOBILE NAVIGATION
     ========================================================================== */
  function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });

    // Close on link click
    links.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav')) {
        toggle.classList.remove('active');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     HEADER SCROLL EFFECT
     ========================================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ==========================================================================
     ACCORDION / DETAILS
     ========================================================================== */
  function initAccordion() {
    document.querySelectorAll('.accordion__trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.parentElement;
        const wasOpen = item.classList.contains('open');

        // Close all siblings
        item.parentElement.querySelectorAll('.accordion__item').forEach(i => {
          i.classList.remove('open');
        });

        // Toggle current
        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  /* ==========================================================================
     TABS
     ========================================================================== */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
      const triggers = tabGroup.querySelectorAll('.tabs__item');
      const panels = tabGroup.parentElement.querySelectorAll('.tab-panel');

      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          const target = trigger.dataset.tab;

          // Update triggers
          triggers.forEach(t => t.classList.remove('active'));
          trigger.classList.add('active');

          // Update panels
          panels.forEach(panel => {
            if (panel.dataset.tabPanel === target) {
              panel.hidden = false;
            } else {
              panel.hidden = true;
            }
          });
        });
      });
    });
  }

  /* ==========================================================================
     KICKFLIP CARD ANIMATION ON HOVER
     ========================================================================== */
  function initKickflipCards() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.card[data-kickflip]').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.animation = 'kickflip 0.4s ease-out';
      });
      card.addEventListener('animationend', () => {
        card.style.animation = '';
      });
    });
  }

  /* ==========================================================================
     WHEEL SPIN ON SCROLL
     ========================================================================== */
  function initWheelSpinScroll() {
    if (prefersReducedMotion) return;

    const wheel = document.querySelector('.hero__wheel');
    if (!wheel) return;

    let lastScrollY = window.scrollY;
    let rotation = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;
          rotation += delta * 0.15;
          wheel.style.transform = `rotate(${rotation}deg)`;
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ==========================================================================
     GRAVITY-DEFYING SCROLL — Parallax effect
     ========================================================================== */
  function initGravityScroll() {
    if (prefersReducedMotion) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ==========================================================================
     SLASH DIVIDER ANIMATION ON SCROLL
     ========================================================================== */
  function initSlashReveal() {
    if (prefersReducedMotion) return;

    const slashes = document.querySelectorAll('.slash-divider[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slashIn 0.6s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    slashes.forEach(slash => observer.observe(slash));
  }

  /* ==========================================================================
     STICKER BOMB HOVER EFFECT
     ========================================================================== */
  function initStickerBomb() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('[data-sticker]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const splat = document.createElement('div');
        splat.className = 'splat splat--pink';
        splat.style.cssText = `
          position: absolute;
          width: ${20 + Math.random() * 30}px;
          height: ${20 + Math.random() * 30}px;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          pointer-events: none;
          animation: sprayBurst 0.4s ease-out forwards;
          z-index: -1;
        `;
        el.style.position = 'relative';
        el.appendChild(splat);

        setTimeout(() => {
          splat.remove();
        }, 400);
      });
    });
  }

  /* ==========================================================================
     COUNTER ANIMATION
     ========================================================================== */
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat__number[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1500;
          const start = performance.now();

          function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target.toLocaleString();
            }
          }

          if (prefersReducedMotion) {
            el.textContent = target.toLocaleString();
          } else {
            requestAnimationFrame(update);
          }

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /* ==========================================================================
     COPY TO CLIPBOARD
     ========================================================================== */
  function initCopyToClipboard() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.copy;
        const target = document.getElementById(targetId);
        if (!target) return;

        navigator.clipboard.writeText(target.textContent).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Copied
          `;
          setTimeout(() => {
            btn.innerHTML = original;
          }, 2000);
        });
      });
    });
  }

  /* ==========================================================================
     ACTIVE NAV LINK
     ========================================================================== */
  function initActiveNav() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath ||
          (href !== '/' && currentPath.startsWith(href)) ||
          (href === '/' && currentPath === '/')) {
        link.classList.add('active');
      }
    });
  }

  /* ==========================================================================
     KEYBOARD NAV — Trap focus in modals
     ========================================================================== */
  function initFocusTrap() {
    document.querySelectorAll('[data-modal]').forEach(modal => {
      modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        const focusable = modal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
    });
  }

  /* ==========================================================================
     SMOOTH SCROLL TO ANCHOR
     ========================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /* ==========================================================================
     LAZY LOAD IMAGES
     ========================================================================== */
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
    }
  }


  /* ==========================================================================
     INIT
     ========================================================================== */
  function init() {
    initActiveNav();
    initMobileNav();
    initHeaderScroll();
    initScrollAnimations();
    initAccordion();
    initTabs();
    initKickflipCards();
    initWheelSpinScroll();
    initGravityScroll();
    initSlashReveal();
    initStickerBomb();
    initCounterAnimation();
    initCopyToClipboard();
    initFocusTrap();
    initSmoothScroll();
    initLazyLoad();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
