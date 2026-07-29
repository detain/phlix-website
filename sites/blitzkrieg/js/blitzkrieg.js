/**
 * ============================================================================
 *  BLITZKRIEG — MAIN JAVASCRIPT
 *  Lightning-speed military assault on buffering
 * ============================================================================
 */

(function() {
  'use strict';

  /* --------------------------------------------------------------------------
     Initialize Application
     -------------------------------------------------------------------------- */
  const Blitzkrieg = {
    init: function() {
      this.checkReducedMotion();
      this.initNavigation();
      this.initTacticalZoom();
      this.initDogTags();
      this.initHudBadges();
      this.initArtilleryTransition();
      this.initScrollEffects();
      this.initBuffers();
      
      // Add loaded class after init
      document.body.classList.add('blitzkrieg-loaded');
    },

    /* --------------------------------------------------------------------------
       Check Reduced Motion Preference
       -------------------------------------------------------------------------- */
    reducedMotion: false,

    checkReducedMotion: function() {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (this.reducedMotion) {
        document.body.classList.add('reduced-motion');
      }

      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
        document.body.classList.toggle('reduced-motion', this.reducedMotion);
      });
    },

    /* --------------------------------------------------------------------------
       Navigation
       -------------------------------------------------------------------------- */
    initNavigation: function() {
      const navToggle = document.getElementById('navToggle');
      const navList = document.getElementById('navList');

      if (!navToggle || !navList) return;

      navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.tank-nav')) {
          navList.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('open')) {
          navList.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    },

    /* --------------------------------------------------------------------------
       Tactical Zoom
       -------------------------------------------------------------------------- */
    initTacticalZoom: function() {
      if (this.reducedMotion) return;

      const zoomElements = document.querySelectorAll('[data-tactical-zoom]');

      zoomElements.forEach(el => {
        el.addEventListener('mouseenter', () => this.tacticalZoomIn(el));
        el.addEventListener('mouseleave', () => this.tacticalZoomOut(el));
      });
    },

    tacticalZoomIn: function(el) {
      el.style.transform = 'scale(1.05)';
      el.style.filter = 'drop-shadow(0 0 20px rgba(233, 69, 96, 0.3))';
      el.style.transition = 'transform 0.3s ease-out, filter 0.3s ease-out';
    },

    tacticalZoomOut: function(el) {
      el.style.transform = 'scale(1)';
      el.style.filter = 'none';
    },

    /* --------------------------------------------------------------------------
       Dog Tags
       -------------------------------------------------------------------------- */
    initDogTags: function() {
      const dogTags = document.querySelectorAll('.dog-tag');
      
      dogTags.forEach(tag => {
        tag.setAttribute('role', 'status');
      });
    },

    /* --------------------------------------------------------------------------
       HUD Badges
       -------------------------------------------------------------------------- */
    initHudBadges: function() {
      const badges = document.querySelectorAll('.hud-badge');
      
      badges.forEach(badge => {
        // Add pulse animation to danger badges
        if (badge.classList.contains('hud-badge--danger')) {
          badge.classList.add('hud-badge--pulse');
        }
      });
    },

    /* --------------------------------------------------------------------------
       Artillery Transition
       -------------------------------------------------------------------------- */
    initArtilleryTransition: function() {
      const links = document.querySelectorAll('a[href$=".html"]');
      
      links.forEach(link => {
        if (link.hostname === window.location.hostname) {
          link.addEventListener('click', (e) => {
            // Don't intercept external links or same-page anchors
            if (link.getAttribute('href') === window.location.pathname) return;
            
            e.preventDefault();
            this.artilleryTransition(link.href);
          });
        }
      });
    },

    artilleryTransition: function(url) {
      const loader = document.getElementById('artilleryLoader') || document.querySelector('.artillery-loader');
      
      if (!loader) {
        window.location.href = url;
        return;
      }

      // Activate artillery loader
      loader.classList.add('active');
      document.body.classList.add('camera-shake');

      // Navigate after animation
      setTimeout(() => {
        window.location.href = url;
      }, 1500);
    },

    /* --------------------------------------------------------------------------
       Scroll Effects
       -------------------------------------------------------------------------- */
    initScrollEffects: function() {
      if (this.reducedMotion) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.briefing-card, .feature-item, .section-header').forEach(el => {
        el.classList.add('observe-ready');
        observer.observe(el);
      });
    },

    /* --------------------------------------------------------------------------
       Buffer Simulation (for demo)
       -------------------------------------------------------------------------- */
    initBuffers: function() {
      // This would normally connect to actual buffering events
      // For demo purposes, we simulate an artillery strike on certain actions
      
      document.querySelectorAll('.btn--strike').forEach(btn => {
        btn.addEventListener('click', (e) => {
          // For demo: show loading state briefly
          const loader = document.getElementById('artilleryLoader');
          if (loader) {
            loader.classList.add('active');
            
            // Remove after minimum display time
            setTimeout(() => {
              loader.classList.remove('active');
            }, 2000);
          }
        });
      });
    }
  };

  /* --------------------------------------------------------------------------
     Initialize on DOM Ready
     -------------------------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Blitzkrieg.init());
  } else {
    Blitzkrieg.init();
  }

  /* --------------------------------------------------------------------------
     Expose Global
     -------------------------------------------------------------------------- */
  window.Blitzkrieg = Blitzkrieg;

})();
