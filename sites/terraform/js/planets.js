/**
 * Terraform Planets Animation
 * Manages planetary and atmospheric animations
 */
(function() {
    'use strict';

    const Planets = {
        elements: {
            layers: null,
            atmosphere: null,
            craters: null,
            domes: null,
            drones: null
        },

        init: function() {
            this.cacheElements();
            this.setupAnimations();
        },

        cacheElements: function() {
            this.elements.layers = document.querySelectorAll('.planet-layer');
            this.elements.atmosphere = document.querySelector('.planet-atmosphere');
            this.elements.craters = document.querySelectorAll('.crater');
            this.elements.domes = document.querySelectorAll('.dome');
            this.elements.drones = document.querySelectorAll('.drone');
        },

        setupAnimations: function() {
            // Respect reduced motion preferences
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.disableAnimations();
                return;
            }

            this.setupParallax();
            this.setupScrollReveals();
        },

        disableAnimations: function() {
            const allAnimated = document.querySelectorAll('*');
            allAnimated.forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
            });
        },

        setupParallax: function() {
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.handleParallax();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        },

        handleParallax: function() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Parallax for atmospheric elements
            if (this.elements.domes) {
                this.elements.domes.forEach((dome, i) => {
                    const speed = 0.1 + (i * 0.05);
                    const yOffset = scrollY * speed;
                    dome.style.transform = `translateY(${yOffset}px)`;
                });
            }

            if (this.elements.drones) {
                this.elements.drones.forEach((drone, i) => {
                    const speed = 0.15 + (i * 0.03);
                    const yOffset = scrollY * speed;
                    const xOffset = Math.sin(scrollY * 0.01 + i) * 20;
                    drone.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                });
            }

            // Hero planet parallax
            const heroPlanet = document.querySelector('.hero-planet');
            if (heroPlanet && scrollY < windowHeight) {
                const progress = scrollY / windowHeight;
                heroPlanet.style.transform = `translateY(calc(-50% + ${scrollY * 0.3}px))`;
                heroPlanet.style.opacity = 1 - (progress * 0.5);
            }
        },

        setupScrollReveals: function() {
            const sections = document.querySelectorAll('section');

            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(40px)';
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(section);
            });

            // Mark hero as revealed immediately
            const hero = document.querySelector('.hero-section');
            if (hero) {
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }
        },

        // Trigger a terraform pulse effect
        triggerPulse: function() {
            const pulse = document.querySelector('.terraform-pulse');
            if (!pulse) return;

            pulse.classList.add('pulsing');
            setTimeout(() => pulse.classList.remove('pulsing'), 2000);
        },

        // Update crater formations
        updateCraters: function(intensity) {
            if (!this.elements.craters) return;

            this.elements.craters.forEach((crater) => {
                const scale = 0.8 + (intensity * 0.4);
                const rotation = intensity * 180;
                crater.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
            });
        }
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Planets.init());
    } else {
        Planets.init();
    }

    // Expose globally
    window.TerraformPlanets = Planets;
})();
