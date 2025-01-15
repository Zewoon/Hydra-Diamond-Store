let cart = [];
const cartList = document.getElementById('cart-list');
const cartCount = document.getElementById('cart-count');

// Toggle item selection
function toggleItem(item, price) {
  const itemIndex = cart.findIndex(cartItem => cartItem.item === item);
  if (itemIndex > -1) {
    // Item is already in the cart, remove it
    cart.splice(itemIndex, 1);
  } else {
    // Add the item to the cart
    cart.push({ item, price });
  }
  updateCart();
}

// Update the cart UI
function updateCart() {
  // Update cart count
  cartCount.innerText = cart.length;

  // Update cart items list
  cartList.innerHTML = '';
  cart.forEach(cartItem => {
    const listItem = document.createElement('li');
    listItem.innerText = `${cartItem.item} 💎 - ${cartItem.price} GEL`;
    cartList.appendChild(listItem);
  });
}
