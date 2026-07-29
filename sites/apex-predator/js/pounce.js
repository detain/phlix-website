/**
 * Apex Predator Pounce Transitions
 * Fast, aggressive motion for content reveals
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================
    // POUNCE IN ANIMATION
    // ============================================
    function pounceIn(element, options = {}) {
        if (prefersReducedMotion) {
            element.style.opacity = '1';
            return Promise.resolve();
        }

        const defaults = {
            delay: 0,
            duration: 500,
            direction: 'up' // up, down, left, right
        };

        const settings = { ...defaults, ...options };

        const transforms = {
            up: 'translateY(60px) scale(0.9)',
            down: 'translateY(-60px) scale(0.9)',
            left: 'translateX(-80px) scale(0.9)',
            right: 'translateX(80px) scale(0.9)'
        };

        element.style.opacity = '0';
        element.style.transform = transforms[settings.direction];
        element.style.transition = `opacity ${settings.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${settings.delay}ms, transform ${settings.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${settings.delay}ms`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        });

        return new Promise(resolve => {
            setTimeout(resolve, settings.duration + settings.delay);
        });
    }

    // ============================================
    // CLAW SLASH REVEAL
    // ============================================
    function clawSlashIn(element, options = {}) {
        if (prefersReducedMotion) {
            element.style.opacity = '1';
            element.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            return Promise.resolve();
        }

        const defaults = {
            delay: 0,
            duration: 600,
            direction: 'left' // left, right
        };

        const settings = { ...defaults, ...options };

        const clipPaths = {
            left: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            right: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
        };

        const endClip = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

        element.style.opacity = '1';
        element.style.clipPath = clipPaths[settings.direction];
        element.style.transition = `clip-path ${settings.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${settings.delay}ms`;

        requestAnimationFrame(() => {
            element.style.clipPath = endClip;
        });

        return new Promise(resolve => {
            setTimeout(resolve, settings.duration + settings.delay);
        });
    }

    // ============================================
    // STRIKE ANIMATION
    // ============================================
    function strikeIn(element, options = {}) {
        if (prefersReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotate(0)';
            return Promise.resolve();
        }

        const defaults = {
            delay: 0,
            duration: 400,
            direction: 'down' // down, across
        };

        const settings = { ...defaults, ...options };

        const transforms = {
            down: { start: 'translateY(-100%) rotate(-5deg)', end: 'translateY(0) rotate(0)' },
            across: { start: 'translateX(-100%) rotate(-15deg)', end: 'translateX(0) rotate(0)' }
        };

        element.style.opacity = '0';
        element.style.transform = transforms[settings.direction].start;
        element.style.transition = `opacity ${settings.duration * 0.5}ms ease ${settings.delay}ms, transform ${settings.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${settings.delay}ms`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = transforms[settings.direction].end;
        });

        return new Promise(resolve => {
            setTimeout(resolve, settings.duration + settings.delay);
        });
    }

    // ============================================
    // CAPTURED SNAP ANIMATION
    // ============================================
    function capturedSnap(element, options = {}) {
        if (prefersReducedMotion) {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = 'var(--ap-claw-glow)';
            return Promise.resolve();
        }

        const defaults = {
            delay: 0,
            duration: 500
        };

        const settings = { ...defaults, ...options };

        element.style.transform = 'scale(1.15)';
        element.style.boxShadow = '0 0 0 0 rgba(199, 0, 57, 0.8)';
        element.style.transition = `transform ${settings.duration * 0.6}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${settings.delay}ms, box-shadow ${settings.duration * 0.6}ms ease ${settings.delay}ms`;

        setTimeout(() => {
            element.style.transform = 'scale(0.95)';
        }, settings.duration * 0.15);

        setTimeout(() => {
            element.style.transform = 'scale(1.05)';
            element.style.boxShadow = '0 0 30px 10px rgba(199, 0, 57, 0.4)';
        }, settings.duration * 0.4);

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = 'var(--ap-claw-glow)';
        }, settings.duration);

        return new Promise(resolve => {
            setTimeout(resolve, settings.duration + settings.delay);
        });
    }

    // ============================================
    // PREY FREEZE EFFECT
    // ============================================
    function preyFreeze(element, options = {}) {
        if (prefersReducedMotion) return;

        const defaults = {
            duration: 600
        };

        const settings = { ...defaults, ...options };

        element.style.transition = `filter ${settings.duration}ms ease`;

        // Freeze frame effect
        setTimeout(() => {
            element.style.filter = 'brightness(0.5) saturate(0.5)';
        }, settings.duration * 0.25);

        setTimeout(() => {
            element.style.filter = 'brightness(0.3) saturate(0) brightness(1.5)';
        }, settings.duration * 0.5);

        setTimeout(() => {
            element.style.filter = 'brightness(1)';
        }, settings.duration);
    }

    // ============================================
    // TRACKING RETICLE LOCK
    // ============================================
    function trackingLock(element, options = {}) {
        if (prefersReducedMotion) {
            element.style.strokeDashoffset = '0';
            element.style.opacity = '1';
            return Promise.resolve();
        }

        const defaults = {
            delay: 0,
            duration: 800
        };

        const settings = { ...defaults, ...options };

        element.style.strokeDasharray = '100';
        element.style.strokeDashoffset = '100';
        element.style.opacity = '0';
        element.style.transition = `stroke-dashoffset ${settings.duration}ms ease ${settings.delay}ms, opacity 200ms ease ${settings.delay}ms`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.strokeDashoffset = '0';
        }, settings.delay);

        return new Promise(resolve => {
            setTimeout(resolve, settings.duration + settings.delay);
        });
    }

    // ============================================
    // EXPORT PUBLIC METHODS
    // ============================================
    window.apexPounce = {
        pounceIn,
        clawSlashIn,
        strikeIn,
        capturedSnap,
        preyFreeze,
        trackingLock,
        prefersReducedMotion
    };

})();
