/**
 * Android Dreams - Avatar Evolution System
 * AI wire-frame avatar that evolves in complexity with usage
 */

class AvatarEvolution {
    constructor(avatarElement, options = {}) {
        this.avatar = avatarElement;
        this.svg = avatarElement.querySelector('.wireframe-svg');
        this.group = avatarElement.querySelector('.wireframe-group');

        this.options = {
            baseComplexity: options.baseComplexity || 1,
            maxComplexity: options.maxComplexity || 10,
            complexityIncrement: options.complexityIncrement || 0.5,
            evolutionThreshold: options.evolutionThreshold || 5, // interactions needed
            storageKey: options.storageKey || 'android_dreams_avatar_level',
            ...options
        };

        this.currentComplexity = this.loadComplexity();
        this.interactionCount = 0;
        this.nextEvolutionAt = this.options.evolutionThreshold;

        this.init();
    }

    init() {
        if (!this.svg || !this.group) return;

        // Apply initial complexity level
        this.applyComplexity(this.currentComplexity);

        // Track user interactions
        this.setupInteractionTracking();

        // Start subtle idle animation
        this.startIdleAnimation();

        // Periodic complexity check
        this.startComplexityCheck();
    }

    loadComplexity() {
        try {
            const saved = localStorage.getItem(this.options.storageKey);
            if (saved) {
                const level = parseFloat(saved);
                if (!isNaN(level) && level >= this.options.baseComplexity) {
                    return Math.min(level, this.options.maxComplexity);
                }
            }
        } catch (e) {
            // localStorage not available
        }
        return this.options.baseComplexity;
    }

    saveComplexity() {
        try {
            localStorage.setItem(this.options.storageKey, this.currentComplexity.toString());
        } catch (e) {
            // localStorage not available
        }
    }

    setupInteractionTracking() {
        const trackedEvents = ['click', 'scroll', 'mousemove', 'keypress', 'touchstart'];

        const handleInteraction = () => {
            this.interactionCount++;

            if (this.interactionCount >= this.nextEvolutionAt) {
                this.evolve();
                this.nextEvolutionAt += this.options.evolutionThreshold;
            }
        };

        trackedEvents.forEach(event => {
            document.addEventListener(event, handleInteraction, { passive: true });
        });
    }

    evolve() {
        if (this.currentComplexity >= this.options.maxComplexity) return;

        this.currentComplexity = Math.min(
            this.currentComplexity + this.options.complexityIncrement,
            this.options.maxComplexity
        );

        this.applyComplexity(this.currentComplexity);
        this.saveComplexity();
        this.playEvolutionAnimation();
    }

    applyComplexity(level) {
        if (!this.group) return;

        const elements = this.group.querySelectorAll('*');
        const complexityRatio = (level - this.options.baseComplexity) /
                                (this.options.maxComplexity - this.options.baseComplexity);

        // Add complexity by showing more elements and increasing stroke width
        elements.forEach((el, index) => {
            // Gradually reveal elements based on complexity
            const revealThreshold = index / elements.length;
            if (complexityRatio >= revealThreshold) {
                el.style.opacity = '1';
            } else {
                el.style.opacity = (complexityRatio * 2).toString();
            }

            // Increase stroke width with complexity
            if (el.tagName !== 'circle' || !el.classList.contains('node-pulse')) {
                const baseStroke = 1;
                const maxStroke = 2;
                el.style.strokeWidth = (baseStroke + (maxStroke - baseStroke) * complexityRatio) + 'px';
            }
        });

        // Add glow effect at higher levels
        if (complexityRatio > 0.5) {
            this.svg.style.filter = `drop-shadow(0 0 ${10 * complexityRatio}px rgba(0, 206, 255, ${0.3 * complexityRatio}))`;
        }
    }

    playEvolutionAnimation() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Flash effect
        this.avatar.style.transition = 'filter 0.3s ease-out';
        this.avatar.style.filter = 'brightness(2) drop-shadow(0 0 30px rgba(0, 206, 255, 1))';

        setTimeout(() => {
            this.avatar.style.filter = '';
        }, 300);

        // Pulse the nodes
        const nodes = this.group.querySelectorAll('.node-pulse');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'none';
                node.offsetHeight; // Trigger reflow
                node.style.animation = 'nodeConnect 0.5s ease-out';
            }, index * 100);
        });

        // Dispatch custom event
        this.avatar.dispatchEvent(new CustomEvent('avatar-evolve', {
            detail: {
                level: this.currentComplexity,
                maxLevel: this.options.maxComplexity
            }
        }));
    }

    startIdleAnimation() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const nodes = this.group.querySelectorAll('.node-pulse');
        let pulseIndex = 0;

        setInterval(() => {
            nodes.forEach((node, index) => {
                if (index === pulseIndex) {
                    node.style.animation = 'none';
                    node.offsetHeight;
                    node.style.animation = 'nodeConnect 1s ease-out';
                }
            });

            pulseIndex = (pulseIndex + 1) % nodes.length;
        }, 2000);
    }

    startComplexityCheck() {
        // Update UI with current level periodically
        setInterval(() => {
            this.updateComplexityUI();
        }, 5000);
    }

    updateComplexityUI() {
        const progress = ((this.currentComplexity - this.options.baseComplexity) /
                         (this.options.maxComplexity - this.options.baseComplexity)) * 100;

        // Update any progress indicators
        const indicators = document.querySelectorAll('[data-avatar-progress]');
        indicators.forEach(el => {
            el.style.width = `${progress}%`;
            el.setAttribute('aria-valuenow', Math.round(progress));
        });
    }

    getComplexity() {
        return this.currentComplexity;
    }

    getProgress() {
        return ((this.currentComplexity - this.options.baseComplexity) /
               (this.options.maxComplexity - this.options.baseComplexity)) * 100;
    }

    reset() {
        this.currentComplexity = this.options.baseComplexity;
        this.interactionCount = 0;
        this.nextEvolutionAt = this.options.evolutionThreshold;
        this.saveComplexity();
        this.applyComplexity(this.currentComplexity);
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const avatarElement = document.getElementById('aiAvatar');

    if (avatarElement) {
        const avatar = new AvatarEvolution(avatarElement);

        // Expose for debugging
        window.androidDreamsAvatar = avatar;
    }
});

// Export for manual initialization
window.AvatarEvolution = AvatarEvolution;
