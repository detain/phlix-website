/**
 * Synthetic Soul - Heart Monitor Visualization
 */

export class HeartMonitor {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = options;
    this.reducedMotion = options.reducedMotion || false;
    this.onHeartRateChange = options.onHeartRateChange || (() => {});
    this.onEmotionChange = options.onEmotionChange || (() => {});
    
    this.isRunning = false;
    this.animationId = null;
    this.heartRate = 72;
    this.targetHeartRate = 72;
    this.time = 0;
    this.dataPoints = [];
    
    this.colors = {
      line: '#FF6B6B',
      glow: 'rgba(255, 107, 107, 0.6)',
      grid: 'rgba(78, 205, 196, 0.1)',
      gridAccent: 'rgba(78, 205, 196, 0.2)'
    };
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
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
    
    this.updateHeartRate();
    this.draw();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  updateHeartRate() {
    if (this.reducedMotion) return;
    
    const variance = Math.sin(this.time * 0.5) * 10;
    const emotionInfluence = this.calculateEmotionInfluence();
    
    this.targetHeartRate = 72 + variance + emotionInfluence;
    this.heartRate += (this.targetHeartRate - this.heartRate) * 0.05;
    
    this.onHeartRateChange(Math.round(this.heartRate));
    
    const emotion = this.getEmotionFromRate(this.heartRate);
    this.onEmotionChange(emotion);
  }
  
  calculateEmotionInfluence() {
    const section = this.getCurrentSection();
    const influences = {
      hero: 5,
      experience: 15,
      technology: -5,
      emotions: 20,
      connect: 10
    };
    
    return influences[section] || 0;
  }
  
  getCurrentSection() {
    const sections = ['hero', 'experience', 'technology', 'emotions', 'connect'];
    
    for (const section of sections) {
      const el = document.getElementById(section);
      if (!el) continue;
      
      const rect = el.getBoundingClientRect();
      if (rect.top <= this.height / 2 && rect.bottom >= this.height / 2) {
        return section;
      }
    }
    
    return 'hero';
  }
  
  getEmotionFromRate(rate) {
    if (rate > 85) return 'Excited';
    if (rate > 75) return 'Engaged';
    if (rate < 65) return 'Contemplative';
    return 'Curious';
  }
  
  draw() {
    const ctx = this.ctx;
    
    ctx.clearRect(0, 0, this.width, this.height);
    
    this.drawGrid();
    this.drawHeartLine();
  }
  
  drawGrid() {
    const ctx = this.ctx;
    const gridSize = 20;
    
    ctx.strokeStyle = this.colors.grid;
    ctx.lineWidth = 1;
    
    for (let x = 0; x < this.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    
    for (let y = 0; y < this.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
    
    ctx.strokeStyle = this.colors.gridAccent;
    const centerY = this.height / 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(this.width, centerY);
    ctx.stroke();
  }
  
  drawHeartLine() {
    const ctx = this.ctx;
    const padding = 40;
    const drawWidth = this.width - padding * 2;
    const centerY = this.height / 2;
    const amplitude = 50;
    
    const pointCount = 200;
    const segmentWidth = drawWidth / pointCount;
    
    this.dataPoints.push({
      x: this.width + padding,
      y: centerY,
      time: this.time
    });
    
    if (this.dataPoints.length > pointCount) {
      this.dataPoints.shift();
    }
    
    ctx.beginPath();
    ctx.strokeStyle = this.colors.line;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (!this.reducedMotion) {
      ctx.shadowColor = this.colors.glow;
      ctx.shadowBlur = 15;
    }
    
    for (let i = 0; i < this.dataPoints.length; i++) {
      const point = this.dataPoints[i];
      const x = padding + i * segmentWidth;
      const y = this.calculateHeartPoint(point.time, centerY, amplitude);
      
      point.y = y;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = padding + (i - 1) * segmentWidth;
        const prevY = this.dataPoints[i - 1].y;
        
        const cpX = (prevX + x) / 2;
        ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2);
      }
    }
    
    ctx.stroke();
    
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    this.dataPoints = this.dataPoints.map(p => ({
      ...p,
      x: p.x - segmentWidth
    })).filter(p => p.x > padding);
    
    this.drawBaseline(padding, centerY, drawWidth);
  }
  
  calculateHeartPoint(t, centerY, amplitude) {
    const beatDuration = 60 / this.heartRate;
    const phase = (t % beatDuration) / beatDuration;
    
    let heartValue = 0;
    
    if (phase < 0.1) {
      heartValue = Math.sin(phase * Math.PI / 0.1) * 0.1;
    } else if (phase < 0.2) {
      heartValue = 0.1 - (phase - 0.1) / 0.1 * 0.4;
    } else if (phase < 0.3) {
      heartValue = -0.3 + (phase - 0.2) / 0.1 * 2.5;
    } else if (phase < 0.4) {
      heartValue = 2.2 - (phase - 0.3) / 0.1 * 2.1;
    } else {
      heartValue = 0.1 + Math.sin((phase - 0.4) / 0.6 * Math.PI) * 0.1;
    }
    
    return centerY - heartValue * amplitude;
  }
  
  drawBaseline(padding, centerY, width) {
    const ctx = this.ctx;
    
    ctx.strokeStyle = 'rgba(78, 205, 196, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(padding, centerY);
    ctx.lineTo(padding + width, centerY);
    ctx.stroke();
    
    ctx.setLineDash([]);
  }
  
  destroy() {
    this.stop();
    window.removeEventListener('resize', () => this.resize());
  }
}
