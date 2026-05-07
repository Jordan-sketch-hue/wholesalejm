// FAQ Accordion Module
export function initializeFAQ() {
  const faqItems = document.querySelectorAll('[data-faq-item]');

  faqItems.forEach(item => {
    const header = item.querySelector('[data-faq-header]');
    const content = item.querySelector('[data-faq-content]');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Close all other items
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            const otherContent = other.querySelector('[data-faq-content]');
            if (otherContent) {
              otherContent.style.maxHeight = '0';
              otherContent.style.opacity = '0';
            }
          }
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
        } else {
          item.classList.remove('open');
          content.style.maxHeight = '0';
          content.style.opacity = '0';
        }
      });
    }
  });
}
