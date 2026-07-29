/**
 * Android Dreams - Servo Interaction System
 * Precise mechanical feedback on user interactions
 */

class ServoInteraction {
    constructor(options = {}) {
        this.options = {
            clickDuration: options.clickDuration || 150,
            hoverDuration: options.hoverDuration || 100,
            rotationDegrees: options.rotationDegrees || 45,
            volume: options.volume || 0.1,
            ...options
        };

        this.activeServos = new Set();
        this.init();
    }

    init() {
        // Add servo elements to buttons
        this.setupButtonServos();

        // Track clicks for servo feedback
        this.setupClickTracking();

        // Add hover effects
        this.setupHoverEffects();

        // Add page load servo sweep
        this.playStartupSequence();
    }

    setupButtonServos() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            // Check if already has servo element
            let servo = button.querySelector('.btn-servo');

            if (!servo && button.classList.contains('btn-primary')) {
                servo = document.createElement('span');
                servo.className = 'btn-servo';
                button.appendChild(servo);
            }

            if (servo) {
                button.dataset.servoEnabled = 'true';
            }
        });
    }

    setupClickTracking() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn[data-servo-enabled="true"]');

            if (button) {
                this.triggerServoClick(button);
            }
        }, true);
    }

    triggerServoClick(button) {
        const servo = button.querySelector('.btn-servo');
        if (!servo) return;

        // Prevent double-triggering
        if (this.activeServos.has(servo)) return;
        this.activeServos.add(servo);

        // Mechanical click animation
        servo.style.transition = `transform ${this.options.clickDuration}ms cubic-bezier(0.68, -0.15, 0.32, 1.15)`;
        servo.style.transform = `rotate(${this.options.rotationDegrees}deg)`;

        // Play click sound
        this.playServoSound('click');

        setTimeout(() => {
            servo.style.transition = `transform ${this.options.clickDuration * 2}ms ease-out`;
            servo.style.transform = 'rotate(0deg)';

            setTimeout(() => {
                this.activeServos.delete(servo);
            }, this.options.clickDuration * 2);
        }, this.options.clickDuration);
    }

    setupHoverEffects() {
        const servos = document.querySelectorAll('.btn-servo');

        servos.forEach(servo => {
            const button = servo.closest('.btn');

            if (button) {
                button.addEventListener('mouseenter', () => {
                    if (!this.activeServos.has(servo)) {
                        this.triggerServoHover(servo, true);
                    }
                });

                button.addEventListener('mouseleave', () => {
                    this.triggerServoHover(servo, false);
                });
            }
        });
    }

    triggerServoHover(servo, isEnter) {
        if (this.activeServos.has(servo)) return;

        const targetRotation = isEnter ? 15 : 0;
        servo.style.transition = `transform ${this.options.hoverDuration}ms ease-out`;
        servo.style.transform = `rotate(${targetRotation}deg)`;
    }

    playServoSound(type) {
        // Create audio context for servo sounds
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = this.audioContext;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            if (type === 'click') {
                // Mechanical click sound
                oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
                gainNode.gain.setValueAtTime(this.options.volume * 0.5, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.1);
            } else if (type === 'sweep') {
                // Servo sweep sound
                oscillator.frequency.setValueAtTime(400, ctx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2);
                oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.4);
                gainNode.gain.setValueAtTime(this.options.volume * 0.3, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
            }
        } catch (e) {
            // Audio not supported or blocked
        }
    }

    playStartupSequence() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Small delay before playing
        setTimeout(() => {
            this.playServoSound('sweep');

            // Animate all servos in sequence
            const servos = document.querySelectorAll('.btn-servo');
            servos.forEach((servo, index) => {
                setTimeout(() => {
                    servo.style.transition = 'transform 200ms ease-out';
                    servo.style.transform = 'rotate(90deg)';

                    setTimeout(() => {
                        servo.style.transform = 'rotate(0deg)';
                    }, 200);
                }, index * 100);
            });
        }, 500);
    }

    // Trigger servo on custom events
    trigger(eventType, element) {
        if (eventType === 'click') {
            this.triggerServoClick(element);
        } else if (eventType === 'hover') {
            const servo = element.querySelector('.btn-servo');
            if (servo) this.triggerServoHover(servo, true);
        }
    }
}

// Feature card servo feedback
class FeatureCardServo {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.triggerCardServo(card));
        });
    }

    triggerCardServo(card) {
        const chip = card.querySelector('.chip-value');
        if (chip) {
            chip.style.transition = 'transform 100ms ease-out';
            chip.style.transform = 'scale(1.1)';

            setTimeout(() => {
                chip.style.transform = 'scale(1)';
            }, 100);
        }
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Skip servo initialization
    }

    // Initialize main servo system
    window.servoInteraction = new ServoInteraction();

    // Initialize feature card interactions
    new FeatureCardServo();
});

// Export for manual initialization
window.ServoInteraction = ServoInteraction;
window.FeatureCardServo = FeatureCardServo;
