/**
 * Neural-Link Preload
 * Resource Hints and Preloading
 */

export function setupPreloads() {
  const preloads = [
    { rel: 'preload', as: 'style', href: 'css/styles.css' },
    { rel: 'preload', as: 'style', href: 'css/animations.css' },
    { rel: 'preload', as: 'style', href: 'css/patterns.css' },
    { rel: 'preload', as: 'script', href: 'js/main.js' },
    { rel: 'preload', as: 'image', href: 'img/favicon.svg' }
  ];

  preloads.forEach(attrs => {
    const link = document.createElement('link');
    link.rel = attrs.rel;
    link.as = attrs.as;
    link.href = attrs.href;
    if (attrs.as === 'script') {
      link.type = 'module';
    }
    document.head.appendChild(link);
  });
}

export function setupDnsPrefetch() {
  const domains = [];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupPreloads();
  setupDnsPrefetch();
});

export default { setupPreloads, setupDnsPrefetch };
