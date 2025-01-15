let cart = [];

const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

document.querySelectorAll('.item-box').forEach(itemBox => {
  const item = itemBox.dataset.item;
  const price = parseFloat(itemBox.dataset.price);
  const quantityControls = itemBox.querySelector('.quantity-controls');
  const decreaseButton = quantityControls.querySelector('.decrease');
  const increaseButton = quantityControls.querySelector('.increase');
  const quantitySpan = quantityControls.querySelector('.quantity');
  let quantity = 0;

  // Show controls and set quantity to 1 on item click
  itemBox.addEventListener('click', () => {
    if (quantity === 0) {
      quantity = 1;
      updateCart(item, price, quantity);
      quantitySpan.textContent = quantity;
      quantityControls.classList.remove('hidden');
    }
  });

  // Decrease quantity
  decreaseButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      quantity--;
      updateCart(item, price, quantity);
      quantitySpan.textContent = quantity;
      if (quantity === 0) {
        quantityControls.classList.add('hidden');
      }
    }
  });

  // Increase quantity
  increaseButton.addEventListener('click', (e) => {
    e.stopPropagation();
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

  cartCount.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
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
