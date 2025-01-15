// Initialize the cart
let cart = [];

// Get DOM elements
const cartButton = document.getElementById('cart-button'); // Cart button
const cartModal = document.getElementById('cart-modal'); // Cart modal
const closeCartButton = document.getElementById('close-cart'); // Close button in the cart modal
const cartCount = document.getElementById('cart-count'); // Cart item count display
const cartItems = document.getElementById('cart-items'); // Cart items list

// Add functionality to each item box
document.querySelectorAll('.item-box').forEach(itemBox => {
  const item = itemBox.dataset.item; // Item name
  const price = parseFloat(itemBox.dataset.price); // Item price
  const quantityControls = itemBox.querySelector('.quantity-controls'); // Quantity controls
  const decreaseButton = quantityControls.querySelector('.decrease'); // Decrease button
  const increaseButton = quantityControls.querySelector('.increase'); // Increase button
  const quantitySpan = quantityControls.querySelector('.quantity'); // Quantity display
  let quantity = 0; // Initial quantity is 0

  // Show quantity controls when item is clicked and set quantity to 1
  itemBox.addEventListener('click', () => {
    if (quantity === 0) {
      quantity = 1; // Set quantity to 1
      updateCart(item, price, quantity); // Update the cart
      quantitySpan.textContent = quantity; // Update the quantity display
      quantityControls.classList.remove('hidden'); // Show quantity controls
    }
  });

  // Decrease quantity when "-" button is clicked
  decreaseButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent item click event
    if (quantity > 0) {
      quantity--; // Decrease quantity
      updateCart(item, price, quantity); // Update the cart
      quantitySpan.textContent = quantity; // Update the quantity display

      // Hide quantity controls if quantity reaches 0
      if (quantity === 0) {
        quantityControls.classList.add('hidden');
      }
    }
  });

  // Increase quantity when "+" button is clicked
  increaseButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent item click event
    quantity++; // Increase quantity
    updateCart(item, price, quantity); // Update the cart
    quantitySpan.textContent = quantity; // Update the quantity display
  });
});

// Update the cart with selected items
function updateCart(item, price, quantity) {
  const cartIndex = cart.findIndex(cartItem => cartItem.item === item);

  if (quantity > 0) {
    if (cartIndex > -1) {
      // Update existing item quantity
      cart[cartIndex].quantity = quantity;
    } else {
      // Add new item to the cart
      cart.push({ item, price, quantity });
    }
  } else if (cartIndex > -1) {
    // Remove item from the cart if quantity is 0
    cart.splice(cartIndex, 1);
  }

  // Update cart count display
  cartCount.textContent = cart.reduce((total, currentItem) => total + currentItem.quantity, 0);
}

// Open the cart modal
document.getElementById('cart-button').addEventListener('click', () => {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.remove('hidden'); // Remove the 'hidden' class to show the modal
});

// Close the cart modal
document.getElementById('close-cart').addEventListener('click', () => {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.add('hidden'); // Add the 'hidden' class to hide the modal
});

// Render selected items in the cart modal
function renderCartItems() {
  cartItems.innerHTML = ''; // Clear existing items
  cart.forEach(({ item, price, quantity }) => {
    const li = document.createElement('li');
    li.textContent = `${item} 💎 - ${quantity} x ${price} GEL`;
    cartItems.appendChild(li);
  });
}
