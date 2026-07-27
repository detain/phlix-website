/**
 * main.js — Library Amber Brand Kit
 * Vanilla JS: nav toggle, reduced motion, scroll reveals, mascot, easter eggs, seasonal gate
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ======================================================================
     SEASONAL ACTIVATION — live-js date gate
     ====================================================================== */
  function applySeasonalVariant() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();
    const md = month * 100 + day; // e.g. March 20 = 320

    let season = null;

    // Winter Reading Season: 11-15 .. 01-15
    if (md >= 1115 || md <= 115) {
      season = 'winter';
    }
    // Autumn Catalogue: 09-22 .. 11-14
    else if (md >= 922 && md <= 1114) {
      season = 'autumn';
    }
    // Spring Collection Opening: 03-20 .. 05-31
    else if (md >= 320 && md <= 531) {
      season = 'spring';
    }

    if (season) {
      document.documentElement.setAttribute('data-season', season);
    }
  }

  applySeasonalVariant();

  /* ======================================================================
     REDUCED MOTION — listen for changes (not just read once at load)
     ====================================================================== */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleMotionChange(e) {
    document.documentElement.classList.toggle('reduce-motion', e.matches);
  }

  motionQuery.addEventListener('change', handleMotionChange);
  handleMotionChange(motionQuery); // Apply on load

  /* ======================================================================
     MOBILE NAV TOGGLE
     ====================================================================== */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    function openMenu() {
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
      navToggle.setAttribute('aria-label', 'Close navigation');
      // Prevent body scroll when menu open
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-label', 'Toggle navigation');
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  /* ======================================================================
     SCROLL REVEAL — IntersectionObserver fade-ins
     ====================================================================== */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0 && !motionQuery.matches) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ======================================================================
     MASCOT — The Librarian
     Fixed bottom-right; in-flow below 768px
     Idle animation: adjusts spectacles, turns page — disabled under reduced-motion
     Easter interactions: click:5 = bow + tip spectacles; hover-hold:2s = gesture
     Dismiss persists via localStorage
     ====================================================================== */
  var mascotContainer = document.querySelector('.mascot');
  var mascotBody = document.querySelector('.mascot-body');
  var mascotTip = document.querySelector('.mascot-tip');
  var mascotDismiss = document.querySelector('.mascot-dismiss');

  // Check if dismissed persistent state
  var mascotDismissed = false;
  try {
    mascotDismissed = localStorage.getItem('librarian-dismissed') === 'true';
  } catch (e) {
    // localStorage not available — ignore
  }

  var mascotPage = window.location.pathname.replace(/\/[^\/]*$/, '') || '/';
  var mascotDismissedPage = null;
  try {
    mascotDismissedPage = localStorage.getItem('librarian-dismissed-page');
  } catch (e) {}

  function isMascotPageAllowed() {
    // The Librarian appears on Home, Features, and Download only
    var allowed = ['/', '/index.html', '/features.html', '/download.html'];
    var path = window.location.pathname.replace(/\/[^\/]*$/, '');
    return allowed.indexOf(path) !== -1 || allowed.indexOf(window.location.pathname) !== -1;
  }

  function showMascot() {
    if (!mascotContainer) return;
    if (mascotDismissed && mascotDismissedPage === mascotPage) return;
    if (!isMascotPageAllowed()) return;
    if (motionQuery.matches) return; // Reduced motion: The Librarian just sits
    mascotContainer.style.display = 'flex';
  }

  function hideMascot() {
    if (!mascotContainer) return;
    mascotContainer.style.display = 'none';
    try {
      localStorage.setItem('librarian-dismissed', 'true');
      localStorage.setItem('librarian-dismissed-page', mascotPage);
    } catch (e) {}
  }

  // Show tip at specific section
  function showMascotTip(text) {
    if (!mascotTip || !text) return;
    mascotTip.textContent = text;
    mascotTip.classList.add('is-visible');
  }

  function hideMascotTip() {
    if (!mascotTip) return;
    mascotTip.classList.remove('is-visible');
  }

  // Idle animation: slowly bob the owl
  var mascotIdleTimeout = null;
  var mascotIsIdle = true;

  function startMascotIdle() {
    if (!mascotBody || motionQuery.matches) return;
    mascotBody.style.transition = 'transform 0.4s ease';
    var dir = 1;
    mascotIdleTimeout = setInterval(function () {
      if (!mascotIsIdle || motionQuery.matches) return;
      var current = parseFloat(mascotBody.style.transform.replace(/[^0-9.-]/g, '')) || 0;
      var next = current + dir * 1.5;
      if (Math.abs(next) > 3) dir *= -1;
      mascotBody.style.transform = 'translateY(' + next + 'px)';
    }, 800);
  }

  function stopMascotIdle() {
    if (mascotIdleTimeout) {
      clearInterval(mascotIdleTimeout);
      mascotIdleTimeout = null;
    }
    if (mascotBody) {
      mascotBody.style.transform = '';
    }
  }

  // Click:5 easter egg — The Librarian bows
  var mascotClickCount = 0;
  var mascotClickTimeout = null;

  if (mascotBody) {
    mascotBody.addEventListener('click', function () {
      if (motionQuery.matches) return;
      mascotClickCount++;

      if (mascotClickTimeout) clearTimeout(mascotClickTimeout);
      mascotClickTimeout = setTimeout(function () {
        mascotClickCount = 0;
      }, 2000);

      if (mascotClickCount >= 5) {
        mascotClickCount = 0;
        // Bow animation: rotate -10deg then back
        mascotBody.style.transition = 'transform 0.4s ease-out';
        mascotBody.style.transform = 'rotate(-10deg) translateY(-4px)';
        showMascotTip('Persistent curiosity is the mark of a true collector.');
        setTimeout(function () {
          mascotBody.style.transform = '';
          setTimeout(hideMascotTip, 2500);
        }, 1200);
      }
    });

    // Hover-hold:2s easter interaction — gesture with knowing nod
    var hoverTimer = null;
    mascotBody.addEventListener('mouseenter', function () {
      if (motionQuery.matches) return;
      hoverTimer = setTimeout(function () {
        mascotIsIdle = false;
        if (mascotBody) {
          mascotBody.style.transition = 'transform 0.3s ease';
          mascotBody.style.transform = 'translateY(-3px) rotate(3deg)';
        }
        var currentSection = getCurrentSection();
        if (currentSection === 'features') {
          showMascotTip('Each volume on this shelf serves a purpose. Browse freely.');
        } else if (currentSection === 'home') {
          showMascotTip('Every collection begins with a single volume. Start here.');
        } else if (currentSection === 'download') {
          showMascotTip(
            "This snippet builds the foundation. I'll wait while you prepare the space.",
          );
        }
        setTimeout(function () {
          if (mascotBody) {
            mascotBody.style.transform = '';
          }
          mascotIsIdle = true;
          hideMascotTip();
        }, 3000);
      }, 2000);
    });

    mascotBody.addEventListener('mouseleave', function () {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      if (!mascotIsIdle) {
        mascotIsIdle = true;
        if (mascotBody) {
          mascotBody.style.transform = '';
        }
      }
    });
  }

  // Dismiss button
  if (mascotDismiss) {
    mascotDismiss.addEventListener('click', function (e) {
      e.stopPropagation();
      hideMascot();
    });
  }

  function getCurrentSection() {
    var path = window.location.pathname;
    if (path.indexOf('features') !== -1) return 'features';
    if (path.indexOf('download') !== -1) return 'download';
    return 'home';
  }

  // Tip on section entry (home page only)
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    var homeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !motionQuery.matches) {
            var id = entry.target.id;
            if (id === 'hero' || id === 'the-library-opens') {
              showMascotTip('Every collection begins with a single volume. Start here.');
            } else if (id === 'features-overview') {
              showMascotTip(
                'SyncPlay keeps every seat on the same frame — no matter the distance.',
              );
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    var heroSection = document.querySelector('#hero, #the-library-opens');
    var featuresSection = document.querySelector('.features-overview');
    if (heroSection) homeObserver.observe(heroSection);
    if (featuresSection) homeObserver.observe(featuresSection);
  }

  // Show mascot after a short delay
  setTimeout(showMascot, 1200);
  startMascotIdle();

  /* ======================================================================
     EASTER EGG — logo-clicks:5
     Appears on all pages (not just home)
     ====================================================================== */
  var logoClickCount = 0;
  var logoClickTimeout = null;
  var logoEl = document.querySelector('.nav-logo');

  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      // Don't interfere with navigation
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      logoClickCount++;
      if (logoClickTimeout) clearTimeout(logoClickTimeout);
      logoClickTimeout = setTimeout(function () {
        logoClickCount = 0;
      }, 2000);

      if (logoClickCount >= 5) {
        logoClickCount = 0;
        // Brief amber flash on the page
        var flash = document.createElement('div');
        flash.style.cssText =
          'position:fixed;inset:0;background:rgba(200,134,26,0.08);pointer-events:none;z-index:9999;transition:opacity 0.6s ease';
        document.body.appendChild(flash);
        setTimeout(function () {
          flash.style.opacity = '0';
          setTimeout(function () {
            return flash.remove();
          }, 700);
        }, 300);
      }
    });
  }

  /* ======================================================================
     EASTER EGG — typed-word:collection
     Disabled while focus is in an input/textarea/contenteditable
     Does NOT preventDefault (trap from §19)
     Exit on Esc
     ====================================================================== */
  var typedBuffer = '';
  var typedTimeout = null;
  var typedHighlightEl = null;

  function checkTypedWord(e) {
    // Skip if focus is in input/textarea/contenteditable
    var tag = document.activeElement.tagName.toLowerCase();
    if (
      tag === 'input' ||
      tag === 'textarea' ||
      document.activeElement.contentEditable === 'true'
    ) {
      return;
    }

    var key = e.key;
    if (key.length !== 1) return; // Ignore modifiers, arrows, etc.

    typedBuffer += key.toLowerCase();

    // Keep buffer at reasonable length
    if (typedBuffer.length > 20) {
      typedBuffer = typedBuffer.slice(-20);
    }

    // Check for 'collection'
    var idx = typedBuffer.indexOf('collection');
    if (idx !== -1) {
      // Highlight the word "collection" wherever it appears on the page
      if (!typedHighlightEl) {
        // Find all text nodes containing "collection"
        highlightCollectionWord();
        setTimeout(clearTypedHighlight, 4000);
      }
    }

    // Clear buffer after inactivity
    if (typedTimeout) clearTimeout(typedTimeout);
    typedTimeout = setTimeout(function () {
      typedBuffer = '';
    }, 1500);
  }

  function highlightCollectionWord() {
    // Create a highlight span
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var nodesToReplace = [];
    while (walker.nextNode()) {
      var node = walker.currentNode;
      if (node.nodeValue && node.nodeValue.toLowerCase().indexOf('collection') !== -1) {
        nodesToReplace.push(node);
      }
    }

    nodesToReplace.forEach(function (node) {
      var val = node.nodeValue;
      var regex = /collection/gi;
      var span = document.createElement('span');
      var remaining = val;
      var fragment = document.createDocumentFragment();

      var match;
      var lastIndex = 0;
      var re = /collection/gi;
      while ((match = re.exec(val)) !== null) {
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(val.slice(lastIndex, match.index)));
        }
        var highlightSpan = document.createElement('span');
        highlightSpan.className = 'typed-highlight';
        highlightSpan.textContent = match[0];
        fragment.appendChild(highlightSpan);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < val.length) {
        fragment.appendChild(document.createTextNode(val.slice(lastIndex)));
      }

      if (node.parentNode) {
        node.parentNode.replaceChild(fragment, node);
      }
    });

    typedHighlightEl = document.querySelector('.typed-highlight');
  }

  function clearTypedHighlight() {
    var highlights = document.querySelectorAll('.typed-highlight');
    highlights.forEach(function (el) {
      var parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
      }
    });
    typedHighlightEl = null;
  }

  document.addEventListener('keydown', checkTypedWord);

  // Exit on Escape: clear typed buffer and any active highlight
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      typedBuffer = '';
      clearTypedHighlight();
    }
  });

  /* ======================================================================
     DIORAMA PARALLAX — hero_experience spec
     Gentle parallax on scroll and pointer movement
     Falls back to static hero on reduced-motion or no-JS
     ====================================================================== */
  var heroSection = document.querySelector('.hero');
  var lampGlow = document.querySelector('.lamp-glow--hero');

  if (heroSection && !motionQuery.matches) {
    var ticking = false;

    function updateParallax() {
      var scrollY = window.scrollY;
      var heroHeight = heroSection.offsetHeight;
      var heroRect = heroSection.getBoundingClientRect();

      // Only apply when hero is visible
      if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
        ticking = false;
        return;
      }

      // Scroll-based parallax: lamp glow position shifts with scroll
      if (lampGlow) {
        var scrollFrac = Math.min(scrollY / heroHeight, 1);
        var opacity = Math.max(0.3, 1 - scrollFrac * 0.6);
        var scale = 1 + scrollFrac * 0.08;
        lampGlow.style.opacity = opacity;
        lampGlow.style.transform = 'scale(' + scale + ') translateY(' + scrollFrac * 20 + 'px)';
      }

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true },
    );

    // Pointer-based parallax for lamp glow
    document.addEventListener('mousemove', function (e) {
      if (motionQuery.matches) return;
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx; // -1 to 1
      var dy = (e.clientY - cy) / cy;

      if (lampGlow) {
        lampGlow.style.transform = 'translate(' + dx * 12 + 'px, ' + dy * 8 + 'px)';
      }
    });
  }

  /* ======================================================================
     CHAPTERED SCROLL — brass rule separators between sections
     Soft vignette fade as sections scroll into frame
     ====================================================================== */
  if (!motionQuery.matches) {
    var sections = document.querySelectorAll('section[id]');
    var brassDivider = document.querySelector('.brass-divider');

    if (sections.length > 0) {
      var scrollObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('section-visible');
            }
          });
        },
        { threshold: 0.15 },
      );

      sections.forEach(function (section) {
        scrollObserver.observe(section);
      });
    }
  }

  /* ======================================================================
     COPY BUTTON — code blocks
     ====================================================================== */
  var copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('.code-block').querySelector('pre');
      if (!pre) return;
      var text = pre.textContent || '';
      navigator.clipboard.writeText(text).then(
        function () {
          var original = btn.textContent;
          btn.textContent = 'Copied';
          btn.style.color = 'var(--color-success)';
          setTimeout(function () {
            btn.textContent = original;
            btn.style.color = '';
          }, 1800);
        },
        function () {
          // Clipboard API not available — silently fail
        },
      );
    });
  });

  /* ======================================================================
     FAQ ACCORDION
     ====================================================================== */
  var faqButtons = document.querySelectorAll('.faq-list button');
  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all others (accordion behavior)
      faqButtons.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
      });
      // Toggle this one
      btn.setAttribute('aria-expanded', String(!isExpanded));
    });
  });
})();
