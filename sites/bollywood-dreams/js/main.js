/* ==========================================================================
   MAIN.JS — Bollywood Dreams
   Mobile nav toggle, reduced-motion guard, scroll reveals
   ========================================================================== */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     REDUCED MOTION — gate all non-essential animation
     ----------------------------------------------------------------------- */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* -----------------------------------------------------------------------
     MOBILE NAV TOGGLE
     ----------------------------------------------------------------------- */

  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");
    const backdrop = document.querySelector(".nav-backdrop");

    if (!toggle || !menu) return;

    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
      // Focus first menu item
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
      document.body.style.overflow = "";
      toggle.focus();
    }

    toggle.addEventListener("click", function () {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener("click", closeMenu);
    }

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        closeMenu();
      }
    });

    // Close on outside click (anywhere outside nav)
    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("open")) return;
      const header = document.querySelector(".site-header");
      if (header && !header.contains(e.target)) {
        closeMenu();
      }
    });

    // Trap focus within open menu
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      const focusable = menu.querySelectorAll("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* -----------------------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver fade-ins
     ----------------------------------------------------------------------- */

  function initScrollReveal() {
    if (prefersReducedMotion) {
      // When reduced motion is preferred, make all reveal elements
      // immediately visible (skip animation)
      const revealEls = document.querySelectorAll(".reveal");
      revealEls.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      // Fallback: just show everything
      const revealEls = document.querySelectorAll(".reveal");
      revealEls.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1,
      },
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     FAQ ACCORDION (About page)
     ----------------------------------------------------------------------- */

  function initFaq() {
    if (!("details" in document.createElement("details"))) return;

    const faqItems = document.querySelectorAll(".faq-item details");

    faqItems.forEach(function (details) {
      details.addEventListener("toggle", function () {
        if (prefersReducedMotion) return;
        const summary = details.querySelector("summary");
        if (!summary) return;

        if (details.open) {
          summary.setAttribute("aria-expanded", "true");
        } else {
          summary.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
     ACTIVE NAV HIGHLIGHT — mark current page in nav
     ----------------------------------------------------------------------- */

  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href) return;

      // Check if current path ends with the href
      // For root (index.html), highlight only if exactly at root
      if (href === "./" || href === "index.html" || href === "/") {
        if (
          currentPath.endsWith("index.html") ||
          currentPath === "/" ||
          currentPath.endsWith("/")
        ) {
          link.setAttribute("aria-current", "page");
        }
      } else if (
        currentPath.endsWith(href) ||
        currentPath.includes(href + ".html")
      ) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* -----------------------------------------------------------------------
     TOAST NOTIFICATION SYSTEM (for brand-feel microcopy)
     ----------------------------------------------------------------------- */

  window.showToast = function (message, type) {
    type = type || "info";
    const container =
      document.querySelector(".toast-container") || createToastContainer();

    const toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");

    toast.textContent = message;
    container.appendChild(toast);

    // Auto-dismiss after 4s
    setTimeout(function () {
      toast.style.animation = "toastIn 300ms ease-in reverse both";
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4000);

    // Dismiss on click
    toast.addEventListener("click", function () {
      toast.style.animation = "toastIn 300ms ease-in reverse both";
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    });
  };

  function createToastContainer() {
    const container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("aria-label", "Notifications");
    document.body.appendChild(container);
    return container;
  }

  /* -----------------------------------------------------------------------
     SMOOTH SCROLL for anchor links
     ----------------------------------------------------------------------- */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").slice(1);
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });

        // Update focus for accessibility
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  /* -----------------------------------------------------------------------
     INIT
     ----------------------------------------------------------------------- */

  function init() {
    initNav();
    initScrollReveal();
    initFaq();
    initActiveNav();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
