/**
 * Synthetic Soul - Main JavaScript
 */

import { MoodTracker } from './mood-tracker.js';
import { OrganicCircuits } from './organic-circuits.js';
import { HeartMonitor } from './heart-monitor.js';
import { EmotionalFace } from './emotional-face.js';

class SyntheticSoulApp {
  constructor() {
    this.moodTracker = null;
    this.organicCircuits = null;
    this.heartMonitor = null;
    this.emotionalFace = null;
    this.nav = null;
    this.prefersReducedMotion = false;
    
    this.init();
  }
  
  init() {
    this.checkReducedMotion();
    this.initNavigation();
    this.initMoodIndicator();
    this.initEmotionalFace();
    this.initOrganicCircuits();
    this.initHeartMonitor();
    this.initFormHandler();
    this.initScrollEffects();
  }
  
  checkReducedMotion() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  initNavigation() {
    this.nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (!this.nav || !navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    if (!this.prefersReducedMotion) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          this.nav.classList.add('scrolled');
        } else {
          this.nav.classList.remove('scrolled');
        }
      });
    }
  }
  
  initMoodIndicator() {
    this.moodTracker = new MoodTracker({
      onMoodChange: (mood) => this.updateMoodIndicator(mood),
      reducedMotion: this.prefersReducedMotion
    });
    
    this.moodTracker.start();
  }
  
  updateMoodIndicator(mood) {
    const indicator = document.getElementById('mood-indicator');
    if (!indicator) return;
    
    const label = indicator.querySelector('.mood-label');
    const mouth = indicator.querySelector('.mood-mouth');
    const eyes = indicator.querySelectorAll('.mood-eye');
    const brows = indicator.querySelectorAll('.mood-brow');
    
    if (label) {
      label.textContent = mood.state;
    }
    
    const expressions = {
      calm: { mouth: 'M 30 65 Q 50 75 70 65', eyeScale: 0.9, browAngle: 0 },
      engaged: { mouth: 'M 30 60 Q 50 80 70 60', eyeScale: 1.1, browAngle: 3 },
      excited: { mouth: 'M 25 55 Q 50 85 75 55', eyeScale: 1.2, browAngle: 0 },
      contemplative: { mouth: 'M 35 70 Q 50 75 65 70', eyeScale: 0.85, browAngle: -2 }
    };
    
    const expr = expressions[mood.state] || expressions.calm;
    
    if (mouth) {
      mouth.setAttribute('d', expr.mouth);
    }
    
    eyes.forEach(eye => {
      eye.style.transform = `scale(${expr.eyeScale})`;
      eye.style.transformOrigin = 'center';
    });
    
    brows.forEach((brow, i) => {
      const angle = expr.browAngle * (i === 0 ? 1 : -1);
      brow.style.transform = `rotate(${angle}deg)`;
      brow.style.transformOrigin = i === 0 ? 'right center' : 'left center';
    });
    
    indicator.style.setProperty('--mood-color', mood.color);
  }
  
  initEmotionalFace() {
    const heroFace = document.getElementById('hero-face');
    if (!heroFace) return;
    
    this.emotionalFace = new EmotionalFace(heroFace, {
      reducedMotion: this.prefersReducedMotion
    });
    
    this.emotionalFace.startExpressionCycle();
  }
  
  initOrganicCircuits() {
    const canvas = document.getElementById('organic-canvas');
    if (!canvas) return;
    
    this.organicCircuits = new OrganicCircuits(canvas, {
      reducedMotion: this.prefersReducedMotion
    });
    
    this.organicCircuits.start();
  }
  
  initHeartMonitor() {
    const canvas = document.getElementById('monitor-canvas');
    if (!canvas) return;
    
    this.heartMonitor = new HeartMonitor(canvas, {
      reducedMotion: this.prefersReducedMotion,
      onHeartRateChange: (rate) => {
        const rateEl = document.getElementById('heart-rate');
        if (rateEl) rateEl.textContent = rate;
      },
      onEmotionChange: (emotion) => {
        const emotionEl = document.getElementById('emotion-state');
        if (emotionEl) emotionEl.textContent = emotion;
      }
    });
    
    this.heartMonitor.start();
    
    const monitorSection = document.getElementById('experience');
    if (monitorSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.heartMonitor.start();
          } else {
            this.heartMonitor.stop();
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(monitorSection);
    }
  }
  
  initFormHandler() {
    const form = document.getElementById('connect-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('.form-submit');
      
      if (!emailInput || !emailInput.value || !emailInput.validity.valid) {
        emailInput.focus();
        emailInput.style.borderColor = '#FF6B6B';
        setTimeout(() => {
          emailInput.style.borderColor = '';
        }, 2000);
        return;
      }
      
      if (submitBtn) {
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Connecting...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Connected!</span>';
          emailInput.value = '';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
          }, 2000);
        }, 1500);
      }
    });
  }
  
  initScrollEffects() {
    if (this.prefersReducedMotion) return;
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.tech-card, .emotion-card').forEach(el => {
      observer.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.syntheticSoulApp = new SyntheticSoulApp();
});

export default SyntheticSoulApp;
