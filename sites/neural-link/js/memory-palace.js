/**
 * Neural-Link Memory Palace
 * Spatial Navigation for Collections
 */

class MemoryPalace {
  constructor() {
    this.container = document.querySelector('.memory-palace-container');
    this.rooms = document.querySelectorAll('.palace-room');
    this.prevBtn = document.querySelector('.palace-nav-btn.prev');
    this.nextBtn = document.querySelector('.palace-nav-btn.next');
    this.currentRoomDisplay = document.querySelector('.current-room');

    this.currentIndex = 0;
    this.totalRooms = this.rooms.length;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (!this.container || this.rooms.length === 0) return;

    this.updateRoomDisplay();
    this.setupNavigation();
    this.setupRoomHover();
    this.setupKeyboardNav();
    this.setupTouchNav();
  }

  updateRoomDisplay() {
    this.rooms.forEach((room, index) => {
      room.classList.remove('active');
      if (index === this.currentIndex) {
        room.classList.add('active');
      }
    });

    if (this.currentRoomDisplay) {
      this.currentRoomDisplay.textContent = this.currentIndex + 1;
    }

    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.totalRooms - 1;
    }

    this.repositionRooms();
  }

  repositionRooms() {
    const offset = this.currentIndex * (100 / 3) * -1;
    const containerWidth = this.container.offsetWidth;

    if (this.reducedMotion) {
      this.rooms.forEach(room => {
        room.style.transform = '';
      });
      return;
    }

    this.rooms.forEach((room, index) => {
      const relativeIndex = index - this.currentIndex;
      const translateX = relativeIndex * 110;
      const translateZ = -Math.abs(relativeIndex) * 30;
      const rotateY = relativeIndex * 5 * -1;
      const opacity = relativeIndex === 0 ? 1 : 0.6;

      room.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      room.style.transform = `
        translateX(${translateX}%)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
      `;
      room.style.opacity = opacity;
    });
  }

  setupNavigation() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.updateRoomDisplay();
        }
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.totalRooms - 1) {
          this.currentIndex++;
          this.updateRoomDisplay();
        }
      });
    }
  }

  setupRoomHover() {
    this.rooms.forEach((room, index) => {
      room.addEventListener('click', () => {
        if (index !== this.currentIndex) {
          this.currentIndex = index;
          this.updateRoomDisplay();
        }
        this.highlightSelectedRoom(room);
      });

      if (!this.reducedMotion) {
        room.addEventListener('mouseenter', () => {
          if (index !== this.currentIndex) {
            room.style.transform = room.style.transform.replace(/translateZ\([^)]*\)/, '') + ' translateZ(20px)';
            room.style.opacity = '1';
          }
        });

        room.addEventListener('mouseleave', () => {
          if (index !== this.currentIndex) {
            const relativeIndex = index - this.currentIndex;
            const translateX = relativeIndex * 110;
            const translateZ = -Math.abs(relativeIndex) * 30;
            const rotateY = relativeIndex * 5 * -1;

            room.style.transform = `
              translateX(${translateX}%)
              translateZ(${translateZ}px)
              rotateY(${rotateY}deg)
            `;
            room.style.opacity = relativeIndex === 0 ? 1 : 0.6;
          }
        });
      }
    });
  }

  highlightSelectedRoom(room) {
    if (this.reducedMotion) return;

    room.animate([
      { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0, 255, 255, 0)' },
      { transform: 'scale(1.05)', boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' },
      { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0, 255, 255, 0)' }
    ], {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
  }

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (!this.container || !this.isElementInViewport(this.container)) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.updateRoomDisplay();
        }
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.currentIndex < this.totalRooms - 1) {
          this.currentIndex++;
          this.updateRoomDisplay();
        }
      }
    });
  }

  setupTouchNav() {
    if (!this.container) return;

    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    this.handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) < swipeThreshold) return;

      if (diff > 0 && this.currentIndex < this.totalRooms - 1) {
        this.currentIndex++;
        this.updateRoomDisplay();
      } else if (diff < 0 && this.currentIndex > 0) {
        this.currentIndex--;
        this.updateRoomDisplay();
      }
    };
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  getMemoryData() {
    return Array.from(this.rooms).map((room, index) => ({
      id: index + 1,
      label: room.querySelector('.room-label')?.textContent || `Room ${index + 1}`,
      title: room.querySelector('.memory-title')?.textContent || '',
      isActive: index === this.currentIndex
    }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.memoryPalace = new MemoryPalace();
});

export default MemoryPalace;
