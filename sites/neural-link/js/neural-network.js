/**
 * Neural-Link Neural Network Animation
 * Interactive Neural Network Visualization
 */

class NeuralNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.nodes = [];
    this.connections = [];
    this.animationId = null;
    this.mousePos = { x: 0, y: 0 };

    this.init();
  }

  init() {
    this.resize();
    this.createNodes();
    this.createConnections();

    window.addEventListener('resize', () => this.resize());

    if (!this.reducedMotion) {
      this.animate();
    } else {
      this.draw();
    }
  }

  resize() {
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();

    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  createNodes() {
    this.nodes = [];
    const nodeCount = Math.min(15, Math.floor((this.canvas.width * this.canvas.height) / 20000));

    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 3 + Math.random() * 4,
        pulsePhase: Math.random() * Math.PI * 2,
        color: this.getNodeColor(i)
      });
    }
  }

  getNodeColor(index) {
    const colors = [
      { r: 255, g: 0, b: 255 },
      { r: 0, g: 255, b: 255 },
      { r: 157, g: 78, b: 221 }
    ];
    return colors[index % colors.length];
  }

  createConnections() {
    this.connections = [];
    const maxDistance = 150;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          this.connections.push({
            from: i,
            to: j,
            strength: 1 - (distance / maxDistance)
          });
        }
      }
    }
  }

  animate() {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  update() {
    const time = Date.now() * 0.001;

    this.nodes.forEach((node, index) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

      node.pulsePhase += 0.05;

      if (this.mousePos.x && this.mousePos.y) {
        const dx = this.mousePos.x - node.x;
        const dy = this.mousePos.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.02;
          node.vx -= dx * force;
          node.vy -= dy * force;
        }
      }
    });

    this.connections = [];
    const maxDistance = 150;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          this.connections.push({
            from: i,
            to: j,
            strength: 1 - (distance / maxDistance)
          });
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawConnections();

    this.drawNodes();
  }

  drawConnections() {
    const time = Date.now() * 0.001;

    this.connections.forEach(conn => {
      const from = this.nodes[conn.from];
      const to = this.nodes[conn.to];

      const gradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);

      const pulseAlpha = 0.3 + Math.sin(time * 2 + conn.strength * 10) * 0.1;

      gradient.addColorStop(0, `rgba(${from.color.r}, ${from.color.g}, ${from.color.b}, ${conn.strength * pulseAlpha})`);
      gradient.addColorStop(1, `rgba(${to.color.r}, ${to.color.g}, ${to.color.b}, ${conn.strength * pulseAlpha})`);

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = conn.strength * 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();
    });
  }

  drawNodes() {
    const time = Date.now() * 0.001;

    this.nodes.forEach((node, index) => {
      const pulse = 1 + Math.sin(node.pulsePhase) * 0.2;
      const radius = node.radius * pulse;

      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, radius * 2
      );

      gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.8)`);
      gradient.addColorStop(0.5, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.3)`);
      gradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.9)`;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      this.ctx.fill();

      if (!this.reducedMotion) {
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.8)`;
      }

      this.ctx.fill();

      if (!this.reducedMotion) {
        this.ctx.shadowBlur = 0;
      }
    });
  }

  onMouseMove(x, y) {
    this.mousePos.x = x;
    this.mousePos.y = y;
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    window.neuralNetwork = new NeuralNetwork('neuralCanvas');
  }
});

export default NeuralNetwork;
