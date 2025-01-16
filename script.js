// Store for selected items
let selectedItems = [];

// Select all item boxes
const itemBoxes = document.querySelectorAll('.item-box');
const selectedItemsList = document.getElementById('selected-items-list');
const totalPriceElement = document.getElementById('total-price');
const totalPriceCircle = document.getElementById('total-price-circle');
const payButton = document.getElementById('pay-button'); // Pay button

// Handle item selection/deselection
itemBoxes.forEach(itemBox => {
  const tick = itemBox.querySelector('.tick');
  const item = itemBox.dataset.item;
  const price = parseFloat(itemBox.dataset.price); // Selling price

  // Handle item click to toggle selection
  itemBox.addEventListener('click', () => {
    if (tick.classList.contains('hidden')) {
      // Item is being selected
      tick.classList.remove('hidden');
      selectedItems.push({ item, price });
      updateSelectedItems();
    } else {
      // Item is being deselected
      tick.classList.add('hidden');
      selectedItems = selectedItems.filter(selected => selected.item !== item);
      updateSelectedItems();
    }
  });
});

// Update selected items list and total price
function updateSelectedItems() {
  // Clear the selected items list
  selectedItemsList.innerHTML = '';

  // Render each selected item
  selectedItems.forEach(selected => {
    const listItem = document.createElement('li');
    listItem.textContent = `${selected.item} 💎 - ${selected.price} GEL`;

    // Allow deselection from the list
    listItem.addEventListener('click', () => {
      // Remove the item from selected items
      selectedItems = selectedItems.filter(selectedItem => selectedItem !== selected);
      updateSelectedItems();
      // Deselect the item in the grid
      const itemBox = document.querySelector(`[data-item="${selected.item}"]`);
      const tick = itemBox.querySelector('.tick');
      tick.classList.add('hidden');
    });

    selectedItemsList.appendChild(listItem);
  });

  // Calculate total price
  const totalPrice = selectedItems.reduce((sum, selected) => sum + selected.price, 0);

  // Update the total price displays
  totalPriceElement.textContent = `Total Price: ${Math.round(totalPrice)} GEL`; // In the list
  totalPriceCircle.textContent = `${Math.round(totalPrice)}`; // In the green circle
  payButton.textContent = `Pay (${Math.round(totalPrice)} GEL)`; // Update the button text
}

// Pay button functionality
payButton.addEventListener('click', () => {
  const totalPrice = selectedItems.reduce((sum, selected) => sum + selected.price, 0);
  alert(`Your total price is ${Math.round(totalPrice)} GEL. Proceeding to payment...`);
  // You can later replace the alert with real payment logic (e.g., payment gateway integration)
});
