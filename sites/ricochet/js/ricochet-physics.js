/**
 * ============================================================================
 *  Ricochet Physics — Bullet bounce and trajectory simulation
 * ============================================================================
 * Handles bounce physics, trajectory line drawing, and penetration reveals
 * for the Ricochet brand kit.
 */

class RicochetPhysics {
  constructor(options = {}) {
    this.canvas = document.getElementById('trajectory-svg') || this.createSVGCanvas();
    this.nodes = [];
    this.lines = [];
    this.animationId = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.options = {
      lineColor: 'url(#trajectory-gradient)',
      lineWidth: 2,
      nodeRadius: 6,
      nodeColor: '#2EC4B6',
      glowColor: 'rgba(46, 196, 182, 0.4)',
      maxLines: 8,
      fadeSpeed: 0.02,
      ...options,
    };

    this.init();
  }

  createSVGCanvas() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'trajectory-svg';
    svg.classList.add('trajectory-overlay');
    svg.setAttribute('aria-hidden', 'true');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = 'trajectory-gradient';
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    ['#FF9F1A', '#E71D36', '#2EC4B6'].forEach((color, i) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', `${i * 50}%`);
      stop.setAttribute('stop-color', color);
      stop.setAttribute('stop-opacity', i === 0 ? '0.8' : i === 1 ? '0.5' : '0.3');
      gradient.appendChild(stop);
    });

    defs.appendChild(gradient);

    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = 'spark-glow';
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '3');
    blur.setAttribute('result', 'blur');
    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const mergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode1.setAttribute('in', 'blur');
    const mergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mergeNode1);
    merge.appendChild(mergeNode2);
    filter.appendChild(blur);
    filter.appendChild(merge);

    defs.appendChild(filter);
    svg.appendChild(defs);

    document.body.appendChild(svg);
    return svg;
  }

  init() {
    this.setupNodes();
    this.bindEvents();
    if (!this.reducedMotion) {
      this.animate();
    }
  }

  setupNodes() {
    // Trajectory nodes at various positions on the page
    const nodePositions = [
      { x: 0.1, y: 0.3 },
      { x: 0.25, y: 0.15 },
      { x: 0.4, y: 0.25 },
      { x: 0.55, y: 0.1 },
      { x: 0.7, y: 0.2 },
      { x: 0.85, y: 0.15 },
      { x: 0.15, y: 0.5 },
      { x: 0.35, y: 0.45 },
      { x: 0.5, y: 0.55 },
      { x: 0.65, y: 0.4 },
      { x: 0.8, y: 0.5 },
    ];

    this.nodes = nodePositions.map((pos, i) => ({
      x: pos.x * window.innerWidth,
      y: pos.y * window.innerHeight,
      baseX: pos.x * window.innerWidth,
      baseY: pos.y * window.innerHeight,
      vx: 0,
      vy: 0,
      phase: i * 0.5,
      amplitude: 15 + Math.random() * 10,
      element: null,
    }));

    // Create SVG circles for nodes
    if (this.canvas) {
      this.nodes.forEach((node, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', this.options.nodeRadius);
        circle.setAttribute('fill', this.options.nodeColor);
        circle.setAttribute('filter', 'url(#spark-glow)');
        circle.setAttribute('opacity', '0.6');
        circle.style.animation = `node-bounce ${2 + Math.random()}s ease-in-out ${i * 0.2}s infinite`;
        this.canvas.appendChild(circle);
        node.element = circle;
      });
    }
  }

  bindEvents() {
    window.addEventListener(
      'resize',
      this.debounce(() => {
        this.handleResize();
      }, 250),
    );

    // Add trajectory lines on navigation
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (this.reducedMotion) return;
        const rect = link.getBoundingClientRect();
        this.addTrajectoryLine(
          window.innerWidth * 0.5,
          window.innerHeight * 0.1,
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
        );
      });
    });

    // Add spark burst on card hover
    document.querySelectorAll('.feature-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        if (this.reducedMotion) return;
        this.emitSparks(card.getBoundingClientRect(), 5);
      });
    });

    // Listen for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        cancelAnimationFrame(this.animationId);
      } else {
        this.animate();
      }
    });
  }

  handleResize() {
    this.nodes.forEach((node, i) => {
      const ratio = node.baseX / window.innerWidth;
      node.baseX = ratio * window.innerWidth;
      node.baseY = (node.baseY / window.innerHeight) * window.innerHeight;
    });
  }

  addTrajectoryLine(x1, y1, x2, y2) {
    if (this.lines.length >= this.options.maxLines) {
      const oldLine = this.lines.shift();
      if (oldLine && oldLine.element && oldLine.element.parentNode) {
        oldLine.element.parentNode.removeChild(oldLine.element);
      }
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x1);
    line.setAttribute('y2', y1);
    line.setAttribute('stroke', this.options.lineColor);
    line.setAttribute('stroke-width', this.options.lineWidth);
    line.setAttribute('filter', 'url(#spark-glow)');
    line.style.opacity = '0.8';

    this.canvas.appendChild(line);

    const lineData = {
      element: line,
      x1,
      y1,
      x2,
      y2,
      progress: 0,
      opacity: 0.8,
    };

    this.lines.push(lineData);

    // Animate line drawing
    if (!this.reducedMotion) {
      this.animateLine(lineData);
    }
  }

  animateLine(lineData) {
    const duration = 600;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Eased progress
      const eased = 1 - Math.pow(1 - progress, 3);

      lineData.element.setAttribute('x2', lineData.x1 + (lineData.x2 - lineData.x1) * eased);
      lineData.element.setAttribute('y2', lineData.y1 + (lineData.y2 - lineData.y1) * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  emitSparks(rect, count = 8) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < count; i++) {
      const spark = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      spark.setAttribute('cx', centerX);
      spark.setAttribute('cy', centerY);
      spark.setAttribute('r', 3);
      spark.setAttribute('fill', ['#FF9F1A', '#E71D36', '#2EC4B6'][Math.floor(Math.random() * 3)]);
      spark.setAttribute('filter', 'url(#spark-glow)');
      this.canvas.appendChild(spark);

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const distance = 40 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      this.animateSpark(spark, tx, ty);
    }
  }

  animateSpark(spark, tx, ty) {
    const duration = 400 + Math.random() * 300;
    const startTime = performance.now();
    const startX = parseFloat(spark.getAttribute('cx'));
    const startY = parseFloat(spark.getAttribute('cy'));

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Eased progress with bounce
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const currentX = startX + tx * eased;
      const currentY = startY + ty * eased + progress * progress * 30; // gravity
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.5;

      spark.setAttribute('cx', currentX);
      spark.setAttribute('cy', currentY);
      spark.setAttribute('opacity', opacity);
      spark.setAttribute('r', 3 * scale);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (spark.parentNode) {
        spark.parentNode.removeChild(spark);
      }
    };

    requestAnimationFrame(step);
  }

  animate() {
    const time = performance.now() * 0.001;

    this.nodes.forEach((node, i) => {
      // Bounce physics
      const offsetX = Math.sin(time + node.phase) * node.amplitude;
      const offsetY = Math.cos(time * 1.3 + node.phase) * node.amplitude * 0.6;

      node.x = node.baseX + offsetX;
      node.y = node.baseY + offsetY;

      if (node.element) {
        node.element.setAttribute('cx', node.x);
        node.element.setAttribute('cy', node.y);
      }
    });

    // Fade lines over time
    this.lines = this.lines.filter((lineData) => {
      lineData.opacity -= this.options.fadeSpeed;
      if (lineData.opacity <= 0) {
        if (lineData.element && lineData.element.parentNode) {
          lineData.element.parentNode.removeChild(lineData.element);
        }
        return false;
      }
      lineData.element.style.opacity = lineData.opacity;
      return true;
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.nodes.forEach((node) => {
      if (node.element && node.element.parentNode) {
        node.element.parentNode.removeChild(node.element);
      }
    });
    this.lines.forEach((line) => {
      if (line.element && line.element.parentNode) {
        line.element.parentNode.removeChild(line.element);
      }
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.ricochetPhysics = new RicochetPhysics();
});
