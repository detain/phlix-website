/**
 * Night Hawk Targeting System
 * Targeting reticle animations and missile lock effects
 */

(function() {
    'use strict';

    let targetReticles = [];
    let lockState = {};
    const LOCK_DURATION = 2000; // Time to acquire lock
    const UNLOCK_DURATION = 1000;

    // ============================================
    // INITIALIZATION
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        initTargetingSystem();
    });

    // ============================================
    // TARGETING SYSTEM INITIALIZATION
    // ============================================
    function initTargetingSystem() {
        // Find all targeting reticles
        targetReticles = document.querySelectorAll('.targeting-reticle');
        
        targetReticles.forEach(function(reticle, index) {
            lockState[index] = {
                locked: false,
                locking: false,
                element: reticle
            };

            // Add click handler for demo
            reticle.addEventListener('click', function() {
                toggleTargetLock(index);
            });

            // Set up mouseenter/mouseleave for hover effect
            reticle.addEventListener('mouseenter', function() {
                if (!lockState[index].locked && !lockState[index].locking) {
                    startLockAcquisition(index);
                }
            });

            reticle.addEventListener('mouseleave', function() {
                if (lockState[index].locking && !lockState[index].locked) {
                    cancelLockAcquisition(index);
                }
            });
        });

        // Initialize lock indicator
        initLockIndicator();
    }

    // ============================================
    // START LOCK ACQUISITION
    // ============================================
    function startLockAcquisition(index) {
        const reticle = targetReticles[index];
        if (!reticle) return;

        lockState[index].locking = true;
        reticle.classList.add('acquiring');

        // Animate lock ring
        const lockRing = reticle.querySelector('.reticle-ring');
        if (lockRing) {
            lockRing.style.strokeDasharray = '100';
            lockRing.style.strokeDashoffset = '100';
            lockRing.style.transition = `stroke-dashoffset ${LOCK_DURATION}ms linear`;
            
            // Force reflow
            lockRing.offsetHeight;
            
            lockRing.style.strokeDashoffset = '0';
        }

        // Show lock indicator
        showLockIndicator();

        // Complete lock after duration
        setTimeout(function() {
            if (lockState[index].locking) {
                completeLock(index);
            }
        }, LOCK_DURATION);
    }

    // ============================================
    // COMPLETE LOCK
    // ============================================
    function completeLock(index) {
        const reticle = targetReticles[index];
        if (!reticle) return;

        lockState[index].locked = true;
        lockState[index].locking = false;
        
        reticle.classList.remove('acquiring');
        reticle.classList.add('locked');

        // Update lock indicator
        updateLockIndicator(true);
    }

    // ============================================
    // CANCEL LOCK ACQUISITION
    // ============================================
    function cancelLockAcquisition(index) {
        const reticle = targetReticles[index];
        if (!reticle) return;

        lockState[index].locking = false;
        reticle.classList.remove('acquiring');

        // Reset lock ring
        const lockRing = reticle.querySelector('.reticle-ring');
        if (lockRing) {
            lockRing.style.transition = 'none';
            lockRing.style.strokeDashoffset = '100';
        }

        // Hide lock indicator
        hideLockIndicator();
    }

    // ============================================
    // TOGGLE TARGET LOCK
    // ============================================
    function toggleTargetLock(index) {
        if (lockState[index].locked) {
            unlockTarget(index);
        } else if (!lockState[index].locking) {
            startLockAcquisition(index);
        }
    }

    // ============================================
    // UNLOCK TARGET
    // ============================================
    function unlockTarget(index) {
        const reticle = targetReticles[index];
        if (!reticle) return;

        lockState[index].locked = false;
        lockState[index].locking = false;
        
        reticle.classList.remove('locked', 'acquiring');

        // Animate unlock
        const lockRing = reticle.querySelector('.reticle-ring');
        if (lockRing) {
            lockRing.style.transition = `stroke-dashoffset ${UNLOCK_DURATION}ms ease-out`;
            lockRing.style.strokeDashoffset = '100';
        }

        // Update lock indicator
        updateLockIndicator(false);
    }

    // ============================================
    // LOCK INDICATOR
    // ============================================
    function initLockIndicator() {
        // Create lock indicator if it doesn't exist
        if (!document.querySelector('.lock-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'lock-indicator';
            indicator.innerHTML = `
                <div class="lock-text">LOCKED</div>
                <div class="lock-subtext">TARGET ACQUIRED</div>
            `;
            document.body.appendChild(indicator);
        }
    }

    function showLockIndicator() {
        const indicator = document.querySelector('.lock-indicator');
        if (indicator) {
            indicator.classList.add('active');
        }
    }

    function hideLockIndicator() {
        const indicator = document.querySelector('.lock-indicator');
        if (indicator) {
            indicator.classList.remove('active');
        }
    }

    function updateLockIndicator(locked) {
        const indicator = document.querySelector('.lock-indicator');
        if (!indicator) return;

        if (locked) {
            indicator.classList.add('locked');
            indicator.querySelector('.lock-text').textContent = 'LOCKED';
            indicator.querySelector('.lock-subtext').textContent = 'TARGET ACQUIRED';
        } else {
            indicator.classList.remove('locked');
        }
    }

    // ============================================
    // TARGET PULSE ANIMATION
    // ============================================
    function initTargetPulse() {
        targetReticles.forEach(function(reticle) {
            if (!reticle.classList.contains('locked')) {
                reticle.style.animation = 'targetPulse 2s ease-in-out infinite';
            }
        });
    }

    // ============================================
    // MISSILE STATUS
    // ============================================
    function updateMissileStatus(missiles) {
        const missileRack = document.querySelector('.missile-rack');
        if (!missileRack) return;

        missileRack.innerHTML = '';
        
        for (let i = 0; i < missiles.total; i++) {
            const slot = document.createElement('div');
            slot.className = 'missile-slot';
            
            if (i < missiles.loaded) {
                slot.classList.add('loaded');
            } else if (i < missiles.fired) {
                slot.classList.add('fired');
            }
            
            missileRack.appendChild(slot);
        }
    }

    // ============================================
    // PUBLIC API
    // ============================================
    window.NightHawk = window.NightHawk || {};
    window.NightHawk.Targeting = {
        lock: function(index) { startLockAcquisition(index); },
        unlock: function(index) { unlockTarget(index); },
        toggle: function(index) { toggleTargetLock(index); },
        isLocked: function(index) { return lockState[index]?.locked || false; },
        updateMissileStatus: updateMissileStatus
    };

})();
