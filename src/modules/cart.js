// Shopping Cart Module
export function initializeCartSystem() {
  window.cart = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    
    addItem(product) {
      const existingItem = this.items.find(p => p.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += (product.quantity || 1);
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 });
      }
      
      this.save();
      this.updateUI();
      this.showNotification(`${product.name} added to cart`);
    },
    
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.save();
      this.updateUI();
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(p => p.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeItem(productId);
        } else {
          this.save();
          this.updateUI();
        }
      }
    },
    
    getTotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    getItemCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    save() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    updateUI() {
      const cartCount = document.getElementById('cart-count');
      if (cartCount) {
        cartCount.textContent = this.getItemCount();
        cartCount.style.display = this.getItemCount() > 0 ? 'inline' : 'none';
      }
    },
    
    showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-primary-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up';
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    },
    
    clear() {
      this.items = [];
      this.save();
      this.updateUI();
    }
  };
  
  // Initialize cart UI
  window.cart.updateUI();
  
  // Listen for cart additions
  document.addEventListener('add-to-cart', (e) => {
    if (e.detail && e.detail.product) {
      window.cart.addItem(e.detail.product);
    }
  });
}
