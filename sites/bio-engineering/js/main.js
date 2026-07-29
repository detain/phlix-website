/**
 * Bio-Engineering Theme - Main JavaScript
 * Grown, Not Built - Organic Media Server Experience
 */

import { ParticleSystem } from './particles.js';
import { AnimationController } from './animations.js';

class BioEngineeredApp {
  constructor() {
    this.particles = null;
    this.animations = null;
    this.scrollY = 0;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.initParticles();
    this.initAnimations();
    this.initNavigation();
    this.initScrollEffects();
    this.initFeatureCards();
    this.initEvolutionStages();
    this.initContactForm();
  }

  initParticles() {
    if (this.prefersReducedMotion) return;

    const container = document.getElementById('particles');
    if (container) {
      this.particles = new ParticleSystem(container, {
        particleCount: 20,
        colors: ['#00FF87', '#00B4D8', '#7B2CBF'],
        minSize: 3,
        maxSize: 6,
        minSpeed: 0.5,
        maxSpeed: 1.5,
        fadeSpeed: 0.005
      });
      this.particles.start();
    }
  }

  initAnimations() {
    this.animations = new AnimationController();

    if (!this.prefersReducedMotion) {
      this.animations.registerScrollReveal('.feature-card');
      this.animations.registerScrollReveal('.evolution-stage');
      this.animations.registerScrollReveal('.stat-cell');
      this.animations.registerFloatElements('.cell-nucleus', { amplitude: 5, duration: 4 });
      this.animations.registerMembraneBreathing('.cell-membrane');
      this.animations.registerBioluminescentPulse('.nucleus-core');
    }
  }

  initNavigation() {
    const nav = document.querySelector('.bio-nav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Scroll handling for nav background
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;

      if (this.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
      });

      // Close on link click
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          mobileBtn.classList.remove('active');
        });
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    });
  }

  initScrollEffects() {
    if (this.prefersReducedMotion) return;

    // Parallax for membranes
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const membranes = document.querySelectorAll('.membrane');
      const dnaContainer = document.querySelector('.dna-container');

      membranes.forEach((membrane, index) => {
        const speed = 0.05 * (index + 1);
        membrane.style.transform = `translateY(${scrolled * speed}px)`;
      });

      if (dnaContainer) {
        dnaContainer.style.transform = `translateY(-50%) translateY(${scrolled * 0.1}px)`;
      }
    });

    // Scroll indicator hide
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      window.addEventListener('scroll', () => {
        if (this.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      });
    }
  }

  initFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });
  }

  initEvolutionStages() {
    if (this.prefersReducedMotion) return;

    const stages = document.querySelectorAll('.evolution-stage');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const cell = entry.target.querySelector('.stage-cell');
          if (cell) {
            cell.classList.add('animate');
          }
        }
      });
    }, { threshold: 0.3 });

    stages.forEach(stage => observer.observe(stage));
  }

  initContactForm() {
    const form = document.querySelector('.contact-form');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]');
        const btn = form.querySelector('.btn');

        if (email && email.value) {
          // Simulate submission
          btn.classList.add('loading');
          btn.disabled = true;

          setTimeout(() => {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.querySelector('.btn-text').textContent = 'Evolution Started';
            email.value = '';
          }, 1500);
        }
      });
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new BioEngineeredApp();
});

// Export for module use
export default BioEngineeredApp;
