/**
 * Neural-Link Head Tags
 * Meta tags and link elements for head
 */

export const headTags = {
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: 'Brain-Computer Interface Experience - Neural-Link brand kit' },
    { name: 'theme-color', content: '#1A1A2E' },
    { name: 'color-scheme', content: 'dark' },
    { property: 'og:title', content: 'Neural-Link | Brain-Computer Interface' },
    { property: 'og:description', content: 'Direct brain-to-media interface aesthetic with neural network visualizations' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Neural-Link | Brain-Computer Interface' },
    { name: 'twitter:description', content: 'Experience direct brain-to-media interface technology' }
  ],
  links: [
    { rel: 'icon', type: 'image/svg+xml', href: 'img/favicon.svg' },
    { rel: 'manifest', href: 'manifest.json' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ],
  scripts: [
    { type: 'module', src: 'js/main.js' },
    { type: 'module', src: 'js/neural-network.js' },
    { type: 'module', src: 'js/synaptic-effects.js' },
    { type: 'module', src: 'js/memory-palace.js' }
  ]
};

export function injectHeadTags() {
  const head = document.head;

  headTags.meta.forEach(attrs => {
    const meta = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => {
      meta.setAttribute(key, value);
    });
    head.appendChild(meta);
  });

  headTags.links.forEach(attrs => {
    const link = document.createElement('link');
    Object.entries(attrs).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    head.appendChild(link);
  });
}

export default headTags;
