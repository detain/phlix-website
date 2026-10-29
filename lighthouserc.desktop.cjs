// Lighthouse CI gate — DESKTOP pass. Same pages, same machinery as
// lighthouserc.cjs (read that file's header for the history); this file only
// carries the numbers that legitimately differ per form factor.
//
// MEASURED BASELINE (2026-10-29, 3 runs per URL, desktop preset):
//
//   /                 perf 92–93  a11y 90  bp 96  seo 91
//                     LCP 850–852ms  CLS 0.004  TBT 2–66ms  SI 2520–2527ms
//                     total transfer 2,783,640 B
//   /abstract-canvas/ perf 99  a11y 100  bp 100  seo 100
//                     LCP 601ms  CLS 0.064  TBT 0ms  SI 521ms
//                     total transfer 330,133 B
//
// The gallery's DESKTOP transfer (2.78 MB) is three times its mobile figure
// because the desktop form factor asks for larger image treatments — that is
// what the 3.1 MB bound pins, and it is pinned SEPARATELY from the mobile
// 1 MB bound precisely so neither can be used to excuse the other. Score
// floors stay identical to mobile (measured-worst minus ~5) on purpose: a
// leg that passes one form factor and not the other must red the preset that
// regressed, not the shared score floor's neighbor.

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node tools/serve-dist.mjs --port 8080',
      startServerReadyPattern: 'lhci-server ready',
      url: ['http://127.0.0.1:8080/', 'http://127.0.0.1:8080/abstract-canvas/'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.85 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.85 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 1000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.08 }],
        'total-blocking-time': ['error', { maxNumericValue: 80 }],
        'speed-index': ['error', { maxNumericValue: 2800 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 3100000 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci/reports' },
  },
};
