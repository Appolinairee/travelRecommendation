(function loadNav(){
  'use strict';
  const containerId = 'site-nav';
  const fragmentPath = 'assets/navbar.html';

  function insertNav(html) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = html;

    // Replace feather icons in the newly injected HTML
    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    // Initialize navigation module if present
    if (typeof NavigationModuleInit === 'function') {
      try { NavigationModuleInit(); } catch(e){ /* ignore */ }
    }

    // If the separate navigation script expects DOM-ready, call it
    if (window.navigationInit && typeof window.navigationInit === 'function') {
      try { window.navigationInit(); } catch(e){}
    }
  }

  fetch(fragmentPath, {cache: 'no-cache'})
    .then(resp => {
      if (!resp.ok) throw new Error('Failed to fetch nav fragment');
      return resp.text();
    })
    .then(insertNav)
    .catch(err => {
      console.error('load_nav.js error:', err);
    });
})();
