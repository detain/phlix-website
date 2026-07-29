/**
 * Synthetic Soul - Organic Circuits Visualization
 * Draws organic, flowing circuit-like patterns on canvas
 */

export class OrganicCircuits {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = options;
    this.reducedMotion = options.reducedMotion || false;
    
    this.branches = [];
    this.nodes = [];
    this.animationId = null;
    this.isRunning = false;
    this.time = 0;
    
    this.colors = {
      node: '#4ECDC4',
      line: '#4ECDC4',
      glow: 'rgba(78, 205, 196, 0.4)',
      nodeGlow: 'rgba(78, 205, 196, 0.6)'
    };
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    
    this.initCircuits();
  }
  
  initCircuits() {
    this.branches = [];
    this.nodes = [];
    
    const numCircuits = 5;
    
    for (let i = 0; i < numCircuits; i++) {
      const startX = Math.random() * this.width;
      const startY = Math.random() * this.height;
      this.growCircuit(startX, startY, Math.random() * Math.PI * 2, 0);
    }
  }
  
  growCircuit(x, y, angle, depth) {
    if (depth > 4) return;
    
    const branchLength = 50 + Math.random() * 100;
    const numSegments = 5 + Math.floor(Math.random() * 5);
    const segmentLength = branchLength / numSegments;
    
    const branch = {
      points: [{ x, y }],
      depth,
      angle,
      phase: Math.random() * Math.PI * 2
    };
    
    let currentX = x;
    let currentY = y;
    let currentAngle = angle;
    
    for (let i = 0; i < numSegments; i++) {
      const wobble = Math.sin(this.time * 2 + branch.phase + i * 0.5) * 0.1;
      currentAngle += (Math.random() - 0.5) * 0.3 + wobble;
      
      currentX += Math.cos(currentAngle) * segmentLength;
      currentY += Math.sin(currentAngle) * segmentLength;
      
      if (currentX < 0 || currentX > this.width || currentY < 0 || currentY > this.height) {
        break;
      }
      
      branch.points.push({ x: currentX, y: currentY });
      
      if (Math.random() < 0.3 && depth < 3) {
        const branchAngle = currentAngle + (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.5);
        setTimeout(() => {
          this.growCircuit(currentX, currentY, branchAngle, depth + 1);
        }, depth * 200);
      }
    }
    
    this.branches.push(branch);
    
    const nodeX = branch.points[branch.points.length - 1].x;
    const nodeY = branch.points[branch.points.length - 1].y;
    this.nodes.push({
      x: nodeX,
      y: nodeY,
      radius: 2 + (4 - depth) * 0.5,
      phase: Math.random() * Math.PI * 2,
      depth
    });
  }
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }
  
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  animate() {
    if (!this.isRunning) return;
    
    this.time += this.reducedMotion ? 0.001 : 0.016;
    
    this.draw();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  draw() {
    const ctx = this.ctx;
    
    ctx.clearRect(0, 0, this.width, this.height);
    
    ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
    ctx.fillRect(0, 0, this.width, this.height);
    
    this.drawBranches();
    this.drawNodes();
  }
  
  drawBranches() {
    const ctx = this.ctx;
    
    this.branches.forEach(branch => {
      if (branch.points.length < 2) return;
      
      const opacity = 0.1 + (4 - branch.depth) * 0.05;
      ctx.strokeStyle = this.colors.line;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1 + (4 - branch.depth) * 0.3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (!this.reducedMotion) {
        ctx.shadowColor = this.colors.glow;
        ctx.shadowBlur = 8;
      }
      
      ctx.beginPath();
      ctx.moveTo(branch.points[0].x, branch.points[0].y);
      
      for (let i = 1; i < branch.points.length - 1; i++) {
        const xc = (branch.points[i].x + branch.points[i + 1].x) / 2;
        const yc = (branch.points[i].y + branch.points[i + 1].y) / 2;
        ctx.quadraticCurveTo(branch.points[i].x, branch.points[i].y, xc, yc);
      }
      
      const lastPoint = branch.points[branch.points.length - 1];
      const secondLast = branch.points[branch.points.length - 2];
      ctx.quadraticCurveTo(secondLast.x, secondLast.y, lastPoint.x, lastPoint.y);
      
      ctx.stroke();
      
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    });
    
    ctx.globalAlpha = 1;
  }
  
  drawNodes() {
    const ctx = this.ctx;
    
    this.nodes.forEach(node => {
      const pulse = this.reducedMotion ? 1 : Math.sin(this.time * 3 + node.phase) * 0.3 + 0.7;
      const radius = node.radius * pulse;
      
      const opacity = 0.3 + (4 - node.depth) * 0.1;
      ctx.fillStyle = this.colors.node;
      ctx.globalAlpha = opacity;
      
      if (!this.reducedMotion) {
        ctx.shadowColor = this.colors.nodeGlow;
        ctx.shadowBlur = 15;
      }
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    });
    
    ctx.globalAlpha = 1;
  }
  
  destroy() {
    this.stop();
    window.removeEventListener('resize', () => this.resize());
  }
}
