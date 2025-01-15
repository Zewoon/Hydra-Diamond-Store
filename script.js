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

  itemBox.addEventListener('click', () => {
    if (quantity === 0) {
      quantity = 1;
      updateCart(item, price, quantity);
      quantityControls.classList.remove('hidden');
    }
  });

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

  increaseButton.addEventListener('click', (e) => {
    e.stopPropagation();
    quantity++;
    updateCart(item, price, quantity);
    quantitySpan.textContent = quantity;
  });
});

cartButton.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
  renderCartItems();
});

closeCartButton.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

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

function renderCartItems() {
  cartItems.innerHTML = '';
  cart.forEach(({ item, price, quantity }) => {
    const li = document.createElement('li');
    li.textContent = `${item} 💎 - ${quantity} x ${price} GEL`;
    cartItems.appendChild(li);
  });
}
