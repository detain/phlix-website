/**
 * Dyson Sphere - Navigation Module
 * Handles navigation functionality
 */

class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navLinks = document.querySelector('.nav-links');
    this.lastScrollY = 0;
    this.ticking = false;

    this.init();
  }

  init() {
    if (!this.nav) return;

    this.bindEvents();
    this.updateOnLoad();
  }

  bindEvents() {
    // Toggle button
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggle());
    }

    // Close on link click
    if (this.navLinks) {
      this.navLinks.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => this.close());
      });
    }

    // Scroll handling
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Keyboard handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  updateOnLoad() {
    this.onScroll();

    // Reveal navigation after a delay
    setTimeout(() => {
      this.nav.classList.add('revealed');
    }, 500);
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateScrollState();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateScrollState() {
    const currentScrollY = window.pageYOffset;

    // Add scrolled class
    if (currentScrollY > 50) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }

    // Hide/show based on scroll direction
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.nav.classList.add('hidden');
    } else {
      this.nav.classList.remove('hidden');
    }

    this.lastScrollY = currentScrollY;
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.navToggle) {
      this.navToggle.setAttribute('aria-expanded', 'true');
      this.navToggle.classList.add('active');
    }
    if (this.navLinks) {
      this.navLinks.classList.add('active');
    }
    this.nav.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.navToggle) {
      this.navToggle.setAttribute('aria-expanded', 'false');
      this.navToggle.classList.remove('active');
    }
    if (this.navLinks) {
      this.navLinks.classList.remove('active');
    }
    this.nav.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.navToggle && this.navToggle.getAttribute('aria-expanded') === 'true';
  }
}

window.Navigation = Navigation;
