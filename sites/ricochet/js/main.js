/**
 * ============================================================================
 *  Main JavaScript — Ricochet Brand Kit
 * ============================================================================
 * Initializes all components, handles interactions, and manages scroll
 * animations for the Ricochet site.
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================

  const initMobileNav = () => {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isOpen);
      navLinks.classList.toggle('open');

      // Animate hamburger
      const lines = toggle.querySelectorAll('.hamburger-line');
      if (!isOpen) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        lines[0].style.transform = '';
        lines[1].style.opacity = '1';
        lines[2].style.transform = '';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        const lines = toggle.querySelectorAll('.hamburger-line');
        lines[0].style.transform = '';
        lines[1].style.opacity = '1';
        lines[2].style.transform = '';
      });
    });
  };

  // ==========================================================================
  // Copy to Clipboard
  // ==========================================================================

  const initCopyButtons = () => {
    document.querySelectorAll('.code-copy').forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy');
        if (!text) return;

        try {
          await navigator.clipboard.writeText(text);
          btn.classList.add('copied');

          // Show toast
          showToast('Copied to clipboard!', 'success');

          setTimeout(() => {
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          showToast('Failed to copy', 'error');
        }
      });
    });
  };

  // ==========================================================================
  // Toast Notifications
  // ==========================================================================

  const showToast = (message, type = 'info') => {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">
        ${type === 'success' ? '&#10003;' : type === 'error' ? '&#10007;' : '&#8505;'}
      </span>
      <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ==========================================================================
  // Scroll Animations
  // ==========================================================================

  const initScrollAnimations = () => {
    if (prefersReducedMotion) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.pitch-item, .feature-card, .scroll-animate').forEach(el => {
      observer.observe(el);
    });

    // Stagger pitch items
    const pitchItems = document.querySelectorAll('.pitch-item');
    pitchItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  };

  // ==========================================================================
  // Pitch Item Visibility (for standalone initialization)
  // ==========================================================================

  const initPitchItems = () => {
    if (prefersReducedMotion) {
      // Show all items immediately if reduced motion
      document.querySelectorAll('.pitch-item').forEach(item => {
        item.classList.add('visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.pitch-item').forEach(item => {
      observer.observe(item);
    });
  };

  // ==========================================================================
  // Button Muzzle Flash Effect
  // ==========================================================================

  const initMuzzleFlash = () => {
    document.querySelectorAll('.btn-muzzle').forEach(btn => {
      btn.addEventListener('mousedown', () => {
        if (prefersReducedMotion) return;
        const flash = btn.querySelector('.muzzle-flash');
        if (flash) {
          flash.style.animation = 'none';
          flash.offsetHeight; // Trigger reflow
          flash.style.animation = 'muzzle-flash 0.3s ease-out';
        }
      });
    });
  };

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  const initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          if (currentScroll > 100) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  // ==========================================================================
  // Active Navigation
  // ==========================================================================

  const initActiveNav = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // ==========================================================================
  // Keyboard Navigation Support
  // ==========================================================================

  const initKeyboardNav = () => {
    // Add focus-visible styling on keyboard focus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  };

  // ==========================================================================
  // Dialog/Modal Handling
  // ==========================================================================

  const initDialogs = () => {
    document.querySelectorAll('[data-dialog-target]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const dialogId = trigger.getAttribute('data-dialog-target');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
          dialog.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    document.querySelectorAll('[data-dialog-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const dialog = closeBtn.closest('.dialog');
        if (dialog) {
          dialog.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on overlay click
    document.querySelectorAll('.dialog-overlay').forEach(overlay => {
      overlay.addEventListener('click', () => {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.dialog.show').forEach(dialog => {
          dialog.classList.remove('show');
        });
        document.body.style.overflow = '';
      }
    });
  };

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    });
  };

  // ==========================================================================
  // Form Validation
  // ==========================================================================

  const initForms = () => {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const formData = new FormData(form);

        // Basic validation
        form.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });

        if (isValid) {
          showToast('Form submitted successfully!', 'success');
          form.reset();
        } else {
          showToast('Please fill in all required fields', 'error');
        }
      });
    });

    // Inline validation on blur
    document.querySelectorAll('input[required], textarea[required]').forEach(field => {
      field.addEventListener('blur', () => {
        if (!field.value.trim()) {
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
    });
  };

  // ==========================================================================
  // Performance: Lazy Load Images
  // ==========================================================================

  const initLazyLoad = () => {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback for older browsers
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  };

  // ==========================================================================
  // Open Graph Image Fallback
  // ==========================================================================

  const initOGFallback = () => {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg && !ogImg.content) {
      // Use local fallback
      ogImg.content = `${window.location.origin}${window.location.pathname}img/og.svg`;
    }
  };

  // ==========================================================================
  // Add keyboard-nav class styling
  // ==========================================================================

  const addKeyboardNavStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      body.keyboard-nav *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
      }
      body.keyboard-nav .nav-links {
        display: flex !important;
      }
    `;
    document.head.appendChild(style);
  };

  // ==========================================================================
  // Add nav open styles
  // ==========================================================================

  const addNavStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .nav-links.open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: var(--header-height);
        left: 0;
        right: 0;
        background: var(--color-bg);
        padding: var(--space-4);
        border-bottom: 1px solid var(--color-border);
        gap: var(--space-2);
      }
      .site-header {
        position: relative;
      }
    `;
    document.head.appendChild(style);
  };

  // ==========================================================================
  // Initialize Everything
  // ==========================================================================

  const init = () => {
    addKeyboardNavStyles();
    addNavStyles();
    initMobileNav();
    initCopyButtons();
    initScrollAnimations();
    initPitchItems();
    initMuzzleFlash();
    initHeaderScroll();
    initActiveNav();
    initKeyboardNav();
    initDialogs();
    initSmoothScroll();
    initForms();
    initLazyLoad();
    initOGFallback();

    // Mark body as loaded
    document.body.classList.add('js-loaded');
  };

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
