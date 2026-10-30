// error-shim.js — the root 404.html path-sniffing shim.
//
// Extracted verbatim from the inline <script> island in root 404.html
// (review website__writer R-WEBSITE-06): script-src 'self' allows only
// file scripts. The build rewrites the template's reference to a
// SITE_URL-absolute path because GitHub Pages serves this document for
// arbitrary deep URLs — a relative src would resolve against the
// requested path, not the publish root. The manifest it reads
// (window.__PHLIX_404__) is likewise a build-emitted file.

(function () {
  var data = typeof window !== 'undefined' ? window.__PHLIX_404__ : null;
  if (!data || !data.kits) return;

  var base = String(data.base || '').replace(/\/+$/, '');
  var path = location.pathname;

  // Strip the Pages base path (project sites live under /<repo>/), then
  // take the first remaining segment — that's the candidate kit slug.
  if (base && path.indexOf(base + '/') === 0) path = path.slice(base.length);
  else if (base && path === base) path = '/';
  var slug = path.replace(/^\/+/, '').split('/')[0];
  var kit = Object.prototype.hasOwnProperty.call(data.kits, slug) ? data.kits[slug] : null;

  if (!kit) {
    showGeneric(null, slug);
    return;
  }

  // The kit ships its own 404 → fetch it and take over the document. A
  // <base> is injected so the kit's relative css/img/js keep resolving
  // against its own directory, no matter how deep the missing path was.
  if (kit.has404) {
    fetch(base + '/' + slug + '/404.html', { credentials: 'omit' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (html) {
        var withBase = injectBase(html, base + '/' + slug + '/');
        document.open();
        document.write(withBase);
        document.close();
      })
      .catch(function () {
        // Network/asset failure — fall back rather than show nothing.
        showGeneric(kit, slug);
      });
    return;
  }

  showGeneric(kit, slug);

  /** Put a <base> right after <head> so relative URLs resolve to the kit dir. */
  function injectBase(html, href) {
    var tag = '<base href="' + href + '">';
    if (/<head[^>]*>/i.test(html))
      return html.replace(/<head[^>]*>/i, function (m) {
        return m + tag;
      });
    return tag + html;
  }

  /**
   * Generic 404, tinted with the kit's accent and offering that kit's
   * own recovery links. Used for kits without an authored 404 page and
   * when the fetch above fails.
   */
  function showGeneric(k, requested) {
    var shell = document.getElementById('shell');
    if (!shell) return;
    // Many kits' primaries are near-black or dark navy/green, which
    // would vanish against this dark shell — only tint when the accent
    // is genuinely legible, and pick the button label colour to match.
    if (k && k.accent && isLegible(k.accent)) {
      document.documentElement.style.setProperty('--accent', k.accent);
      var on = accentTextColor(k.accent);
      if (on) document.documentElement.style.setProperty('--accent-on', on);
      // No label colour clears 4.5:1 on this accent → outline the CTA.
      else document.documentElement.classList.add('accent-outline');
    }

    var LABELS = { home: 'Home', features: 'Features', download: 'Download' };
    var HREFS = { home: '', features: 'features.html', download: 'download.html' };
    var items = [];

    if (k) {
      var wanted =
        Array.isArray(k.recovery_links) && k.recovery_links.length
          ? k.recovery_links
          : ['home'];
      for (var i = 0; i < wanted.length; i++) {
        var key = wanted[i];
        if (!Object.prototype.hasOwnProperty.call(HREFS, key)) continue;
        items.push(
          '<li><a' +
            (i === 0 ? ' class="primary"' : '') +
            ' href="' +
            esc(base + '/' + requested + '/' + HREFS[key]) +
            '">' +
            esc(LABELS[key]) +
            '</a></li>',
        );
      }
    }
    items.push(
      '<li><a' +
        (items.length ? '' : ' class="primary"') +
        ' href="' +
        esc(base + '/') +
        '">Brand kit gallery</a></li>',
    );

    shell.innerHTML =
      '<p class="code">404</p>' +
      (k ? '<p class="kit">' + esc(k.name || requested) + '</p>' : '') +
      '<h1>This page doesn’t exist</h1>' +
      '<p>' +
      (k
        ? 'That page isn’t part of this brand kit’s site.'
        : 'The address may be mistyped, or the page may have moved.') +
      '</p>' +
      '<span class="path">' +
      esc(location.pathname) +
      '</span>' +
      '<ul class="links">' +
      items.join('') +
      '</ul>';
  }

  /**
   * WCAG contrast of #rrggbb against the shell background, gated at 3:1
   * (the large-text / UI-component floor). A ratio — not raw luminance —
   * because saturated reds read fine on near-black despite scoring low on
   * luminance alone, while dark navies do not.
   */
  function isLegible(hex) {
    var fg = wcagLuminance(hex);
    var bg = wcagLuminance('#0c0c0f'); // must track --bg-deep
    if (fg === null || bg === null) return false;
    var lo = Math.min(fg, bg);
    var hi = Math.max(fg, bg);
    return (hi + 0.05) / (lo + 0.05) >= 3;
  }

  /**
   * Label colour for text sitting ON the accent (the primary button):
   * whichever of the shell's dark/light tones contrasts better, but only
   * if it clears 4.5:1 — the button label is normal-size text. Returns
   * null when neither works, which vetoes tinting altogether.
   */
  function accentTextColor(hex) {
    var a = wcagLuminance(hex);
    if (a === null) return null;
    var candidates = ['#0c0c0f', '#f4f4f6']; // --bg-deep, --text
    var best = null;
    var bestRatio = 0;
    for (var i = 0; i < candidates.length; i++) {
      var t = wcagLuminance(candidates[i]);
      var ratio = (Math.max(a, t) + 0.05) / (Math.min(a, t) + 0.05);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = candidates[i];
      }
    }
    return bestRatio >= 4.5 ? best : null;
  }

  /** Relative luminance per WCAG 2.x (sRGB linearised), or null if unparseable. */
  function wcagLuminance(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return null;
    var n = parseInt(m[1], 16);
    var chan = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) {
      var s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
