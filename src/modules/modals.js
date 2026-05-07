// Modal System Module
export function initializeModals() {
  const modals = document.querySelectorAll('[data-modal]');

  modals.forEach(modal => {
    const modalId = modal.getAttribute('data-modal');
    const openButtons = document.querySelectorAll(`[data-modal-open="${modalId}"]`);
    const closeButtons = modal.querySelectorAll('[data-modal-close]');
    const overlay = modal.querySelector('.modal-overlay');

    openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modal);
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => closeModal(modal));
    });

    overlay?.addEventListener('click', () => closeModal(modal));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-modal].open').forEach(modal => {
        closeModal(modal);
      });
    }
  });
}

export function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');
}

export function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  modal.setAttribute('aria-hidden', 'true');
}
