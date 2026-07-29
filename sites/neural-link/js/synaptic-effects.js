/**
 * Neural-Link Synaptic Effects
 * Synaptic Firing and Neural Pulse Animations
 */

class SynapticEffects {
  constructor() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.effects = [];
    this.init();
  }

  init() {
    this.setupSynapticTriggers();
    this.setupHoverEffects();
    this.setupClickEffects();
  }

  setupSynapticTriggers() {
    const triggers = document.querySelectorAll('.synapse-trigger');

    triggers.forEach(trigger => {
      if (this.reducedMotion) return;

      trigger.addEventListener('mouseenter', () => {
        this.activateSynapseNodes(trigger);
      });
    });
  }

  activateSynapseNodes(container) {
    const nodes = container.querySelectorAll('.syn-node');
    const connectors = container.querySelectorAll('.syn-connector');

    nodes.forEach((node, index) => {
      setTimeout(() => {
        node.classList.add('synaptic-fire');
        node.style.animation = 'synapticFire 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      }, index * 150);
    });

    connectors.forEach((connector, index) => {
      setTimeout(() => {
        connector.style.opacity = '1';
        connector.style.transform = 'scaleX(1.2)';
        setTimeout(() => {
          connector.style.opacity = '';
          connector.style.transform = '';
        }, 300);
      }, index * 100 + 50);
    });

    setTimeout(() => {
      nodes.forEach(node => {
        node.classList.remove('synaptic-fire');
        node.style.animation = '';
      });
    }, 1500);
  }

  setupHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (this.reducedMotion) return;
        this.createHoverRipple(item);
      });
    });
  }

  createHoverRipple(container) {
    const rect = container.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;

    const ripple = document.createElement('div');
    ripple.className = 'hover-ripple';
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;

    container.style.position = 'relative';
    container.appendChild(ripple);

    if (!this.reducedMotion) {
      ripple.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(8)', opacity: 0 }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).onfinish = () => ripple.remove();
    } else {
      ripple.remove();
    }
  }

  setupClickEffects() {
    const clickables = document.querySelectorAll('button, .gallery-item, .palace-room');

    clickables.forEach(el => {
      el.addEventListener('click', (e) => {
        if (this.reducedMotion) return;
        this.createClickBurst(e.clientX, e.clientY);
      });
    });
  }

  createClickBurst(x, y) {
    const colors = ['#FF00FF', '#00FFFF', '#9D4EDD'];
    const particles = 8;

    for (let i = 0; i < particles; i++) {
      const angle = (i / particles) * Math.PI * 2;
      const particle = document.createElement('div');

      const color = colors[i % colors.length];
      const size = 4 + Math.random() * 4;

      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
      `;

      document.body.appendChild(particle);

      const dx = Math.cos(angle) * 60;
      const dy = Math.sin(angle) * 60;

      if (!this.reducedMotion) {
        particle.animate([
          {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1
          },
          {
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`,
            opacity: 0
          }
        ], {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
      } else {
        particle.remove();
      }
    }
  }

  createSynapticBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'synaptic-burst';
    burst.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 10px;
      height: 10px;
      pointer-events: none;
      z-index: 9999;
    `;

    document.body.appendChild(burst);

    const ring1 = document.createElement('div');
    const ring2 = document.createElement('div');
    const ring3 = document.createElement('div');

    [ring1, ring2, ring3].forEach((ring, index) => {
      ring.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid ${index % 2 === 0 ? '#FF00FF' : '#00FFFF'};
        border-radius: 50%;
        transform: translate(-50%, -50%);
      `;
      burst.appendChild(ring);
    });

    if (!this.reducedMotion) {
      burst.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      ring1.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(5)', opacity: 0 }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      ring2.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(7)', opacity: 0 }
      ], {
        duration: 600,
        delay: 100,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      ring3.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(9)', opacity: 0 }
      ], {
        duration: 600,
        delay: 200,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      });

      setTimeout(() => burst.remove(), 800);
    } else {
      burst.remove();
    }
  }

  triggerMemoryPulse(element) {
    if (this.reducedMotion) return;

    element.classList.add('memory-pulse');
    element.style.animation = 'memoryPulse 0.8s ease-out';

    setTimeout(() => {
      element.classList.remove('memory-pulse');
      element.style.animation = '';
    }, 800);
  }

  createThoughtBubble(container, text) {
    const bubble = document.createElement('div');
    bubble.className = 'thought-bubble-new';
    bubble.innerHTML = `
      <span class="thought-bubble-text">${text}</span>
    `;

    bubble.style.cssText = `
      position: absolute;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, rgba(45, 45, 68, 0.95), rgba(26, 26, 46, 0.95));
      border: 1px solid #9D4EDD;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(157, 78, 221, 0.3);
      font-family: 'Exo 2', sans-serif;
      font-size: 0.9rem;
      color: #fff;
      pointer-events: none;
      z-index: 100;
    `;

    container.style.position = 'relative';
    container.appendChild(bubble);

    if (!this.reducedMotion) {
      bubble.animate([
        { transform: 'scale(0.8)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ], {
        duration: 500,
        easing: 'ease-out'
      });

      setTimeout(() => {
        bubble.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(0.8)', opacity: 0 }
        ], {
          duration: 300,
          easing: 'ease-in'
        }).onfinish = () => bubble.remove();
      }, 3000);
    } else {
      setTimeout(() => bubble.remove(), 3000);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.synapticEffects = new SynapticEffects();
});

export default SynapticEffects;
