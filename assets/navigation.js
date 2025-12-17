/**
 * ============================================
 * NAVIGATION MODULE
 * ============================================
 * Handles navigation interactions and active state management
 */

(function NavigationModule() {
  'use strict';

  // Configuration
  const CONFIG = {
    activeClass: 'navbar__nav-link--active',
    navLinkSelector: '.navbar__nav-link',
  };

  /**
   * Initialize navigation module
   */
  function init() {
    initializeFeatherIcons();
    setActiveNavigationLink();
    setupNavigationEvents();
  }

  /**
   * Initialize Feather Icons
   */
  function initializeFeatherIcons() {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }

  /**
   * Set the active navigation link based on current page
   */
  function setActiveNavigationLink() {
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll(CONFIG.navLinkSelector);

    navLinks.forEach(link => {
      const linkPage = getPageNameFromUrl(link.getAttribute('href'));
      
      if (linkPage === currentPage) {
        link.classList.add(CONFIG.activeClass);
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove(CONFIG.activeClass);
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Get current page name from URL
   * @returns {string} Current page name
   */
  function getCurrentPageName() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop() || 'index.html';
    return pageName === '' ? 'index.html' : pageName;
  }

  /**
   * Extract page name from URL
   * @param {string} url - URL to parse
   * @returns {string} Page name
   */
  function getPageNameFromUrl(url) {
    if (!url) return '';
    return url.split('/').pop() || 'index.html';
  }

  /**
   * Setup navigation event listeners
   */
  function setupNavigationEvents() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
  }

  /**
   * Handle anchor link clicks with smooth scrolling
   * @param {Event} event - Click event
   */
  function handleAnchorClick(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
