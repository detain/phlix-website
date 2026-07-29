/**
 * Android Dreams - Circuit Reveal System
 * Circuit board traces that draw themselves into view on scroll
 */

class CircuitReveal {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.2,
            rootMargin: options.rootMargin || '0px',
            animationDuration: options.animationDuration || 2000,
            staggerDelay: options.staggerDelay || 100,
            ...options
        };

        this.revealedElements = new Set();
        this.init();
    }

    init() {
        // Find all circuit reveal elements
        this.elements = document.querySelectorAll('.circuit-reveal, .circuit-divider, [data-circuit]');

        if (this.elements.length === 0) return;

        // Set up intersection observer
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin
            }
        );

        // Observe each element
        this.elements.forEach(el => {
            // Skip already revealed
            if (el.classList.contains('visible')) {
                this.revealedElements.add(el);
                return;
            }
            this.observer.observe(el);
        });

        // Animate circuit paths
        this.animateCircuitPaths();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.revealedElements.has(entry.target)) {
                this.revealElement(entry.target);
            }
        });
    }

    revealElement(el, delay = 0) {
        if (this.revealedElements.has(el)) return;

        this.revealedElements.add(el);

        setTimeout(() => {
            el.classList.add('visible');

            // Trigger circuit trace animations if present
            const paths = el.querySelectorAll('.circuit-reveal-path, .trace');
            paths.forEach((path, index) => {
                setTimeout(() => {
                    path.style.animation = `circuitTraceReveal ${this.options.animationDuration}ms ease-out forwards`;
                }, index * this.options.staggerDelay);
            });

            // Dispatch custom event
            el.dispatchEvent(new CustomEvent('circuit-reveal', {
                detail: { element: el }
            }));
        }, delay);
    }

    animateCircuitPaths() {
        const paths = document.querySelectorAll('.circuit-path');

        if (paths.length === 0) return;

        const pathObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'circuitTraceReveal 3s ease-out forwards';
                    }
                });
            },
            { threshold: 0.3 }
        );

        paths.forEach(path => {
            path.style.strokeDasharray = '1000';
            path.style.strokeDashoffset = '1000';
            pathObserver.observe(path);
        });
    }
}

// Scroll progress indicator for circuit elements
class CircuitScrollProgress {
    constructor() {
        this.progress = 0;
        this.elements = document.querySelectorAll('[data-scroll-progress]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        this.handleScroll();
    }

    handleScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (docHeight > 0) {
            this.progress = Math.min(scrollTop / docHeight, 1);

            this.elements.forEach(el => {
                const progress = parseFloat(el.dataset.scrollProgress) || 1;
                const offset = (1 - this.progress) * progress * 100;
                el.style.strokeDashoffset = offset * 10;
            });
        }
    }
}

// Binary rain effect
class BinaryRain {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            columns: options.columns || 20,
            speed: options.speed || 10000,
            characters: options.characters || '01',
            ...options
        };

        this.init();
    }

    init() {
        if (!this.container) return;

        this.container.innerHTML = '';

        for (let i = 0; i < this.options.columns; i++) {
            const column = document.createElement('div');
            column.className = 'binary-column';
            column.style.left = `${(i / this.options.columns) * 100}%`;
            column.style.animationDuration = `${this.options.speed + Math.random() * 5000}ms`;
            column.style.animationDelay = `${Math.random() * 5000}ms`;

            // Generate random binary string
            let binary = '';
            const length = 50 + Math.floor(Math.random() * 50);
            for (let j = 0; j < length; j++) {
                binary += this.options.characters[Math.floor(Math.random() * this.options.characters.length)];
            }
            column.textContent = binary;

            this.container.appendChild(column);
        }
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize circuit reveal system
    new CircuitReveal();

    // Initialize scroll progress
    new CircuitScrollProgress();

    // Initialize binary rain if container exists
    const binaryContainer = document.querySelector('.binary-rain');
    if (binaryContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new BinaryRain(binaryContainer);
    }
});

// Export for manual initialization
window.CircuitReveal = CircuitReveal;
window.CircuitScrollProgress = CircuitScrollProgress;
window.BinaryRain = BinaryRain;
