/**
 * Neural-Link Service Worker Registration
 */

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: './'
      });

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Neural-Link: New version available');
            }
          });
        }
      });

      console.log('Neural-Link: Service Worker registered');
      return registration;
    } catch (error) {
      console.error('Neural-Link: Service Worker registration failed', error);
    }
  }
  return null;
}

export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    console.log('Neural-Link: Service Worker unregistered');
  }
}

export function getServiceWorkerStatus() {
  if (!('serviceWorker' in navigator)) {
    return { supported: false, registered: false, active: false };
  }

  return navigator.serviceWorker.ready.then(registration => {
    return {
      supported: true,
      registered: !!registration.active,
      active: !!registration.active
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
});

export default { registerServiceWorker, unregisterServiceWorker, getServiceWorkerStatus };
