/**
 * Dyson Sphere - Main JavaScript
 * Page initialization and interactions
 */

/* global StellarEngine, PowerMeterController, WaveformController */
(function() {
  'use strict';
  
  // DOM Ready
  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    // Initialize stellar engine
    window.stellarEngine = new StellarEngine();
    
    // Initialize power meter
    window.powerMeter = new PowerMeterController();
    
    // Initialize waveform
    window.waveform = new WaveformController();
    
    // Start random solar flares
    window.stellarEngine.startRandomFlares(6000);
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize CTA button
    initCTABtn();
    
    // Initialize intersection observer for animations
    initIntersectionObserver();
  }
  
  function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    // Add scrolled class to nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const navHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('emailInput');
      const email = emailInput.value.trim();
      
      if (!email) {
        showFormMessage('Please enter your contact frequency', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Invalid contact frequency format', 'error');
        return;
      }
      
      // Simulate submission
      showFormMessage('Transmitting to Dyson Sphere network...', 'success');
      emailInput.value = '';
      
      // Trigger celebration flare
      if (window.stellarEngine) {
        const btn = document.getElementById('initiateBtn');
        if (btn) {
          const rect = btn.getBoundingClientRect();
          window.stellarEngine.createSolarFlare(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            1.5
          );
        }
      }
    });
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showFormMessage(message, type) {
    // Remove existing message
    const existing = document.querySelector('.form-message');
    if (existing) {
      existing.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);
    
    // Auto-remove after delay
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }
  
  function initCTABtn() {
    const btn = document.getElementById('initiateBtn');
    if (!btn) return;
    
    btn.addEventListener('click', function() {
      // Trigger solar flare burst
      if (window.stellarEngine) {
        const rect = this.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            window.stellarEngine.createSolarFlare(
              rect.left + Math.random() * rect.width,
              rect.top + Math.random() * rect.height,
              0.5 + Math.random() * 0.5
            );
          }, i * 150);
        }
      }
      
      // Scroll to contact form
      const form = document.getElementById('contactForm');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const emailInput = document.getElementById('emailInput');
        if (emailInput) {
          setTimeout(() => emailInput.focus(), 500);
        }
      }
    });
  }
  
  function initIntersectionObserver() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all elements immediately
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }
    
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Trigger solar flare on feature cards
          if (entry.target.classList.contains('feature-card')) {
            triggerFeatureFlare(entry.target);
          }
          
          // Unobserve after revealing
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all elements with data-reveal
    document.querySelectorAll('[data-reveal]').forEach(el => {
      observer.observe(el);
    });
  }
  
  function triggerFeatureFlare(element) {
    if (!window.stellarEngine) return;
    
    const rect = element.getBoundingClientRect();
    
    // Create multiple small flares
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        window.stellarEngine.createSolarFlare(
          rect.left + Math.random() * rect.width,
          rect.top + Math.random() * rect.height,
          0.3
        );
      }, i * 100);
    }
  }
  
  // Performance: Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (window.stellarEngine) {
        window.stellarEngine.stop();
        window.stellarEngine.stopRandomFlares();
      }
    } else {
      if (window.stellarEngine) {
        window.stellarEngine.start();
        window.stellarEngine.startRandomFlares(6000);
      }
    }
  });
  
  // Handle reduced motion preference changes
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', () => {
    // Reload page for simplicity when motion preference changes
    window.location.reload();
  });
})();
