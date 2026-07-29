/**
 * Stellar Command - Star Field Particles
 * Animated star background with twinkling effect
 */

(function() {
  'use strict';

  class StarField {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.stars = [];
      this.animationId = null;
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      this.init();
      this.bindEvents();
    }
    
    init() {
      this.resize();
      this.createStars();
      if (!this.prefersReducedMotion) {
        this.animate();
      } else {
        this.draw();
      }
    }
    
    bindEvents() {
      window.addEventListener('resize', () => {
        this.resize();
        this.createStars();
        if (!this.prefersReducedMotion) {
          this.animate();
        } else {
          this.draw();
        }
      });
      
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (this.prefersReducedMotion) {
          cancelAnimationFrame(this.animationId);
          this.draw();
        } else {
          this.animate();
        }
      });
    }
    
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    
    createStars() {
      this.stars = [];
      const starCount = Math.floor((this.canvas.width * this.canvas.height) / 8000);
      const maxStars = 300;
      const count = Math.min(starCount, maxStars);
      
      for (let i = 0; i < count; i++) {
        this.stars.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
    }
    
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.stars.forEach(star => {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        this.ctx.fill();
      });
    }
    
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.stars.forEach(star => {
        // Twinkle effect
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.twinkleDirection = -1;
        } else if (star.opacity <= 0.2) {
          star.opacity = 0.2;
          star.twinkleDirection = 1;
        }
        
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        this.ctx.fill();
      });
      
      this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }

  // Initialize when DOM is ready
  function init() {
    const canvas = document.getElementById('stars-canvas');
    if (canvas) {
      new StarField(canvas);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
