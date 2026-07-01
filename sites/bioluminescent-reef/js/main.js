/**
 * main.js — Bioluminescent Reef
 * Vanilla JS, no dependencies, defer-loaded.
 * Responsibilities: mobile nav toggle, reduced-motion, scroll reveals
 */

(function () {
  "use strict";

  /* ─── Mobile nav toggle ─────────────────────────────────────────────── */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ─── Reduced motion ─────────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ─── Scroll reveals (progressive enhancement) ──────────────────────── */
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length > 0) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  /* ─── Hero biolume pulse (ambient animation) ─────────────────────────── */
  if (!prefersReducedMotion) {
    document.documentElement.style.setProperty(
      "--biolume-opacity",
      "0"
    );
    let phase = 0;
    const biolumeEl = document.querySelector(".hero .hero-inner");
    if (biolumeEl) {
      setInterval(function () {
        phase = (phase + 1) % 100;
        const opacity = 0.6 + 0.4 * Math.sin(phase * 0.04);
        biolumeEl.style.opacity = String(opacity);
      }, 80);
    }
  }
})();
