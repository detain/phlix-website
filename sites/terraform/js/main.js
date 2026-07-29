/**
 * Terraform Main JS
 * Brand Kit Website — Planetary Terraforming Theme
 */
/* global TerraformKit */
(function() {
    'use strict';

    const Terraform = {
        state: {
            scrollY: 0,
            reducedMotion: false,
            initialized: false
        },

        init: function() {
            // Check for reduced motion preference
            this.state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Listen for preference changes
            window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
                this.state.reducedMotion = e.matches;
                this.handleMotionPreference();
            });

            this.setupNavigation();
            this.setupScrollEffects();
            this.setupSmoothScroll();
            this.setupRevealAnimations();
            this.injectBrandKit();

            this.state.initialized = true;
        },

        setupNavigation: function() {
            const nav = document.querySelector('.terraform-nav');
            if (!nav) return;

            // Nav background opacity on scroll
            const updateNav = () => {
                const scrollY = window.scrollY;
                const opacity = Math.min(scrollY / 300, 1);
                nav.style.background = `rgba(13, 27, 42, ${0.5 + opacity * 0.5})`;
            };

            window.addEventListener('scroll', () => {
                requestAnimationFrame(updateNav);
            }, { passive: true });
        },

        setupScrollEffects: function() {
            // Global scroll-based effects
            window.addEventListener('scroll', () => {
                this.state.scrollY = window.scrollY;
            }, { passive: true });
        },

        setupSmoothScroll: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const navHeight = document.querySelector('.terraform-nav')?.offsetHeight || 0;
                        const targetPosition = target.offsetTop - navHeight - 20;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: this.state.reducedMotion ? 'auto' : 'smooth'
                        });
                    }
                });
            });
        },

        setupRevealAnimations: function() {
            // Intersection Observer for reveal animations
            const revealElements = document.querySelectorAll(
                '.color-card, .drone-card, .dome-card, .motion-card, .type-card'
            );

            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Stagger animation
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);

                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach((el) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        },

        handleMotionPreference: function() {
            if (this.state.reducedMotion) {
                document.body.classList.add('reduced-motion');
                // Disable particle animations
                if (window.TerraformParticles) {
                    window.TerraformParticles.destroy();
                }
            } else {
                document.body.classList.remove('reduced-motion');
                // Re-enable particles
                if (window.TerraformParticles) {
                    window.TerraformParticles.init();
                }
            }
        },

        injectBrandKit: function() {
            // Make brand kit available globally
            if (window.TerraformKit) {
                // Inject CSS variables into document
                const styleEl = document.createElement('style');
                styleEl.id = 'terraform-brand-vars';
                styleEl.textContent = TerraformKit.cssVariables();
                document.head.appendChild(styleEl);
            }
        },

        // Utility: Get current section
        getCurrentSection: function() {
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            return current;
        },

        // Utility: Scroll progress
        getScrollProgress: function() {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            return (winScroll / height) * 100;
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Terraform.init());
    } else {
        Terraform.init();
    }

    // Expose globally
    window.Terraform = Terraform;
})();
