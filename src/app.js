// Main app initialization
export function initializeApp() {
  console.log('📱 Initializing Wholesale Jamaica App');
  
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  if (token) {
    console.log('✅ User authenticated');
  }
  
  // Track page views (basic analytics)
  trackPageView();
  
  // Initialize service worker for offline support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('Service Worker registration failed:', err);
    });
  }
}

function trackPageView() {
  if (typeof window !== 'undefined') {
    const pageData = {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
    };
    
    // Send to analytics (later)
    console.log('📊 Page View:', pageData);
  }
}

export default { initializeApp };
