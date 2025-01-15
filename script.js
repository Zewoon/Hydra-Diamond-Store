let cart = [];

const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

// Add event listeners to quantity controls
document.querySelectorAll('.quantity-controls').forEach(control => {
  const decreaseButton = control.querySelector('.decrease');
  const increaseButton = control.querySelector('.increase');
  const quantitySpan = control.querySelector('.quantity');
  const item = control.dataset.item;
  const price = parseFloat(control.dataset.price);

  let quantity = 0;

  decreaseButton.addEventListener('click', () => {
    if (quantity > 0) {
      quantity--;
      updateCart(item, price, quantity);
      quantitySpan.textContent = quantity;
    }
  });

  increaseButton.addEventListener('click', () => {
    quantity++;
    updateCart(item, price, quantity);
    quantitySpan.textContent = quantity;
  });
});

// Update cart items
function updateCart(item, price, quantity) {
  const cartIndex = cart.findIndex(cartItem => cartItem.item === item);
  if (quantity > 0) {
    if (cartIndex > -1) {
      cart[cartIndex].quantity = quantity;
    } else {
      cart.push({ item, price, quantity });
    }
  } else if (cartIndex > -1) {
    cart.splice(cartIndex, 1);
  }

  cartCount.textContent = cart.length;
}

// Open the cart modal
cartButton.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
  renderCartItems();
});

// Close the cart modal
closeCartButton.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Render cart items
function renderCartItems() {
  cartItems.innerHTML = '';
  cart.forEach(({ item, price, quantity }) => {
    const li = document.createElement('li');
    li.textContent = `${item} 💎 - ${quantity} x ${price} GEL`;
    cartItems.appendChild(li);
  });
}
