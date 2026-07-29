/**
 * Terraform Particles System
 * Creates floating particle effects for the planetary atmosphere
 */
(function() {
    'use strict';

    const Particles = {
        container: null,
        particles: [],
        maxParticles: 30,
        animationFrame: null,

        colors: ['#06D6A0', '#1B998B', '#EF476F', '#FFD166'],

        init: function() {
            this.container = document.getElementById('particles');
            if (!this.container) return;

            // Respect reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            this.createParticles();
            this.animate();
        },

        createParticles: function() {
            for (let i = 0; i < this.maxParticles; i++) {
                const particle = this.createParticle(i);
                this.particles.push(particle);
                this.container.appendChild(particle.element);
            }
        },

        createParticle: function() {
            const el = document.createElement('div');
            el.className = 'particle';

            // Random color from palette
            const colorIndex = Math.floor(Math.random() * this.colors.length);
            if (colorIndex > 0) {
                const colorClasses = ['', 'secondary', 'accent', 'light'];
                el.classList.add(colorClasses[colorIndex]);
            }

            // Position
            el.style.left = Math.random() * 100 + '%';
            el.style.top = Math.random() * 100 + '%';

            // Animation delay and duration
            const duration = 15 + Math.random() * 20;
            const delay = Math.random() * duration;

            el.style.animationDuration = duration + 's';
            el.style.animationDelay = '-' + delay + 's';

            return {
                element: el,
                x: parseFloat(el.style.left),
                y: parseFloat(el.style.top),
                vx: (Math.random() - 0.5) * 0.5,
                vy: -0.5 - Math.random() * 0.5
            };
        },

        animate: function() {
            this.particles.forEach(p => {
                // Gentle floating motion
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = 100;
                if (p.x > 100) p.x = 0;
                if (p.y < 0) p.y = 100;
                if (p.y > 100) p.y = 0;

                p.element.style.left = p.x + '%';
                p.element.style.top = p.y + '%';
            });

            this.animationFrame = requestAnimationFrame(() => this.animate());
        },

        destroy: function() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            this.particles.forEach(p => {
                if (p.element.parentNode) {
                    p.element.parentNode.removeChild(p.element);
                }
            });
            this.particles = [];
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Particles.init());
    } else {
        Particles.init();
    }

    // Expose globally
    window.TerraformParticles = Particles;
})();
