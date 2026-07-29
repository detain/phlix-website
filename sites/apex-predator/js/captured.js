/**
 * Apex Predator Captured Animation
 * The "captured" animation when content is added to library
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================
    // CAPTURED STATE MANAGEMENT
    // ============================================
    class CapturedManager {
        constructor() {
            this.capturedItems = new Set();
            this.loadState();
        }

        loadState() {
            try {
                const saved = localStorage.getItem('apexPredator_captured');
                if (saved) {
                    this.capturedItems = new Set(JSON.parse(saved));
                }
            } catch (e) {
                // localStorage not available
            }
        }

        saveState() {
            try {
                localStorage.setItem('apexPredator_captured', JSON.stringify([...this.capturedItems]));
            } catch (e) {
                // localStorage not available
            }
        }

        capture(itemId, itemData = {}) {
            this.capturedItems.add(itemId);
            this.saveState();
            this.showCapturedAnimation(itemData);
        }

        release(itemId) {
            this.capturedItems.delete(itemId);
            this.saveState();
        }

        isCaptured(itemId) {
            return this.capturedItems.has(itemId);
        }

        getAll() {
            return [...this.capturedItems];
        }

        showCapturedAnimation(itemData = {}) {
            const notification = this.createCapturedNotification(itemData);
            document.body.appendChild(notification);

            requestAnimationFrame(() => {
                notification.classList.add('show');
                this.triggerBloodSplatter(notification);
            });

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 400);
            }, 3500);
        }

        createCapturedNotification(itemData) {
            const notification = document.createElement('div');
            notification.className = 'captured-notification';

            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '2');
            icon.innerHTML = '<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>';

            const text = document.createElement('span');
            text.className = 'captured-text';
            text.id = 'capturedTitle';
            text.textContent = itemData.title ? `${itemData.title.toUpperCase()} CAPTURED` : 'PREY CAPTURED';

            notification.appendChild(icon);
            notification.appendChild(text);

            return notification;
        }

        triggerBloodSplatter(notification) {
            if (prefersReducedMotion) return;

            const splatter = document.createElement('div');
            splatter.className = 'captured-splatter';
            splatter.innerHTML = `
                <span class="splatter-dot" style="--x: 20%; --y: 30%;"></span>
                <span class="splatter-dot" style="--x: 70%; --y: 20%;"></span>
                <span class="splatter-dot" style="--x: 80%; --y: 60%;"></span>
                <span class="splatter-dot" style="--x: 30%; --y: 70%;"></span>
            `;

            splatter.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
            `;

            notification.appendChild(splatter);

            setTimeout(() => splatter.remove(), 1000);
        }
    }

    // ============================================
    // CAPTURED CARD BEHAVIOR
    // ============================================
    class CapturedCard {
        constructor(element, itemId, itemData = {}) {
            this.element = element;
            this.itemId = itemId;
            this.itemData = itemData;
            this.manager = window.capturedManager;

            this.init();
        }

        init() {
            if (this.manager && this.manager.isCaptured(this.itemId)) {
                this.setCapturedState();
            }

            this.element.addEventListener('click', () => this.handleCapture());

            // Prey freeze on hover
            this.element.addEventListener('mouseenter', () => {
                if (!this.manager || !this.manager.isCaptured(this.itemId)) {
                    this.element.classList.add('prey-freeze');
                }
            });

            this.element.addEventListener('mouseleave', () => {
                this.element.classList.remove('prey-freeze');
            });
        }

        handleCapture() {
            if (this.manager && !this.manager.isCaptured(this.itemId)) {
                this.manager.capture(this.itemId, this.itemData);
                this.setCapturedState();
                this.triggerPounce();
            }
        }

        setCapturedState() {
            this.element.classList.add('captured');
            this.element.dataset.status = 'captured';

            const statusEl = this.element.querySelector('.prey-status');
            if (statusEl) {
                statusEl.className = 'prey-status captured';
                statusEl.textContent = 'CAPTURED';
            }
        }

        triggerPounce() {
            if (prefersReducedMotion) return;

            this.element.style.animation = 'none';
            requestAnimationFrame(() => {
                this.element.style.animation = 'capturedSnap 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                setTimeout(() => {
                    this.element.style.animation = '';
                }, 500);
            });
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        // Initialize global manager
        window.capturedManager = new CapturedManager();

        // Initialize captured cards
        document.querySelectorAll('.prey-card').forEach(card => {
            const itemId = card.dataset.id || card.querySelector('.prey-title')?.textContent || `item-${Date.now()}`;
            new CapturedCard(card, itemId);
        });

        // Global captured notification function
        window.showCapturedNotification = function(title) {
            window.capturedManager.showCapturedAnimation({ title });
        };
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
