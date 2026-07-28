/**
 * Night Hawk Radar System
 * Animated radar with sweep and blip tracking
 */

(function() {
    'use strict';

    let radarElement = null;
    let sweepElement = null;
    let blipsContainer = null;
    let animationFrameId = null;
    let blips = [];
    let isRadarActive = false;

    const RADAR_DURATION = 3000; // Full sweep duration
    const BLIP_FADE_START = 0.7; // Start fading at 70% of sweep

    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        radarElement = document.getElementById('hudRadar');
        sweepElement = radarElement?.querySelector('.radar-sweep');
        blipsContainer = radarElement?.querySelector('.radar-blips');

        if (!radarElement) return;

        initRadar();
    });

    // ============================================
    // RADAR INITIALIZATION
    // ============================================
    function initRadar() {
        // Create initial blips
        createInitialBlips();
        
        // Start radar animation
        startRadar();

        // Visibility change handler - pause when not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                pauseRadar();
            } else {
                startRadar();
            }
        });
    }

    // ============================================
    // CREATE INITIAL BLIPS
    // ============================================
    function createInitialBlips() {
        const blipConfigs = [
            { angle: 45, distance: 30 },
            { angle: 120, distance: 50 },
            { angle: 220, distance: 25 },
            { angle: 300, distance: 60 },
            { angle: 180, distance: 40 }
        ];

        blipConfigs.forEach(function(config, index) {
            addBlip(config.angle, config.distance, index * 200);
        });
    }

    // ============================================
    // ADD BLIP TO RADAR
    // ============================================
    function addBlip(angle, distance, delay) {
        setTimeout(function() {
            if (!blipsContainer) return;

            const blip = document.createElement('div');
            blip.className = 'blip';
            blip.style.setProperty('--angle', angle + 'deg');
            blip.style.setProperty('--dist', distance + '%');
            
            // Set animation
            blip.style.animation = 'blipAppear 0.5s ease-out forwards, blipFade 4s ease-out forwards';
            
            blipsContainer.appendChild(blip);
            blips.push({
                element: blip,
                angle: angle,
                distance: distance,
                createdAt: performance.now()
            });

            // Remove blip after animation
            setTimeout(function() {
                if (blip.parentNode) {
                    blip.parentNode.removeChild(blip);
                }
                const index = blips.findIndex(function(b) { return b.element === blip; });
                if (index > -1) {
                    blips.splice(index, 1);
                }
            }, 4500);

        }, delay);
    }

    // ============================================
    // START RADAR ANIMATION
    // ============================================
    function startRadar() {
        if (isRadarActive) return;
        isRadarActive = true;

        // Check for reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            sweepElement.style.animation = 'none';
            return;
        }

        animateRadar();
    }

    // ============================================
    // PAUSE RADAR ANIMATION
    // ============================================
    function pauseRadar() {
        isRadarActive = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    // ============================================
    // RADAR ANIMATION LOOP
    // ============================================
    function animateRadar() {
        if (!isRadarActive) return;

        const currentTime = performance.now();
        const elapsed = currentTime % RADAR_DURATION;
        const progress = elapsed / RADAR_DURATION;
        const angle = progress * 360;

        // Update sweep position via CSS custom property
        sweepElement.style.setProperty('--sweep-angle', angle + 'deg');
        
        // Calculate opacity based on sweep position
        // Blips fade when sweep passes them
        blips.forEach(function(blip) {
            const blipAngle = blip.angle;
            const sweepAngle = angle;
            
            // Calculate angle difference (handling wraparound)
            let angleDiff = sweepAngle - blipAngle;
            if (angleDiff < 0) angleDiff += 360;
            
            // If sweep just passed this blip, start fading
            if (angleDiff < 30 && angleDiff > 0) {
                blip.element.style.opacity = Math.max(0.3, 1 - (angleDiff / 30));
            }
        });

        // Add random blips occasionally
        if (Math.random() < 0.02) {
            const randomAngle = Math.random() * 360;
            const randomDistance = 20 + Math.random() * 50;
            addBlip(randomAngle, randomDistance, 0);
        }

        animationFrameId = requestAnimationFrame(animateRadar);
    }

    // ============================================
    // MINII RADAR (for cockpit display)
    // ============================================
    function initMiniRadar() {
        const miniRadars = document.querySelectorAll('.radar-sweep-mini');
        
        miniRadars.forEach(function(radar) {
            const sweep = radar.querySelector('line');
            if (!sweep) return;

            let startTime = null;
            const duration = 2000;

            function animateMiniRadar(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const angle = progress * 360;

                sweep.style.transform = `rotate(${angle}deg)`;

                if (progress < 1 && isRadarActive) {
                    requestAnimationFrame(animateMiniRadar);
                }
            }

            // Check for reduced motion
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                requestAnimationFrame(animateMiniRadar);
            }
        });
    }

    // ============================================
    // PUBLIC API
    // ============================================
    window.NightHawk = window.NightHawk || {};
    window.NightHawk.Radar = {
        start: startRadar,
        pause: pauseRadar,
        addBlip: addBlip,
        isActive: function() { return isRadarActive; }
    };

})();
