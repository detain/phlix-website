/**
 * Android Dreams - Main JavaScript
 * Initializes all systems and provides global enhancements
 */

(function() {
    'use strict';

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    function init() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            initScrollAnimations();
            initStatsCounter();
            initSequenceTimeline();
        }

        initSmoothScroll();
        initFocusStates();
        initResponsiveAdjustments();

        // Mark as initialized
        document.body.classList.add('initialized');
    }

    // ==========================================================================
    // SCROLL ANIMATIONS
    // ==========================================================================

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
        );

        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Unobserve after animation (one-time animation)
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    // ==========================================================================
    // STATS COUNTER ANIMATION
    // ==========================================================================

    function initStatsCounter() {
        const statValues = document.querySelectorAll('.stat-value[data-count]');

        if (statValues.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statValues.forEach(stat => observer.observe(stat));
    }

    function animateCounter(element) {
        const target = parseFloat(element.dataset.count);
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = startValue + (target - startValue) * easeOut;

            if (Number.isInteger(target)) {
                element.textContent = Math.floor(currentValue).toLocaleString();
            } else {
                element.textContent = currentValue.toFixed(1);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ==========================================================================
    // SEQUENCE TIMELINE ANIMATION
    // ==========================================================================

    function initSequenceTimeline() {
        const steps = document.querySelectorAll('.sequence-step');

        if (steps.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Add delay based on step number
                        const stepNum = parseInt(entry.target.dataset.step) || 1;
                        entry.target.style.transitionDelay = `${(stepNum - 1) * 200}ms`;
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        steps.forEach(step => observer.observe(step));
    }

    // ==========================================================================
    // SMOOTH SCROLL
    // ==========================================================================

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update URL without triggering scroll
                    history.pushState(null, '', href);
                }
            });
        });
    }

    // ==========================================================================
    // FOCUS STATES
    // ==========================================================================

    function initFocusStates() {
        // Add visible focus for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    // ==========================================================================
    // RESPONSIVE ADJUSTMENTS
    // ==========================================================================

    function initResponsiveAdjustments() {
        // Adjust hero eye size based on viewport
        function adjustHeroEye() {
            const eye = document.querySelector('.mechanical-eye-container');
            const avatar = document.querySelector('.ai-avatar');

            if (window.innerWidth < 768) {
                if (eye) eye.style.display = 'none';
                if (avatar) avatar.style.opacity = '0.05';
            } else {
                if (eye) eye.style.display = '';
                if (avatar) avatar.style.opacity = '';
            }
        }

        adjustHeroEye();
        window.addEventListener('resize', adjustHeroEye);
    }

    // ==========================================================================
    // PAGE LOAD ANIMATION
    // ==========================================================================

    function pageLoadAnimation() {
        const hero = document.querySelector('.hero');
        const content = document.querySelector('.hero-content');

        if (!hero || !content) return;

        // Start with hidden content
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px)';

        // Reveal after a short delay
        setTimeout(() => {
            content.style.transition = 'opacity 800ms ease-out, transform 800ms ease-out';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 300);
    }

    // ==========================================================================
    // UTILITY FUNCTIONS
    // ==========================================================================

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // ==========================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================================================

    function enhanceAccessibility() {
        // Skip link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'sr-only';
        skipLink.textContent = 'Skip to main content';
        document.body.prepend(skipLink);

        // ARIA labels for icon-only buttons
        document.querySelectorAll('.btn-icon').forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                const text = btn.textContent.trim();
                if (text) {
                    btn.setAttribute('aria-label', text);
                }
            }
        });
    }

    // ==========================================================================
    // GLOBAL EXPORTS
    // ==========================================================================

    window.AndroidDreams = {
        version: '2.4.1',
        initialized: false
    };

    // ==========================================================================
    // DOM READY
    // ==========================================================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            pageLoadAnimation();
            enhanceAccessibility();
            window.AndroidDreams.initialized = true;
        });
    } else {
        init();
        pageLoadAnimation();
        enhanceAccessibility();
        window.AndroidDreams.initialized = true;
    }

})();
