/**
 * Synthetic Soul — Main JavaScript
 * Heartbeat pulses, mood tracking, nav toggle, scroll reveals
 */

(function () {
  'use strict';

  // ============================================
  // Reduced Motion Check
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const header = document.querySelector('.site-header');

    if (!toggle || !menu) return;

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function () {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        !menu.contains(e.target) &&
        !toggle.contains(e.target) &&
        menu.classList.contains('open')
      ) {
        closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Header scroll effect
    if (header) {
      window.addEventListener(
        'scroll',
        function () {
          const currentScroll = window.pageYOffset;
          if (currentScroll > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        },
        { passive: true },
      );
    }
  }

  // ============================================
  // Mood Indicator
  // ============================================
  function initMoodIndicator() {
    const indicator = document.querySelector('.mood-indicator');
    if (!indicator) return;

    const moods = ['calm', 'engaged', 'excited', 'contemplative'];
    let currentMoodIndex = 0;

    function updateMood() {
      const mood = moods[currentMoodIndex];
      indicator.setAttribute('data-mood', mood);

      // Move to next mood
      currentMoodIndex = (currentMoodIndex + 1) % moods.length;
    }

    // Initial state
    updateMood();

    // Update every 5 seconds (from kit spec)
    if (!prefersReducedMotion.matches) {
      setInterval(updateMood, 5000);
    } else {
      indicator.setAttribute('data-mood', 'calm');
    }

    // Track scroll for mood updates
    if (!prefersReducedMotion.matches) {
      let scrollTimeout;
      window.addEventListener(
        'scroll',
        function () {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(function () {
            const scrollPercent =
              (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent > 75) {
              indicator.setAttribute('data-mood', 'excited');
              currentMoodIndex = moods.indexOf('excited');
            } else if (scrollPercent > 50) {
              indicator.setAttribute('data-mood', 'engaged');
              currentMoodIndex = moods.indexOf('engaged');
            } else if (scrollPercent > 25) {
              indicator.setAttribute('data-mood', 'contemplative');
              currentMoodIndex = moods.indexOf('contemplative');
            } else {
              indicator.setAttribute('data-mood', 'calm');
              currentMoodIndex = moods.indexOf('calm');
            }
          }, 100);
        },
        { passive: true },
      );
    }
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
      const question = item.querySelector('.faq-item__question');

      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('open');
          otherItem.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          item.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard accessibility
      question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // ============================================
  // Scroll Reveal Animation
  // ============================================
  function initScrollReveal() {
    if (prefersReducedMotion.matches) {
      // Show all elements immediately for reduced motion
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ============================================
  // Heart Monitor Animation
  // ============================================
  function initHeartMonitor() {
    const monitors = document.querySelectorAll('.heart-monitor__line');

    if (prefersReducedMotion.matches) {
      monitors.forEach(function (line) {
        line.style.animation = 'none';
        line.style.opacity = '0.8';
      });
      return;
    }

    monitors.forEach(function (line) {
      // Each monitor gets a slightly different timing
      const delay = Math.random() * 2;
      line.style.animationDelay = delay + 's';
    });
  }

  // ============================================
  // Code Block Copy Button
  // ============================================
  function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(function (block) {
      const copyBtn = block.querySelector('.code-block__copy');
      const code = block.querySelector('code');

      if (!copyBtn || !code) return;

      copyBtn.addEventListener('click', function () {
        const text = code.textContent;

        navigator.clipboard
          .writeText(text)
          .then(function () {
            copyBtn.textContent = 'Copied!';
            setTimeout(function () {
              copyBtn.textContent = 'Copy';
            }, 2000);
          })
          .catch(function () {
            copyBtn.textContent = 'Failed';
            setTimeout(function () {
              copyBtn.textContent = 'Copy';
            }, 2000);
          });
      });
    });
  }

  // ============================================
  // Heartbeat Pulse Effect on Interactive Elements
  // ============================================
  function initHeartbeatHover() {
    const buttons = document.querySelectorAll('.btn--primary');

    if (prefersReducedMotion.matches) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('mouseenter', function () {
        if (!prefersReducedMotion.matches) {
          btn.style.animation = 'heartbeat 0.6s ease-in-out';
        }
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.animation = '';
      });
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
            block: 'start',
          });

          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // ============================================
  // Organic Circuit Background Animation
  // ============================================
  function initOrganicCircuit() {
    const circuits = document.querySelectorAll('.organic-circuit');

    if (prefersReducedMotion.matches) {
      circuits.forEach(function (circuit) {
        circuit.style.animation = 'none';
      });
      return;
    }

    circuits.forEach(function (circuit) {
      let offset = 0;
      const nodes = circuit.querySelectorAll('.organic-circuit__node');
      const lines = circuit.querySelectorAll('.organic-circuit__line');

      function animate() {
        offset += 0.02;
        nodes.forEach(function (node, i) {
          const baseX = parseFloat(node.dataset.x) || 50;
          const baseY = parseFloat(node.dataset.y) || 50;
          const x = baseX + Math.sin(offset + i * 0.5) * 5;
          const y = baseY + Math.cos(offset + i * 0.3) * 5;
          node.style.left = x + '%';
          node.style.top = y + '%';
        });

        lines.forEach(function (line, i) {
          const length = parseFloat(line.dataset.length) || 50;
          const angle = parseFloat(line.dataset.angle) || 0;
          const x = parseFloat(line.dataset.startX) || 50;
          const y = parseFloat(line.dataset.startY) || 50;

          line.style.width = length + 'px';
          line.style.left = x + '%';
          line.style.top = y + '%';
          line.style.transform = 'rotate(' + (angle + Math.sin(offset + i) * 5) + 'deg)';
        });

        if (!prefersReducedMotion.matches) {
          requestAnimationFrame(animate);
        }
      }

      animate();
    });
  }

  // ============================================
  // Initialize All
  // ============================================
  function init() {
    initNavToggle();
    initMoodIndicator();
    initFaqAccordion();
    initScrollReveal();
    initHeartMonitor();
    initCodeBlocks();
    initHeartbeatHover();
    initSmoothScroll();
    initOrganicCircuit();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
