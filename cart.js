document.addEventListener('DOMContentLoaded', () => {
  // === CART FUNCTIONALITY ===
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCart() {
      const cartItems = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');
      cartItems.innerHTML = '';
      let total = 0;

      cart.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `${item.name} - ₹${item.price} (x${item.quantity}) `;
          const btn = document.createElement('button');
          btn.textContent = 'Remove';
          btn.className = 'remove-btn';
          btn.addEventListener('click', () => removeFromCart(item.id));
          li.appendChild(btn);
          cartItems.appendChild(li);
          total += item.price * item.quantity;
      });

      cartTotal.textContent = `Total: ₹${total}`;
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
  }

  function showToast(message) {
      const toast = document.getElementById("toast");
      if (!toast) return;
      toast.textContent = message;
      toast.className = "toast show";
      setTimeout(() => {
          toast.className = "toast";
      }, 3000);
  }

  function addToCart(id, name, price) {
      const existing = cart.find(item => item.id === id);
      if (existing) existing.quantity++;
      else cart.push({ id, name, price: parseFloat(price), quantity: 1 });
      updateCart();
      showToast(`✅ ${name} has been added to your cart!`);
  }

  document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', e => {
          e.preventDefault();
          addToCart(
              btn.dataset.productId,
              btn.dataset.productName,
              btn.dataset.productPrice
          );
      });
  });

  updateCart();

  document.querySelector('.user-action img[src="cart.svg"]')
      .addEventListener('click', () => {
          document.getElementById('cart-sidebar').classList.add('show');
      });

  document.querySelector('.close-btn')
      .addEventListener('click', () => {
          document.getElementById('cart-sidebar').classList.remove('show');
      });

  document.querySelector('.checkout-btn')
      .addEventListener('click', () => alert('Proceeding to checkout'));

  // === LOGIN REDIRECT ===
  const loginIcon = document.getElementById('login-icon');
  if (loginIcon) {
      loginIcon.addEventListener('click', () => {
          window.location.href = 'login.html';
      });
  }

  // === SEARCH FUNCTIONALITY ===
  const searchInput = document.getElementById('search-input');
  const searchIcon = document.getElementById('search-icon');

  function performSearch() {
      const q = searchInput.value.toLowerCase().trim();
      const items = document.querySelectorAll('.product-item');
      if (!q) {
          items.forEach(i => i.style.display = 'block');
          return;
      }
      let any = false;
      items.forEach(i => {
          const title = i.querySelector('h3').textContent.toLowerCase();
          if (title.includes(q)) {
              i.style.display = 'block';
              any = true;
          } else {
              i.style.display = 'none';
          }
      });
      if (!any) console.log('No products matched the search:', q);
  }

  searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') performSearch();
  });
  searchIcon.addEventListener('click', performSearch);
});
