/**
 * @copyright 2025 Phlix. All rights reserved.
 * @license MPL-2.0 (server/hub), MIT (clients/plugins)
 */

(function () {
  "use strict";

  /* ===========================
     Mobile Navigation Toggle
     =========================== */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        navToggle.focus();
      }
    });

    // Trap focus in mobile menu
    navMenu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;

      const focusable = navMenu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ===========================
     Reduced Motion Detection
     =========================== */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function handleReducedMotion() {
    document.documentElement.classList.toggle(
      "reduce-motion",
      prefersReducedMotion.matches
    );
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener("change", handleReducedMotion);

  /* ===========================
     Scroll Reveal (Intersection Observer)
     =========================== */
  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll(
      ".feature-card, .client-card, .download-card, .ecosystem-item, .hub-node, .feature-detail"
    );

    if (revealElements.length > 0 && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in-up");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      revealElements.forEach(function (el) {
        el.style.opacity = "0";
        revealObserver.observe(el);
      });
    }
  }

  /* ===========================
     Copy Code Blocks
     =========================== */
  document.querySelectorAll(".code-block").forEach(function (block) {
    const copyBtn = block.querySelector(".copy-btn");
    const code = block.querySelector("code");

    if (copyBtn && code) {
      copyBtn.addEventListener("click", function () {
        navigator.clipboard
          .writeText(code.textContent)
          .then(function () {
            copyBtn.textContent = "Copied!";
            setTimeout(function () {
              copyBtn.textContent = "Copy";
            }, 2000);
          })
          .catch(function () {
            copyBtn.textContent = "Failed";
            setTimeout(function () {
              copyBtn.textContent = "Copy";
            }, 2000);
          });
      });
    }
  });

  /* ===========================
     FAQ Accordion (for non-native support)
     =========================== */
  if (!("details" in document.createElement("details"))) {
    // Fallback for browsers without native <details> support
    document.querySelectorAll(".faq-list details").forEach(function (details) {
      const summary = details.querySelector("summary");
      if (summary) {
        summary.setAttribute("role", "button");
        summary.setAttribute("aria-expanded", String(details.open));

        summary.addEventListener("click", function (e) {
          e.preventDefault();
          details.open = !details.open;
          summary.setAttribute("aria-expanded", String(details.open));
        });
      }
    });
  }

  /* ===========================
     Smooth Scroll for Anchor Links
     =========================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
          block: "start",
        });

        // Update URL without jumping
        history.pushState(null, "", targetId);
      }
    });
  });
})();
