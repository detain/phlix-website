/**
 * Night Hawk Stealth Mode
 * Toggles "stealth mode" which dims the UI to near-black
 */

(function() {
    'use strict';

    const STEALTH_CLASS = 'stealth-active';
    const STEALTH_DURATION = 5000; // 5 seconds until auto-activation
    const DIM_OPACITY = 0.3;

    let stealthToggle = null;
    let stealthIndicator = null;
    let autoStealthTimer = null;
    let isStealthActive = false;

    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        stealthToggle = document.getElementById('stealthToggle');
        stealthIndicator = document.querySelector('.stealth-indicator');
        
        if (!stealthToggle) return;

        initStealthMode();
        initAutoStealth();
        initKeyboardShortcut();
    });

    // ============================================
    // STEALTH MODE INITIALIZATION
    // ============================================
    function initStealthMode() {
        // Set CSS variable for dim opacity
        document.documentElement.style.setProperty('--stealth-opacity', DIM_OPACITY);

        // Toggle click handler
        stealthToggle.addEventListener('click', function() {
            toggleStealth();
        });

        // Touch support for mobile
        stealthToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleStealth();
        });
    }

    // ============================================
    // TOGGLE STEALTH MODE
    // ============================================
    function toggleStealth() {
        if (isStealthActive) {
            deactivateStealth();
        } else {
            activateStealth();
        }
    }

    // ============================================
    // ACTIVATE STEALTH MODE
    // ============================================
    function activateStealth() {
        isStealthActive = true;
        document.body.classList.add(STEALTH_CLASS);
        stealthToggle.classList.add('active');
        
        // Show stealth indicator briefly
        if (stealthIndicator) {
            stealthIndicator.classList.add('active');
            setTimeout(function() {
                stealthIndicator.classList.remove('active');
            }, 1500);
        }

        // Reset auto-stealth timer
        resetAutoStealthTimer();

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('stealthModeChanged', { 
            detail: { active: true }
        }));
    }

    // ============================================
    // DEACTIVATE STEALTH MODE
    // ============================================
    function deactivateStealth() {
        isStealthActive = false;
        document.body.classList.remove(STEALTH_CLASS);
        stealthToggle.classList.remove('active');

        // Reset auto-stealth timer
        resetAutoStealthTimer();

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('stealthModeChanged', { 
            detail: { active: false }
        }));
    }

    // ============================================
    // AUTO STEALTH (activates after inactivity)
    // ============================================
    function initAutoStealth() {
        // Start the auto-stealth timer on load
        resetAutoStealthTimer();

        // Reset timer on user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(function(event) {
            document.addEventListener(event, function() {
                if (!isStealthActive) {
                    resetAutoStealthTimer();
                }
            }, { passive: true });
        });
    }

    function resetAutoStealthTimer() {
        if (autoStealthTimer) {
            clearTimeout(autoStealthTimer);
        }
        
        // Don't auto-activate if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        autoStealthTimer = setTimeout(function() {
            activateStealth();
        }, STEALTH_DURATION);
    }

    // ============================================
    // KEYBOARD SHORTCUT (Escape to toggle)
    // ============================================
    function initKeyboardShortcut() {
        document.addEventListener('keydown', function(e) {
            // Escape key toggles stealth mode
            if (e.key === 'Escape' && e.shiftKey) {
                e.preventDefault();
                toggleStealth();
            }
        });
    }

    // ============================================
    // PUBLIC API
    // ============================================
    window.NightHawk = window.NightHawk || {};
    window.NightHawk.StealthMode = {
        activate: activateStealth,
        deactivate: deactivateStealth,
        toggle: toggleStealth,
        isActive: function() { return isStealthActive; }
    };

})();
