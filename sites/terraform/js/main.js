/**
 * Terraform Brand Kit — main.js
 * Mobile nav toggle, reduced motion, scroll reveals
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== MOBILE NAV TOGGLE =====
    function initMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (!navToggle || !navMenu) return;

        function toggleNav() {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isOpen);
            navMenu.classList.toggle('is-open', !isOpen);

            if (!isOpen) {
                navMenu.querySelector('a')?.focus();
            }
        }

        function closeNav() {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('is-open');
        }

        navToggle.addEventListener('click', toggleNav);

        navToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeNav();
                navToggle.focus();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeNav();
            }
        });

        // Close on focus trap escape
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeNav();
                navToggle.focus();
            }
        });
    }

    // ===== SCROLL REVEALS =====
    function initScrollReveals() {
        if (prefersReducedMotion) return;

        const revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card, .faq-item, .ecosystem-item');

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.style.opacity = '1');
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            revealObserver.observe(el);
        });
    }

    // ===== CODE BLOCK COPY BUTTON =====
    function initCodeBlocks() {
        const copyButtons = document.querySelectorAll('.code-block-copy');

        copyButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const codeBlock = button.closest('.code-block');
                const code = codeBlock.querySelector('code')?.textContent || '';

                try {
                    await navigator.clipboard.writeText(code);
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    button.textContent = 'Failed';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }
            });
        });
    }

    // ===== ACTIVE NAV LINK =====
    function initActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', () => {
        initMobileNav();
        initScrollReveals();
        initCodeBlocks();
        initActiveNav();
    });

    // Handle page visibility changes for animations
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            initScrollReveals();
        }
    });
})();
