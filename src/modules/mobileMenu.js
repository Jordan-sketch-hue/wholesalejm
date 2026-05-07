// Mobile Menu Module
export function initializeMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    toggleMenu(!isOpen);
  });

  overlay?.addEventListener('click', () => {
    toggleMenu(false);
  });

  // Close menu when clicking links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  function toggleMenu(open) {
    if (open) {
      mobileMenu.classList.add('open');
      overlay?.classList.add('open');
      menuButton?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('open');
      overlay?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
}
