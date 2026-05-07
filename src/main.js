// Main entry point
import './styles/globals.css';

// Import modules
import { initializeMobileMenu } from './modules/mobileMenu.js';
import { initializeSmoothScroll } from './modules/smoothScroll.js';
import { initializeRevealAnimations } from './modules/revealAnimations.js';
import { initializeModals } from './modules/modals.js';
import { initializeFAQ } from './modules/faq.js';
import { initializeCartSystem } from './modules/cart.js';
import { initializeApp } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Wholesale Jamaica Platform Initializing...');
  
  // Initialize all modules
  initializeApp();
  initializeMobileMenu();
  initializeSmoothScroll();
  initializeRevealAnimations();
  initializeModals();
  initializeFAQ();
  initializeCartSystem();
  
  console.log('✅ Platform Ready');
});

export { };
