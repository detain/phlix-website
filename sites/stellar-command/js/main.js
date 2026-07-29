/**
 * Stellar Command - Main JavaScript
 * Core initialization and utilities
 */

(function() {
  'use strict';

  // Wait for all modules to be ready
  document.addEventListener('DOMContentLoaded', () => {
    initMain();
  });

  function initMain() {
    // Add screen-reader only class for accessibility
    addScreenReaderOnlyStyles();
    
    // Initialize all components
    initComponents();
    
    // Set up global handlers
    setupGlobalHandlers();
    
    // Log initialization
    console.log('Stellar Command Bridge Software v3.7.2 initialized');
  }

  function addScreenReaderOnlyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    document.head.appendChild(style);
  }

  function initComponents() {
    // Viewscreen frame effect
    const viewframes = document.querySelectorAll('.viewscreen-frame');
    viewframes.forEach(frame => {
      frame.setAttribute('role', 'region');
      frame.setAttribute('aria-label', 'Main view screen display');
    });

    // Channel cards
    const channelCards = document.querySelectorAll('.channel-card');
    channelCards.forEach(card => {
      card.setAttribute('role', 'article');
      card.setAttribute('tabindex', '0');
    });

    // Fleet table
    const fleetTable = document.querySelector('.fleet-table');
    if (fleetTable) {
      fleetTable.setAttribute('role', 'grid');
      fleetTable.setAttribute('aria-label', 'Fleet status grid');
    }

    // Transmission cards
    const transmissions = document.querySelectorAll('.transmission-card');
    transmissions.forEach(trans => {
      trans.setAttribute('role', 'article');
    });

    // Review cards
    const reviews = document.querySelectorAll('.review-card');
    reviews.forEach(review => {
      review.setAttribute('role', 'article');
    });
  }

  function setupGlobalHandlers() {
    // Handle navigation with keyboard
    document.addEventListener('keydown', (e) => {
      // Tab navigation feedback
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });

    // Prevent accidental navigation
    window.addEventListener('beforeunload', (e) => {
      // Only warn if there are unsaved changes
      // For this demo, we don't have unsaved changes
      return;
    });
  }

  // Global utility functions
  window.StellarCommand = {
    showNotification: (message, type = 'info') => {
      const container = document.getElementById('notification-container');
      if (!container) return;
      
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
        <span class="beacon small"></span>
        <span>${message}</span>
      `;
      
      container.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'notification-in 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    },
    
    navigateTo: (section) => {
      const link = document.querySelector(`[data-section="${section}"]`);
      if (link) {
        link.click();
      }
    },
    
    getVersion: () => '3.7.2'
  };
})();
