/**
 * Android Dreams - Eye Tracking System
 * Mechanical eye that follows cursor movement with iris dilation
 */

class EyeTracker {
    constructor(eyeElement, options = {}) {
        this.eye = eyeElement;
        this.iris = eyeElement.querySelector('.eye-iris');
        this.pupil = eyeElement.querySelector('.iris-pupil');
        this.highlight = eyeElement.querySelector('.eye-highlight');

        this.options = {
            trackingSensitivity: options.trackingSensitivity || 0.15,
            maxOffset: options.maxOffset || 25,
            dilationSize: options.dilationSize || 15,
            contractionSize: options.contractionSize || -10,
            idleTimeout: options.idleTimeout || 3000,
            ...options
        };

        this.centerX = 0;
        this.centerY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.isTracking = false;
        this.isIdle = false;
        this.idleTimer = null;

        this.init();
    }

    init() {
        // Calculate center position
        this.updateCenter();

        // Set initial state
        this.eye.classList.add('idle');

        // Event listeners
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

        // Click to focus/contract
        this.eye.addEventListener('click', this.handleClick.bind(this));

        // Touch support
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });

        // Start animation loop
        this.animate();

        // Resize handler
        window.addEventListener('resize', this.updateCenter.bind(this));
    }

    updateCenter() {
        const rect = this.eye.getBoundingClientRect();
        this.centerX = rect.width / 2;
        this.centerY = rect.height / 2;
    }

    handleMouseMove(e) {
        const rect = this.eye.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - this.centerX;
        const mouseY = e.clientY - rect.top - this.centerY;

        // Clamp to max offset
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const maxDistance = this.options.maxOffset;

        if (distance > maxDistance) {
            const scale = maxDistance / distance;
            this.targetX = mouseX * scale;
            this.targetY = mouseY * scale;
        } else {
            this.targetX = mouseX;
            this.targetY = mouseY;
        }

        this.resetIdleTimer();
    }

    handleTouchMove(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = this.eye.getBoundingClientRect();
            const touchX = touch.clientX - rect.left - this.centerX;
            const touchY = touch.clientY - rect.top - this.centerY;

            const distance = Math.sqrt(touchX * touchX + touchY * touchY);
            const maxDistance = this.options.maxOffset;

            if (distance > maxDistance) {
                const scale = maxDistance / distance;
                this.targetX = touchX * scale;
                this.targetY = touchY * scale;
            } else {
                this.targetX = touchX;
                this.targetY = touchY;
            }
        }
    }

    handleMouseEnter() {
        this.isTracking = true;
        this.eye.classList.remove('idle');
        this.eye.classList.add('tracking');

        // Dilate iris
        this.dilateIris();
    }

    handleMouseLeave() {
        this.isTracking = false;
        this.eye.classList.remove('tracking');
        this.eye.classList.add('idle');

        // Return to center
        this.targetX = 0;
        this.targetY = 0;

        // Contract iris
        this.contractIris();
    }

    handleClick() {
        // Brief focus/contract effect on click
        this.eye.classList.add('focused');
        setTimeout(() => {
            this.eye.classList.remove('focused');
        }, 200);

        // Servo click feedback
        this.triggerServoClick();
    }

    dilateIris() {
        if (this.pupil && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.pupil.style.width = `${40 + this.options.dilationSize}px`;
            this.pupil.style.height = `${40 + this.options.dilationSize}px`;
        }
    }

    contractIris() {
        if (this.pupil && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.pupil.style.width = '40px';
            this.pupil.style.height = '40px';
        }
    }

    triggerServoClick() {
        const servoEl = document.querySelector('.btn-servo');
        if (servoEl) {
            servoEl.style.transform = 'rotate(45deg)';
            setTimeout(() => {
                servoEl.style.transform = 'rotate(0deg)';
            }, 150);
        }
    }

    resetIdleTimer() {
        this.isIdle = false;
        clearTimeout(this.idleTimer);

        this.idleTimer = setTimeout(() => {
            this.isIdle = true;
            this.eye.classList.add('idle');
        }, this.options.idleTimeout);
    }

    animate() {
        // Smooth interpolation toward target
        const ease = 0.1;
        this.currentX += (this.targetX - this.currentX) * ease;
        this.currentY += (this.targetY - this.currentY) * ease;

        // Apply transform to iris
        if (this.iris && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.iris.style.transform = `translate(calc(-50% + ${this.currentX}px), calc(-50% + ${this.currentY}px))`;
        }

        // Update highlight position (subtle)
        if (this.highlight && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const highlightOffsetX = -this.currentX * 0.2;
            const highlightOffsetY = -this.currentY * 0.2;
            this.highlight.style.transform = `translate(${highlightOffsetX}px, ${highlightOffsetY}px)`;
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const mechanicalEye = document.getElementById('mechanicalEye');

    if (mechanicalEye && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new EyeTracker(mechanicalEye);
    }
});

// Export for manual initialization
window.EyeTracker = EyeTracker;
