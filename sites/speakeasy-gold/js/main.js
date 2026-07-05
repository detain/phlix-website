/* ==========================================================================
   main.js — Speakeasy Gold
   Kit: speakeasy-gold v1.0
   ========================================================================== */

(function () {
  'use strict';

  /* ─── Mobile nav toggle ─────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu   = document.querySelector('.nav-menu');

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

  /* ─── Scroll reveal (IntersectionObserver) ──────────────────────────────── */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.feature-card, .client-card, .feature-detail, .download-card'
    );

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition =
        'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)';
      revealObserver.observe(el);
    });

    /* Apply revealed state */
    document.head.insertAdjacentHTML(
      'beforeend',
      '<style>' +
        '.is-revealed { opacity: 1 !important; transform: translateY(0) !important; }' +
      '</style>'
    );
  }

  /* ─── Art Deco sunburst (hero decoration, respects reduced motion) ───────── */
  if (!prefersReducedMotion) {
    var sunburstEl = document.querySelector('.sunburst');
    if (sunburstEl) {
      /* subtle entrance animation for sunburst */
      sunburstEl.style.opacity = '0';
      sunburstEl.style.transition = 'opacity 1.2s ease 0.4s';
      requestAnimationFrame(function () {
        sunburstEl.style.opacity = '';
      });
    }
  }

  /* ─── Contact form validation ──────────────────────────────────────────── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    function validateField(field) {
      var errorId = field.id + '-error';
      var errorEl = document.getElementById(errorId);
      var isEmpty = field.value.trim() === '';
      var isInvalid = field.getAttribute('type') === 'email'
        ? !isEmpty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
        : false;

      if (isEmpty || isInvalid) {
        field.setAttribute('aria-invalid', 'true');
        if (errorEl) {
          if (isEmpty) {
            errorEl.textContent = 'This field is required, friend.';
          } else if (isInvalid) {
            errorEl.textContent = 'That doesn\'t look like a valid email address.';
          }
        }
        return false;
      } else {
        field.removeAttribute('aria-invalid');
        if (errorEl) {
          errorEl.textContent = '';
        }
        return true;
      }
    }

    var formFields = contactForm.querySelectorAll('input[required], textarea[required]');
    formFields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      formFields.forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
        }
      });
      if (allValid) {
        var btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Message sent!';
          btn.disabled = true;
        }
      }
    });
  }
})();
