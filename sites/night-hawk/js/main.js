/**
 * Night Hawk Main JavaScript
 * Core functionality for the stealth fighter brand experience
 */

(function() {
    'use strict';

    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollEffects();
        initCounterAnimations();
        initSmoothScroll();
        updateHUDTime();
        updateHUDCoordinates();
        
        // Start interval updates
        setInterval(updateHUDTime, 1000);
        setInterval(updateHUDCoordinates, 5000);
    });

    // ============================================
    // NAVIGATION
    // ============================================
    function initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        const mainNav = document.getElementById('mainNav');

        if (!navToggle || !navLinks) return;

        // Mobile menu toggle
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Scroll effect for navigation
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Set active nav link based on current page
        const currentPath = window.location.pathname;
        navLinks.querySelectorAll('.nav-link').forEach(function(link) {
            const href = link.getAttribute('href');
            if (currentPath.endsWith(href) || currentPath.endsWith(href + '/')) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // SCROLL EFFECTS
    // ============================================
    function initScrollEffects() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with will-animate class
        document.querySelectorAll('.will-animate').forEach(function(el) {
            observer.observe(el);
        });

        // Feature cards animation
        document.querySelectorAll('.feature-card').forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.transitionDelay = (index * 0.1) + 's';
            observer.observe(card);
        });

        // Service cards animation
        document.querySelectorAll('.service-card').forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.transitionDelay = (index * 0.15) + 's';
            observer.observe(card);
        });
    }

    // ============================================
    // COUNTER ANIMATIONS
    // ============================================
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-item .stat-value[data-target]');
        
        if (counters.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(function(counter) {
            counter.style.opacity = '0';
            counter.style.transform = 'translateY(20px)';
            counter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;
        const isFloat = target % 1 !== 0;

        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            let currentValue;
            if (isFloat) {
                currentValue = (startValue + (target - startValue) * easeOut).toFixed(2);
            } else {
                currentValue = Math.floor(startValue + (target - startValue) * easeOut);
            }
            
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = isFloat ? target.toFixed(2) : target;
            }
        }

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = isFloat ? target.toFixed(2) : target;
            return;
        }

        requestAnimationFrame(update);
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.getElementById('mainNav')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // HUD TIME UPDATE
    // ============================================
    function updateHUDTime() {
        const timerEl = document.getElementById('hudTimer');
        if (!timerEl) return;

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        timerEl.textContent = hours + ':' + minutes + ':' + seconds;
    }

    // ============================================
    // HUD COORDINATES UPDATE
    // ============================================
    function updateHUDCoordinates() {
        const coordLat = document.getElementById('coordLat');
        const coordLon = document.getElementById('coordLon');
        
        if (!coordLat || !coordLon) return;

        // Simulated coordinates (in production, use Geolocation API)
        const baseLat = 37.7749;
        const baseLon = -122.4194;
        
        // Add slight random variation for realism
        const latVariation = (Math.random() - 0.5) * 0.001;
        const lonVariation = (Math.random() - 0.5) * 0.001;
        
        coordLat.textContent = (baseLat + latVariation).toFixed(4);
        coordLon.textContent = (baseLon + lonVariation).toFixed(4);
    }

    // ============================================
    // UTILITY: Check reduced motion preference
    // ============================================
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // ============================================
    // EXPORT PUBLIC API
    // ============================================
    window.NightHawk = {
        prefersReducedMotion: prefersReducedMotion
    };

})();
