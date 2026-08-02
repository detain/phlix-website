/* ============================================================================
   DEMO-MODE.JS — Demolition Crew
   Demo Mode toggle — destroys UI with rubble cascade, then rebuilds
   ============================================================================ */

class DemoMode {
  constructor(triggerSelector, panelSelector) {
    this.trigger = document.querySelector(triggerSelector);
    this.panel = document.querySelector(panelSelector);
    if (!this.trigger || !this.panel) return;

    this.isDestroyed = false;
    this._bindEvents();
  }

  _bindEvents() {
    this.trigger.addEventListener('click', () => this._toggle());
    // Keyboard accessible
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this._toggle();
      }
    });
  }

  async _toggle() {
    if (this.isDestroyed) {
      await this._rebuild();
    } else {
      await this._destroy();
    }
    this.isDestroyed = !this.isDestroyed;
  }

  async _destroy() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.trigger.classList.add('is-active');
    this.trigger.setAttribute('aria-pressed', 'true');
    this.trigger.querySelector('.demo-toggle__label').textContent = 'Demo Mode Active';

    // Create rubble debris
    this._spawnRubble();

    if (prefersReducedMotion) {
      this.panel.style.opacity = '0';
    } else {
      this.panel.classList.add('is-destroyed');
    }

    // Fire toast
    this._showToast('Demo Mode: UI Demolished. Click to rebuild.', 'warning');
  }

  async _rebuild() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.trigger.classList.remove('is-active');
    this.trigger.setAttribute('aria-pressed', 'false');
    this.trigger.querySelector('.demo-toggle__label').textContent = 'Demo Mode — Arm';

    // Clear rubble
    this._clearRubble();

    if (prefersReducedMotion) {
      this.panel.style.opacity = '1';
    } else {
      this.panel.classList.remove('is-destroyed');
      this.panel.classList.add('is-rebuilding');
      await this._wait(1200);
      this.panel.classList.remove('is-rebuilding');
    }

    this._showToast('UI Rebuilt and ready.', 'success');
  }

  _spawnRubble() {
    const panelRect = this.panel.getBoundingClientRect();
    this.rubbleItems = [];

    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        width: ${8 + Math.random() * 16}px;
        height: ${6 + Math.random() * 12}px;
        background: ${['#FF3838', '#FFD93D', '#6C5CE7', '#3D4449', '#4A5157'][Math.floor(Math.random() * 5)]};
        left: ${panelRect.left + Math.random() * panelRect.width}px;
        top: ${panelRect.top + Math.random() * panelRect.height}px;
        z-index: 9999;
        pointer-events: none;
        clip-path: polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px));
        animation: rubble-collapse ${0.6 + Math.random() * 0.6}s ease-in forwards;
        animation-delay: ${Math.random() * 0.2}s;
      `;
      document.body.appendChild(el);
      this.rubbleItems.push(el);
    }
  }

  _clearRubble() {
    if (!this.rubbleItems) return;
    this.rubbleItems.forEach((el) => el.remove());
    this.rubbleItems = [];
  }

  _showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span class="toast__message">${message}</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));

    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  _wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default DemoMode;
