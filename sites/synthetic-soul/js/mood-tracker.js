/**
 * Synthetic Soul - Mood Tracker
 * Tracks user interactions to determine AI mood state
 */

const MOOD_STATES = {
  calm: {
    color: '#4ECDC4',
    expression: 'neutral',
    pulseRate: 60,
    weight: 0
  },
  engaged: {
    color: '#FFE66D',
    expression: 'curious',
    pulseRate: 75,
    weight: 0
  },
  excited: {
    color: '#FF6B6B',
    expression: 'happy',
    pulseRate: 95,
    weight: 0
  },
  contemplative: {
    color: '#C7F9CC',
    expression: 'thoughtful',
    pulseRate: 65,
    weight: 0
  }
};

export class MoodTracker {
  constructor(options = {}) {
    this.onMoodChange = options.onMoodChange || (() => {});
    this.reducedMotion = options.reducedMotion || false;
    this.updateInterval = options.updateInterval || 5000;
    
    this.currentMood = 'calm';
    this.scrollDepth = 0;
    this.hoverTime = {};
    this.clickPatterns = [];
    this.sectionTimes = {};
    this.lastSection = null;
    this.intervalId = null;
    this.scrollTimeout = null;
    
    this.init();
  }
  
  init() {
    this.bindScrollListener();
    this.bindHoverListeners();
    this.bindClickListeners();
    this.bindVisibilityListener();
  }
  
  start() {
    if (this.reducedMotion) return;
    this.updateMood();
    this.intervalId = setInterval(() => this.updateMood(), this.updateInterval);
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  bindScrollListener() {
    if (this.reducedMotion) return;
    
    window.addEventListener('scroll', () => {
      this.scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollDepth = Math.min(100, (scrollTop / docHeight) * 100);
        
        this.updateScrollMood();
      }, 100);
    });
    
    window.addEventListener('scroll', () => {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
    }, { passive: true });
  }
  
  bindHoverListeners() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const id = section.id;
      
      section.addEventListener('mouseenter', () => {
        this.hoverTime[id] = Date.now();
      });
      
      section.addEventListener('mouseleave', () => {
        if (this.hoverTime[id]) {
          const duration = Date.now() - this.hoverTime[id];
          this.hoverTime[id] = duration;
        }
      });
    });
  }
  
  bindClickListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button, [data-emotion]');
      if (!target) return;
      
      this.clickPatterns.push({
        time: Date.now(),
        type: target.tagName.toLowerCase(),
        section: this.getCurrentSection()
      });
      
      if (this.clickPatterns.length > 20) {
        this.clickPatterns.shift();
      }
      
      this.updateClickMood();
    });
  }
  
  bindVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }
  
  getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = null;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        current = section.id;
      }
    });
    
    return current || 'unknown';
  }
  
  updateScrollMood() {
    if (this.scrollDepth > 80) {
      MOOD_STATES.excited.weight += 2;
    } else if (this.scrollDepth > 50) {
      MOOD_STATES.engaged.weight += 1;
    }
  }
  
  updateClickMood() {
    MOOD_STATES.excited.weight += 3;
  }
  
  updateMood() {
    let maxWeight = 0;
    let dominantMood = 'calm';
    
    Object.keys(MOOD_STATES).forEach(mood => {
      MOOD_STATES[mood].weight = 0;
    });
    
    if (this.scrollDepth > 70) {
      MOOD_STATES.excited.weight += 3;
    } else if (this.scrollDepth > 40) {
      MOOD_STATES.engaged.weight += 2;
    } else {
      MOOD_STATES.calm.weight += 2;
    }
    
    Object.keys(this.hoverTime).forEach(section => {
      const duration = this.hoverTime[section];
      if (duration > 5000) {
        MOOD_STATES.contemplative.weight += 2;
      } else if (duration > 2000) {
        MOOD_STATES.engaged.weight += 1;
      }
    });
    
    const recentClicks = this.clickPatterns.filter(c => Date.now() - c.time < 10000);
    if (recentClicks.length > 5) {
      MOOD_STATES.excited.weight += recentClicks.length;
    }
    
    Object.keys(MOOD_STATES).forEach(mood => {
      if (MOOD_STATES[mood].weight > maxWeight) {
        maxWeight = MOOD_STATES[mood].weight;
        dominantMood = mood;
      }
    });
    
    const smoothTransition = maxWeight < 3;
    if (smoothTransition && this.currentMood !== 'calm') {
      dominantMood = this.smoothTransition(this.currentMood, 'calm');
    }
    
    if (dominantMood !== this.currentMood) {
      this.currentMood = dominantMood;
      this.onMoodChange({
        state: dominantMood,
        color: MOOD_STATES[dominantMood].color,
        expression: MOOD_STATES[dominantMood].expression,
        pulseRate: MOOD_STATES[dominantMood].pulseRate
      });
    }
  }
  
  smoothTransition(from, to) {
    const weights = { calm: 0, engaged: 1, excited: 2, contemplative: 0.5 };
    const diff = Math.abs(weights[from] - weights[to]);
    return diff > 1 ? 'calm' : to;
  }
  
  getCurrentMood() {
    return {
      state: this.currentMood,
      color: MOOD_STATES[this.currentMood].color,
      expression: MOOD_STATES[this.currentMood].expression,
      pulseRate: MOOD_STATES[this.currentMood].pulseRate
    };
  }
}
