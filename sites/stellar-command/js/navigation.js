/**
 * Stellar Command - Navigation System
 * Smooth section switching with starship bridge feel
 */

(function () {
  'use strict';

  class Navigation {
    constructor() {
      this.navLinks = document.querySelectorAll('.nav-link');
      this.sections = document.querySelectorAll('.section');
      this.activeSection = 'dashboard';

      this.init();
    }

    init() {
      this.bindEvents();
      this.setInitialState();
    }

    bindEvents() {
      this.navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const sectionId = link.getAttribute('data-section');
          this.navigateTo(sectionId);
        });
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.navigateTo('dashboard');
        }
      });
    }

    setInitialState() {
      // Set dashboard as active
      this.updateActiveNav('dashboard');
      this.updateActiveSection('dashboard');
    }

    navigateTo(sectionId) {
      if (sectionId === this.activeSection) return;

      // Update navigation
      this.updateActiveNav(sectionId);

      // Update sections with animation
      this.updateActiveSection(sectionId);

      this.activeSection = sectionId;

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Announce for screen readers
      this.announceSection(sectionId);
    }

    updateActiveNav(sectionId) {
      this.navLinks.forEach((link) => {
        const linkSection = link.getAttribute('data-section');
        if (linkSection === sectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    updateActiveSection(sectionId) {
      this.sections.forEach((section) => {
        const sectionIdAttr = section.getAttribute('id');
        if (sectionIdAttr === sectionId) {
          section.classList.add('active');
          section.style.animation = 'none';
          section.offsetHeight; // Trigger reflow
          section.style.animation = '';
        } else {
          section.classList.remove('active');
        }
      });
    }

    announceSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const title = section.querySelector('.section-title, .hero-title');
        if (title) {
          const announcement = document.createElement('div');
          announcement.setAttribute('role', 'status');
          announcement.setAttribute('aria-live', 'polite');
          announcement.className = 'sr-only';
          announcement.textContent = `Navigated to ${title.textContent}`;
          document.body.appendChild(announcement);
          setTimeout(() => announcement.remove(), 1000);
        }
      }
    }
  }

  // Initialize when DOM is ready
  function init() {
    new Navigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
