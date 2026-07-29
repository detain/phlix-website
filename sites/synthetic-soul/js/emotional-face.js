/**
 * Synthetic Soul - Emotional Face Component
 */

const EXPRESSIONS = {
  neutral: {
    eyeOpenness: 0.8,
    eyeSize: 15,
    pupilSize: 8,
    mouthPath: 'M 60 130 Q 100 145 140 130',
    mouthCurve: 0,
    browPath: 'M 50 60 Q 65 55 80 60',
    browAngle: 0
  },
  curious: {
    eyeOpenness: 1.0,
    eyeSize: 18,
    pupilSize: 10,
    mouthPath: 'M 60 125 Q 100 150 140 125',
    mouthCurve: 0.2,
    browPath: 'M 50 55 Q 65 50 80 55',
    browAngle: 5
  },
  happy: {
    eyeOpenness: 0.7,
    eyeSize: 12,
    pupilSize: 7,
    mouthPath: 'M 50 115 Q 100 165 150 115',
    mouthCurve: 0.8,
    browPath: 'M 50 65 Q 65 60 80 65',
    browAngle: 0
  },
  concerned: {
    eyeOpenness: 0.9,
    eyeSize: 16,
    pupilSize: 9,
    mouthPath: 'M 55 140 Q 100 120 145 140',
    mouthCurve: -0.3,
    browPath: 'M 45 55 Q 60 65 80 55',
    browAngle: -8
  },
  thoughtful: {
    eyeOpenness: 0.75,
    eyeSize: 14,
    pupilSize: 8,
    mouthPath: 'M 65 135 Q 100 145 135 135',
    mouthCurve: 0.1,
    browPath: 'M 50 58 Q 65 52 80 58',
    browAngle: 3
  }
};

export class EmotionalFace {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.reducedMotion = options.reducedMotion || false;
    this.expressionCycle = null;
    this.currentExpression = 'neutral';
    this.transitionDuration = 500;
    
    this.elements = {
      leftEye: element.querySelector('#eye-left'),
      rightEye: element.querySelector('#eye-right'),
      leftPupil: element.querySelector('#pupil-left'),
      rightPupil: element.querySelector('#pupil-right'),
      mouth: element.querySelector('#mouth'),
      leftBrow: element.querySelector('#brow-left'),
      rightBrow: element.querySelector('#brow-right')
    };
    
    this.init();
  }
  
  init() {
    this.setExpression('neutral');
    this.bindMouseTracking();
  }
  
  setExpression(name, animate = true) {
    if (!EXPRESSIONS[name]) return;
    
    const expr = EXPRESSIONS[name];
    
    this.currentExpression = name;
    
    if (this.elements.leftEye && this.elements.rightEye) {
      const eyeSize = expr.eyeSize;
      this.elements.leftEye.setAttribute('r', eyeSize);
      this.elements.rightEye.setAttribute('r', eyeSize);
    }
    
    if (this.elements.leftPupil && this.elements.rightPupil) {
      const pupilSize = expr.pupilSize;
      this.elements.leftPupil.setAttribute('r', pupilSize);
      this.elements.rightPupil.setAttribute('r', pupilSize);
    }
    
    if (this.elements.mouth) {
      this.elements.mouth.setAttribute('d', expr.mouthPath);
    }
    
    if (this.elements.leftBrow && this.elements.rightBrow) {
      this.elements.leftBrow.setAttribute('d', expr.browPath);
      this.elements.rightBrow.setAttribute('d', this.mirrorPath(expr.browPath));
    }
  }
  
  mirrorPath(path) {
    return path.replace(/M\s*(\d+)\s+(\d+)\s+Q\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/, (match, x1, y1, cx, cy, x2, y2) => {
      const mirroredX1 = 200 - parseInt(x1);
      const mirroredCx = 200 - parseInt(cx);
      const mirroredX2 = 200 - parseInt(x2);
      return `M ${mirroredX1} ${y1} Q ${mirroredCx} ${cy} ${mirroredX2} ${y2}`;
    });
  }
  
  bindMouseTracking() {
    if (this.reducedMotion) return;
    
    let lookTimeout = null;
    
    document.addEventListener('mousemove', (e) => {
      if (lookTimeout) return;
      
      lookTimeout = setTimeout(() => {
        this.lookAt(e.clientX, e.clientY);
        lookTimeout = null;
      }, 50);
    });
    
    document.addEventListener('mouseleave', () => {
      this.lookAtCenter();
    });
  }
  
  lookAt(x, y) {
    if (!this.elements.leftPupil || !this.elements.rightPupil) return;
    
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(y - centerY, x - centerX);
    const distance = Math.min(3, Math.hypot(x - centerX, y - centerY) / 100);
    
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;
    
    const baseLeftX = 65;
    const baseRightX = 135;
    const baseY = 80;
    
    this.elements.leftPupil.setAttribute('cx', baseLeftX + offsetX);
    this.elements.leftPupil.setAttribute('cy', baseY + offsetY);
    this.elements.rightPupil.setAttribute('cx', baseRightX + offsetX);
    this.elements.rightPupil.setAttribute('cy', baseY + offsetY);
  }
  
  lookAtCenter() {
    if (!this.elements.leftPupil || !this.elements.rightPupil) return;
    
    this.elements.leftPupil.setAttribute('cx', 65);
    this.elements.leftPupil.setAttribute('cy', 80);
    this.elements.rightPupil.setAttribute('cx', 135);
    this.elements.rightPupil.setAttribute('cy', 80);
  }
  
  startExpressionCycle() {
    if (this.reducedMotion) return;
    
    const expressions = ['neutral', 'curious', 'happy', 'concerned', 'thoughtful'];
    let currentIndex = 0;
    const interval = 4000;
    
    this.expressionCycle = setInterval(() => {
      currentIndex = (currentIndex + 1) % expressions.length;
      this.setExpression(expressions[currentIndex]);
    }, interval);
  }
  
  stopExpressionCycle() {
    if (this.expressionCycle) {
      clearInterval(this.expressionCycle);
      this.expressionCycle = null;
    }
  }
  
  destroy() {
    this.stopExpressionCycle();
  }
}
