/**
 * Apex Predator Main JavaScript
 * Top-of-food-chain streaming site interactions
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initNavigation();
        initScrollReveal();
        initCapturedNotification();
        initPredatorMascot();
    }

    // ============================================
    // NAVIGATION
    // ============================================
    function initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        const mainNav = document.getElementById('mainNav');

        if (!navToggle || !navLinks) return;

        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.setAttribute(
                'aria-expanded',
                navLinks.classList.contains('active')
            );
        });

        // Close on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Shadow on scroll
        if (mainNav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    mainNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
                } else {
                    mainNav.style.boxShadow = 'none';
                }
            }, { passive: true });
        }
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        if (!reveals.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after reveal (one-time animation)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        reveals.forEach(el => observer.observe(el));
    }

    // ============================================
    // CAPTURED NOTIFICATION
    // ============================================
    function initCapturedNotification() {
        const notification = document.getElementById('capturedNotification');
        if (!notification) return;

        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    function showCapturedNotification(title) {
        const notification = document.getElementById('capturedNotification');
        const notificationTitle = document.getElementById('capturedTitle');

        if (!notification) return;

        if (notificationTitle && title) {
            notificationTitle.textContent = title;
        }

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    // Make globally available
    window.showCapturedNotification = showCapturedNotification;

    // ============================================
    // PREDATOR MASCOT (SLASHER)
    // ============================================
    function initPredatorMascot() {
        const mascot = document.getElementById('predatorMascot');
        if (!mascot) return;

        let clickCount = 0;
        let hoverTimer;

        mascot.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 5) {
                triggerEasterEgg(mascot);
                clickCount = 0;
            }
        });

        mascot.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                triggerHoverFocus(mascot);
            }, 2000);
        });

        mascot.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
        });

        // Initialize idle animation state
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            mascot.classList.add('idle-breath');
        }
    }

    function triggerEasterEgg(mascot) {
        mascot.classList.add('easter-egg');
        setTimeout(() => {
            mascot.classList.remove('easter-egg');
        }, 1500);
    }

    function triggerHoverFocus(mascot) {
        mascot.classList.add('tracking');
        setTimeout(() => {
            mascot.classList.remove('tracking');
        }, 2000);
    }

    // ============================================
    // STAT COUNTER ANIMATION
    // ============================================
    function animateStatCounters() {
        const statValues = document.querySelectorAll('.stat-value[data-target]');

        if (!statValues.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statValues.forEach(el => observer.observe(el));
    }

    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const duration = 2000;
        const start = performance.now();
        const isFloat = target % 1 !== 0;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = target * easeProgress;

            el.textContent = isFloat ? current.toFixed(2) : Math.floor(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = isFloat ? target.toFixed(2) : target;
            }
        }

        requestAnimationFrame(update);
    }

    // Initialize stat counters when DOM ready
    setTimeout(animateStatCounters, 500);

    // ============================================
    // PREY CARD INTERACTIONS
    // ============================================
    function initPreyCards() {
        const preyCards = document.querySelectorAll('.prey-card');

        preyCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('prey-freeze');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('prey-freeze');
            });

            card.addEventListener('click', () => {
                const title = card.querySelector('.prey-title');
                if (title && window.showCapturedNotification) {
                    showCapturedNotification(title.textContent + ' CAPTURED');
                }
            });
        });
    }

    initPreyCards();

    // ============================================
    // FILTER BUTTONS
    // ============================================
    function initFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const preyCards = document.querySelectorAll('.prey-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter cards
                preyCards.forEach(card => {
                    const status = card.dataset.status;
                    if (filter === 'all' || status === filter) {
                        card.style.display = '';
                        setTimeout(() => card.classList.add('visible'), 50);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    initFilterButtons();

    // ============================================
    // FORM HANDLING
    // ============================================
    function initForms() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.textContent : '';

                if (submitBtn) {
                    submitBtn.textContent = 'TRANSMITTING...';
                    submitBtn.disabled = true;
                }

                // Simulate form submission
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.textContent = 'TRANSMITTED';
                    }

                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        });
    }

    initForms();

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        // ESC closes mobile nav
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const navToggle = document.getElementById('navToggle');
            if (navLinks && navToggle) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

})();
