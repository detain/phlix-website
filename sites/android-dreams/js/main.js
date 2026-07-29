/**
 * ==========================================================================
 * MAIN.JS — Android Dreams
 * Mobile nav toggle, reduced-motion, scroll reveals for Sentient AI theme
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ========================================================================== */

(function() {
    'use strict';

    /* ==================================================================
       REDUCED MOTION
       ================================================================== */

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }
    }

    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    /* ==================================================================
       MOBILE NAV TOGGLE
       ================================================================== */

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('is-open');

            if (!expanded) {
                navMenu.querySelector('.nav-menu__link')?.focus();
            }
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
            }
        });

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
                navToggle.focus();
            }
        });
    }

    /* ==================================================================
       SCROLL REVEALS
       ================================================================== */

    if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
        const revealElements = document.querySelectorAll(
            '.feature-card, .client-card, .download-card, .sequence-step, .faq-item'
        );

        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        revealElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            revealObserver.observe(el);
        });

        // Add CSS for revealed state
        const style = document.createElement('style');
        style.textContent = `
            .is-visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    /* ==================================================================
       MECHANICAL EYE TRACKING (hero only)
       ================================================================== */

    const mechanicalEye = document.querySelector('.mechanical-eye');
    const irisPupil = document.querySelector('.iris-pupil');

    if (mechanicalEye && irisPupil && !prefersReducedMotion.matches) {
        const eyeContainer = mechanicalEye.closest('.mechanical-eye-container') || mechanicalEye.parentElement;

        document.addEventListener('mousemove', function(e) {
            const rect = eyeContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const maxMove = 8;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX);

            const moveX = Math.min(Math.abs(deltaX) / distance * maxMove, maxMove) * Math.cos(angle);
            const moveY = Math.min(Math.abs(deltaY) / distance * maxMove, maxMove) * Math.sin(angle);

            irisPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        mechanicalEye.addEventListener('mouseenter', function() {
            irisPupil.style.transition = 'transform 0.1s ease-out';
            mechanicalEye.classList.add('is-active');
        });

        mechanicalEye.addEventListener('mouseleave', function() {
            irisPupil.style.transition = 'transform 0.3s ease-out';
            irisPupil.style.transform = 'translate(0, 0)';
            mechanicalEye.classList.remove('is-active');
        });
    }

    /* ==================================================================
       CIRCUIT REVEAL ON SCROLL
       ================================================================== */

    const circuitPaths = document.querySelectorAll('.circuit-path, .trace');

    if (circuitPaths.length && !prefersReducedMotion.matches && 'IntersectionObserver' in window) {
        circuitPaths.forEach(function(path) {
            const length = path.getTotalLength ? path.getTotalLength() : 100;
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        const circuitObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.strokeDashoffset = '0';
                    circuitObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        circuitPaths.forEach(function(path) {
            circuitObserver.observe(path);
        });
    }

    /* ==================================================================
       AVATAR EVOLUTION (track interactions)
       ================================================================== */

    const avatarSvg = document.querySelector('.ai-avatar .wireframe-svg');

    if (avatarSvg && !prefersReducedMotion.matches) {
        let interactionCount = 0;
        const maxInteractions = 10;

        function evolveAvatar() {
            if (interactionCount >= maxInteractions) return;
            interactionCount++;

            const wireframeGroup = avatarSvg.querySelector('.wireframe-group');
            if (!wireframeGroup) return;

            // Add more elements as complexity increases
            const _complexity = Math.min(interactionCount / maxInteractions, 1);
            if (interactionCount === 1) {
                const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                newLine.setAttribute('x1', '70');
                newLine.setAttribute('y1', '100');
                newLine.setAttribute('x2', '70');
                newLine.setAttribute('y2', '150');
                newLine.setAttribute('stroke', 'var(--color-accent)');
                newLine.setAttribute('stroke-width', '1');
                wireframeGroup.appendChild(newLine);
            }

            if (interactionCount === 3) {
                const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                newCircle.setAttribute('cx', '130');
                newCircle.setAttribute('cy', '100');
                newCircle.setAttribute('r', '3');
                newCircle.setAttribute('fill', 'var(--color-accent)');
                newCircle.classList.add('node-pulse');
                wireframeGroup.appendChild(newCircle);
            }

            if (interactionCount === 5) {
                const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                newPath.setAttribute('d', 'M70 150 Q100 180 130 150');
                newPath.setAttribute('fill', 'none');
                newPath.setAttribute('stroke', 'var(--color-accent)');
                newPath.setAttribute('stroke-width', '1');
                wireframeGroup.appendChild(newPath);
            }

            // Pulse effect on evolution
            avatarSvg.style.filter = 'drop-shadow(0 0 20px rgba(0, 206, 255, 0.5))';
            setTimeout(function() {
                avatarSvg.style.filter = '';
            }, 300);
        }

        // Track clicks anywhere
        document.addEventListener('click', evolveAvatar, { once: true });

        // Also evolve on scroll
        let scrollEvokeThrottle = null;
        window.addEventListener('scroll', function() {
            if (scrollEvokeThrottle) return;
            scrollEvokeThrottle = setTimeout(function() {
                scrollEvokeThrottle = null;
                if (Math.random() > 0.7) {
                    evolveAvatar();
                }
            }, 500);
        });
    }

    /* ==================================================================
       SERVO CLICK FEEDBACK
       ================================================================== */

    const servoElements = document.querySelectorAll('.btn-servo, .servo-element');

    if (servoElements.length && !prefersReducedMotion.matches) {
        servoElements.forEach(function(el) {
            el.addEventListener('click', function() {
                el.classList.add('is-clicked');
                setTimeout(function() {
                    el.classList.remove('is-clicked');
                }, 150);
            });
        });
    }

    /* ==================================================================
       STATS COUNTER ANIMATION
       ================================================================== */

    const statValues = document.querySelectorAll('.stat-value[data-count]');

    if (statValues.length && !prefersReducedMotion.matches && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.dataset.count);
                    const isFloat = target % 1 !== 0;
                    const duration = 2000;
                    const start = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = target * eased;

                        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    statsObserver.unobserve(el);
                }
            });
        }, {
            threshold: 0.5
        });

        statValues.forEach(function(el) {
            statsObserver.observe(el);
        });
    }

})();
